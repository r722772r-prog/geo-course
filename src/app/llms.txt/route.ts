import { courseTitle, days, getPricing, registrationUrl, refundRules } from "@/data/course";
export const dynamic = "force-dynamic";
export function GET() {
 const price = getPricing();
 return new Response([`# ${courseTitle}`,"", "主辦：超直白行銷股份有限公司；講師：超直白 白白。", "2026/12/13–12/14 新北汐止兩天實體 14 小時＋12/23 線上回顧 1.5 小時，限 20 位。課後 LINE 群開到 12/28。", ...days.map(([d,t,,c,h])=>`${d} ${t}｜${c} 報到｜${h}`), price.label, "首期學員價 NT$6,000（2026/11/30 止），12/1 起 NT$7,800；以全額報名。", "工具積分另自購約 NT$1,500。不保證接案、訂單或收入。", "## 退費", ...refundRules.map(([d,r])=>`${d}：${r}`), `報名：${registrationUrl}`, "退費：https://course.chaozhibai.ai/refund", "公司官網：https://chaozhibai.ai", "聯絡：chaozhibai.ai@gmail.com"].join("\n"),{headers:{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"no-store"}});
}
