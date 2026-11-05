import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GuideShell from "@/components/GuideShell";
import { getGuide, getGuides } from "@/lib/guides";
import { siteConfig } from "@/data/site";

interface Props { params: Promise<{ slug: string }> }

export function generateStaticParams() { return getGuides().map((g) => ({ slug: g.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  const url = `${siteConfig.url}/guides/${slug}`;
  return {
    title: `${guide.frontmatter.title}｜AI IP 兩日班`,
    description: guide.frontmatter.description,
    alternates: { canonical: guide.frontmatter.source ?? url },
    openGraph: { title: guide.frontmatter.title, description: guide.frontmatter.description, type: "article", url, publishedTime: guide.frontmatter.date, modifiedTime: guide.frontmatter.dateModified, images: [{ url: siteConfig.og.image }] },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const fm = guide.frontmatter;
  const url = `${siteConfig.url}/guides/${slug}`;
  const { default: Body } = await import(`@/content/guides/${slug}.mdx`);
  const related = (fm.related ?? []).map((s) => getGuide(s)).filter((g): g is NonNullable<typeof g> => Boolean(g));

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: fm.title,
    description: fm.description,
    abstract: fm.summary,
    inLanguage: "zh-TW",
    datePublished: fm.date,
    ...(fm.dateModified ? { dateModified: fm.dateModified } : {}),
    author: { "@type": "Person", "@id": "https://chaozhibai.ai/about#baibai", name: "白白", alternateName: "超直白 白白", url: "https://chaozhibai.ai/about" },
    publisher: { "@type": "Organization", "@id": "https://chaozhibai.ai/#organization", name: "超直白行銷", url: "https://chaozhibai.ai" },
    mainEntityOfPage: url,
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
    about: { "@type": "Course", "@id": `${siteConfig.url}/#course` },
  };
  const faqJsonLd = fm.faqs && fm.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: fm.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  } : null;
  const crumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "課程首頁", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "學習文章", item: `${siteConfig.url}/guides` },
      { "@type": "ListItem", position: 3, name: fm.title, item: url },
    ],
  };

  return (
    <GuideShell crumb={fm.title}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbJsonLd) }} />
      <article>
        <header className="guide-article-head">
          <time dateTime={fm.date}>{fm.date}</time>{fm.dateModified && fm.dateModified !== fm.date && <time dateTime={fm.dateModified}> · 更新 {fm.dateModified}</time>}
          <h1>{fm.title}</h1>
          <p className="guide-byline">作者：超直白行銷 白白（全平台累積 200 萬真實粉絲，AI IP 兩日班主講）</p>
          {fm.source && <p className="guide-byline">本文同步刊登於<a href={fm.source}>超直白行銷官網</a>，課程站版本供報名前閱讀。</p>}
        </header>
        <section className="guide-summary" aria-label="重點摘要"><strong>先講答案</strong>{fm.summary}</section>
        <div className="guide-body"><Body /></div>
        {fm.faqs && fm.faqs.length > 0 && (
          <section className="guide-faq" aria-label="常見問題">
            <h2>常見問題</h2>
            {fm.faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
          </section>
        )}
        {related.length > 0 && (
          <nav className="guide-related" aria-label="延伸閱讀">
            <h2>接著看</h2>
            <ul>{related.map((r) => (<li key={r.slug}><Link href={`/guides/${r.slug}`}>{r.frontmatter.title} →</Link></li>))}</ul>
          </nav>
        )}
      </article>
    </GuideShell>
  );
}
