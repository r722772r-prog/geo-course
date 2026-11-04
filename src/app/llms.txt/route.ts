import { courseTitle, days, getPricing, notes, outcomes, positioning, registrationUrl, refundRules, takeaways, units } from "@/data/course";
export const dynamic = "force-dynamic";
export function GET() {
 const price = getPricing();
 return new Response([
  `# ${courseTitle}`, "",
  "> 超直白行銷的 AI IP 兩日班，由白白主講，採全程線上實作。設計一個專屬 AI 角色、開一個帳號、做出第一支影片，不用露臉。", "",
  "主辦：超直白行銷股份有限公司；講師：超直白 白白。",
  positioning,
  "2026/12/12–12/13 兩天線上教學 10 小時（不含午休）（Google Meet）＋12/23 線上回顧 1.5 小時。全程錄影可重看 30 天，課後 LINE 群開到 12/28。首期學員第二期可免費旁聽複訓一次，不佔作品點評名額。",
  "", "## 場次", ...days.map(([d,t,,c,h])=>`${d} ${t}｜${c} 報到｜${h}`),
  "", "## 兩天單元", ...units.flatMap((list, i) => [`Day ${i + 1}`, ...list.map(([t, d], j) => `${j + 1}. ${t}：${d}`)]),
  "", "## 兩天課程，你會得到", ...takeaways.map(([t, d]) => `- ${t}：${d}`),
  "", "## 學完後你可以做什麼", ...outcomes.map(([t, d]) => `- ${t}：${d}`),
  "", "## 注意事項", ...notes.map(n => `- ${n}`),
  "", "## 費用", price.label, "首期學員價 NT$2,900，之後會調漲；以全額報名。", "工具積分另自購約 NT$1,500。不保證接案、訂單或收入。",
  "團隊示範的 AI 角色資產（非學員成果）見課程頁「資產製作」段落；延伸教學：https://chaozhibai.ai/insights/real-video-into-ai-scene",
  "", "## 退費", ...refundRules.map(([d,r])=>`${d}：${r}`),
  `報名：${registrationUrl}`, "退費：https://course.chaozhibai.ai/refund", "公司官網：https://chaozhibai.ai", "聯絡：chaozhibai.ai@gmail.com",
 ].join("\n"),{headers:{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"no-store"}});
}
