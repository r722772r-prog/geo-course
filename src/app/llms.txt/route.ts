import { courseTitle, days, getPricing, registrationUrl, refundRules } from "@/data/course";
export const dynamic = "force-dynamic";
export function GET() {
 const price = getPricing();
 return new Response([`# ${courseTitle}`,"", "主辦：超直白行銷股份有限公司；講師：超直白 白白。", "2026/11/4–11/8，新北汐止，五天 22 小時，限 20 位。", ...days.map(([d,t,,c,h])=>`${d} ${t}｜${c} 報到｜${h}`), price.label, ...(price.early?["訂金 NT$5,000 抵 NT$8,000，尾款 NT$11,800 於 10/25 前補繳，實付總額 NT$16,800。"]:[]), "工具積分另自購約 NT$1,500。不保證接案、訂單或收入。", "## 退費", ...refundRules.map(([d,r])=>`${d}：${r}`), `報名：${registrationUrl}`, "退費：https://course.chaozhibai.ai/refund", "公司官網：https://chaozhibai.ai", "聯絡：chaozhibai.ai@gmail.com"].join("\n"),{headers:{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"no-store"}});
}
