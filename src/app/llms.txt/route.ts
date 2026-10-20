import { courseTitle, days, getPricing, registrationUrl, refundRules } from "@/data/course";
export const dynamic = "force-dynamic";
export function GET() {
 const price = getPricing();
 return new Response([`# ${courseTitle}`,"", "主辦：超直白行銷股份有限公司；講師：超直白 白白。", "2026/12/12–12/13 兩天線上教學 10 小時（不含午休）（Google Meet）＋12/23 線上回顧 1.5 小時，限 20 位。全程錄影可重看 30 天，課後 LINE 群開到 12/28。首期學員第二期可免費旁聽複訓一次，不佔作品點評名額。", ...days.map(([d,t,,c,h])=>`${d} ${t}｜${c} 報到｜${h}`), price.label, "首期學員價 NT$4,900，之後會調漲；以全額報名。", "工具積分另自購約 NT$1,500。不保證接案、訂單或收入。", "## 退費", ...refundRules.map(([d,r])=>`${d}：${r}`), `報名：${registrationUrl}`, "退費：https://course.chaozhibai.ai/refund", "公司官網：https://chaozhibai.ai", "聯絡：chaozhibai.ai@gmail.com"].join("\n"),{headers:{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"no-store"}});
}
