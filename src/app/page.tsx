import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import CourseFilms from "@/components/CourseFilms";
import { siteConfig } from "@/data/site";
import { audiences, courseTitle, days, faqs, getPricing, lineUrl, registrationUrl, refundRules } from "@/data/course";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: courseTitle, description: siteConfig.seo.description, alternates: { canonical: siteConfig.url } };
function Register({children = "立即報名"}: {children?: React.ReactNode}) { return <a className="cta" href={registrationUrl}>{children}</a>; }
function Section({id, title, children}: {id?: string; title: string; children: React.ReactNode}) { return <section id={id} className="course-section"><h2>{title}</h2>{children}</section>; }
export default function CourseHome() {
  const price = getPricing();
  const schema = {"@context":"https://schema.org", "@type":"Course", name:courseTitle, description:siteConfig.seo.description, provider:{"@type":"Organization",name:"超直白行銷",url:"https://chaozhibai.ai"}, hasCourseInstance:{"@type":"CourseInstance",courseMode:"Onsite",courseWorkload:"PT22H",startDate:"2026-11-04T19:00:00+08:00",endDate:"2026-11-08T17:00:00+08:00",instructor:{"@type":"Person",name:"超直白 白白"},location:{"@type":"Place",name:"新北汐止"},offers:{"@type":"Offer",price:price.amount,priceCurrency:"TWD",url:registrationUrl}}};
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"FAQPage",mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))})}} />
    <header className="course-nav"><Link href="/" className="brand">超直白行銷</Link><nav aria-label="課程內容導覽"><a href="#film-examples">影片參考</a><a href="#modules">五天課綱</a><a href="#fees">費用</a><a href="#faq">FAQ</a></nav><Register /></header>
    <main>
      <section className="course-hero"><div className="hero-frame"><div className="hero-content"><p className="eyebrow">AI × STORY × MARKETING</p><p>2026/11/4–11/8・新北汐止・限 20 位</p><h1>AI 行銷影片實戰班<span>五天帶你做出一支專屬行銷影片</span></h1><p className="hero-description">不用露臉、不用攝影機，五天做出一支幫你曝光獲客的 AI 行銷影片。</p><p className="hero-price">{price.label}</p><Register>立即報名五天實戰班 →</Register><a className="hero-more" href="#modules">查看課程內容 ↓</a></div><figure className="hero-teacher"><Image src="/instructor.png" alt="主講老師超直白白白" width={683} height={911} priority/><figcaption>主講老師｜超直白 白白</figcaption></figure></div></section>
      <Section title="把你的產品與故事，做成一支影片">
        <div className="intro-copy"><p>AI影片讓你眼花撩亂嗎？想要不露臉也能經營自媒體，想幫你的產品、你的事業做行銷嗎？</p><p>很多人不缺產品、不缺故事，缺的是把它們變成一支好影片的方法。我從一個完全不會AI影像製作的新手，到學會 AI 影片製作，花了 30 萬、720 小時，鑽研了一個月的 AI 影片工作流。</p><p>這堂課，就是把我學到的敘事方法和製作流程，整理成最簡單、你也能用在生意上的實作課。不用先搞懂一大堆 AI 工具，你就是自己的行銷廣告公司。</p></div>
      </Section>
      <Section title="帶著題目來，帶著自己的作品回去"><div className="outcome"><strong>60<span>秒</span></strong><div><h3>一支專屬行銷影片</h3><p>從選題、腳本、角色與畫面生成到剪輯成片，以你的商品或服務作為實作題目，週日完成作品並分享成果。</p></div></div></Section>
      <CourseFilms />
      <Section title="這堂課適合誰"><ol className="audiences">{audiences.map((text,i)=><li key={text}><span className="number">0{i+1}</span><p>{text}</p></li>)}</ol></Section>
      <Section id="modules" title="五天，一步一步完成影片"><div className="modules">{days.map(([date,title,body],i)=><article key={date}><span className="eyebrow">DAY 0{i+1} · {date}</span><h3>{title}</h3><p>{body}</p><p className="day-output"><strong>當日實作：</strong>{["你的商品影片腳本","角色與場景設定","分鏡與生成素材","影片剪輯初稿","60 秒專屬行銷影片與成果分享"][i]}</p></article>)}</div></Section>
      <section id="instructor" className="instructor"><div className="instructor-inner"><Image src="/instructor.png" alt="超直白行銷創辦人白白" width={683} height={911} className="portrait" /><div><p className="eyebrow">主講老師</p><h2>超直白 白白</h2><h3>用 AI 把影片變成生意的自媒體經營者</h3><p className="teacher-tags">超直白行銷創辦人｜店家代操與社群經營實戰｜全網 3 億自然流量、200 萬粉絲</p><p>從圖文到影音，累積 13 年跨平台自媒體經驗。2025 年開始幫店家與品牌把影片變成生意，投入短影音、AI 行銷影片、社群經營與店家代操。</p></div></div></section>
      <Section title="上課時間與地點"><p>2026/11/4（三）–11/8（日）｜新北汐止｜五天共 22 小時</p><div className="table-scroll"><table><caption className="sr-only">五天上課及報到時間</caption><thead><tr><th>日期</th><th>報到</th><th>上課時間</th></tr></thead><tbody>{days.map(([date,,,checkin,time])=><tr key={date}><th>{date}</th><td>{checkin}</td><td>{time}</td></tr>)}</tbody></table></div><p className="note">週六日中午休息一小時；週日 15:00 起成果發表。詳細教室與交通資訊於學員通知提供。</p></Section>
      <Section title="課前準備"><div className="prep"><article><h3>每天帶筆電</h3><p>五天都是實作課，請攜帶可上網的筆電與充電器。</p></article><article><h3>準備你的題目</h3><p>想好要做影片的商品或服務，準備 3–5 張相關照片。</p></article><article><h3>預留工具費</h3><p>AI 工具積分自購約 NT$1,500，依個人練習量增減。工具清單與註冊教學於 10/27 前寄出，請於開課前完成註冊。</p></article></div></Section>
      <Section id="fees" title="費用與退費說明"><div className="pricing"><article><p>{price.early?"早鳥全款 · 10/15 止":"課程全款"}</p><h3>NT${price.amount.toLocaleString("en-US")}</h3>{price.early&&<p>原價 NT$19,800，2026/10/15 前繳清。</p>}<p>工具積分另計，退款規則見下表。</p><Register /></article>{price.early&&<article><p>先付訂金 · 10/15 止</p><h3>總額 NT$16,800</h3><p className="deposit-first">先付 NT$5,000</p><p>訂金抵 NT$8,000；尾款 NT$11,800 於 2026/10/25 前補繳，實付總額 NT$16,800。</p><p>工具積分另計，退款規則見下表。</p><Register>選擇訂金方案</Register></article>}</div><div className="table-scroll"><table><thead><tr><th>申請時間</th><th>退費方式</th></tr></thead><tbody>{refundRules.map(([date,rule])=><tr key={date}><th>{date}</th><td>{rule}</td></tr>)}</tbody></table></div><p className="note">早鳥全款、訂金與訂金補足尾款均適用，以實際已付金額計算。<a href="/refund">查看完整退費說明 →</a></p></Section>
      <Section id="faq" title="報名前，你可能想知道"><div className="faqs">{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div><p className="note"><a href="/refund">退費說明</a>・<a href={lineUrl}>加入官方 LINE 詢問</a></p></Section>
      <section id="registration" className="final-cta"><p className="eyebrow">從你的商品開始</p><h2>下一支行銷影片，由你完成。</h2><p>11/4–11/8｜新北汐止｜限 20 位</p><p>{price.label}</p><Register>前往報名表 →</Register><p className="note">填表 → 依連結付款 → 主辦核對後寄出確認通知</p></section>
    </main><nav className="mobile-register" aria-label="快速報名"><a href={lineUrl}>詢問課程</a><Register>立即報名</Register></nav>
    <footer className="course-footer"><a href="https://chaozhibai.ai">超直白行銷｜公司官網 →</a><nav aria-label="網站政策"><a href="/refund">退費說明</a><a href="/privacy">隱私權政策</a><a href="/terms">服務條款</a></nav><a href="mailto:chaozhibai.ai@gmail.com">chaozhibai.ai@gmail.com</a><p>{siteConfig.footer.copyright}</p></footer>
  </>;
}

