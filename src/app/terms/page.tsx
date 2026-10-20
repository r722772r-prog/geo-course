import type { Metadata } from "next";
import LegalShell, { Section } from "@/components/LegalShell";
export const metadata: Metadata = {title:"服務條款｜AI 行銷影片實戰班",description:"AI 行銷影片實戰班報名、付款與課程使用說明。",alternates:{canonical:"https://course.chaozhibai.ai/terms"}};
export default function TermsPage() { return <LegalShell title="服務條款" updated="2026 年 10 月 20 日">
<p>本課程由超直白行銷股份有限公司提供。</p>
<Section heading="一、報名與付款"><p>請先填寫報名表，付款入口目前確認中；請等待主辦提供新的 NT$4,900 付款連結，勿使用舊連結付款。付款頁請填寫與報名表相同的姓名與手機，方便核對。主辦核對款項後提供確認通知；填表本身不是正式報名確認。</p><p>費用依當期公告與所選方案辦理。AI 工具積分另由學員自購，預估約 NT$1,500，依練習量增減。</p><p>取消、轉讓及退費依<a href="/refund" className="underline">退費說明</a>辦理。</p></Section>
<Section heading="二、學習與作品"><p>本課程以技能學習與作品實作為主，不保證接案、訂單或收入。學員應自備可上網的電腦，並使用有權使用的圖片、影音及其他素材；AI 工具產出內容的使用，應遵循該工具的授權條件。</p></Section>
<Section heading="三、課程內容與隱私"><p>課程講義、模板與簡報不得未經授權轉售或公開散布。請尊重其他學員的作品、個人資料與品牌資訊；作品或肖像用於招生宣傳，須另取得本人同意。</p></Section>
<Section heading="四、線上課、錄影與複訓"><p>2026/12/12–13 以 Google Meet 全程線上直播；12/23 20:00–21:30 線上作業回顧。全程錄影，課後可重看 30 天；LINE 群開放至 12/28。錄影觀看連結與起算時間由主辦於課後通知。</p><p>首期學員第二期可免費複訓一次，以旁聽為主、限一次，不佔第二期作品點評名額。</p></Section><Section heading="五、聯絡與個人資料"><p>報名服務窗口：<a href="mailto:chaozhibai.ai@gmail.com">chaozhibai.ai@gmail.com</a>。資料蒐集與使用請參閱<a href="/privacy" className="underline">隱私權政策</a>。</p></Section>
</LegalShell>; }
