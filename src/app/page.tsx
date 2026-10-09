import LessonPreview from "@/components/LessonPreview";
import ContentArt from "@/components/ContentArt";

import CourseNav from "@/components/CourseNav";
import type { Metadata } from "next";
import Image from "next/image";
import CourseFilms from "@/components/CourseFilms";
import { siteConfig } from "@/data/site";
import { audiences, courseTitle, days, faqs, getPricing, lineUrl, registrationUrl, refundRules } from "@/data/course";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: courseTitle, description: siteConfig.seo.description, alternates: { canonical: siteConfig.url } };
function Register({children = "立即報名", deposit = false}: {children?: React.ReactNode; deposit?: boolean}) { const href = new URL(registrationUrl); if (deposit) href.searchParams.set("plan", "deposit"); return <a className="cta" href={href.toString()}>{children}</a>; }
function Section({id, title, children}: {id?: string; title: string; children: React.ReactNode}) { return <section id={id} className="course-section"><div className="art-heading"><ContentArt kind={title.includes("費用")?"fee":title.includes("準備")?"laptop":title.includes("適合")?"people":title.includes("時間")?"social":title.includes("知道")?"message":"video"}/><h2>{title}</h2></div>{children}</section>; }
export default function CourseHome() {
  const price = getPricing();
  const schema = {"@context":"https://schema.org", "@type":"Course", name:courseTitle, description:siteConfig.seo.description, provider:{"@type":"Organization",name:"超直白行銷",url:"https://chaozhibai.ai"}, hasCourseInstance:{"@type":"CourseInstance",courseMode:"Onsite",courseWorkload:"PT22H",startDate:"2026-11-04T19:00:00+08:00",endDate:"2026-11-08T17:00:00+08:00",instructor:{"@type":"Person",name:"超直白 白白"},location:{"@type":"Place",name:"新北汐止"},offers:{"@type":"Offer",price:price.amount,priceCurrency:"TWD",url:registrationUrl}}};
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"FAQPage",mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))})}} />
    <CourseNav />
    <main>
      <section className="course-hero"><div className="hero-frame hero-frame-intro"><div className="hero-content"><p className="eyebrow">AI × STORY × MARKETING</p><p>2026/11/4–11/8・新北汐止・限 20 位</p><h1>AI 行銷影片實戰班<span><b className="hero-phrase">五天帶你做出</b><b className="hero-phrase">一支專屬行銷影片</b></span></h1><p className="hero-description">不用露臉、不用攝影機，五天做出一支幫你曝光獲客的 AI 行銷影片。</p><Register>立即報名五天實戰班 →</Register><a className="hero-more" href="#modules">查看課程內容 ↓</a><p className="registration-hint">前往超直白官方報名頁填表，再依指示付款。付款完成後，主辦於 1 個工作天內核對並寄出確認通知。</p></div></div></section>
      <section id="instructor" className="instructor"><div className="instructor-inner"><Image src="/instructor.png" alt="超直白行銷創辦人白白" width={683} height={911} className="portrait" /><div><p className="eyebrow">主講老師</p><h2>超直白 白白</h2><h3>用 AI 把影片變成生意的自媒體經營者</h3><p className="teacher-tags">超直白行銷創辦人｜店家代操與社群經營實戰｜全網 3 億自然流量、200 萬粉絲</p><p>從圖文到影音，累積 13 年跨平台自媒體經驗。2025 年開始幫店家與品牌把影片變成生意，投入短影音、AI 行銷影片、社群經營與店家代操。</p></div></div></section>
      <Section title="帶著你的商品，完成自己的影片"><div className="outcome"><strong>60<span>秒</span></strong><div><h3>一支專屬行銷影片</h3><p>以自己的商品或服務作為實作題目，五天逐步練習，週日完成作品並分享成果。每天學什麼、做出什麼，請看下方五天課綱。</p><a className="hero-more" href="#modules">查看五天圖解課綱 ↓</a></div></div></Section>
      <CourseFilms />
      <Section title="這堂課適合誰"><ol className="audiences">{audiences.map((text,i)=><li key={text}><ContentArt kind={["social","people","photo","script","laptop"][i]} small/><p>{text}</p></li>)}</ol></Section>
      <Section id="modules" title="五天完成你的影片"><LessonPreview/><div className="modules">{days.map(([date,title],i)=><article key={date}><span className="eyebrow">DAY 0{i+1} · {date}</span><h3>{title}</h3><p className="day-output"><strong>帶走：</strong>{["你的商品影片腳本","角色與場景設定","分鏡與生成素材","影片剪輯初稿","60 秒影片；週日 15:00 成果發表"][i]}</p></article>)}</div></Section>

      <Section title="上課時間與地點"><p>2026/11/4（三）–11/8（日）｜新北汐止｜五天共 22 小時</p><div className="table-scroll"><table><caption className="sr-only">五天上課及報到時間</caption><thead><tr><th>日期</th><th>報到</th><th>上課時間</th></tr></thead><tbody>{days.map(([date,,,checkin,time])=><tr key={date}><th>{date}</th><td>{checkin}</td><td>{time}</td></tr>)}</tbody></table></div><p className="note">週六日中午休息一小時；週日 15:00 起成果發表。詳細教室與交通資訊於學員通知提供。</p></Section>
      <Section title="課前準備"><div className="prep"><article><ContentArt kind="laptop"/><h3>每天帶筆電</h3><p>五天都是實作課，請攜帶可上網的筆電與充電器。</p></article><article><ContentArt kind="photo"/><h3>準備你的題目</h3><p>想好要做影片的商品或服務，準備 3–5 張相關照片。</p></article><article><ContentArt kind="fee"/><h3>預留工具費</h3><p>AI 工具積分自購約 NT$1,500，依個人練習量增減。工具清單與註冊教學於 10/27 前寄出，請於開課前完成註冊。</p></article></div></Section>
      <Section id="fees" title="費用與退費說明"><div className="pricing"><article><ContentArt kind="fee" small/><p>{price.early?"早鳥全款 · 10/15 止":"課程全款"}</p><h3>NT${price.amount.toLocaleString("en-US")}</h3>{price.early&&<p>原價 NT$19,800，2026/10/15 前繳清。</p>}<p>工具積分另計，退款規則見下表。</p><Register /></article>{price.early&&<article><ContentArt kind="fee" small/><p>先付訂金 · 10/15 止</p><h3>總額 NT$16,800</h3><p className="deposit-first">先付 NT$5,000</p><p>訂金抵 NT$8,000；尾款 NT$11,800 於 2026/10/25 前補繳，實付總額 NT$16,800。</p><p>工具積分另計，退款規則見下表。</p><Register deposit>前往報名，選擇訂金</Register></article>}</div><p className="registration-hint">按鈕將前往超直白官方報名表，請在表內選擇付款方案；填表後再依指示付款。</p><div className="table-scroll"><table><thead><tr><th>申請時間</th><th>退費方式</th></tr></thead><tbody>{refundRules.map(([date,rule])=><tr key={date}><th>{date}</th><td>{rule}</td></tr>)}</tbody></table></div><p className="note">早鳥全款、訂金與訂金補足尾款均適用，以實際已付金額計算。<a href="/refund">查看完整退費說明 →</a></p></Section>
      <Section id="faq" title="報名前，你可能想知道"><div className="faqs">{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div><p className="note"><a href="/refund">退費說明</a>・<a href={lineUrl}>加入官方 LINE 詢問</a></p></Section>
      <section id="registration" className="final-cta"><p className="eyebrow">從你的商品開始</p><h2>下一支行銷影片，由你完成。</h2><p>11/4–11/8｜新北汐止｜限 20 位</p><p>{price.label}</p><Register>前往報名表 →</Register><p className="note">填表 → 依連結付款 → 付款完成後 1 個工作天內核對並寄出確認通知</p></section>
    </main>
    <footer className="course-footer"><a href="https://chaozhibai.ai">超直白行銷｜公司官網 →</a><nav aria-label="網站政策"><a href="/refund">退費說明</a><a href="/privacy">隱私權政策</a><a href="/terms">服務條款</a></nav><a href="mailto:chaozhibai.ai@gmail.com">chaozhibai.ai@gmail.com</a><p>{siteConfig.footer.copyright}</p></footer>
  </>;
}



