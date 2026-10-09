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
      <section className="course-hero"><div className="hero-frame hero-frame-intro"><div className="hero-content"><p className="eyebrow">AI × STORY × MARKETING</p><p>2026/11/4–11/8・新北汐止・限 20 位</p><h1>AI 行銷影片實戰班<span><b className="hero-phrase">五天帶你做出</b><b className="hero-phrase">一支專屬行銷影片</b></span></h1><p className="hero-description">給有商品或服務、想自己做影片的你。從腳本到剪輯，練習用 AI 把特色說清楚，不必本人露臉。</p><a className="cta" href="#modules">查看五天課綱 ↓</a><p className="registration-hint">零拍攝、剪輯基礎可參加｜自備筆電｜課程有助教協助</p></div></div></section>
      <section id="instructor" className="instructor"><div className="instructor-inner"><Image src="/instructor.png" alt="超直白行銷創辦人白白" width={683} height={911} className="portrait" /><div><p className="eyebrow">主講老師</p><h2>超直白 白白</h2><h3>從內容經營經驗出發，教你把商品說清楚</h3><p className="teacher-tags">超直白行銷創辦人｜店家代操與社群經營實戰｜全網 3 億自然流量、200 萬粉絲</p><p>從圖文到影音，累積 13 年跨平台自媒體經驗。2025 年開始幫店家與品牌把影片變成生意，投入短影音、AI 行銷影片、社群經營與店家代操。</p></div></div></section>
      <Section title="帶著你的商品，完成自己的影片"><div className="outcome"><strong>60<span>秒</span></strong><div><h3>一支專屬行銷影片</h3><p>以你的商品或服務為題目，五天逐步完成一支 60 秒行銷影片，也練習下一支影片可以沿用的製作方法。</p></div></div></Section>
      <CourseFilms />
      <Section title="這堂課適合誰"><p>最適合已有商品或服務，希望自己製作介紹影片的店家與品牌經營者；以下需求也可以一起練習。</p><ol className="audiences">{audiences.map((text,i)=><li key={text}><ContentArt kind={["social","people","photo","script","laptop"][i]} small/><p>{text}</p></li>)}</ol></Section>
      <Section id="modules" title="五天完成你的影片"><LessonPreview/><div className="modules">{days.map(([date,title,description],i)=><article key={date}><span className="eyebrow">DAY 0{i+1} · {date}</span><h3>{title}</h3><p className="lesson-description">{description}</p></article>)}</div></Section>

      <Section title="上課時間與地點"><p>2026/11/4（三）–11/8（日）｜新北汐止｜五天共 22 小時</p><div className="table-scroll"><table><caption className="sr-only">五天上課及報到時間</caption><thead><tr><th>日期</th><th>報到</th><th>上課時間</th></tr></thead><tbody>{days.map(([date,,,checkin,time])=><tr key={date}><th>{date}</th><td>{checkin}</td><td>{time}</td></tr>)}</tbody></table></div><p className="note">週六日中午休息一小時；週日 15:00 起成果發表。詳細教室與交通資訊於學員通知提供。</p></Section>
      <Section title="課前準備"><div className="prep"><article><ContentArt kind="laptop"/><h3>每天帶筆電</h3><p>五天都是實作課，請攜帶可上網的筆電與充電器。</p></article><article><ContentArt kind="photo"/><h3>準備你的題目</h3><p>想好要做影片的商品或服務，準備 3–5 張相關照片。</p></article><article><ContentArt kind="fee"/><h3>預留工具費</h3><p>AI 工具積分自購約 NT$1,500，依個人練習量增減。工具清單與註冊教學於 10/27 前寄出，請於開課前完成註冊。</p></article></div></Section>
      <Section id="fees" title="費用與退費說明"><div id="registration" className="pricing"><article><ContentArt kind="fee" small/><p>{price.early?"早鳥全款 · 10/15 止":"課程全款"}</p><h3>NT${price.amount.toLocaleString("en-US")}</h3>{price.early&&<p>原價 NT$19,800，2026/10/15 前繳清。</p>}<p>工具積分另計，退款規則見下表。</p><Register>選擇全款報名 →</Register></article>{price.early&&<article><ContentArt kind="fee" small/><p>先付訂金 · 10/15 止</p><h3>合計 NT$16,800</h3><p className="deposit-first">先付 NT$5,000</p><p>10/25 前付尾款 NT$11,800</p><p className="note">比早鳥全款多 NT$2,000。訂金 NT$5,000 可抵原價 NT$8,000。</p><p>工具積分另計，退款規則見下表。</p><Register deposit>前往報名，選擇訂金</Register></article>}</div><p className="registration-hint">選擇方案 → 填寫報名表 → 依連結付款。付款完成後，主辦於 1 個工作天內核對並寄出確認通知。</p><div className="table-scroll"><table><thead><tr><th>申請時間</th><th>退費方式</th></tr></thead><tbody>{refundRules.map(([date,rule])=><tr key={date}><th>{date}</th><td>{rule}</td></tr>)}</tbody></table></div><p className="note">早鳥全款、訂金與訂金補足尾款均適用，以實際已付金額計算。<a href="/refund">查看完整退費說明 →</a></p></Section>
      <Section id="faq" title="報名前，你可能想知道"><div className="faqs">{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div><p className="note"><a href={lineUrl}>還有問題？加入官方 LINE 詢問</a></p></Section>

    </main>
    <footer className="course-footer"><a href="https://chaozhibai.ai">超直白行銷｜公司官網 →</a><nav aria-label="網站政策"><a href="/refund">退費說明</a><a href="/privacy">隱私權政策</a><a href="/terms">服務條款</a></nav><a href="mailto:chaozhibai.ai@gmail.com">chaozhibai.ai@gmail.com</a><p>{siteConfig.footer.copyright}</p></footer>
  </>;
}



