import { decryptTradeInfo, epgEventKind, pickEpgFields, pickPaymentFields, verifyCheckCode, verifyTradeSha } from "@/lib/newebpay";

export const runtime = "nodejs";
const ok = (body = "1") => new Response(body, { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });

async function readForm(request: Request): Promise<Record<string, string>> {
  const ct = request.headers.get("content-type") || "";
  const text = await request.text();
  if (text.length > 30000) return {};
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

const taipeiNow = () => new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei", hour12: false });

export async function POST(request: Request) {
  const hashKey = process.env.NEWEBPAY_HASH_KEY, hashIv = process.env.NEWEBPAY_HASH_IV;
  if (!hashKey || !hashIv) return ok("not_configured");
  const form = await readForm(request);

  let kind: "paid" | "code_issued" | "failed"; let fields: Record<string, string>; let status: string;
  if (form.TradeInfo && form.TradeSha) {
    // MPG 格式（備用）
    if (!verifyTradeSha(String(form.TradeInfo), String(form.TradeSha), hashKey, hashIv)) return ok("bad_signature");
    let decoded; try { decoded = decryptTradeInfo(String(form.TradeInfo), hashKey, hashIv); } catch { return ok("bad_payload"); }
    status = String(decoded.Status || ""); fields = pickPaymentFields(decoded.Result || {}); kind = status === "SUCCESS" ? "paid" : "failed";
  } else {
    // EPG 快速收款連結格式（主要）
    if (!verifyCheckCode(form, hashKey, hashIv)) return ok("bad_signature");
    status = String(form.Status || ""); fields = pickEpgFields(form); kind = epgEventKind(form);
  }

  const who = [fields.PayerName, fields.PayerTel, fields.PayerEmail].filter(Boolean).join("｜");
  const head = kind === "paid" ? "✅ 藍新付款成功" : kind === "code_issued" ? "🕒 藍新：對方已取得繳費代碼（尚未付款）" : `⚠️ 藍新交易失敗（${status}）`;
  const summary = [head,
    `金額：${fields.Amt || "?"}　方式：${fields.PaymentType || "?"}`,
    who ? `付款人：${who}` : "付款人：藍新未帶資料",
    fields.ConsigneeRemark ? `留言：${fields.ConsigneeRemark}` : "",
    `交易號：${fields.TradeNo || "?"}`,
    `時間：${taipeiNow()}`,
    kind === "paid" ? "→ 到報名試算表用手機號對，標已付款。" : kind === "code_issued" ? "→ 先不用動，等付款成功再通知。" : "",
  ].filter(Boolean).join("\n");

  const tasks: Promise<unknown>[] = [];
  const endpoint = process.env.COURSE_REGISTRATION_WEBAPP_URL, secret = process.env.COURSE_REGISTRATION_SECRET;
  if (endpoint && secret) {
    tasks.push(fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, cache: "no-store",
      body: JSON.stringify({ kind: "payment-notify", secret, status, event: kind, data: fields, receivedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(20000) }).catch(() => null));
  }
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN, to = (process.env.LINE_NOTIFY_TO || "").split(",").map(s => s.trim()).filter(Boolean);
  if (token && to.length && kind !== "code_issued") tasks.push(linePush(token, to, summary));
  await Promise.allSettled(tasks);
  return ok("1");
}

export async function GET() { return ok("newebpay-notify ready"); }
