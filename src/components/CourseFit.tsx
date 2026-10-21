import { lineUrl } from "@/data/course";

export default function CourseFit() {
  return <section id="course-fit" className="course-section" aria-labelledby="course-fit-title">
    <h2 id="course-fit-title">這堂 AI 影片課，適合你現在的需求嗎？</h2>
    <p>超直白行銷的 AI 行銷影片實戰班，適合已有商品或服務、想自己做影片的店家。採兩天線上直播實作，從選題、腳本到 AI 畫面生成與剪輯，另安排一晚作品回顧。</p>
    <dl className="course-fit-facts">
      <div><dt>學習目標</dt><dd>以自己的商品或服務，練習完成一支 60 秒行銷影片。</dd></div>
      <div><dt>素材怎麼用</dt><dd>準備商品照、真人開場片段與人物三視圖；以真實商品素材結合 AI 劇情與轉場。</dd></div>
      <div><dt>零基礎怎麼開始</dt><dd>使用電腦跟著示範動手做，實作遇到問題可請老師與助教協助。</dd></div>
      <div><dt>報名前先確認</dt><dd>這是自己動手做的技能課，不是影片代製。課堂不教換產品工具或廣告版型；不便出鏡時先向主辦確認練習方式。</dd></div>
    </dl>
    <p className="note"><a href="#modules">查看兩天課綱</a> · <a href="#preparation">核對課前準備</a> · <a href="#fees">確認費用與報名</a> · <a href={lineUrl}>詢問是否適合自己的題目</a></p>
    <p className="note">需要團隊替你製作成品？請查看超直白行銷官網的<a href="https://chaozhibai.ai/services/ai-video"> AI 行銷影片製作服務</a>。</p>
  </section>;
}
