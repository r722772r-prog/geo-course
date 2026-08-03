import type { Metadata } from "next";
import LegalShell, { Section } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "隱私權政策｜GEO 落地師培訓・超直白行銷",
  description:
    "超直白行銷股份有限公司隱私權政策：我們僅在課程報名時透過表單蒐集必要的個人資料（姓名與聯絡方式），用於課程通知與服務聯繫，不會出售或提供給無關第三方。",
};

export default function PrivacyPage() {
  return (
    <LegalShell title="隱私權政策" updated="2026 年 7 月 28 日">
      <p>
        超直白行銷股份有限公司（以下稱「本公司」）重視你的個人資料保護。本政策說明本網站（course.chaozhibai.ai）與課程報名流程中，我們如何蒐集、使用與保護你的資料。
      </p>

      <Section heading="一、我們蒐集什麼資料">
        <ul className="list-none p-0 space-y-3">
          <li className="flex gap-3"><span className="text-[#AE445A] font-black shrink-0">▸</span><span><span className="font-black">課程報名資料</span>：你透過報名表單（Google 表單）提供的姓名、聯絡方式（電話／Email／LINE）及報名相關資訊。</span></li>
          <li className="flex gap-3"><span className="text-[#AE445A] font-black shrink-0">▸</span><span><span className="font-black">聯繫紀錄</span>：你透過官方 LINE 或 Email 與我們聯繫時的對話內容。</span></li>
          <li className="flex gap-3"><span className="text-[#AE445A] font-black shrink-0">▸</span><span>本網站本身<span className="font-black">不設置會員系統、不主動投放追蹤 Cookie</span>；網站託管服務（Vercel）可能產生必要的技術性紀錄（如伺服器日誌）。</span></li>
        </ul>
      </Section>

      <Section heading="二、資料的使用目的">
        <ul className="list-none p-0 space-y-3">
          <li className="flex gap-3"><span className="text-[#AE445A] font-black shrink-0">▸</span><span>課程報名確認、行前通知、場次異動聯繫與退費作業。</span></li>
          <li className="flex gap-3"><span className="text-[#AE445A] font-black shrink-0">▸</span><span>你同意接收時，提供開課資訊與相關服務通知。</span></li>
        </ul>
        <p className="font-black">我們不會出售、出租或以其他方式將你的個人資料提供給與上述目的無關的第三方。</p>
      </Section>

      <Section heading="三、第三方服務">
        <p>
          報名流程使用 Google 表單、聯繫使用 LINE 官方帳號、網站託管使用 Vercel。你於各該平台提供的資料，同時受其隱私權政策規範。
        </p>
      </Section>

      <Section heading="四、資料保存與你的權利">
        <p>
          報名資料於課程服務目的完成後，僅保存必要期間。依個人資料保護法，你可隨時聯繫我們查詢、閱覽、補充、更正你的個人資料，或請求停止蒐集、處理、利用及刪除。
        </p>
      </Section>

      <Section heading="五、聯絡方式">
        <p>
          對本政策有任何疑問，或欲行使個資權利，請來信 <a href="mailto:chaozhibai.ai@gmail.com" className="text-[#AE445A] underline">chaozhibai.ai@gmail.com</a>，或透過<a href="https://lin.ee/v1T1Lwz" target="_blank" rel="noopener noreferrer" className="text-[#AE445A] underline">官方 LINE</a> 聯繫。
        </p>
      </Section>

      <Section heading="六、政策修訂">
        <p>本政策如有修訂，將公告於本頁並更新日期。</p>
      </Section>
    </LegalShell>
  );
}
