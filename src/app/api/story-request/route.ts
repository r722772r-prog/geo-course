import { createHash } from "node:crypto";

// 官網（chaozhibai.ai）「申請免費故事版」表單的收件端。
// 收到後：①LINE 推播給 LINE_NOTIFY_TO ②轉送 Apps Script 寫進報名試算表的「故事版申請」分頁。
// 兩邊只要有一邊成功就回報已收件；都失敗才請對方改用 LINE 或 Email。
export const runtime = "nodejs";

const allowedOrigins = new Set(["https://chaozhibai.ai", "https://www.chaozhibai.ai"]);
const cors = (origin: string) => ({
  "Access-Control-Allow-Origin": origin, "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "600", Vary: "Origin", "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff",
});
const originOf = (request: Request) => {
  const origin = request.headers.get("origin") || "";
  const local = process.env.NODE_ENV === "development" && /^http:\/\/localhost:\d+$/.test(origin);
  return allowedOrigins.has(origin) || local ? origin : "";
};

type Story = { mode: "free" | "private"; brand: string; audience: string; action: string; message: string; platform: string; name: string; line: string; photoUrl: string; release: string; requestId: string };
const limits: Array<[keyof Story, number, boolean]> = [["brand", 100, true], ["audience", 300, true], ["action", 300, true], ["message", 300, true], ["platform", 100, true], ["name", 60, true], ["line", 200, true], ["photoUrl", 500, false], ["release", 10, false]];

function parseStory(body: Record<string, unknown>): Story {
  if (body.website) throw new Error("表單格式不正確。");
  const mode = body.mode === "private" ? "private" : "free";
  if (body.privacy !== true || (mode === "free" && body.authorization !== true)) throw new Error("請勾選資料處理說明與授權。");
  const requestId = String(body.requestId || "");
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId)) throw new Error("表單格式不正確。");
  const out: Record<string, string> = {};
  for (const [key, max, required] of limits) {
    const value = typeof body[key] === "string" ? (body[key] as string).trim() : "";
    if ((required && !value) || value.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) throw new Error("請確認每一格都有填，而且沒有超過字數。");
    out[key] = value;
  }
  if (out.photoUrl && !/^https:\/\/\S+$/.test(out.photoUrl)) throw new Error("照片連結請用 https:// 開頭的網址。");
  if (out.release && !/^\d{4}-\d{2}-\d{2}$/.test(out.release)) throw new Error("延後公開日期格式不正確。");
  return { ...(out as Omit<Story, "mode" | "requestId">), mode, requestId };
}

// 同一台機器上的簡易防重複與限流；serverless 重啟會歸零，只擋連續灌入。
const seen = new Map<string, number>(), hits = new Map<string, number[]>();
function allow(address: string) {
  const now = Date.now(), recent = (hits.get(address) || []).filter(t => now - t < 600000);
  if (recent.length >= 5) return false;
  recent.push(now); hits.set(address, recent);
  if (hits.size > 500) hits.clear();
  return true;
}

async function linePush(token: string, to: string[], text: string) {
  const results = await Promise.allSettled(to.map(id => fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ to: id, messages: [{ type: "text", text }] }), signal: AbortSignal.timeout(8000),
  })));
  return results.some(r => r.status === "fulfilled" && r.value.ok);
}

export async function OPTIONS(request: Request) {
  const origin = originOf(request);
  return origin ? new Response(null, { status: 204, headers: cors(origin) }) : new Response(null, { status: 403 });
}

export async function POST(request: Request) {
  const origin = originOf(request);
  if (!origin) return Response.json({ error: "請從超直白行銷官網送出申請。" }, { status: 403 });
  const reply = (body: object, status = 200) => Response.json(body, { status, headers: cors(origin) });
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply({ error: "表單格式不正確。" }, 415);
  let data: Story;
  try {
    const raw = await request.text();
    if (raw.length > 8000) return reply({ error: "表單內容過長。" }, 413);
    data = parseStory(JSON.parse(raw));
  } catch (error) {
    return reply({ error: error instanceof SyntaxError ? "表單格式不正確。" : error instanceof Error ? error.message : "請確認申請資料。" }, 400);
  }
  const id = "SB-" + createHash("sha256").update(data.requestId).digest("hex").slice(0, 10).toUpperCase();
  if (seen.has(data.requestId)) return reply({ id, saved: true });
  const address = request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (!allow(address)) return reply({ error: "送出過於頻繁，請稍後再試，或直接用官方 LINE 聯絡我們。" }, 429);

  const when = new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei", hour12: false });
  const text = [
    data.mode === "free" ? "📩 官網：免費故事版申請" : "📩 官網：保密付費故事版洽詢",
    `編號：${id}`,
    `品牌／商品：${data.brand}`,
    `給誰看：${data.audience}`,
    `看完做什麼：${data.action}`,
    `最想讓他知道：${data.message}`,
    `放哪個平台：${data.platform}`,
    `稱呼：${data.name}`,
    `LINE／聯絡方式：${data.line}`,
    `商品照片：${data.photoUrl || "沒附連結，要跟對方要"}`,
    data.mode === "free" ? `授權：已同意公開使用${data.release ? `，延後公開到 ${data.release}` : ""}` : "授權：要保密，未授權公開",
    `時間：${when}`,
  ].join("\n");

  const tasks: Array<Promise<boolean>> = [];
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN, to = (process.env.LINE_NOTIFY_TO || "").split(",").map(s => s.trim()).filter(Boolean);
  if (token && to.length) tasks.push(linePush(token, to, text));
  const endpoint = process.env.COURSE_REGISTRATION_WEBAPP_URL, secret = process.env.COURSE_REGISTRATION_SECRET;
  const script = endpoint ? URL.parse(endpoint) : null;
  if (script && secret && script.origin === "https://script.google.com" && /^\/macros\/s\/[^/]+\/exec$/.test(script.pathname)) {
    tasks.push(fetch(script, {
      method: "POST", headers: { "Content-Type": "application/json" }, cache: "no-store",
      body: JSON.stringify({ kind: "story-request", secret, id, data, receivedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(20000),
    }).then(async r => r.ok && (await r.json()).saved === true).catch(() => false));
  }
  // 不記錄任何送出的個人資料、密鑰或上游回應。
  const done = (await Promise.all(tasks.map(t => t.catch(() => false)))).some(Boolean);
  if (!done) return reply({ error: "收件暫時無法確認，資料仍留在此頁。請用下方草稿貼到官方 LINE 或 Email 給我們。" }, 503);
  seen.set(data.requestId, Date.now());
  if (seen.size > 500) seen.clear();
  return reply({ id, saved: true });
}

export async function GET() { return new Response("story-request ready", { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } }); }
