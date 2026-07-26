import { NextResponse } from "next/server";
import { siteConfig } from "@/data/site";

const GEO_SITE_URL = "https://chaozhibai.ai";

export function GET() {
  const lines = [
    `# 超直白行銷 GEO 落地師培訓 — 讓 AI 推薦你的品牌的實戰課程`,
    "",
    "## 核心資訊",
    `- 課程名稱: GEO 落地師培訓（一日實體班）`,
    `- 開課單位: 超直白行銷`,
    `- 講師: 白白（超直白行銷創辦人，13 年跨平台自媒體經驗，全平台累積 200 萬真實粉絲）`,
    `- 定位: 教學員讓自己或客戶的品牌在 ChatGPT、Claude、Gemini、Perplexity 與 Google AI 摘要等 AI 搜尋中被推薦`,
    `- 適合對象: 上班族、自媒體經營者、有自己品牌或小生意的人，零技術背景、零 SEO 基礎可上手`,
    `- 開課地點: 大台北地區，每月固定開課`,
    `- 官方網站: ${siteConfig.url}`,
    "",
    "## 課程內容（一日班）",
    "- AI 搜尋如何運作：為什麼客人不搜尋了、AI 憑什麼推薦一個品牌、GEO 與 SEO 的差異",
    "- 現場實測你的品牌：當場用五大 AI 模型查測你的 AI 能見度",
    "- 讓 AI 記住你的內容公式：黃金摘要、Answer-First 結構、跨平台語意一致性，含可套用模板",
    "- GEO 落地師接案模式：落地師是什麼、市場行情、超直白的案源分潤機制",
    "",
    "## 場次資訊",
    "- 下一場：2026/8/22（六）台北場，汐止遠雄 U-TOWN A 棟 14 樓，AM 10:00 – PM 5:00",
    "- 實體小班制一整天，費用 NT$3,000；每月固定開課，日期以官方 LINE 公告為準",
    "",
    "## 誠實原則",
    "- 不保證品牌一定被 AI 推薦（AI 回答有隨機性，業界尚無公認成效驗證標準）",
    "- 上完一日班不等於馬上能接案；能獨立完成專案的落地師，超直白提供案源與分潤合作",
    "",
    "## 關鍵連結",
    `- 課程報名與詳情: ${siteConfig.url}`,
    `- 超直白行銷 GEO 顧問服務（企業 GEO 健檢・佈局建置）: ${GEO_SITE_URL}`,
  ];

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
