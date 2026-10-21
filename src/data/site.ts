import { courseTitle } from "./course";
export const siteConfig = {
  name: "超直白行銷｜AI 行銷影片實戰班", url: "https://course.chaozhibai.ai", lang: "zh-TW",
  seo: { title: courseTitle, description: "超直白 白白主講，2026/12/12–12/13 兩天線上直播實作＋12/23 線上回顧，限 20 位。從選題、腳本、畫面生成到剪輯，用真人開場加 AI 轉場完成一支 60 秒行銷影片。", keywords: ["AI 行銷影片實戰班", "AI 影片課程", "AI 影片製作", "超直白", "白白", "線上課程"] },
  jsonLd: { "@context": "https://schema.org", "@type": "EducationalOrganization", name: "超直白行銷", url: "https://course.chaozhibai.ai", founder: { "@type": "Person", "@id": "https://chaozhibai.ai/about#baibai", name: "白白", alternateName: ["超直白", "超直白 白白"], url: "https://chaozhibai.ai/about", sameAs: ["https://www.instagram.com/afra_0629/", "https://www.youtube.com/@Chaozhibai", "https://www.facebook.com/Chaozhibai.havefun/"] } },
  og: { locale: "zh_TW", type: "website" as const, image: "/instructor.png" },
  footer: { copyright: "© 2026 超直白行銷股份有限公司" },
};
