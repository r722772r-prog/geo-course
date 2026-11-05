import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { getGuides } from "@/lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  return [
    { url: baseUrl, lastModified: "2026-10-22", changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/guides`, lastModified: "2026-11-05", changeFrequency: "weekly", priority: 0.8 },
    ...getGuides().map((g) => ({ url: `${baseUrl}/guides/${g.slug}`, lastModified: g.frontmatter.dateModified ?? g.frontmatter.date, changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: `${baseUrl}/refund`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
