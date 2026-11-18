'use client';

import { useState } from 'react';

// 超直白團隊做出來的成品，檔案放在公司官網。學員看的是「學完會做的東西長什麼樣」。
const site = 'https://chaozhibai.ai';
const films = [
  { slug: 'daily-1', base: '/home/', kind: 'AI 角色帳號短片', title: '我只是臉臭 我沒有生氣', duration: '0:33', description: '四個固定角色、一個酒吧場景。兩天課堂上做的，就是這種角色短片的第一支。', wide: false },
  { slug: 'ad-hair', base: '/home/', kind: '商品廣告', title: '吹風機｜商品廣告', duration: '0:31', description: '從使用情境帶到商品特色。接案最常遇到的類型。', wide: false },
  { slug: 'fashion-in-motion', base: '/portfolio-videos/', kind: '形象短片', title: '服飾動態｜直式影像', duration: '0:57', description: '人物、穿搭與場景的搭配，適合服飾和品牌形象。', wide: false },
  { slug: 'ad-fabric', base: '/home/', kind: '商品廣告', title: '織物清洗機｜商品廣告', duration: '0:31', description: '從髒污、清洗過程到配件，一支講完商品特色。', wide: false },
  { slug: 'dr-city', base: '/home/', kind: 'AI 短劇', title: '都會愛情短劇', duration: '2:01', description: '同一套角色、腳本、分鏡的做法，拉長成兩分鐘的劇情。這是進階的做法，兩天課不會做到這麼長。', wide: true },
];

export default function CourseFilms() {
  const [active, setActive] = useState<string | null>(null);
  return <section id="works" className="course-section" aria-labelledby="works-title">
    <p className="eyebrow">WORKS / 團隊作品</p>
    <h2 id="works-title">學完，你會做的就是這種影片</h2>
    <p>下面都是超直白團隊做出來的成品，畫面全部由 AI 生成。兩天課堂教的是第一支這種角色短片；商品廣告、形象短片和短劇，用的是同一套角色、腳本、分鏡的做法。</p>
    <div className="course-films course-films-vertical">
      {films.map(film => <article key={film.slug} className={film.wide ? "course-film-card course-film-wide" : "course-film-card"}>
        <div className="course-film-screen">
          {active === film.slug ? <video controlsList="nodownload"
            src={`${site}${film.base}${film.slug}.mp4`} poster={`${site}${film.base}${film.slug}.jpg`}
            controls autoPlay playsInline preload="none"
            aria-label={`${film.title}影片播放器`}
          >你的瀏覽器不支援影片播放。</video>
            : <button type="button" onClick={() => setActive(film.slug)} aria-label={`播放${film.title}，片長${film.duration}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${site}${film.base}${film.slug}.jpg`} alt={`${film.title}封面`} loading="lazy" />
              <span className="course-film-play" aria-hidden="true">▶</span>
              <span className="course-film-duration">{film.duration}</span>
            </button>}
        </div>
        <div className="course-film-copy"><p className="course-film-kind">{film.kind}</p><h3>{film.title}</h3><p>{film.description}</p></div>
      </article>)}
    </div>
    <p className="note">這些是團隊作品，不是學員作品。兩天課堂上做的是你的第一支；要做到這個程度，靠的是後面持續做。<a href="https://chaozhibai.ai/#works">看更多作品 →</a></p>
  </section>;
}
