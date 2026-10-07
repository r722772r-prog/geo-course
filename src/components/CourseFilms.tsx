'use client';

import { useState } from 'react';

const films = [
  { slug: 'fashion-in-motion', title: '時尚穿搭變化', duration: '0:57', width: 606, height: 1080, description: '看服飾、人物與場景如何搭配，呈現不同造型與商品細節。' },
  { slug: 'future-delivery', title: '未來城市配送', duration: '0:42', width: 1920, height: 1080, description: '看商品如何融入故事場景，透過角色、光影與節奏建立品牌氛圍。' },
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
          {active === film.slug ? <video
            src={`${mediaBase}${film.slug}.mp4`} poster={`${mediaBase}${film.slug}.jpg`}
            controls autoPlay playsInline preload="none" width={film.width} height={film.height}
            aria-label={`${film.title}影片播放器`}
          >你的瀏覽器不支援影片播放。<a href={`${mediaBase}${film.slug}.mp4`}>開啟影片</a></video>
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
    <p className="note">以上為合作團隊提供的作品，供製作風格參考，非本課程學員成果或五天課程成品保證；畫面品牌不代表超直白行銷的直接合作客戶。</p>
  </section>;
}
