import { siteConfig } from "@/data/site";

export default function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8F5F2] text-[#1A1A1A] font-serif">
      <div className="h-[3px] bg-[#AE445A]" />
      <nav className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" className="text-sm font-bold text-[#1A1A1A] hover:text-[#AE445A]">
          超直白行銷｜GEO 落地師培訓
        </a>
        <a href="/" className="text-xs tracking-widest text-[#1A1A1A]/60 hover:text-[#AE445A] transition-colors">
          ← 回課程首頁
        </a>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-black mb-3">{title}</h1>
        <p className="text-xs text-[#1A1A1A]/50 mb-12">最後更新：{updated}</p>
        <div className="space-y-10 text-base leading-[1.9] text-[#1A1A1A]/85">{children}</div>
      </main>

      <footer className="max-w-4xl mx-auto px-6 py-16 text-center border-t border-[#1A1A1A]/10">
        <div className="flex justify-center gap-6 text-xs text-[#1A1A1A]/60 mb-6">
          <a href="/refund" className="hover:text-[#AE445A]">退費說明</a>
          <a href="/privacy" className="hover:text-[#AE445A]">隱私權政策</a>
          <a href="/terms" className="hover:text-[#AE445A]">服務條款</a>
        </div>
        <p className="text-xs font-sans tracking-widest uppercase text-[#1A1A1A]/40">
          {siteConfig.footer.copyright}
        </p>
      </footer>
    </div>
  );
}

export function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-black text-[#1A1A1A] mb-4">{heading}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
