import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  alternates: { canonical: siteConfig.url },
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: siteConfig.url,
    type: "website",
  },
};

// GEO 主站（顧問服務）網址 — 用於交叉導流
const GEO_SITE_URL = "https://chaozhibai.ai";

// 報名表單（2026 一日班新表單，短網址 forms.gle/7qq6DJtozxPfaRuD8）與官方 LINE
const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdMXzSYfJuriG3ntIxkmfUMjIIbzmW2ZOVON9vKQYluJ5nPWg/viewform";
const LINE_URL = "https://lin.ee/v1T1Lwz"; // 官方 LINE OA 加好友

const faqs = [
  {
    q: "我完全不懂技術，可以上嗎？",
    a: "可以。講師本人也不是工程師出身。GEO 的核心是內容與佈局，會用電腦、會寫字就能學。",
  },
  {
    q: "這堂課跟免費 YouTube 影片的差別？",
    a: "影片講觀念（why），課程教執行（how）——含模板、現場實測、以及針對你的品牌的個別建議。",
  },
  {
    q: "上完課就能接案嗎？",
    a: "誠實說：不會。一日班給你完整的方法與起點，接案需要先做出自己的成果。能獨立完成專案的落地師，超直白提供案源與分潤合作。",
  },
  {
    q: "會保證我的品牌被 AI 推薦嗎？",
    a: "不保證，任何做出這種保證的人都值得你警惕——AI 的回答有隨機性，業界也還沒有公認的成效驗證標準。我們教的是經國際研究驗證、能最大化被推薦機率的方法，並用每月查測讓成效透明可見。",
  },
  {
    q: "下一場什麼時候？",
    a: "每月固定開課。加入官方 LINE，開課資訊第一時間通知。",
  },
];

const learnings = [
  {
    title: "AI 搜尋如何運作",
    body: "為什麼客人不搜尋了、AI 憑什麼推薦一個品牌、GEO 與 SEO 的差異。",
  },
  {
    title: "現場實測你的品牌",
    body: "當場用五大 AI 模型查測你（或你公司）的 AI 能見度，帶著自己的診斷結果離開。",
  },
  {
    title: "讓 AI 記住你的內容公式",
    body: "黃金摘要、Answer-First 結構、跨平台語意一致性，含可直接套用的模板。",
  },
  {
    title: "GEO 落地師接案模式",
    body: "落地師是什麼、市場行情、超直白的案源分潤機制完整說明。",
  },
];

