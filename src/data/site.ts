// ============================================================
// 🔧 課程站基本設定 — 改這裡就能更新 SEO、JSON-LD、Footer
// ⚠️ 上線接上 Vercel 後，把 url 換成實際網址
// ============================================================

export const siteConfig = {
  name: "GEO 落地師培訓｜超直白行銷",
  url: "https://course.chaozhibai.ai",
  lang: "zh-TW",

  seo: {
    title: "GEO落地師培訓課程｜超直白行銷・讓AI推薦你的品牌",
    description:
      "GEO落地師一日實體班＋年度陪跑計畫。超直白行銷開設的 GEO（生成式引擎優化）培訓課程，教你讓品牌被 ChatGPT、Gemini、Perplexity 推薦，零基礎可上手，每月大台北開課。",
    keywords: ["GEO", "生成式引擎優化", "GEO落地師", "GEO課程", "AI行銷課程", "超直白", "落地師培訓", "AI推薦"],
  },

  jsonLd: {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "超直白行銷 GEO 落地師培訓",
    description:
      "超直白行銷開設的 GEO（生成式引擎優化）培訓課程，教學員讓自己或客戶的品牌在 ChatGPT、Gemini、Perplexity 等 AI 搜尋中被推薦。",
    url: "https://course.chaozhibai.ai",
    founder: {
      "@type": "Person",
      name: "超直白",
      alternateName: "白白",
    },
  },

  og: {
    locale: "zh_TW",
    type: "website" as const,
    image: "/og-default.png",
  },

  footer: {
    copyright: "© 2026 超直白行銷 GEO 落地師培訓. All Rights Reserved.",
  },
};
