import { courseTitle } from "./course";
export const siteConfig = {
  name: "超直白行銷｜AI IP 兩日班", url: "https://course.chaozhibai.ai", lang: "zh-TW",
  seo: { title: courseTitle, description: "超直白 白白主講，2026/12/12–12/13 兩天線上直播實作＋12/23 線上回顧。設計一個專屬 AI 角色、開一個帳號、做出第一支影片，不用露臉。適合有商品要賣的老闆、接案者與零基礎學員。首期 NT$4,900，工具費另計。", keywords: ["AI IP 兩日班", "AI IP 帳號", "AI 角色帳號", "不露臉自媒體", "AI 影片課程", "超直白", "白白", "線上課程"] },
  jsonLd: { "@context": "https://schema.org", "@type": "EducationalOrganization", name: "超直白行銷", url: "https://course.chaozhibai.ai", founder: { "@type": "Person", "@id": "https://chaozhibai.ai/about#baibai", name: "白白", alternateName: ["超直白", "超直白 白白"], url: "https://chaozhibai.ai/about", sameAs: ["https://www.instagram.com/afra_0629/", "https://www.youtube.com/@Chaozhibai", "https://www.facebook.com/Chaozhibai.havefun/"] } },
  og: { locale: "zh_TW", type: "website" as const, image: "/instructor.webp" },
  footer: { copyright: "© 2026 超直白行銷股份有限公司" },
};
