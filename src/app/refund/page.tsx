import type { Metadata } from "next";
import LegalShell, { Section } from "@/components/LegalShell";
import { refundRules } from "@/data/course";
export const metadata: Metadata = { title:"退費說明｜AI 行銷影片實戰班", description:"2026/11/29（含）以前全退、11/30–12/6 退 50%、12/7 起不退可轉讓。", alternates:{canonical:"https://course.chaozhibai.ai/refund"} };
export default function RefundPage() { return <LegalShell title="退費說明" updated="2026 年 10 月 16 日">
<p>適用 2026/12/13–12/14 AI 行銷影片實戰班（含 12/23 線上回顧）。依下列申請時間，以實際已付金額計算。</p>
<Section heading="一、退費時間"><div className="table-scroll"><table><thead><tr><th>申請時間</th><th>退費方式</th></tr></thead><tbody>{refundRules.map(([date,rule])=><tr key={date}><th>{date}</th><td>{rule}</td></tr>)}</tbody></table></div><p>時間以台灣時間為準；11/29 與 12/6 當日均包含在各該期間。</p></Section>
<Section heading="二、退款計算"><p>首期學員價 NT$7,800：全退 NT$7,800；退 50% 為 NT$3,900。</p><p>12/1 起全款 NT$9,800：全退 NT$9,800；退 50% 為 NT$4,900。</p><p>原 11 月場（已停辦）已付款學員：可全額轉入本場，或來信申請全額退費。</p></Section>
<Section heading="三、申請方式"><p>請來信 <a href="mailto:chaozhibai.ai@gmail.com">chaozhibai.ai@gmail.com</a>，提供姓名、付款時填寫的手機號碼及申請事項。轉讓也請聯繫主辦辦理。</p></Section>
<Section heading="四、主辦取消課程"><p>若由主辦取消課程，退還實際已付課程費用。</p></Section>
</LegalShell>; }
