import { createHmac } from "node:crypto";
import { parseRegistration, paymentUrl, registrationClosesAt, registrationVersion } from "@/lib/course-registration";

export const runtime = "nodejs";
const headers = { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" };
const reply = (body: object, status = 200) => Response.json(body, { status, headers });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const local = process.env.NODE_ENV === "development" && origin === new URL(request.url).origin;
  const preview = process.env.VERCEL_ENV === "preview" && origin === `https://${process.env.VERCEL_URL}`;
  if (origin !== "https://course.chaozhibai.ai" && !local && !preview) return reply({ error: "請從課程官網送出報名。" }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply({ error: "表單格式不正確。" }, 415);
  let data;
  try {
    const raw = await request.text();
    if (raw.length > 12000) return reply({ error: "表單內容過長。" }, 413);
    data = parseRegistration(JSON.parse(raw));
  } catch (error) {
    return reply({ error: error instanceof SyntaxError ? "表單格式不正確。" : error instanceof Error ? error.message : "請確認報名資料。" }, 400);
  }
  const endpoint = process.env.COURSE_REGISTRATION_WEBAPP_URL;
  const secret = process.env.COURSE_REGISTRATION_SECRET;
  if (!endpoint || !secret) return reply({ error: "報名收件服務尚未就緒。請保留資料，或透過官方 LINE 聯絡主辦。" }, 503);
  try {
    const target = new URL(endpoint);
    if (target.origin !== "https://script.google.com" || !/^\/macros\/s\/[^/]+\/exec$/.test(target.pathname)) throw new Error("invalid_endpoint");
    const address = request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() || "unknown";
    const rateKey = createHmac("sha256", secret).update(`${new Date().toISOString().slice(0, 10)}:${address}`).digest("hex");
    const result = await fetch(target, {
      method: "POST", headers: { "Content-Type": "application/json" }, cache: "no-store",
      body: JSON.stringify({ kind: "course-registration", version: registrationVersion, secret, data, rateKey }),
      signal: AbortSignal.timeout(25000),
    });
    if (!result.ok) throw new Error("storage_unavailable");
    const saved = await result.json();
    if (!saved.ok || !saved.saved || !/^IP-[A-Z0-9]{12}$/.test(saved.id)) {
      if (saved.error === "duplicate") return reply({ error: "這支手機已有報名紀錄，請聯絡主辦確認，勿重複填表或付款。" }, 409);
      if (saved.error === "rate_limited") return reply({ error: "送出過於頻繁，請稍後再試。" }, 429);
      if (saved.error === "closed") return reply({ error: "本期已停止新報名，請聯絡主辦。" }, 409);
      throw new Error("storage_unavailable");
    }
    if (Date.now() > Date.parse(registrationClosesAt)) return reply({ id: saved.id, saved: true, paymentUrl: null });
    return reply({ id: saved.id, saved: true, paymentUrl });
  } catch {
    // Do not log submitted personal information, secrets, or upstream responses.
    return reply({ error: "暫時無法確認收件結果。請留在同一頁重試，系統會用同一編號避免重複登記；若已付款，請勿再次付款。" }, 503);
  }
}
