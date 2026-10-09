"use client";

import Link from "next/link";
import { useRef, useState } from "react";


export default function CourseNav() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return <header className="course-nav" onKeyDown={event => {
    if (event.key === "Escape" && open) { setOpen(false); toggle.current?.focus(); }
  }}>
    <Link href="/" className="brand">超直白行銷</Link>
    <button ref={toggle} type="button" className="course-menu-toggle" aria-expanded={open} aria-controls="course-links" onClick={() => setOpen(!open)}>{open ? "收合" : "選單"}</button>
    <nav id="course-links" data-open={open} aria-label="課程內容導覽" onClick={() => setOpen(false)}>
      <a href="#film-examples">影片參考</a><a href="#modules">五天課綱</a><a href="#faq">FAQ</a>
      <a href="https://chaozhibai.ai/">公司官網 ↗</a>
    </nav>
    <a className="cta" href="/#fees">費用與報名</a>
  </header>;
}
