import { siteConfig } from "@/data/site";

export function GET() {
  const body = `User-Agent: *
Allow: /

# AI / 生成式引擎爬蟲（GEO 明確放行）
User-Agent: GPTBot
Allow: /

User-Agent: OAI-SearchBot
Allow: /

User-Agent: ChatGPT-User
Allow: /

User-Agent: PerplexityBot
Allow: /

User-Agent: Perplexity-User
Allow: /

User-Agent: Google-Extended
Allow: /

User-Agent: Googlebot
Allow: /

User-Agent: Bingbot
Allow: /

User-Agent: anthropic-ai
Allow: /

User-Agent: ClaudeBot
Allow: /

User-Agent: Claude-SearchBot
Allow: /

User-Agent: Claude-Web
Allow: /

User-Agent: Applebot-Extended
Allow: /

User-Agent: CCBot
Allow: /

User-Agent: cohere-ai
Allow: /

User-Agent: Bytespider
Allow: /

Sitemap: ${siteConfig.url}/sitemap.xml
Llms-txt: ${siteConfig.url}/llms.txt
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
