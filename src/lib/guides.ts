import fs from "fs";
import path from "path";
import matter from "gray-matter";

// 課程站學習文章：src/content/guides/*.mdx（本地優先，不用後台）
// frontmatter：title / date / dateModified / description / summary（黃金摘要 40–75 字）/ faqs / related
const GUIDES_DIR = path.join(process.cwd(), "src", "content", "guides");

export interface GuideFaq { q: string; a: string }
export interface GuideFrontmatter {
  title: string;
  date: string;
  dateModified?: string;
  description: string;
  summary: string;
  faqs?: GuideFaq[];
  related?: string[];
  source?: string; // 官網原文網址：有的話 canonical 指回官網，頁面標示同步刊登
}
export interface GuideEntry { slug: string; frontmatter: GuideFrontmatter }

export function getGuides(): GuideEntry[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  return fs.readdirSync(GUIDES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const { data } = matter(fs.readFileSync(path.join(GUIDES_DIR, filename), "utf-8"));
      return { slug: filename.replace(/\.mdx$/, ""), frontmatter: data as GuideFrontmatter };
    })
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}

export function getGuide(slug: string): GuideEntry | undefined {
  return getGuides().find((g) => g.slug === slug);
}
