import { getPricing, lineUrl } from "@/data/course";

export default function CourseFit() {
  const price = getPricing();
  return <section id="course-fit" className="course-section" aria-labelledby="course-fit-title">
    <h2 id="course-fit-title">這堂 AI 影片課，適合你現在的需求嗎？</h2>
    <p>超直白行銷的 AI 行銷影片實戰班，適合已有商品或服務、想自己做影片的店家。商品用手機真拍，AI 負責劇情、轉場與特效；從選題、腳本到剪輯，練習把商品特色說清楚。</p>
    <dl className="course-fit-facts">
      <div><dt>學習目標</dt><dd>以自己的商品或服務，練習完成一支 60 秒行銷影片。</dd></div>
      <div><dt>上課形式與時間</dt><dd>全程 Google Meet 線上直播，限 20 位。2026/12/12–12/13，每天 10:00–16:00，午休一小時；兩天教學共 10 小時。12/23 20:00–21:30 另有 1.5 小時作品回顧。</dd></div>
      <div><dt>學費與工具預算</dt><dd>首期學員價 NT${price.amount.toLocaleString("en-US")}，之後會調漲。工具積分另自購約 NT$1,500；學費加工具預估約 NT${(price.amount + 1500).toLocaleString("en-US")}，實際依練習量增減。</dd></div>
      <div><dt>素材怎麼用</dt><dd>準備商品照、真人開場片段與人物三視圖；以真實商品素材結合 AI 劇情與轉場。</dd></div>
      <div><dt>零基礎怎麼開始</dt><dd>使用電腦跟著示範動手做，實作遇到問題可請老師與助教協助。</dd></div>
      <div><dt>課後帶走什麼</dt><dd>自己的商品影片、一套可重複使用的分鏡模板、課後 30 天錄影回看與開到 12/28 的 LINE 群。回家再做一支作業，12/23 帶回來修改。</dd></div>
      <div><dt>報名前先確認</dt><dd>這是自己動手做的技能課，不是影片代製。課堂不教換產品工具或廣告版型；不便出鏡時先向主辦確認練習方式。</dd></div>
    </dl>
    <p className="note"><a href="#modules">查看兩天課綱</a> · <a href="#preparation">核對課前準備</a> · <a href="#fees">確認費用與報名</a> · <a href={lineUrl}>詢問是否適合自己的題目</a></p>
    <p className="note">需要團隊替你製作成品？請查看超直白行銷官網的<a href="https://chaozhibai.ai/services/ai-video"> AI 行銷影片製作服務</a>。</p>
  </section>;
}
