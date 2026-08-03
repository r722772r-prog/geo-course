import type { Metadata } from "next";
import LegalShell, { Section } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "退費說明｜GEO 落地師培訓・超直白行銷",
  description:
    "GEO 落地師一日班退費規則：開課日前第 8 天（含）以前申請可全額退費；開課前 7 天內申請退還 50%；課程當日起（含已開始上課）不予退費。無法出席可申請轉場次或轉讓名額。",
};

export default function RefundPage() {
  return (
    <LegalShell title="退費說明" updated="2026 年 7 月 28 日">
      <div className="bg-white border-l-4 border-[#AE445A] p-6 shadow-sm">
        <p className="font-bold">
          報名前請先讀完這一頁。我們把退費規則寫得清清楚楚，就是不希望任何人在模糊地帶吃虧——包括你，也包括我們。
        </p>
      </div>

      <Section heading="一、學員申請退費">
        <ul className="list-none p-0 space-y-3">
          <li className="flex gap-3">
            <span className="text-[#AE445A] font-black shrink-0">▸</span>
            <span><span className="font-black">開課日前第 8 天（含）以前</span>申請：全額退費。</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#AE445A] font-black shrink-0">▸</span>
            <span><span className="font-black">開課日前 7 天內</span>申請：退還已繳費用的 <span className="font-black">50%</span>。</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#AE445A] font-black shrink-0">▸</span>
            <span><span className="font-black text-[#AE445A]">課程當日起（含課程已開始後）：不予退費。</span>課程為一日制，開始上課即視同服務已提供，請理解並於報名前確認自己能出席。</span>
          </li>
        </ul>
      </Section>

      <Section heading="二、無法出席的替代方案">
        <p>比起退費，我們更希望你學到東西。若確定無法出席，於<span className="font-black">開課日前 3 天（含）以前</span>透過官方 LINE 告知，可擇一：</p>
        <ul className="list-none p-0 space-y-3">
          <li className="flex gap-3"><span className="text-[#AE445A] font-black shrink-0">▸</span><span><span className="font-black">轉至下一場次</span>（以一次為限，名額依當場次報名狀況安排）。</span></li>
          <li className="flex gap-3"><span className="text-[#AE445A] font-black shrink-0">▸</span><span><span className="font-black">名額轉讓</span>給他人使用（請提供轉讓對象的姓名與聯絡方式）。</span></li>
        </ul>
      </Section>

      <Section heading="三、主辦方取消或變更">
        <p>
          若因不可抗力（天災、疫情、場地因素等）或報名人數不足，由超直白行銷取消或變更課程日期，已報名學員可選擇<span className="font-black">全額退費</span>，或<span className="font-black">優先保留名額至下一場次</span>。
        </p>
      </Section>

      <Section heading="四、退費方式與時程">
        <ul className="list-none p-0 space-y-3">
          <li className="flex gap-3"><span className="text-[#AE445A] font-black shrink-0">▸</span><span>申請管道：官方 LINE（<a href="https://lin.ee/v1T1Lwz" target="_blank" rel="noopener noreferrer" className="text-[#AE445A] underline">加入好友</a>）或來信 <a href="mailto:chaozhibai.ai@gmail.com" className="text-[#AE445A] underline">chaozhibai.ai@gmail.com</a>，註明報名姓名與場次。</span></li>
          <li className="flex gap-3"><span className="text-[#AE445A] font-black shrink-0">▸</span><span>退費以原付款方式退回，於申請核准後 <span className="font-black">14 個工作天內</span>完成。</span></li>
        </ul>
      </Section>

      <Section heading="五、其他">
        <p>
          本退費說明適用於「GEO 落地師一日班」實體課程。規則如有調整，將公告於本頁並註明更新日期；已完成報名者，適用報名當時之規則。未盡事宜，依中華民國相關法令辦理。
        </p>
      </Section>
    </LegalShell>
  );
}
