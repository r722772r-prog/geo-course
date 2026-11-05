import type { Metadata } from "next";
import Link from "next/link";
import GuideShell from "@/components/GuideShell";
import { getGuides } from "@/lib/guides";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "學習文章｜AI IP 帳號怎麼做、不露臉自媒體怎麼開始｜AI IP 兩日班",
  description: "超直白行銷 AI IP 兩日班的學習文章：AI IP 帳號是什麼、不露臉怎麼做自媒體、AI 角色怎麼不穿幫、泛流量與垂直流量怎麼配、兩天課程學什麼、報名前自我檢查。",
  alternates: { canonical: `${siteConfig.url}/guides` },
};

export default function GuidesIndex() {
  const guides = getGuides();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI IP 兩日班學習文章",
    url: `${siteConfig.url}/guides`,
    inLanguage: "zh-TW",
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
    hasPart: guides.map((g) => ({ "@type": "Article", headline: g.frontmatter.title, url: `${siteConfig.url}/guides/${g.slug}`, datePublished: g.frontmatter.date })),
  };
  return (
    <GuideShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="guide-list-head">
        <p className="eyebrow">學習文章</p>
        <h1>AI IP 帳號怎麼做，報名前先看懂</h1>
        <p>這裡回答報名前最常被問的事：AI IP 帳號是什麼、不露臉怎麼開始、角色怎麼不穿幫、流量怎麼配、兩天到底學什麼。每篇開頭先給答案，看完再決定要不要報名。</p>
      </header>
      <ul className="guide-list">
        {guides.map((g) => (
          <li key={g.slug} className="guide-card">
            <h2><Link href={`/guides/${g.slug}`}>{g.frontmatter.title}</Link></h2>
            <p>{g.frontmatter.description}</p>
            <time dateTime={g.frontmatter.dateModified ?? g.frontmatter.date}>更新 {g.frontmatter.dateModified ?? g.frontmatter.date}</time>
          </li>
        ))}
      </ul>
      <p className="note">服務相關的文章（GEO、AI 行銷影片、品牌代言人製作）在 <a href="https://chaozhibai.ai/insights">超直白行銷官網</a>。</p>
    </GuideShell>
  );
}
