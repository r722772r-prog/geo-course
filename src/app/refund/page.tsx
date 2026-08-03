import type { Metadata } from "next";
import LegalShell, { Section } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "退費說明｜GEO 落地師培訓・超直白行銷",
  description:
    "GEO 落地師一日班退費規則：完成報名繳費後恕不退費；無法出席可於開課日前 3 天申請延期至下一場次（以一次為限）。若課程由主辦方取消，全額退費。",
};

export default function RefundPage() {
  return (
    <LegalShell title="退費說明" updated="2026 年 7 月 28 日">
      <Section heading="一、退費原則">
        <p>
          完成報名並繳費後，<span className="font-black text-[#AE445A]">恕不接受退費</span>。本課程為小班制實體課，名額於繳費後即為你保留；若確定無法出席，請改以下方「延期」方式處理。
        </p>
      </Section>

      <Section heading="二、無法出席：申請延期">
        <ul className="list-none p-0 space-y-3">
          <li className="flex gap-3">
            <span className="text-[#AE445A] font-black shrink-0">▸</span>
            <span>於<span className="font-black">開課日前 3 天（含）以前</span>透過官方 LINE 告知，可將名額<span className="font-black">延期至下一場次</span>，以<span className="font-black">一次</span>為限。</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#AE445A] font-black shrink-0">▸</span>
            <span>開課日前 3 天內或課程當日未出席，恕無法延期或退費，視同放棄名額。</span>
          </li>
        </ul>
      </Section>

      <Section heading="三、主辦方取消或變更">
        <p>
          若因不可抗力（天災、疫情、場地因素等）或報名人數不足，由超直白行銷取消課程，已報名學員可選擇<span className="font-black">全額退費</span>；若為日期變更，可選擇<span className="font-black">保留名額至新場次</span>或全額退費。
        </p>
      </Section>

      <Section heading="四、申請方式">
        <p>
          延期或主辦方取消之退費申請，請透過官方 LINE（<a href="https://lin.ee/v1T1Lwz" target="_blank" rel="noopener noreferrer" className="text-[#AE445A] underline">加入好友</a>）或來信 <a href="mailto:chaozhibai.ai@gmail.com" className="text-[#AE445A] underline">chaozhibai.ai@gmail.com</a>，註明報名姓名與場次。主辦方取消之退費以原付款方式退回，於 14 個工作天內完成。
        </p>
      </Section>

      <Section heading="五、其他">
        <p>
          本說明適用於「GEO 落地師一日班」實體課程。規則如有調整，將公告於本頁並註明更新日期；已完成報名者，適用報名當時之規則。未盡事宜，依中華民國相關法令辦理。
        </p>
      </Section>
    </LegalShell>
  );
}
