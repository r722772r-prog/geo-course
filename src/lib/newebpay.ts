import { createDecipheriv, createHash, createHmac, timingSafeEqual } from "node:crypto";

// 藍新金流（NewebPay）交易完成通知：TradeInfo 為 AES-256-CBC（HashKey/HashIV）加密的 JSON，TradeSha 為 SHA256 校驗。
export type NewebPayResult = Record<string, string | number | undefined>;

export function expectedTradeSha(tradeInfo: string, hashKey: string, hashIv: string) {
  return createHash("sha256").update(`HashKey=${hashKey}&${tradeInfo}&HashIV=${hashIv}`).digest("hex").toUpperCase();
}

export function verifyTradeSha(tradeInfo: string, tradeSha: string, hashKey: string, hashIv: string) {
  const expected = Buffer.from(expectedTradeSha(tradeInfo, hashKey, hashIv));
  const given = Buffer.from(String(tradeSha || "").toUpperCase());
  return expected.length === given.length && timingSafeEqual(expected, given);
}

export function decryptTradeInfo(tradeInfo: string, hashKey: string, hashIv: string): { Status?: string; Message?: string; Result?: NewebPayResult } {
  const decipher = createDecipheriv("aes-256-cbc", Buffer.from(hashKey, "utf8"), Buffer.from(hashIv, "utf8"));
  decipher.setAutoPadding(false);
  const raw = Buffer.concat([decipher.update(Buffer.from(tradeInfo, "hex")), decipher.final()]);
  const pad = raw[raw.length - 1];
  const text = raw.subarray(0, raw.length - (pad >= 1 && pad <= 32 ? pad : 0)).toString("utf8");
  const trimmed = text.trim();
  if (trimmed.startsWith("{")) return JSON.parse(trimmed);
  // 部分版本回傳 querystring 格式
  const params = new URLSearchParams(trimmed);
  const Result: NewebPayResult = {};
  params.forEach((v, k) => { Result[k] = v; });
  return { Status: String(Result.Status || ""), Message: String(Result.Message || ""), Result };
}

// 只保留對帳需要的欄位，不碰卡號等敏感資料。
export function pickPaymentFields(result: NewebPayResult) {
  const keys = ["MerchantOrderNo", "TradeNo", "Amt", "PaymentType", "PayTime", "ItemDesc", "PayerName", "PayerEmail", "PayerPhone", "Email", "Phone", "Name", "Memo", "Comments"];
  const out: Record<string, string> = {};
  for (const k of keys) if (result[k] !== undefined && result[k] !== "") out[k] = String(result[k]);
  return out;
}

export function paymentKey(secret: string, tradeNo: string) {
  return createHmac("sha256", secret).update(`payment:${tradeNo}`).digest("hex");
}
