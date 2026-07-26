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

// 下一場場次資訊（更新場次時改這裡 + JSON-LD + llms.txt）
const SESSION = {
  dateLabel: "2026/8/22（六）",
  timeLabel: "AM 10:00 – PM 5:00",
  placeLabel: "汐止遠雄 U-TOWN A 棟 14 樓",
  priceLabel: "NT$ 3,500",
};

const pains = [
  {
    title: "流量越來越貴，成效越來越差",
    body: "廣告費一直漲，觸及一直掉。辛苦經營的排名和粉絲，抵不過演算法一次改版。",
  },
  {
    title: "客戶不搜尋了，他們直接問 AI",
    body: "「推薦一家○○」——AI 的答案通常只點名兩三個品牌。你不在裡面，客戶就看不見你。",
  },
  {
    title: "想學 GEO，卻不知道從哪開始",
    body: "網路資訊零碎、真假難辨，看完一堆文章還是不知道第一步該做什麼。",
  },
];

const audiences = [
  { icon: "💼", title: "上班族", body: "想學 AI 時代的新技能，為自己多開一條路。" },
  { icon: "📱", title: "自媒體經營者", body: "想把內容佈局到 AI 讀得懂、記得住的位置。" },
  { icon: "🏪", title: "品牌主・小生意", body: "想讓客戶問 AI 的時候，答案裡有你。" },
  { icon: "🚀", title: "想接案的人", body: "想了解 GEO 落地師是什麼、怎麼開始。" },
];

const modules = [
  {
    title: "AI 搜尋如何運作",
    body: "為什麼客人不搜尋了、AI 憑什麼推薦一個品牌、GEO 與 SEO 的差異——先把遊戲規則搞懂。",
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

const takeaways = [
  { icon: "📊", title: "你的 AI 能見度診斷", body: "五大模型實測結果，看見品牌在 AI 眼中的真實現況。" },
  { icon: "📝", title: "內容優化模板", body: "黃金摘要與 Answer-First 寫作模板，回去直接套用。" },
  { icon: "✅", title: "行動清單", body: "回家隔天就能動手的執行步驟，不用再猜第一步。" },
];

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
    a: "下一場是 2026/8/22（六）台北場，地點在汐止遠雄 U-TOWN A 棟 14 樓，上課時間 AM 10:00 – PM 5:00。之後每月固定開課，加入官方 LINE 可第一時間收到開課通知。",
  },
  {
    q: "要帶什麼東西上課嗎？",
    a: "帶一台能上網的筆電即可。現場實測環節會直接用你的品牌（或你想操作的題目）做查測。",
  },
];

