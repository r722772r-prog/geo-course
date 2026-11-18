import "./taste-refinement.css";

import CourseRegistration from "@/components/CourseRegistration";
import ContentArt from "@/components/ContentArt";

import { getGuides } from "@/lib/guides";
import CourseNav from "@/components/CourseNav";
import type { Metadata } from "next";
import Image from "next/image";
import CourseFilms from "@/components/CourseFilms";
import { siteConfig } from "@/data/site";
import { courseTitle, days, faqs, getPricing, lineUrl, market, marketRates, notes, outcomes, pains, poolSteps, positioning, registrationUrl, refundRules, takeaways, units } from "@/data/course";
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
  const schema = {"@context":"https://schema.org", "@type":"Course", "@id":`${siteConfig.url}/#course`, url:siteConfig.url, inLanguage:"zh-TW", educationalLevel:"零拍攝與剪輯基礎可參加", teaches:["AI 角色設定與三視圖資產","AI IP 帳號建立與各平台配置","腳本公式與 15–30 秒逐秒腳本","角色一致性生成、配音、字幕與剪輯","發布數據判讀、業配位與一頁提案報價"], audience:{"@type":"Audience",audienceType:"想多一項接得了案的技能、想多一份收入、不想露臉的上班族、接案者、小編與店家老闆，零基礎可參加"}, name:courseTitle, description:siteConfig.seo.description, provider:{"@type":"Organization","@id":"https://chaozhibai.ai/#organization",name:"超直白行銷",url:"https://chaozhibai.ai"}, hasCourseInstance:{"@type":"CourseInstance",courseMode:"Online",courseWorkload:"PT11H30M",startDate:"2026-12-12T10:00:00+08:00",endDate:"2026-12-23T21:30:00+08:00",instructor:{"@type":"Person","@id":"https://chaozhibai.ai/about#baibai",name:"白白",alternateName:"超直白 白白",url:"https://chaozhibai.ai/about"},location:{"@type":"VirtualLocation",url:"https://course.chaozhibai.ai"},offers:{"@type":"Offer",price:price.amount,priceCurrency:"TWD",url:registrationUrl}}};
  const outcomeArt = ["people", "script", "laptop", "social"];
  const painArt = ["laptop", "fee", "video", "message"];
  const marketArt = ["fee", "people", "script"];
  const takeawayArt = ["people", "laptop", "video", "message"];
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"WebSite","@id":`${siteConfig.url}/#website`,url:siteConfig.url,name:siteConfig.name,description:siteConfig.seo.description,inLanguage:siteConfig.lang,publisher:{"@type":"Organization",name:"超直白行銷",url:"https://chaozhibai.ai"}}).replace(/</g,"\\u003c")}} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"FAQPage",mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))})}} />
    <CourseNav />
    <main>
      <section className="course-hero"><div className="hero-frame hero-frame-intro"><div className="hero-content"><p className="eyebrow">AI IP 兩日班</p><p>2026/12/12–12/13・全程線上</p><h1>業主來問了，<br/>會做 AI 角色的人不夠。<span><b className="hero-phrase">兩天學會做 AI 角色帳號，</b><b className="hero-phrase">作品過關進接案池</b></span></h1><p className="hero-description">{positioning}</p><a className="cta" href="#outcomes">看學完可以做什麼 ↓</a><p className="registration-hint">不用露臉｜零拍攝、剪輯基礎可參加｜用電腦上課，不用出門｜課程有助教協助｜首期學員價 NT${price.amount.toLocaleString("en-US")}</p></div><figure className="hero-visual">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/course/ip-group-bar.webp" alt="四個 AI 角色在酒吧裡的合照自拍：兩位女生與兩位男生，背後是霓虹招牌與酒櫃" width="1400" height="1042" fetchPriority="high" /><figcaption>超直白自己的 AI 角色，畫面由 AI 生成。</figcaption></figure></div></section>
      <Section id="why" title="你是不是也卡在這裡"><div className="course-tiles course-tiles-4">{pains.map(([title,text],i)=><article className="course-tile" key={title}><ContentArt kind={painArt[i]} small/><h3>{title}</h3><p>{text}</p></article>)}</div><p className="lead-line">AI IP 是一個做得出作品、不用露臉、學完有地方用的技能。不用會拍、不用會剪，也不看你原本做什麼工作，願意兩天動手做就可以。</p></Section>
      <Section id="market" title="為什麼現在學 AI IP"><p>AI IP 是一個由 AI 做出來、有名字、有個性、固定出現在帳號上的角色，也有人叫它 AI 網紅。品牌開始想要自己的角色，原因有三個。</p><div className="course-tiles">{market.map(([title,text],i)=><article className="course-tile" key={title}><ContentArt kind={marketArt[i]} small/><h3>{title}</h3><p>{text}</p></article>)}</div><p className="note">最近來詢問的，有想做品牌角色帳號的公司，也有想做 AI 動漫短片和商品廣告的。</p></Section>
      <CourseFilms />
      <Section id="outcomes" title="學完後你可以做什麼？"><div className="course-tiles course-tiles-4">{outcomes.map(([title,text],i)=><article className="course-tile" key={title}><ContentArt kind={outcomeArt[i]} small/><h3>{title}</h3><p>{text}</p></article>)}</div><h3 className="sub-heading">這個技能，市場上怎麼算錢</h3><div className="table-scroll"><table><caption className="sr-only">AI IP 相關案子的計價方式</caption><thead><tr><th>案子類型</th><th>業主怎麼付費</th></tr></thead><tbody>{marketRates.map(([item,rate])=><tr key={item}><th>{item}</th><td>{rate}</td></tr>)}</tbody></table></div><p className="note">實際金額看案子大小，每個案子不一樣。接案池的案子怎麼分配、你做一支拿多少，進池子時會白紙黑字寫給你。</p></Section>
      <Section id="pool" title="接案池怎麼進、怎麼運作"><ol className="production-example-steps">{poolSteps.map(([title,text])=><li key={title}><h3>{title}</h3><p>{text}</p></li>)}</ol><p className="lead-line">先講清楚兩件事。第一，進不進得了池子看作品，不是報名就進。第二，案子有多有少，我們不會說每個月一定有案。我們能說的是：案子在變多，台灣需要有人接，而且我們會優先找自己教出來的人。腳本寫得好、分鏡做得好的，我們特別需要。</p><p><Register>報名兩日班 →</Register></p></Section>
      <section id="instructor" className="instructor"><div className="instructor-inner"><Image src="/instructor.webp" alt="超直白行銷創辦人白白" width={683} height={911} className="portrait" /><div><p className="eyebrow">主講老師</p><h2>超直白 白白</h2><h3>做了 13 年自媒體，現在帶你用 AI 角色做</h3><p className="teacher-tags">超直白行銷創辦人｜全平台累計 200 萬追蹤、2 億次自然流量觀看</p><p>從圖文、長影片、YouTube 知識型影片到短影音，做了 13 年自媒體。現在的工作是幫店家與品牌做 AI 角色帳號、AI 行銷影片和社群經營，所以知道業主要什麼、案子怎麼談。這堂課教的，就是我們自己接案在用的做法。<a href="https://chaozhibai.ai/about">查看講師與超直白行銷介紹 →</a></p></div></div></section>
      <Section id="modules" title="兩天做出你的 AI IP 帳號，一晚線上回顧"><div className="modules">{days.map(([date,title,description],i)=><article key={date}><span className="eyebrow">{i < 2 ? `DAY 0${i + 1}` : "課後線上回顧"} · {date}</span><div><h3>{title}</h3><p className="lesson-description">{description}</p>{units[i] && <ol className="course-units">{units[i].map(([unit,detail])=><li key={unit}><strong>{unit}</strong>{detail}</li>)}</ol>}</div></article>)}</div></Section>

      <Section id="takeaways" title="兩天課程，你會得到"><div className="course-tiles course-tiles-4">{takeaways.map(([title,text],i)=><article className="course-tile" key={title}><ContentArt kind={takeawayArt[i]} small/><h3>{title}</h3><p>{text}</p></article>)}</div></Section>
      <Section title="上課時間與方式"><p>2026/12/12（六）–12/13（日）線上直播｜兩天教學 10 小時（不含午休）；12/23（三）線上回顧 1.5 小時</p><div className="table-scroll"><table><caption className="sr-only">上課及報到時間</caption><thead><tr><th>日期</th><th>報到</th><th>上課時間</th></tr></thead><tbody>{days.map(([date,,,checkin,time])=><tr key={date}><th>{date}</th><td>{checkin}</td><td>{time}</td></tr>)}</tbody></table></div><p className="note">每天五個單元；每單元示範 15 分鐘、實作 40 分鐘，最後抽 3 人展示半成品並點評 5 分鐘；中午休息一小時；週日 14:30 起成果發表。全程使用 Google Meet，連結於學員通知提供；全程錄影，課後可重看 30 天；課後 LINE 群開到 12/28。</p></Section>
      <Section id="fees" title="費用與退費說明"><div id="registration" className="pricing"><article><ContentArt kind="fee" small/><p>{"首期學員價"}</p><h3>NT${price.amount.toLocaleString("en-US")}</h3><p>之後逐步調漲。含兩天線上直播課、12/23 線上回顧、課後 LINE 群與 30 天錄影回看。首期學員第二期可免費複訓一次，以旁聽為主、限一次，不佔第二期作品點評名額。</p><p>工具積分另自購約 NT$1,500，退款規則見下表。</p><Register>{`全額 ${price.amount.toLocaleString("en-US")} 元報名 →`}</Register></article></div><p className="registration-hint">{`在本頁填寫資料 → 保存成功後前往藍新支付 NT$${price.amount.toLocaleString("en-US")} → 12/11 23:59 前完成付款。付款頁填寫相同姓名與手機，主辦核對後提供確認通知。`}</p><div className="table-scroll"><table><thead><tr><th>申請時間</th><th>退費方式</th></tr></thead><tbody>{refundRules.map(([date,rule])=><tr key={date}><th>{date}</th><td>{rule}</td></tr>)}</tbody></table></div><p className="note">本期以全額報名；退費以實際已付金額計算。<a href="/refund">查看完整退費說明 →</a></p></Section>
      <Section id="registration-form" title="報名 AI IP 兩日班"><CourseRegistration /></Section>
      <Section id="reference" title="報名前你需要準備"><div className="reference-grid reference-grid-2">
        <div className="reference-card"><h3>課前準備</h3><ul><li><strong>一台電腦</strong>能上網、有鏡頭與麥克風；手機不適合操作。12/10（四）晚上 30 分鐘課前檢查會。</li><li><strong>想好帳號要做什麼</strong>自己的店、接案用或業配用，準備 3–5 個想做的題目。角色、三視圖與帳號都在課堂上做。</li><li><strong>工具費另計</strong>AI 工具積分自購約 NT$1,500，工具清單與註冊教學 12/6 前寄出。</li></ul></div>
        <div className="reference-card reference-card-notes"><h3>課程注意事項</h3><ul>{notes.map(note=><li key={note}>{note}</li>)}</ul></div>
      </div></Section>
      <Section id="learning-guides" title="報名前，先看懂製作方法"><p>依照你的問題選一篇先讀，再回本頁對照課綱與準備事項。</p><ul className="learning-guide-links">{getGuides().slice(0,8).map(guide => <li key={guide.slug}><a href={`/guides/${guide.slug}`}>{guide.frontmatter.title} →</a><p>{guide.frontmatter.description}</p></li>)}</ul><p className="note"><a href="/guides">全部學習文章（含官網同步的製作教學）→</a> · <a href="#modules">回到本期課綱 →</a> · <a href="#fees">確認費用與報名 →</a></p></Section>
      <Section id="faq" title="報名前，你可能想知道"><div className="faqs">{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div><p className="note"><a href={lineUrl}>還有問題？加入官方 LINE 詢問</a></p></Section>

    </main>
    <footer className="course-footer"><a href="https://chaozhibai.ai">超直白行銷｜公司官網 →</a><nav aria-label="網站政策"><a href="/refund">退費說明</a><a href="/privacy">隱私權政策</a><a href="/terms">服務條款</a></nav><a href="mailto:chaozhibai.ai@gmail.com">chaozhibai.ai@gmail.com</a><p>{siteConfig.footer.copyright}</p></footer>
  </>;
}
