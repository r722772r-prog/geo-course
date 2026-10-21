export default function CourseProductionExample() {
  return <section id="production-example" className="course-section" aria-labelledby="production-example-title">
    <p className="eyebrow">PRODUCTION NOTES / 製作紀錄</p>
    <h2 id="production-example-title">從飲品製作紀錄，看懂素材怎麼接成影片</h2>
    <p>先想清楚每個鏡頭要說什麼，再決定哪些素材自己拍、哪些畫面交給 AI。以下沿用團隊已公開的飲品製作紀錄，幫你認識分鏡與補鏡的安排。</p>
    <figure className="production-example-figure">
      {/* Existing published reference image; preserve its complete six-shot framing. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="https://chaozhibai.ai/article-covers/drink-six-shots.png" alt="飲品案例六個鏡頭：開瓶、桌面倒入、俯拍、杯內加冰、加入汽水與喝一口。" loading="lazy" />
      <figcaption>團隊既有示範紀錄，非學員成果。圖片上的秒數是截圖時間，不是各鏡頭長度；本案例用於理解製作流程，不代表兩天課程必然完成的效果。</figcaption>
    </figure>
    <ol className="production-example-steps">
      <li><h3>先列分鏡</h3><p>把開瓶、倒入、加冰與喝一口拆開，確認每個鏡頭需要的素材。課堂商品畫面用手機真拍，保留外觀與細節。</p></li>
      <li><h3>AI 片段分開測試</h3><p>既有紀錄先測主片，再另外處理杯內冰塊補鏡。課堂把這種分工用在劇情、轉場與特效，逐段檢查生成結果。</p></li>
      <li><h3>剪輯再核對</h3><p>把選好的片段接起來，檢查前後動作與商品資訊。原案例的完整流程及補鏡紀錄，可在下方文章查看。</p></li>
    </ol>
    <p className="note"><a href="https://chaozhibai.ai/insights/higgsfield-drink-multicam">查看飲品六鏡頭與補鏡紀錄 →</a> · <a href="https://chaozhibai.ai/insights/real-product-ai-story-assets">看商品真拍與 AI 劇情如何分工 →</a></p>
  </section>;
}