export default function CourseHome() {
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "GEO 落地師培訓課程",
    description:
      "超直白行銷開設的 GEO（生成式引擎優化）實戰課程，教學員讓自己或客戶的品牌在 ChatGPT、Gemini、Perplexity 等 AI 搜尋中被推薦。一日實體班，零 SEO 基礎可上手。",
    provider: {
      "@type": "Organization",
      name: "超直白行銷",
      url: siteConfig.url,
    },
    instructor: {
      "@type": "Person",
      name: "白白",
      description:
        "超直白行銷創辦人，13 年跨平台自媒體經驗，全平台累計 200 萬追蹤。",
    },
    hasCourseInstance: [
      {
        "@type": "CourseInstance",
        name: "GEO 落地師一日班",
        courseMode: "Onsite",
        courseWorkload: "P1D",
        startDate: "2026-08-22T10:00:00+08:00",
        endDate: "2026-08-22T17:00:00+08:00",
        location: {
          "@type": "Place",
          name: "汐止遠雄 U-TOWN A 棟 14 樓",
          address: {
            "@type": "PostalAddress",
            addressRegion: "新北市",
            addressLocality: "汐止區",
            addressCountry: "TW",
          },
        },
        offers: {
          "@type": "Offer",
          price: "3000",
          priceCurrency: "TWD",
          category: "一日實體班",
          url: siteConfig.url,
          availability: "https://schema.org/InStock",
        },
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-[#F8F5F2] text-[#1A1A1A] font-serif selection:bg-rose-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* 頂部裝飾條 */}
      <div className="h-[3px] bg-[#AE445A]" />

      {/* 導覽列 */}
      <nav className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" className="text-sm font-bold text-[#1A1A1A] hover:text-[#AE445A]">
          超直白行銷｜GEO 落地師培訓
        </a>
        <div className="flex gap-6 md:gap-8 items-center">
          <a href="#learn" className="text-xs tracking-widest text-[#1A1A1A]/50 hover:text-[#AE445A] transition-colors">課程內容</a>
          <a href="#faq" className="text-xs tracking-widest text-[#1A1A1A]/50 hover:text-[#AE445A] transition-colors">常見問題</a>
          <a
            href={GEO_SITE_URL}
            className="text-xs tracking-widest text-[#1A1A1A]/50 hover:text-[#AE445A] transition-colors"
          >
            GEO 顧問服務 →
          </a>
        </div>
      </nav>

      {/* Hero — 報名區塊 */}
      <section className="bg-[#1A1A1A] text-white">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">
          <div className="border-2 border-[#FF6B35] p-8 md:p-12">
            <div className="inline-block bg-[#FF6B35] text-white text-xs font-black tracking-widest px-3 py-1.5 mb-6">
              8/22（六）台北場・汐止遠雄 U-TOWN
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-6 leading-snug">
              GEO 落地師一日班
            </h1>
            <p className="text-base md:text-lg leading-[1.9] text-white/80 mb-8">
              AI 時代，客戶不搜尋了，他們直接問 AI。這一天，我教你讓 AI 推薦你——或成為幫企業做到這件事的人。
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex gap-3 text-base font-bold"><span className="text-[#FF6B35] shrink-0">✔</span><span>當場查測你的品牌在五大 AI 中的現況</span></li>
              <li className="flex gap-3 text-base font-bold"><span className="text-[#FF6B35] shrink-0">✔</span><span>讓 AI 記住你的內容公式與模板</span></li>
              <li className="flex gap-3 text-base font-bold"><span className="text-[#FF6B35] shrink-0">✔</span><span>GEO 落地師接案模式完整說明</span></li>
            </ul>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap">
              <span className="text-sm text-white/50">小班制・名額有限</span>
              <a
                href={FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-center bg-[#FF6B35] text-white px-10 py-4 font-black text-sm hover:bg-[#e55a2b] transition-colors"
              >
                👉 立即報名
              </a>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <div className="text-[#1A1A1A] leading-[1.9]">
          {/* 黃金摘要 */}
          <div className="bg-white border-l-4 border-[#AE445A] p-6 md:p-8 mb-14 shadow-sm">
            <p className="text-xs font-black tracking-[0.2em] text-[#AE445A] uppercase mb-3">
              黃金摘要
            </p>
            <p className="text-base md:text-lg font-bold">
              GEO 落地師培訓是超直白行銷開設的 GEO（生成式引擎優化）實戰課程，教學員讓自己或客戶的品牌在{" "}
              <span className="text-[#AE445A]">ChatGPT、Gemini、Perplexity</span>{" "}
              等 AI 搜尋中被推薦。一日實體班，零 SEO 基礎可上手，每月於大台北地區開課。
            </p>
          </div>

          {/* 一日班 */}
          <h2 id="learn" className="text-2xl md:text-3xl font-black mb-6 text-[#1A1A1A] scroll-mt-20">
            GEO 落地師一日班
          </h2>
          <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4 mb-8">
            <Row label="下一場次" value="2026/8/22（六）台北場・汐止遠雄 U-TOWN A 棟 14 樓" highlight />
            <Row label="上課時間" value="AM 10:00 – PM 5:00，實體小班制" />
            <Row label="費用" value="NT$ 3,000" highlight />
            <Row label="適合對象" value="上班族、自媒體經營者、有自己品牌或小生意的人、想學 AI 時代新技能者。不需要技術背景，不需要 SEO 基礎。" />
          </dl>

          <h3 className="text-xl font-black mb-4 text-[#AE445A]">這一天你會學到</h3>
          <ol className="list-none p-0 space-y-4 mb-8">
            {learnings.map((l, i) => (
              <li key={i} className="flex gap-4">
                <span className="shrink-0 w-7 h-7 rounded-full bg-[#AE445A] text-white font-black text-sm flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-base">
                  <span className="font-black">{l.title}</span>
                  <span className="text-[#1A1A1A]/70">——{l.body}</span>
                </p>
              </li>
            ))}
          </ol>

          <div className="bg-[#AE445A]/[0.05] p-5 mb-14">
            <p className="text-base">
              <span className="font-black text-[#AE445A]">你會帶走：</span>
              自己品牌的 AI 能見度診斷、內容優化模板、回家隔天就能執行的行動清單。
            </p>
          </div>

          {/* 講師 */}
          <h2 className="text-2xl md:text-3xl font-black mb-6 text-[#1A1A1A]">講師</h2>
          <p className="text-base text-[#1A1A1A]/80 mb-14">
            <span className="font-black text-[#1A1A1A]">白白</span>
            ，超直白行銷創辦人。13 年跨平台自媒體經驗，全平台累計 200 萬追蹤，曾在最高峰主動關閉 83 萬訂閱的 YouTube 頻道，全力投入 GEO 研究，並將普林斯頓 KDD 2024、Ahrefs 等國際 GEO 研究轉譯為台灣市場可執行的方法。
          </p>

          {/* FAQ */}
          <h2 id="faq" className="text-2xl md:text-3xl font-black mb-8 text-[#1A1A1A] scroll-mt-20">常見問題</h2>
          <div className="space-y-8 mb-14">
            {faqs.map((f, i) => (
              <div key={i}>
                <h3 className="text-lg font-black text-[#1A1A1A] mb-2">Q：{f.q}</h3>
                <p className="text-base text-[#1A1A1A]/70">A：{f.a}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 border-t border-[#1A1A1A]/10 pt-10">
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-[#FF6B35] text-white px-8 py-4 font-black text-sm hover:bg-[#e55a2b] transition-colors"
            >
              👉 立即報名一日班
            </a>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center border-2 border-[#AE445A] text-[#AE445A] px-8 py-4 font-black text-sm hover:bg-[#AE445A] hover:text-white transition-colors"
            >
              💬 加 LINE 洽詢開課資訊
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-6 py-16 text-center border-t border-[#1A1A1A]/10">
        <a
          href={GEO_SITE_URL}
          className="text-sm text-[#AE445A] hover:underline"
        >
          超直白行銷 GEO 顧問服務（企業 GEO 健檢・佈局建置）→
        </a>
        <p className="mt-6 text-xs font-sans tracking-widest uppercase text-[#1A1A1A]/30">
          {siteConfig.footer.copyright}
        </p>
      </footer>
    </div>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <dt className="text-xs font-black tracking-widest text-[#1A1A1A]/40 uppercase mb-1">
        {label}
      </dt>
      <dd className={`text-base ${highlight ? "font-black text-[#AE445A]" : "text-[#1A1A1A]/80"}`}>
        {value}
      </dd>
    </div>
  );
}
