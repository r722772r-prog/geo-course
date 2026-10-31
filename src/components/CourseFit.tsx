import { getPricing, lineUrl } from "@/data/course";

export default function CourseFit() {
  const price = getPricing();
  return <section id="course-fit" className="course-section" aria-labelledby="course-fit-title">
    <h2 id="course-fit-title">這堂 AI IP 課，適合你現在的需求嗎？</h2>
    <p>超直白行銷的 AI IP 兩日班，適合不想露臉、想用一個 AI 角色經營帳號的人。兩天設計角色、開好帳號、做出第一支影片，並寫出第一份業配提案。</p>
    <dl className="course-fit-facts">
      <div><dt>學習目標</dt><dd>設計一個專屬 AI 角色、開一組 AI IP 帳號、做出第一支 15–30 秒影片，並寫出一頁提案。</dd></div>
      <div><dt>上課形式與時間</dt><dd>全程 Google Meet 線上直播，限 20 位。2026/12/12–12/13，每天 10:00–16:00，午休一小時；兩天教學共 10 小時。12/23 20:00–21:30 另有 1.5 小時線上回顧。</dd></div>
      <div><dt>學費與工具預算</dt><dd>首期學員價 NT${price.amount.toLocaleString("en-US")}，之後會調漲。工具積分另自購約 NT$1,500；學費加工具預估約 NT${(price.amount + 1500).toLocaleString("en-US")}，實際依練習量增減。</dd></div>
      <div><dt>要準備什麼</dt><dd>想好帳號要做什麼（自己的店、接案用、業配用），準備 3–5 個想做的題目。角色、三視圖與帳號都在課堂上做。</dd></div>
      <div><dt>零基礎怎麼開始</dt><dd>使用電腦跟著示範動手做，實作遇到問題可請老師與助教協助。</dd></div>
      <div><dt>課後帶走什麼</dt><dd>一個設定完整的角色與三視圖、一組開好的帳號、第一支影片、一頁提案；課後 30 天錄影回看與開到 12/28 的 LINE 群。回家做第二支，12/23 帶回來一起看。</dd></div>
      <div><dt>報名前先確認</dt><dd>這是自己動手做的技能課，不是帳號代營運。不保證紅、不保證接案；AI 角色內容需標示 AI 生成。</dd></div>
    </dl>
    <p className="note"><a href="#modules">查看兩天課綱</a> · <a href="#preparation">核對課前準備</a> · <a href="#fees">確認費用與報名</a> · <a href={lineUrl}>詢問是否適合自己的題目</a></p>
    <p className="note">需要團隊替你經營或製作？請查看超直白行銷官網的<a href="https://chaozhibai.ai/services/social">社群經營服務</a>與<a href="https://chaozhibai.ai/services/ai-video"> AI 行銷影片製作</a>。</p>
  </section>;
}
