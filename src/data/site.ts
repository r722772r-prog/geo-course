import { courseTitle } from "./course";
export const siteConfig = {
  name: "超直白行銷｜AI 行銷影片實戰班", url: "https://course.chaozhibai.ai", lang: "zh-TW",
  seo: { title: courseTitle, description: "超直白 白白主講，2026/12/20–12/21 新北汐止兩天實體實作＋12/30 線上回顧，限 20 位。從選題、腳本、畫面生成到剪輯，用真人開場加 AI 轉場完成一支 60 秒行銷影片。", keywords: ["AI 行銷影片實戰班", "AI 影片課程", "AI 影片製作", "超直白", "白白", "新北汐止"] },
  jsonLd: { "@context": "https://schema.org", "@type": "EducationalOrganization", name: "超直白行銷", url: "https://course.chaozhibai.ai", founder: { "@type": "Person", name: "超直白 白白" } },
  og: { locale: "zh_TW", type: "website" as const, image: "/instructor.png" },
  footer: { copyright: "© 2026 超直白行銷股份有限公司" },
};
