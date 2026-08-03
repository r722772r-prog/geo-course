import type { Metadata } from "next";
import LegalShell, { Section } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "服務條款｜GEO 落地師培訓・超直白行銷",
  description:
    "超直白行銷 GEO 落地師培訓服務條款：課程報名與付款、退費規則、智慧財產權、課程成效免責聲明與其他權利義務說明。",
};

export default function TermsPage() {
  return (
    <LegalShell title="服務條款" updated="2026 年 7 月 28 日">
      <p>
        歡迎使用本網站（course.chaozhibai.ai）並報名超直白行銷股份有限公司（以下稱「本公司」）開設的「GEO 落地師一日班」課程。完成報名即表示你已閱讀、理解並同意本條款。
      </p>

      <Section heading="一、課程報名與付款">
        <ul className="list-none p-0 space-y-3">
          <li className="flex gap-3"><span className="text-[#AE445A] font-black shrink-0">▸</span><span>報名以完成表單填寫並依通知完成繳費為準；名額以繳費順序保留。</span></li>
          <li className="flex gap-3"><span className="text-[#AE445A] font-black shrink-0">▸</span><span>課程費用以報名當時網站公告為準。</span></li>
          <li className="flex gap-3"><span className="text-[#AE445A] font-black shrink-0">▸</span><span>退費、轉場次與名額轉讓規則，詳見<a href="/refund" className="text-[#AE445A] underline">退費說明</a>（重點：課程當日起不予退費）。</span></li>
        </ul>
      </Section>

      <Section heading="二、課程內容與成效聲明">
        <p>
          本課程教授經國際研究驗證的 GEO（生成式引擎優化）方法與實作。惟 AI 模型的回答具隨機性，業界亦無公認的成效驗證標準，<span className="font-black">本公司不保證上課後你的品牌必然被任何 AI 推薦</span>——任何做出此類保證的課程，都值得你警惕。課程提供的是方法、模板與查測工具，成效取決於後續執行。
        </p>
      </Section>

      <Section heading="三、智慧財產權">
        <p>
          課程講義、模板、簡報與本網站內容之著作權均屬本公司所有。學員可於個人或自身企業用途內使用課程模板；未經書面同意，不得將課程內容重製、公開傳播、轉售或用於開設同類課程。
        </p>
      </Section>

      <Section heading="四、學員行為">
        <p>
          請勿於課程中錄影、錄音或直播（拍照留念以講師現場說明為準）；請尊重其他學員的隱私與品牌資訊。嚴重影響課程進行者，本公司得請其離場且不予退費。
        </p>
      </Section>

      <Section heading="五、個人資料">
        <p>
          個人資料之蒐集與使用，依<a href="/privacy" className="text-[#AE445A] underline">隱私權政策</a>辦理。
        </p>
      </Section>

      <Section heading="六、條款修訂與準據法">
        <p>
          本條款如有修訂，將公告於本頁並更新日期；已完成報名者，適用報名當時之條款。本條款依中華民國法律解釋適用，如有爭議，雙方同意先誠信協商；協商不成時，以臺灣新北地方法院為第一審管轄法院。
        </p>
      </Section>
    </LegalShell>
  );
}
