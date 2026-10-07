import type { Metadata } from "next";
import LegalShell, { Section } from "@/components/LegalShell";
import { refundRules } from "@/data/course";
export const metadata: Metadata = { title:"退費說明｜AI 行銷影片實戰班", description:"2026/10/21（含）以前全退、10/22–10/28 退 50%、10/29 起不退可轉讓。", alternates:{canonical:"https://course.chaozhibai.ai/refund"} };
export default function RefundPage() { return <LegalShell title="退費說明" updated="2026 年 10 月 7 日">
<p>適用 2026/11/4–11/8 AI 行銷影片實戰班。早鳥全款、原價全款、訂金及訂金補足尾款，均依下列申請時間，以實際已付金額計算。</p>
<Section heading="一、退費時間"><div className="table-scroll"><table><thead><tr><th>申請時間</th><th>退費方式</th></tr></thead><tbody>{refundRules.map(([date,rule])=><tr key={date}><th>{date}</th><td>{rule}</td></tr>)}</tbody></table></div><p>時間以台灣時間為準；10/21 與 10/28 當日均包含在各該期間。</p></Section>
<Section heading="二、退款計算"><p>已付訂金 NT$5,000：全退 NT$5,000；退 50% 為 NT$2,500。</p><p>早鳥全款 NT$14,800：全退 NT$14,800；退 50% 為 NT$7,400。</p><p>訂金方案已補足尾款、實付 NT$16,800：全退 NT$16,800；退 50% 為 NT$8,400。</p><p>原價全款 NT$19,800：全退 NT$19,800；退 50% 為 NT$9,900。訂金抵扣額不作為退款計算基礎。</p></Section>
<Section heading="三、申請方式"><p>請來信 <a href="mailto:chaozhibai.ai@gmail.com">chaozhibai.ai@gmail.com</a>，提供姓名、付款時填寫的手機號碼及申請事項。轉讓也請聯繫主辦辦理。</p></Section>
<Section heading="四、主辦取消課程"><p>若由主辦取消課程，退還實際已付課程費用。</p></Section>
</LegalShell>; }
