// 把官網 geo-site 的文章（src/data/insight-imported.json 節點樹）轉成課程站 MDX。
// 用法：node scripts/import-official-articles.mjs ../geo-site slug1 slug2 ...
// 產出：src/content/guides/<slug>.mdx，圖片複製到 public/。canonical 指回官網原文。
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const [, , siteDir, ...slugs] = process.argv;
if (!siteDir || slugs.length === 0) { console.error("usage: node scripts/import-official-articles.mjs <geo-site dir> <slug...>"); process.exit(1); }
const OFFICIAL = "https://chaozhibai.ai";

function loadTs(p, name) {
  const js = ts.transpile(fs.readFileSync(p, "utf8"), { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 });
  const m = { exports: {} }; new Function("exports", "module", "require", js)(m.exports, m, () => ({})); return m.exports[name];
}
const editorial = loadTs(path.join(siteDir, "src/data/insight-editorial.ts"), "insightEditorial");
const imported = JSON.parse(fs.readFileSync(path.join(siteDir, "src/data/insight-imported.json"), "utf8"));

const esc = (s) => s.replace(/\\/g, "\\\\").replace(/([{}<>*_`#\[\]])/g, "\\$1");
const cell = (s) => s.replace(/\|/g, "\\|").replace(/\n/g, " ").trim();
const fixHref = (h) => (h.startsWith("/") ? OFFICIAL + h : h);
const copied = new Set();
function copyImage(src) {
  if (!src.startsWith("/")) return src;
  const from = path.join(siteDir, "public", src); const to = path.join("public", src);
  if (fs.existsSync(from)) { fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(from, to); copied.add(src); return src; }
  return OFFICIAL + src;
}

function inline(nodes) {
  return nodes.map((n) => {
    if (typeof n === "string") return esc(n);
    if (n.widget) return "";
    const kids = () => inline(n.children || []);
    switch (n.tag) {
      case "strong": case "b": return `**${kids()}**`;
      case "em": case "i": return `*${kids()}*`;
      case "a": return `[${kids()}](${fixHref(n.attrs.href || "")})`;
      case "br": return "  \n";
      case "code": return "`" + (n.children || []).join("") + "`";
      case "span": case "small": case "sup": case "sub": return kids();
      case "img": return `![${esc(n.attrs.alt || "")}](${copyImage(n.attrs.src)})`;
      default: return kids();
    }
  }).join("");
}

function table(n) {
  const rows = [];
  (function walk(x) { if (typeof x === "string") return; if (x.tag === "tr") rows.push(x); else (x.children || []).forEach(walk); })(n);
  if (!rows.length) return "";
  const grid = rows.map((r) => (r.children || []).filter((c) => typeof c !== "string" && (c.tag === "th" || c.tag === "td")).map((c) => cell(inline(c.children || []))));
  const width = Math.max(...grid.map((r) => r.length));
  const pad = (r) => { while (r.length < width) r.push(""); return r; };
  const [head, ...body] = grid.map(pad);
  const lines = [`| ${head.join(" | ")} |`, `|${head.map(() => "---").join("|")}|`, ...body.map((r) => `| ${r.join(" | ")} |`)];
  return `<div className="guide-table-scroll">\n\n${lines.join("\n")}\n\n</div>\n\n`;
}

function block(nodes, listDepth = 0) {
  let out = "";
  for (const n of nodes) {
    if (typeof n === "string") { if (n.trim()) out += esc(n) + "\n\n"; continue; }
    if (n.widget) {
      if (n.widget === "copySheet" && n.text) out += `### ${esc(n.title || "可直接複製")}\n\n~~~text\n${n.text.trim()}\n~~~\n\n`;
      continue;
    }
    switch (n.tag) {
      case "h1": case "h2": out += `## ${inline(n.children)}\n\n`; break;
      case "h3": out += `### ${inline(n.children)}\n\n`; break;
      case "h4": case "h5": out += `#### ${inline(n.children)}\n\n`; break;
      case "p": { const t = inline(n.children).trim(); if (t) out += t + "\n\n"; break; }
      case "ul": case "ol": {
        const items = (n.children || []).filter((c) => typeof c !== "string" && c.tag === "li");
        items.forEach((li, i) => {
          const nested = (li.children || []).filter((c) => typeof c !== "string" && (c.tag === "ul" || c.tag === "ol"));
          const own = (li.children || []).filter((c) => !(typeof c !== "string" && (c.tag === "ul" || c.tag === "ol")));
          const marker = n.tag === "ol" ? `${i + 1}. ` : "- ";
          out += `${"  ".repeat(listDepth)}${marker}${inline(own).trim()}\n`;
          for (const sub of nested) out += block([sub], listDepth + 1);
        });
        if (listDepth === 0) out += "\n";
        break;
      }
      case "table": out += table(n); break;
      case "blockquote": out += block(n.children).trim().split("\n").map((l) => `> ${l}`).join("\n") + "\n\n"; break;
      case "figure": {
        const find = (x, tag) => { if (typeof x === "string" || x.widget) return null; if (x.tag === tag) return x; for (const c of x.children || []) { const r = find(c, tag); if (r) return r; } return null; };
        const img = find(n, "img");
        const cap = find(n, "figcaption");
        if (img) out += `![${esc(img.attrs.alt || "")}](${copyImage(img.attrs.src)})\n\n`;
        if (cap) out += `*${inline(cap.children).trim()}*\n\n`;
        break;
      }
      case "img": out += `![${esc(n.attrs.alt || "")}](${copyImage(n.attrs.src)})\n\n`; break;
      case "pre": out += "~~~text\n" + (n.children || []).map((c) => (typeof c === "string" ? c : inline([c]))).join("") + "\n~~~\n\n"; break;
      case "hr": out += "---\n\n"; break;
      default: out += block(n.children || [], listDepth); // div / section / article
    }
  }
  return out;
}

const yq = (s) => JSON.stringify(String(s));
for (const slug of slugs) {
  const art = imported[slug]; const ed = editorial[slug];
  if (!art) { console.error("no imported body:", slug); continue; }
  const mdxPath = path.join(siteDir, "src/content/insights", `${slug}.mdx`);
  const fmRaw = fs.readFileSync(mdxPath, "utf8").split("---")[1];
  const fm = Object.fromEntries([...fmRaw.matchAll(/^(\w+):\s*"(.*)"\s*$/gm)].map((m) => [m[1], m[2]]));
  const body = block(art.nodes).replace(/\n{3,}/g, "\n\n").trim();
  const faqs = (ed?.faqs || []).map((f) => `  - q: ${yq(f.question)}\n    a: ${yq(f.answer)}`).join("\n");
  const summary = ed?.summary || fm.description;
  const front = [
    "---",
    `title: ${yq(fm.title)}`,
    `date: ${yq(fm.date)}`,
    `dateModified: ${yq(fm.dateModified || fm.date)}`,
    `description: ${yq(fm.description)}`,
    `summary: ${yq(summary)}`,
    `source: ${yq(`${OFFICIAL}/insights/${slug}`)}`,
    faqs ? `faqs:\n${faqs}` : null,
    "---",
  ].filter(Boolean).join("\n");
  fs.writeFileSync(path.join("src/content/guides", `${slug}.mdx`), `${front}\n\n${body}\n`);
  console.log("wrote", slug, body.length, "chars");
}
console.log("images copied:", [...copied].join(", ") || "none");
