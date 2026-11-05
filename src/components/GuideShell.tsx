import Link from "next/link";
import { siteConfig } from "@/data/site";
import { courseShortName, getPricing } from "@/data/course";
import "./guides.css";

// 學習文章用的外框：頂部導覽、底部課程 CTA、頁尾，和課程首頁同一套顏色
export default function GuideShell({ children, crumb }: { children: React.ReactNode; crumb?: string }) {
  const price = getPricing();
  return (
    <div className="guide-shell">
      <div className="guide-topline" />
      <nav className="guide-nav" aria-label="網站導覽">
        <Link href="/" className="brand">超直白行銷｜{courseShortName}</Link>
        <div className="guide-nav-links">
          <Link href="/guides">學習文章</Link>
          <Link href="/#modules">兩天課綱</Link>
          <Link href="/#fees" className="cta">費用與報名</Link>
        </div>
      </nav>
      {crumb && (
        <nav className="guide-crumb" aria-label="路徑">
          <Link href="/">課程首頁</Link><span>›</span><Link href="/guides">學習文章</Link><span>›</span><span aria-current="page">{crumb}</span>
        </nav>
      )}
      <main className="guide-main">{children}</main>
      <section className="guide-course-cta" aria-label="課程報名">
        <p className="eyebrow">想自己做一個 AI IP 帳號</p>
        <h2>{courseShortName}｜12/12–12/13 全線上實作</h2>
        <p>兩天做出一個設定完整的角色、一組帳號、第一支影片。{price.label}。不保證接案、訂單或收入。</p>
        <div className="guide-cta-row"><Link href="/#fees" className="cta">看費用與報名</Link><Link href="/#modules" className="guide-cta-ghost">先看兩天課綱 →</Link></div>
      </section>
      <footer className="course-footer">
        <a href="https://chaozhibai.ai">超直白行銷｜公司官網 →</a>
        <nav aria-label="網站政策"><Link href="/guides">學習文章</Link><a href="/refund">退費說明</a><a href="/privacy">隱私權政策</a><a href="/terms">服務條款</a></nav>
        <a href="mailto:chaozhibai.ai@gmail.com">chaozhibai.ai@gmail.com</a>
        <p>{siteConfig.footer.copyright}</p>
      </footer>
    </div>
  );
}
