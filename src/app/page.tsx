import "./taste-refinement.css";

import CourseRegistration from "@/components/CourseRegistration";
import ContentArt from "@/components/ContentArt";

import { learningGuides } from "@/data/learning-guides";
import CourseNav from "@/components/CourseNav";
import type { Metadata } from "next";
import Image from "next/image";
import CourseCharacterAssets from "@/components/CourseCharacterAssets";
import { siteConfig } from "@/data/site";
import { audiences, courseTitle, days, faqs, getPricing, lineUrl, notes, outcomes, positioning, registrationUrl, refundRules, takeaways, units } from "@/data/course";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: courseTitle, description: siteConfig.seo.description, alternates: { canonical: siteConfig.url } };
function Register({children = "立即報名"}: {children?: React.ReactNode}) { return <a className="cta" href="#registration-form">{children}</a>; }
function artFor(title: string) {
  if (title.includes("費用")) return "fee";
  if (title.includes("準備")) return "laptop";
  if (title.includes("適合")) return "people";
  if (title.includes("時間")) return "social";
  if (title.includes("知道") || title.includes("清楚")) return "message";
  if (title.includes("學完")) return "script";
  return "video";
}
function Section({id, title, children}: {id?: string; title: string; children: React.ReactNode}) { return <section id={id} className="course-section"><div className="art-heading"><ContentArt kind={artFor(title)}/><h2>{title}</h2></div>{children}</section>; }
export default function CourseHome() {
  const price = getPricing();
  const schema = {"@context":"https://schema.org", "@type":"Course", "@id":`${siteConfig.url}/#course`, url:siteConfig.url, inLanguage:"zh-TW", educationalLevel:"零拍攝與剪輯基礎可參加", teaches:["AI 角色設定與三視圖資產","AI IP 帳號建立與各平台配置","腳本公式與 15–30 秒逐秒腳本","角色一致性生成、配音、字幕與剪輯","發布數據判讀、業配位與一頁提案報價"], audience:{"@type":"Audience",audienceType:"不想露臉、想用 AI 角色經營帳號的店家、接案者、行銷人員與零基礎學員"}, name:courseTitle, description:siteConfig.seo.description, provider:{"@type":"Organization","@id":"https://chaozhibai.ai/#organization",name:"超直白行銷",url:"https://chaozhibai.ai"}, hasCourseInstance:{"@type":"CourseInstance",courseMode:"Online",courseWorkload:"PT11H30M",startDate:"2026-12-12T10:00:00+08:00",endDate:"2026-12-23T21:30:00+08:00",instructor:{"@type":"Person","@id":"https://chaozhibai.ai/about#baibai",name:"白白",alternateName:"超直白 白白",url:"https://chaozhibai.ai/about"},location:{"@type":"VirtualLocation",url:"https://course.chaozhibai.ai"},offers:{"@type":"Offer",price:price.amount,priceCurrency:"TWD",url:registrationUrl}}};
  const outcomeArt = ["social", "script", "people"];
  const takeawayArt = ["people", "laptop", "video", "message"];
  const audienceArt = ["social", "people", "script", "message", "laptop"];
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"WebSite","@id":`${siteConfig.url}/#website`,url:siteConfig.url,name:siteConfig.name,description:siteConfig.seo.description,inLanguage:siteConfig.lang,publisher:{"@type":"Organization",name:"超直白行銷",url:"https://chaozhibai.ai"}}).replace(/</g,"\\u003c")}} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"FAQPage",mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))})}} />
    <CourseNav />
    <main>
      <section className="course-hero"><div className="hero-frame hero-frame-intro"><div className="hero-content"><p className="eyebrow">AI × CHARACTER × ACCOUNT</p><p>2026/12/12–12/13・全程線上</p><h1>AI IP 兩日班<span><b className="hero-phrase">做出專屬你的</b><b className="hero-phrase">AI IP 帳號</b></span></h1><p className="hero-description">{positioning}</p><a className="cta" href="#modules">查看兩天課綱 ↓</a><p className="registration-hint">不用露臉｜零拍攝、剪輯基礎可參加｜用電腦上課，不用出門｜課程有助教協助</p></div><figure className="hero-visual">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/course/ip-group-bar.webp" alt="四個 AI 角色在酒吧裡的合照自拍：兩位女生與兩位男生，背後是霓虹招牌與酒櫃" width="1400" height="1042" fetchPriority="high" /></figure></div></section>
      <section id="instructor" className="instructor"><div className="instructor-inner"><Image src="/instructor.webp" alt="超直白行銷創辦人白白" width={683} height={911} className="portrait" /><div><p className="eyebrow">主講老師</p><h2>超直白 白白</h2><h3>從自媒體經營經驗出發，帶你把帳號建立起來</h3><p className="teacher-tags">超直白行銷創辦人｜店家代操與社群經營實戰｜全平台累計 200 萬追蹤</p><p>從圖文到影音，累積十年以上跨平台自媒體經驗。2025 年開始幫店家與品牌把影片變成生意，投入短影音、AI 行銷影片、AI IP 角色帳號、社群經營與店家代操。<a href="https://chaozhibai.ai/about">查看講師與超直白行銷介紹 →</a></p></div></div></section>
      <Section id="modules" title="兩天做出你的 AI IP 帳號，一晚線上回顧"><div className="modules">{days.map(([date,title,description],i)=><article key={date}><span className="eyebrow">{i < 2 ? `DAY 0${i + 1}` : "課後線上回顧"} · {date}</span><div><h3>{title}</h3><p className="lesson-description">{description}</p>{units[i] && <ol className="course-units">{units[i].map(([unit,detail])=><li key={unit}><strong>{unit}</strong>{detail}</li>)}</ol>}</div></article>)}</div></Section>

      <CourseCharacterAssets />
      <Section id="takeaways" title="兩天課程，你會得到"><div className="course-tiles course-tiles-4">{takeaways.map(([title,text],i)=><article className="course-tile" key={title}><ContentArt kind={takeawayArt[i]} small/><h3>{title}</h3><p>{text}</p></article>)}</div></Section>
      <Section id="outcomes" title="學完後你可以做什麼？"><div className="course-tiles">{outcomes.map(([title,text],i)=><article className="course-tile" key={title}><ContentArt kind={outcomeArt[i]} small/><h3>{title}</h3><p>{text}</p></article>)}</div><p className="note">三條路都從同一套東西開始：一個角色、一組帳號、第一支影片、一頁提案。接案名單不等於保證派案。</p></Section>
      <Section id="audiences" title="適合誰"><div className="audience-tiles">{audiences.map(([title,text],i)=><article className="audience-tile" key={title}><span className="audience-index">0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></Section>
      <Section title="上課時間與方式"><p>2026/12/12（六）–12/13（日）線上直播｜兩天教學 10 小時（不含午休）；12/23（三）線上回顧 1.5 小時</p><div className="table-scroll"><table><caption className="sr-only">上課及報到時間</caption><thead><tr><th>日期</th><th>報到</th><th>上課時間</th></tr></thead><tbody>{days.map(([date,,,checkin,time])=><tr key={date}><th>{date}</th><td>{checkin}</td><td>{time}</td></tr>)}</tbody></table></div><p className="note">每天五個單元；每單元示範 15 分鐘、實作 40 分鐘，最後抽 3 人展示半成品並點評 5 分鐘；中午休息一小時；週日 14:30 起成果發表。全程使用 Google Meet，連結於學員通知提供；全程錄影，課後可重看 30 天；課後 LINE 群開到 12/28。</p></Section>
      <Section id="fees" title="費用與退費說明"><div id="registration" className="pricing"><article><ContentArt kind="fee" small/><p>{"首期學員價"}</p><h3>NT${price.amount.toLocaleString("en-US")}</h3><p>之後會調漲。含兩天線上直播課、12/23 線上回顧、課後 LINE 群與 30 天錄影回看。首期學員第二期可免費複訓一次，以旁聽為主、限一次，不佔第二期作品點評名額。</p><p>工具積分另自購約 NT$1,500，退款規則見下表。</p><Register>{`全額 ${price.amount.toLocaleString("en-US")} 元報名 →`}</Register></article></div><p className="registration-hint">{`在本頁填寫資料 → 保存成功後前往藍新支付 NT$${price.amount.toLocaleString("en-US")} → 12/11 23:59 前完成付款。付款頁填寫相同姓名與手機，主辦核對後提供確認通知。`}</p><div className="table-scroll"><table><thead><tr><th>申請時間</th><th>退費方式</th></tr></thead><tbody>{refundRules.map(([date,rule])=><tr key={date}><th>{date}</th><td>{rule}</td></tr>)}</tbody></table></div><p className="note">本期以全額報名；退費以實際已付金額計算。<a href="/refund">查看完整退費說明 →</a></p></Section>
      <Section id="registration-form" title="報名 AI IP 兩日班"><CourseRegistration /></Section>
      <Section id="reference" title="報名前你需要準備"><div className="reference-grid reference-grid-2">
        <div className="reference-card"><h3>課前準備</h3><ul><li><strong>一台電腦</strong>能上網、有鏡頭與麥克風；手機不適合操作。12/10（四）晚上 30 分鐘課前檢查會。</li><li><strong>想好帳號要做什麼</strong>自己的店、接案用或業配用，準備 3–5 個想做的題目。角色、三視圖與帳號都在課堂上做。</li><li><strong>工具費另計</strong>AI 工具積分自購約 NT$1,500，工具清單與註冊教學 12/6 前寄出。</li></ul></div>
        <div className="reference-card reference-card-notes"><h3>課程注意事項</h3><ul>{notes.map(note=><li key={note}>{note}</li>)}</ul></div>
      </div></Section>
      <Section id="learning-guides" title="報名前，先看懂製作方法"><p>依照你的問題選一篇先讀，再回本頁對照課綱與準備事項。以下為超直白行銷官網的延伸教學，單篇效果示例不代表本期課程會逐一教授。</p><ul className="learning-guide-links">{learningGuides.map(guide => <li key={guide.slug}><a href={`https://chaozhibai.ai/insights/${guide.slug}`}>{guide.title} →</a><p>{guide.description}</p></li>)}</ul><p className="note"><a href="#modules">回到本期課綱 →</a> · <a href="#fees">確認費用與報名 →</a> · <a href="https://chaozhibai.ai/insights#course-guides">查看全部課程準備文章 →</a></p></Section>
      <Section id="faq" title="報名前，你可能想知道"><div className="faqs">{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div><p className="note"><a href={lineUrl}>還有問題？加入官方 LINE 詢問</a></p></Section>

    </main>
    <footer className="course-footer"><a href="https://chaozhibai.ai">超直白行銷｜公司官網 →</a><nav aria-label="網站政策"><a href="/refund">退費說明</a><a href="/privacy">隱私權政策</a><a href="/terms">服務條款</a></nav><a href="mailto:chaozhibai.ai@gmail.com">chaozhibai.ai@gmail.com</a><p>{siteConfig.footer.copyright}</p></footer>
  </>;
}