export default function CourseHome() {
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "GEO 落地師培訓課程",
    description:
      "超直白行銷開設的 GEO（生成式引擎優化）實戰課程，教學員讓自己或客戶的品牌在 ChatGPT、Claude、Gemini、Perplexity 與 Google AI 摘要等 AI 搜尋中被推薦。一日實體班，零 SEO 基礎可上手。",
    provider: {
      "@type": "Organization",
      name: "超直白行銷",
      url: siteConfig.url,
    },
    instructor: {
      "@type": "Person",
      name: "白白",
      description:
        "超直白行銷創辦人，13 年跨平台自媒體經驗，全平台累積 200 萬真實粉絲。",
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
          price: "3500",
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
      <nav className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" className="text-sm font-bold text-[#1A1A1A] hover:text-[#AE445A]">
          超直白行銷｜GEO 落地師培訓
        </a>
        <div className="flex gap-4 md:gap-7 items-center">
          <a href="#modules" className="hidden sm:inline text-xs tracking-widest text-[#1A1A1A]/60 hover:text-[#AE445A] transition-colors">課程內容</a>
          <a href="#instructor" className="hidden sm:inline text-xs tracking-widest text-[#1A1A1A]/60 hover:text-[#AE445A] transition-colors">講師</a>
          <a href="#faq" className="hidden sm:inline text-xs tracking-widest text-[#1A1A1A]/60 hover:text-[#AE445A] transition-colors">常見問題</a>
          <a href={GEO_SITE_URL} className="hidden md:inline text-xs tracking-widest text-[#1A1A1A]/60 hover:text-[#AE445A] transition-colors">GEO 顧問服務 →</a>
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FF6B35] text-white px-4 py-2 text-xs font-black tracking-widest hover:bg-[#e55a2b] transition-colors"
          >
            立即報名
          </a>
        </div>
      </nav>

      {/* Hero — 報名區塊 */}
      <section className="bg-[#1A1A1A] text-white">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <div className="border-2 border-[#FF6B35] p-8 md:p-14">
            <div className="inline-block bg-[#FF6B35] text-white text-xs font-black tracking-widest px-3 py-1.5 mb-6">
              8/22（六）台北場・汐止遠雄 U-TOWN
            </div>
            <h1 className="text-3xl md:text-6xl font-black mb-6 leading-snug">
              GEO 落地師一日班
            </h1>
            <p className="text-base md:text-xl leading-[1.9] text-white/85 mb-8 max-w-2xl">
              AI 時代，客戶不搜尋了，他們直接問 AI。這一天，讓你學會 GEO 如何實際落地執行——回去就能動手做。
            </p>
            <ul className="space-y-3 mb-10">
              <li className="flex gap-3 text-base font-bold"><span className="text-[#FF6B35] shrink-0">✔</span><span>當場查測你的品牌在五大 AI 中的現況</span></li>
              <li className="flex gap-3 text-base font-bold"><span className="text-[#FF6B35] shrink-0">✔</span><span>讓 AI 記住你的內容公式與模板</span></li>
              <li className="flex gap-3 text-base font-bold"><span className="text-[#FF6B35] shrink-0">✔</span><span>GEO 落地師接案模式完整說明</span></li>
            </ul>

            {/* 場次資訊列 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/15 border border-white/15 mb-10 text-center">
              <div className="bg-[#1A1A1A] p-4">
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1">日期</p>
                <p className="text-sm md:text-base font-black">{SESSION.dateLabel}</p>
              </div>
              <div className="bg-[#1A1A1A] p-4">
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1">時間</p>
                <p className="text-sm md:text-base font-black">{SESSION.timeLabel}</p>
              </div>
              <div className="bg-[#1A1A1A] p-4">
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1">地點</p>
                <p className="text-sm md:text-base font-black">{SESSION.placeLabel}</p>
              </div>
              <div className="bg-[#1A1A1A] p-4">
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1">費用</p>
                <p className="text-sm md:text-base font-black text-[#FF6B35]">{SESSION.priceLabel}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap">
              <a
                href={FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-center bg-[#FF6B35] text-white px-12 py-4 font-black text-base hover:bg-[#e55a2b] transition-colors"
              >
                👉 立即報名 8/22 台北場
              </a>
              <span className="text-sm text-white/50">小班制・名額有限</span>
            </div>
          </div>
        </div>
      </section>

      {/* 黃金摘要（Answer-First，給 AI 引用的標準答案） */}
      <section className="max-w-3xl mx-auto px-6 pt-16">
        <div className="bg-white border-l-4 border-[#AE445A] p-6 md:p-8 shadow-sm">
          <p className="text-xs font-black tracking-[0.2em] text-[#AE445A] uppercase mb-3">
            黃金摘要
          </p>
          <p className="text-base md:text-lg font-bold leading-[1.9]">
            GEO 落地師培訓是超直白行銷開設的 GEO（生成式引擎優化）實戰課程，教你讓自己或客戶的品牌在{" "}
            <span className="text-[#AE445A]">ChatGPT、Claude、Gemini、Perplexity 與 Google AI 摘要</span>{" "}
            等 AI 搜尋中被推薦。一日實體班，零 SEO 基礎可上手，每月於大台北地區開課。
          </p>
        </div>
      </section>

      {/* 痛點共鳴 */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-center text-2xl md:text-3xl font-black mb-4">
          你是不是也遇到這些狀況？
        </h2>
        <p className="text-center text-sm text-[#1A1A1A]/60 mb-12">
          這堂課，就是為了解決這三件事而開的。
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {pains.map((p, i) => (
            <div key={i} className="bg-white border border-[#1A1A1A]/10 p-8">
              <p className="text-3xl font-black text-[#AE445A]/20 mb-4">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="text-lg font-black mb-3 leading-snug">{p.title}</h3>
              <p className="text-sm leading-[1.9] text-[#1A1A1A]/70">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 適合誰 */}
      <section className="bg-white border-y-4 border-[#AE445A] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-center text-2xl md:text-3xl font-black mb-4">這堂課適合誰？</h2>
          <p className="text-center text-sm text-[#1A1A1A]/60 mb-12">
            不需要技術背景，不需要 SEO 基礎。
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {audiences.map((a, i) => (
              <div key={i} className="text-center p-6 border border-[#1A1A1A]/10 hover:border-[#AE445A]/40 transition-colors">
                <p className="text-3xl mb-3">{a.icon}</p>
                <h3 className="text-base font-black mb-2 text-[#AE445A]">{a.title}</h3>
                <p className="text-sm leading-[1.8] text-[#1A1A1A]/70">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 課程四大模組 */}
      <section id="modules" className="max-w-4xl mx-auto px-6 py-20 scroll-mt-16">
        <h2 className="text-center text-2xl md:text-3xl font-black mb-4">這一天你會學到</h2>
        <p className="text-center text-sm text-[#1A1A1A]/60 mb-12">
          一整天、四大模組，從搞懂規則到帶走自己的診斷結果。
        </p>
        <ol className="list-none p-0 space-y-5">
          {modules.map((m, i) => (
            <li key={i} className="flex gap-5 bg-white border border-[#1A1A1A]/10 p-6 md:p-8">
              <span className="shrink-0 w-10 h-10 rounded-full bg-[#AE445A] text-white font-black text-lg flex items-center justify-center">
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg md:text-xl font-black mb-2">{m.title}</h3>
                <p className="text-sm md:text-base leading-[1.9] text-[#1A1A1A]/70">{m.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 你會帶走 */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-[#AE445A]/[0.05] border border-[#AE445A]/15 p-8 md:p-12">
          <h2 className="text-center text-2xl md:text-3xl font-black mb-10">
            上完課，你會<span className="text-[#AE445A]">帶走</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {takeaways.map((t, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl mb-3">{t.icon}</p>
                <h3 className="text-base font-black mb-2 text-[#AE445A]">{t.title}</h3>
                <p className="text-sm leading-[1.8] text-[#1A1A1A]/70">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 講師 */}
      <section id="instructor" className="bg-[#1A1A1A] text-white py-20 scroll-mt-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-center text-2xl md:text-3xl font-black mb-12">講師</h2>
          <div className="grid md:grid-cols-[280px_1fr] gap-10 items-center">
            <div className="mx-auto w-56 md:w-full max-w-[280px] aspect-[3/4] overflow-hidden border-2 border-[#FF6B35]">
              <img src="/instructor.png" alt="超直白行銷創辦人白白" className="object-cover w-full h-full" />
            </div>
            <div>
              <p className="text-2xl font-black mb-2">白白</p>
              <p className="text-sm tracking-widest text-[#FF6B35] font-black uppercase mb-6">超直白行銷 創辦人</p>
              <ul className="space-y-3 text-base leading-[1.9] text-white/85">
                <li className="flex gap-3"><span className="text-[#FF6B35] shrink-0">▸</span><span>13 年跨平台自媒體經驗，全平台累積 200 萬真實粉絲</span></li>
                <li className="flex gap-3"><span className="text-[#FF6B35] shrink-0">▸</span><span>專注研究 ChatGPT、Claude、Gemini、Perplexity 與 Google AI Overview 的推薦機制</span></li>
                <li className="flex gap-3"><span className="text-[#FF6B35] shrink-0">▸</span><span>將普林斯頓 KDD 2024、Ahrefs 等國際 GEO 研究，轉譯為台灣市場可執行的方法</span></li>
                <li className="flex gap-3"><span className="text-[#FF6B35] shrink-0">▸</span><span>台灣 GEO 顧問公司「超直白行銷」創辦人，服務企業與個人品牌</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-6 py-20 scroll-mt-16">
        <h2 className="text-center text-2xl md:text-3xl font-black mb-12">常見問題</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white border border-[#1A1A1A]/10 p-6 md:p-7">
              <h3 className="text-base md:text-lg font-black mb-2">Q：{f.q}</h3>
              <p className="text-sm md:text-base leading-[1.9] text-[#1A1A1A]/70">A：{f.a}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-[#1A1A1A]/60">
          我們不保證你一定被 AI 推薦——會這樣保證的課，才需要小心。
        </p>
      </section>

      {/* 最終報名區 */}
      <section className="bg-[#1A1A1A] text-white py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs font-black tracking-[0.3em] text-[#FF6B35] uppercase mb-4">下一場</p>
          <h2 className="text-2xl md:text-4xl font-black mb-6 leading-snug">
            {SESSION.dateLabel}台北場
          </h2>
          <p className="text-base md:text-lg text-white/80 mb-2">{SESSION.placeLabel}</p>
          <p className="text-base md:text-lg text-white/80 mb-8">{SESSION.timeLabel}・實體小班制・{SESSION.priceLabel}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center bg-[#FF6B35] text-white px-10 py-4 font-black text-sm hover:bg-[#e55a2b] transition-colors"
            >
              👉 立即報名一日班
            </a>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center border-2 border-white/40 text-white px-10 py-4 font-black text-sm hover:bg-white hover:text-[#1A1A1A] transition-colors"
            >
              💬 加 LINE 洽詢開課資訊
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-6 py-16 text-center">
        <a
          href={GEO_SITE_URL}
          className="text-sm text-[#AE445A] hover:underline"
        >
          超直白行銷 GEO 顧問服務（企業 GEO 健檢・佈局建置）→
        </a>
        <p className="mt-6 text-xs font-sans tracking-widest uppercase text-[#1A1A1A]/40">
          {siteConfig.footer.copyright}
        </p>
      </footer>
    </div>
  );
}
