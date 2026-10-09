'use client';

import { useState } from 'react';

const films = [
  { slug: 'fashion-in-motion', title: '時尚穿搭變化', duration: '0:57', width: 606, height: 1080, description: '看服飾、人物與場景如何搭配，呈現不同造型與商品細節。' },
];
const mediaBase = 'https://chaozhibai.ai/portfolio-videos/';

export default function CourseFilms() {
  const [active, setActive] = useState<string | null>(null);
  return <section id="film-examples" className="course-section" aria-labelledby="film-examples-title">
    <p className="eyebrow">TEAM WORK / 團隊作品</p>
    <h2 id="film-examples-title">從團隊作品，認識影像的可能</h2>
    <p>看作品時，先留意三件事：商品特色是否清楚、使用情境是否容易理解、畫面是否符合品牌。將這些觀察帶進自己的課堂題目。</p>
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
    </div>
    <p style={{margin:"28px 0"}}><a className="cta" href="https://chaozhibai.ai/cases">查看更多影片與作品 →</a></p>
    <p className="note">團隊作品・風格參考。課堂將從商品照片與腳本逐步練習；此影片非學員成果，亦非五天課程成品保證。畫面品牌不代表課程主辦的委託客戶。</p>
  </section>;
}
