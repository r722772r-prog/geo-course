import { decryptTradeInfo, pickPaymentFields, verifyTradeSha } from "@/lib/newebpay";

export const runtime = "nodejs";
const ok = (body = "1") => new Response(body, { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });

async function readForm(request: Request): Promise<Record<string, string>> {
  const ct = request.headers.get("content-type") || "";
  const text = await request.text();
  if (text.length > 20000) return {};
  if (ct.includes("application/json")) { try { return JSON.parse(text); } catch { return {}; } }
  const out: Record<string, string> = {};
  new URLSearchParams(text).forEach((v, k) => { out[k] = v; });
  return out;
}

function linePush(token: string, to: string[], text: string) {
  return Promise.allSettled(to.map(id => fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ to: id, messages: [{ type: "text", text }] }), signal: AbortSignal.timeout(8000),
  })));
}

export async function POST(request: Request) {
  const hashKey = process.env.NEWEBPAY_HASH_KEY, hashIv = process.env.NEWEBPAY_HASH_IV;
  if (!hashKey || !hashIv) return ok("not_configured");
  const form = await readForm(request);
  const tradeInfo = String(form.TradeInfo || ""), tradeSha = String(form.TradeSha || "");
  if (!tradeInfo || !tradeSha || !verifyTradeSha(tradeInfo, tradeSha, hashKey, hashIv)) return ok("bad_signature");
  let decoded; try { decoded = decryptTradeInfo(tradeInfo, hashKey, hashIv); } catch { return ok("bad_payload"); }
  const result = decoded.Result || {};
  const status = String(decoded.Status || result.Status || form.Status || "");
  const fields = pickPaymentFields(result);
  const paid = status === "SUCCESS";
  const summary = `${paid ? "✅ 藍新付款成功" : `⚠️ 藍新通知（${status || "未知"}）`}\n金額：${fields.Amt || "?"}\n方式：${fields.PaymentType || "?"}\n時間：${fields.PayTime || new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" })}\n交易號：${fields.TradeNo || "?"}\n訂單號：${fields.MerchantOrderNo || "?"}${fields.PayerName || fields.Name ? `\n付款人：${fields.PayerName || fields.Name}` : ""}${fields.PayerPhone || fields.Phone ? `\n手機：${fields.PayerPhone || fields.Phone}` : ""}\n→ 到報名試算表對手機號，標已付款。`;

  const tasks: Promise<unknown>[] = [];
  const endpoint = process.env.COURSE_REGISTRATION_WEBAPP_URL, secret = process.env.COURSE_REGISTRATION_SECRET;
  if (endpoint && secret) {
    tasks.push(fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, cache: "no-store",
      body: JSON.stringify({ kind: "payment-notify", secret, status, data: fields, receivedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(20000) }).catch(() => null));
  }
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN, to = (process.env.LINE_NOTIFY_TO || "").split(",").map(s => s.trim()).filter(Boolean);
  if (token && to.length) tasks.push(linePush(token, to, summary));
  await Promise.allSettled(tasks);
  return ok("1");
}

export async function GET() { return ok("newebpay-notify ready"); }
