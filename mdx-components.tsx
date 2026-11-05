import type { MDXComponents } from "mdx/types";

// @next/mdx（App Router）必備：文章內的標準 HTML 元素直接沿用 globals.css 與 guides.css 的樣式
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components };
}
