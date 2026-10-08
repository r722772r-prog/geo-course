'use client';

import { useState } from 'react';

const films = [
  { slug: 'fashion-in-motion', title: '時尚穿搭變化', duration: '0:57', width: 606, height: 1080, description: '看服飾、人物與場景如何搭配，呈現不同造型與商品細節。' },
];
const mediaBase = 'https://chaozhibai.ai/portfolio-videos/';

export default function CourseFilms() {
  const [active, setActive] = useState<string | null>(null);
  return <section id="film-examples" className="course-section" aria-labelledby="film-examples-title">
    <p className="eyebrow">FILM REFERENCES / 影片風格參考</p>
    <h2 id="film-examples-title">看看商品與故事，能有哪些畫面</h2>
    <p>從服飾展示到品牌情境，先找找你喜歡的影片方向。</p>
    <div className="course-films">
      {films.map(film => <article key={film.slug} className="course-film-card">
        <div className="course-film-screen">
          {active === film.slug ? <video controlsList="nodownload"
            src={`${mediaBase}${film.slug}.mp4`} poster={`${mediaBase}${film.slug}.jpg`}
            controls autoPlay playsInline preload="none" width={film.width} height={film.height}
            aria-label={`${film.title}影片播放器`}
          >你的瀏覽器不支援影片播放。</video>
            : <button type="button" onClick={() => setActive(film.slug)} aria-label={`播放${film.title}，片長${film.duration}`}>
              {/* Preserve the original framing; external poster is already optimized. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${mediaBase}${film.slug}.jpg`} width={film.width} height={film.height} alt={`${film.title}封面`} loading="lazy" />
              <span className="course-film-play" aria-hidden="true">▶</span>
              <span className="course-film-duration">{film.duration}</span>
            </button>}
        </div>
        <div className="course-film-copy"><h3>{film.title}</h3><p>{film.description}</p></div>
      </article>)}
    </div><div className="practice-flow"><h3>從商品到影片，課堂這樣練習</h3><p>帶 3–5 張商品或服務照片，先決定影片要介紹什麼，再按下面四步製作。以下為實作流程示意，非學員成果。</p><ol><li><strong>腳本</strong><span>整理商品特色與影片想說的事</span></li><li><strong>分鏡</strong><span>安排每個畫面與故事順序</span></li><li><strong>素材</strong><span>生成角色、場景與影片畫面</span></li><li><strong>成片</strong><span>剪輯素材、節奏與字幕，完成 60 秒行銷影片</span></li></ol></div>
    <p style={{margin:"28px 0"}}><a className="cta" href="https://chaozhibai.ai/cases">查看更多影片與作品 →</a></p>
    <p className="note">以上為合作團隊提供的作品，供製作風格參考，非本課程學員成果或五天課程成品保證；畫面品牌不代表超直白行銷的直接合作客戶。</p>
  </section>;
}