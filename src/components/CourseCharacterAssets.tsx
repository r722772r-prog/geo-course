export default function CourseCharacterAssets() {
  return <section id="character-assets" className="course-section" aria-labelledby="character-assets-title">
    <p className="eyebrow">CHARACTER ASSETS / 資產製作</p>
    <h2 id="character-assets-title">AI IP 角色設定：先有資產，角色才會每支都長一樣</h2>
    <p>角色設定稿是整個帳號的骨架：一張正面特寫，加上正面、側面、背面三視圖。Day 1 第二個單元做的就是這張，之後每支影片的角色一致性都靠它。</p>
    <figure className="asset-figure asset-sheets">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/course/ip-sheet-lili.webp" alt="AI 角色黎黎的設定稿：酒紅長捲髮正面特寫，加上紫色針織外套與碎花洋裝的正面、側面、背面三視圖" width="1400" height="560" loading="lazy" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/course/ip-sheet-bingqian.webp" alt="AI 角色餅乾的設定稿：棕色半馬尾正面特寫，加上白色上衣與黑色寬褲的正面、側面、背面三視圖" width="1400" height="700" loading="lazy" />
      <figcaption>超直白自己的 AI 角色資產（團隊示範，非學員成果）。</figcaption>
    </figure>
    <p className="note">角色設定好之後，就能讓不同角色同框、換場景（見頁首合照）。Day 2 第一個單元練的就是這件事。</p>
    <p className="note"><a href="https://chaozhibai.ai/insights/real-video-into-ai-scene">延伸閱讀：真人影片怎麼融進 AI 場景 →</a> · <a href="https://chaozhibai.ai/insights/higgsfield-motion-control-grandpa-dance">一張照片怎麼做跳舞影片 →</a></p>
  </section>;
}
