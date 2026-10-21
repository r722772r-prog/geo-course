import "./taste-refinement.css";

import ContentArt from "@/components/ContentArt";

import CourseFit from "@/components/CourseFit";
import { learningGuides } from "@/data/learning-guides";
import CourseNav from "@/components/CourseNav";
import type { Metadata } from "next";
import Image from "next/image";
import CourseFilms from "@/components/CourseFilms";
import CourseProductionExample from "@/components/CourseProductionExample";
import { siteConfig } from "@/data/site";
import { audiences, courseTitle, days, faqs, getPricing, lineUrl, registrationUrl, refundRules } from "@/data/course";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: courseTitle, description: siteConfig.seo.description, alternates: { canonical: siteConfig.url } };
function Register({children = "立即報名"}: {children?: React.ReactNode}) { return <a className="cta" href={registrationUrl}>{children}</a>; }
function Section({id, title, children}: {id?: string; title: string; children: React.ReactNode}) { return <section id={id} className="course-section"><div className="art-heading"><ContentArt kind={title.includes("費用")?"fee":title.includes("準備")?"laptop":title.includes("適合")?"people":title.includes("時間")?"social":title.includes("知道")?"message":"video"}/><h2>{title}</h2></div>{children}</section>; }
export default function CourseHome() {
  const price = getPricing();
  const schema = {"@context":"https://schema.org", "@type":"Course", "@id":`${siteConfig.url}/#course`, url:siteConfig.url, inLanguage:"zh-TW", educationalLevel:"零拍攝與剪輯基礎可參加", teaches:["商品選題與腳本","分鏡與 AI 畫面生成","商品真拍結合 AI 劇情、轉場與特效","剪輯成片與作品回顧"], audience:{"@type":"Audience",audienceType:"已有商品或服務、希望自己製作影片的店家與品牌經營者"}, name:courseTitle, description:siteConfig.seo.description, provider:{"@type":"Organization","@id":"https://chaozhibai.ai/#organization",name:"超直白行銷",url:"https://chaozhibai.ai"}, hasCourseInstance:{"@type":"CourseInstance",courseMode:"Online",courseWorkload:"PT11H30M",startDate:"2026-12-12T10:00:00+08:00",endDate:"2026-12-23T21:30:00+08:00",instructor:{"@type":"Person","@id":"https://chaozhibai.ai/about#baibai",name:"白白",alternateName:"超直白 白白",url:"https://chaozhibai.ai/about"},location:{"@type":"VirtualLocation",url:"https://course.chaozhibai.ai"},offers:{"@type":"Offer",price:price.amount,priceCurrency:"TWD",url:registrationUrl}}};
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"WebSite","@id":`${siteConfig.url}/#website`,url:siteConfig.url,name:siteConfig.name,description:siteConfig.seo.description,inLanguage:siteConfig.lang,publisher:{"@type":"Organization",name:"超直白行銷",url:"https://chaozhibai.ai"}}).replace(/</g,"\\u003c")}} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"FAQPage",mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))})}} />
    <CourseNav />
    <main>
      <section className="course-hero"><div className="hero-frame hero-frame-intro"><div className="hero-content"><p className="eyebrow">AI × STORY × MARKETING</p><p>2026/12/12–12/13・全程線上・限 20 位</p><h1>AI 行銷影片實戰班<span><b className="hero-phrase">兩天做出一支</b><b className="hero-phrase">你自己的 AI 行銷影片</b></span></h1><p className="hero-description">你不用變網紅，你只要讓你賣的東西被看到。給有商品或服務、想自己做影片的你。週末兩天線上直播，從腳本到剪輯，商品用手機真拍，AI 負責劇情、轉場與特效；12/23 晚上線上回顧，帶作業回來改。</p><a className="cta" href="#modules">查看兩天課綱 ↓</a><p className="registration-hint">零拍攝、剪輯基礎可參加｜用電腦上課，不用出門｜課程有助教協助</p></div></div></section>
      <CourseFit />
      <section id="instructor" className="instructor"><div className="instructor-inner"><Image src="/instructor.png" alt="超直白行銷創辦人白白" width={683} height={911} className="portrait" /><div><p className="eyebrow">主講老師</p><h2>超直白 白白</h2><h3>從內容經營經驗出發，教你把商品說清楚</h3><p className="teacher-tags">超直白行銷創辦人｜店家代操與社群經營實戰｜全平台累計 200 萬追蹤</p><p>從圖文到影音，累積 13 年跨平台自媒體經驗。2025 年開始幫店家與品牌把影片變成生意，投入短影音、AI 行銷影片、社群經營與店家代操。<a href="https://chaozhibai.ai/about">查看講師與超直白行銷介紹 →</a></p></div></div></section>
      <Section title="帶著你的商品，完成自己的影片"><div className="outcome"><strong>60<span>秒</span></strong><div><h3>一支專屬行銷影片</h3><p>以你的商品或服務為題目，兩天完成一支 60 秒行銷影片，回家再做一支作業，12/23 線上回顧一起改，練會下一支影片可以沿用的製作方法。</p><p className="outcome-support">實作遇到問題，可請老師與助教協助。從腳本、畫面到剪輯，帶著自己的題目逐步練習。</p></div></div></Section>
      <CourseProductionExample />
      <CourseFilms />
      <Section title="這堂課適合誰"><p>最適合已有商品或服務，希望自己製作介紹影片的店家與品牌經營者；以下需求也可以一起練習。</p><ol className="audiences">{audiences.map((text,i)=><li key={text}><ContentArt kind={["social","people","photo","script","laptop"][i]} small/><p>{text}</p></li>)}</ol></Section>
      <Section id="modules" title="兩天完成你的影片，一晚線上回顧"><div className="modules">{days.map(([date,title,description],i)=><article key={date}><span className="eyebrow">DAY 0{i+1} · {date}</span><h3>{title}</h3><p className="lesson-description">{description}</p></article>)}</div></Section>

      <Section title="上課時間與方式"><p>2026/12/12（六）–12/13（日）線上直播｜兩天教學 10 小時（不含午休）；12/23（三）線上回顧 1.5 小時</p><div className="table-scroll"><table><caption className="sr-only">上課及報到時間</caption><thead><tr><th>日期</th><th>報到</th><th>上課時間</th></tr></thead><tbody>{days.map(([date,,,checkin,time])=><tr key={date}><th>{date}</th><td>{checkin}</td><td>{time}</td></tr>)}</tbody></table></div><p className="note">每天五個單元；每單元示範 15 分鐘、實作 40 分鐘，最後抽 3 人展示半成品並點評 5 分鐘；中午休息一小時；週日 14:30 起成果發表。全程使用 Google Meet，連結於學員通知提供；全程錄影，課後可重看 30 天；課後 LINE 群開到 12/28。</p></Section>
      <Section id="preparation" title="課前準備"><div className="prep"><article><ContentArt kind="laptop"/><h3>準備一台電腦</h3><p>筆電或桌機皆可，需能上網、有鏡頭與麥克風；手機不適合操作。12/10（四）晚上有 30 分鐘課前檢查會，確認工具都能用。</p></article><article><ContentArt kind="photo"/><h3>準備你的題目</h3><p>想好要做影片的商品或服務，準備商品照 10 張、真人開場片段及人物三視圖。課前包會提供三視圖製作教學。</p></article><article><ContentArt kind="fee"/><h3>預留工具費</h3><p>AI 工具積分自購約 NT$1,500，依個人練習量增減。工具清單與註冊教學於 12/6 前寄出，請於開課前完成註冊。</p></article></div></Section>
      <Section id="fees" title="費用與退費說明"><div id="registration" className="pricing"><article><ContentArt kind="fee" small/><p>{"首期學員價"}</p><h3>NT${price.amount.toLocaleString("en-US")}</h3><p>之後會調漲。含兩天線上直播課、12/23 線上回顧、課後 LINE 群與 30 天錄影回看。首期學員第二期可免費複訓一次，以旁聽為主、限一次，不佔第二期作品點評名額。</p><p>工具積分另自購約 NT$1,500，退款規則見下表。</p><Register>{`全額 ${price.amount.toLocaleString("en-US")} 元報名 →`}</Register></article></div><p className="registration-hint">{`全額 NT$${price.amount.toLocaleString("en-US")} → 填寫報名表 → 使用完成頁的藍新連結付款。請於 12/11 23:59 前完成付款，付款頁填寫相同姓名與手機；由主辦核對後提供確認通知。`}</p><div className="table-scroll"><table><thead><tr><th>申請時間</th><th>退費方式</th></tr></thead><tbody>{refundRules.map(([date,rule])=><tr key={date}><th>{date}</th><td>{rule}</td></tr>)}</tbody></table></div><p className="note">本期以全額報名；退費以實際已付金額計算。<a href="/refund">查看完整退費說明 →</a></p></Section>
      <Section id="learning-guides" title="報名前，先看懂製作方法"><p>依照你的問題選一篇先讀，再回本頁對照課綱與準備事項。以下為超直白行銷官網的延伸教學，單篇效果示例不代表本期課程會逐一教授。</p><ul className="learning-guide-links">{learningGuides.map(guide => <li key={guide.slug}><a href={`https://chaozhibai.ai/insights/${guide.slug}`}>{guide.title} →</a><p>{guide.description}</p></li>)}</ul><p className="note"><a href="#modules">回到本期課綱 →</a> · <a href="#fees">確認費用與報名 →</a> · <a href="https://chaozhibai.ai/insights#course-guides">查看全部課程準備文章 →</a></p></Section>
      <Section id="faq" title="報名前，你可能想知道"><div className="faqs">{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div><p className="note"><a href={lineUrl}>還有問題？加入官方 LINE 詢問</a></p></Section>

    </main>
    <footer className="course-footer"><a href="https://chaozhibai.ai">超直白行銷｜公司官網 →</a><nav aria-label="網站政策"><a href="/refund">退費說明</a><a href="/privacy">隱私權政策</a><a href="/terms">服務條款</a></nav><a href="mailto:chaozhibai.ai@gmail.com">chaozhibai.ai@gmail.com</a><p>{siteConfig.footer.copyright}</p></footer>
  </>;
}



