export const registrationVersion = "2026-11-01-ai-ip-v1";
export const paymentUrl = "https://core.newebpay.com/EPG/chaozhibai/6ccU9q";
export const registrationClosesAt = "2026-12-11T23:59:59+08:00";

export type Registration = { requestId: string; name: string; phone: string; email: string; goal: string; consent: true; website: string };

export function parseRegistration(value: unknown, now = Date.now()): Registration {
  if (now > Date.parse(registrationClosesAt)) throw new Error("本期已停止新報名，請聯絡主辦。");
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("請確認報名資料。");
  const body = value as Record<string, unknown>;
  if (body.version !== registrationVersion || body.consent !== true) throw new Error("請閱讀並勾選報名須知與個資告知。");
  const field = (key: string, max: number) => {
    if (typeof body[key] !== "string") throw new Error("請完成所有必填欄位。");
    const text = body[key].trim();
    if (!text || text.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(text)) throw new Error("請確認欄位內容與長度。");
    return text;
  };
  const requestId = field("requestId", 36);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId)) throw new Error("請重新整理報名表再試。");
  const name = field("name", 60);
  const phone = field("phone", 30).replace(/[\s()-]/g, "").replace(/^\+886/, "0");
  if (!/^09\d{8}$/.test(phone)) throw new Error("手機請填台灣手機號碼，例如 0912345678。");
  const email = field("email", 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("請確認 Email 格式。");
  const goal = field("goal", 1000);
  if (body.website && (typeof body.website !== "string" || body.website.trim())) throw new Error("資料驗證未通過，請稍後再試。");
  return { requestId, name, phone, email, goal, consent: true, website: "" };
}
