import { createHmac, timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";
// 用途：白白或玉燕傳「ID」給官方帳號，機器人回 userId，拿去填 Vercel 的 LINE_NOTIFY_TO。其他訊息一律不回，不干擾人工客服。
export async function POST(request: Request) {
  const secret = process.env.LINE_CHANNEL_SECRET, token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  const body = await request.text();
  if (!secret || !token) return new Response("ok", { status: 200 });
  const sig = request.headers.get("x-line-signature") || "";
  const mac = createHmac("sha256", secret).update(body).digest("base64");
  if (sig.length !== mac.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(mac))) return new Response("bad signature", { status: 403 });
  let events: Array<{ type: string; replyToken?: string; message?: { type: string; text?: string }; source?: { userId?: string; groupId?: string; type?: string } }> = [];
  try { events = JSON.parse(body).events || []; } catch { return new Response("ok", { status: 200 }); }
  await Promise.allSettled(events.map(async ev => {
    if (ev.type !== "message" || ev.message?.type !== "text" || !ev.replyToken) return;
    const text = (ev.message.text || "").trim().toUpperCase();
    if (text !== "ID" && text !== "我的ID") return;
    const id = ev.source?.groupId ? `群組 ID：${ev.source.groupId}` : `你的 userId：${ev.source?.userId || "讀不到"}`;
    await fetch("https://api.line.me/v2/bot/message/reply", {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ replyToken: ev.replyToken, messages: [{ type: "text", text: `${id}\n（把這串交給 Nora 填進 LINE_NOTIFY_TO）` }] }),
      signal: AbortSignal.timeout(8000),
    }).catch(() => null);
  }));
  return new Response("ok", { status: 200 });
}
export async function GET() { return new Response("line-webhook ready", { status: 200 }); }
