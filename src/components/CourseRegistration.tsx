"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { paymentUrl, registrationClosesAt, registrationVersion } from "@/lib/course-registration";
import "./course-registration.css";

const CITIES = ["臺北市","新北市","基隆市","桃園市","新竹市","新竹縣","苗栗縣","臺中市","彰化縣","南投縣","雲林縣","嘉義市","嘉義縣","臺南市","高雄市","屏東縣","宜蘭縣","花蓮縣","臺東縣","澎湖縣","金門縣","連江縣","海外"];

const STORE_KEY = "course-registration-2026-12";

export default function CourseRegistration() {
  const requestId = useRef("");
  const submitting = useRef(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState<{ id: string; paymentUrl: string | null } | null>(null);
  // 填過表卻沒看到付款連結的人很多（重新整理、回頭再來、手機號重複被擋），所以付款入口要一直都點得到。
  const [open, setOpen] = useState(false);
  const [fallback, setFallback] = useState<"duplicate" | "unsaved" | null>(null);
  const confirmation = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const stillOpen = Date.now() <= Date.parse(registrationClosesAt);
    setOpen(stillOpen);
    if (!stillOpen) return;
    try {
      const kept = JSON.parse(window.localStorage.getItem(STORE_KEY) || "null");
      if (kept && typeof kept.id === "string" && /^IP-[A-Z0-9]{12}$/.test(kept.id)) setSaved({ id: kept.id, paymentUrl });
    } catch { /* 無痕模式或被擋就算了，不影響填表 */ }
  }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (submitting.current || saved || !form.reportValidity()) return;
    submitting.current = true; setBusy(true); setError(""); setFallback(null);
    requestId.current ||= crypto.randomUUID();
    const raw = Object.fromEntries(new FormData(form)) as Record<string, string>;
    // 背景欄位併進 goal 一起保存，收件端與試算表欄位不用改。
    const pick = (k: string) => (raw[k] || "").toString().trim();
    const parts = [`身分：${pick("role")}`, pick("gender"), pick("age"), pick("city")];
    if (pick("social")) parts.push(`帳號：${pick("social").slice(0, 60)}`);
    const goal = `${parts.join("｜")}\n想做：${pick("goal")}`.slice(0, 1000);
    const fields = { name: raw.name, phone: raw.phone, email: raw.email, goal, website: raw.website || "", consent: raw.consent };
    try {
      const response = await fetch("/api/course-registration", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, version: registrationVersion, requestId: requestId.current, consent: fields.consent === "on" }),
        signal: AbortSignal.timeout(30000),
      });
      const result = await response.json();
      if (!response.ok || !result.saved) {
        if (response.status === 409 && typeof result.error === "string" && result.error.includes("已有報名紀錄")) setFallback("duplicate");
        else if (response.status >= 500) setFallback("unsaved");
        throw new Error(result.error || "尚未完成收件，請稍後重試。");
      }
      if (result.paymentUrl && result.paymentUrl !== "https://core.newebpay.com/EPG/chaozhibai/6ccU9q") throw new Error("付款連結無法確認，請聯絡主辦。");
      setSaved({ id: result.id, paymentUrl: result.paymentUrl });
      try { window.localStorage.setItem(STORE_KEY, JSON.stringify({ id: result.id })); } catch { /* 存不了也沒關係 */ }
      requestAnimationFrame(() => { confirmation.current?.scrollIntoView({ block: "start" }); confirmation.current?.focus({ preventScroll: true }); });
    } catch (err) {
      if (err instanceof Error && (err.name === "TimeoutError" || err.name === "TypeError")) setFallback("unsaved");
      setError(err instanceof Error && err.name === "TimeoutError" ? "連線逾時，請留在同一頁重試。系統會核對同一編號，避免重複登記；若已付款，請勿再次付款。" : err instanceof Error ? err.message : "收件暫時無法確認，請稍後再試。");
    } finally { submitting.current = false; setBusy(false); }
  }
  return <div className="course-registration">
    <div className="registration-intro"><p className="eyebrow">REGISTRATION</p><h3>先留下資料，再完成付款</h3><p>AI IP 兩日班｜2026/12/12–13 全程線上，12/23 晚上回顧。</p><p><strong>首期學員價 NT$2,900，之後逐步調漲。</strong><br/>工具費另自購約 NT$1,500。付款截止為 12/11 23:59。</p><ol aria-label="報名步驟"><li>填寫下方資料</li><li>收件成功後前往藍新</li><li>主辦核款後通知確認</li></ol>
      {open && !saved && <p className="registration-direct"><strong>已經填過表，付款頁沒有跳出來？</strong><br/><a href={paymentUrl} target="_blank" rel="noopener noreferrer">直接到藍新付款 NT$2,900 ↗</a><br/>付款時請填跟報名表一樣的姓名和手機，我們才對得起來。還沒填表的話，請先填下面的表。</p>}</div>
    {!saved ? <form onSubmit={submit} aria-label="AI IP 兩日班報名表">
      <fieldset disabled={busy}><legend className="sr-only">報名與聯絡資料</legend>
        <div className="registration-fields">
          <label>姓名（必填）<input name="name" required maxLength={60} autoComplete="name"/></label>
          <label>手機（必填）<input name="phone" required maxLength={30} type="tel" autoComplete="tel" inputMode="tel" placeholder="0912345678" aria-describedby="phone-hint"/><small id="phone-hint">藍新付款時，請填相同姓名與手機，方便核對。</small></label>
          <label className="registration-wide">Email（必填）<input name="email" required maxLength={254} type="email" autoComplete="email"/><small>主辦以此信箱聯絡報名、付款確認與課前通知。</small></label>
          <label>你的身分（必填）<select name="role" required defaultValue=""><option value="" disabled>請選擇</option><option>有商品或服務的老闆</option><option>接案者或工作室</option><option>公司行銷或小編</option><option>想開始做自媒體</option><option>其他</option></select></label>
          <label>性別（必填）<select name="gender" required defaultValue=""><option value="" disabled>請選擇</option><option>女</option><option>男</option><option>不透露</option></select></label>
          <label>年齡（必填）<select name="age" required defaultValue=""><option value="" disabled>請選擇</option><option>18–24</option><option>25–34</option><option>35–44</option><option>45–54</option><option>55 以上</option></select></label>
          <label>居住縣市（必填）<select name="city" required defaultValue=""><option value="" disabled>請選擇</option>{CITIES.map(c => <option key={c}>{c}</option>)}</select></label>
          <label className="registration-wide">IG 或 Threads 帳號（選填）<input name="social" maxLength={60} placeholder="@your_account" autoComplete="off"/><small>方便我們課前先看你現在的帳號。</small></label>
          <label className="registration-wide">你想做什麼 AI IP 帳號？（必填）<textarea name="goal" required maxLength={700} rows={3} placeholder="例如：為自己的店設計角色、練習不露臉內容，或增加接案服務。"/></label>
        </div>
        <div className="registration-trap" aria-hidden="true"><label>網站<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
        <p className="registration-plan">付款方案：<strong>全額 NT$2,900</strong>，由藍新金流處理。此表不收卡號或銀行帳號。</p>
        <label className="registration-consent"><input type="checkbox" name="consent" required/><span>我已閱讀<a href="/privacy" target="_blank" rel="noopener noreferrer">隱私權政策</a>、<a href="/terms" target="_blank" rel="noopener noreferrer">服務條款</a>與<a href="/refund" target="_blank" rel="noopener noreferrer">退費說明</a>，同意主辦為報名、付款核對及課程通知處理本表資料。我了解填表不代表已付款或名額確認，課程不保證接案、訂單或收入。</span></label>
        <button className="cta" type="submit">{busy ? "正在保存報名資料…" : "送出資料，下一步付款 →"}</button>
      </fieldset>
    </form> : <div className="registration-complete" ref={confirmation} tabIndex={-1} role="region" aria-label="報名資料已收件">
      <p className="eyebrow">資料已保存 · 尚待付款與核對</p><h3>報名資料已收件</h3><p>登記編號：<strong>{saved.id}</strong><br/>請保存此編號，方便聯絡查詢。</p>
      {saved.paymentUrl && Date.now() <= Date.parse(registrationClosesAt) ? <><p>下一步前往藍新支付 <strong>NT$2,900</strong>。請填與報名表相同的姓名與手機；若你已完成付款，請勿重複繳費。</p><a className="cta" href={saved.paymentUrl} target="_blank" rel="noopener noreferrer">前往藍新付款 NT$2,900 ↗</a><p>按了沒有反應？請長按上面的按鈕，選「在瀏覽器開啟」。這個付款連結會一直留在這一頁，晚一點回來也找得到。</p></> : <p>本期付款期限已到，請聯絡主辦核對，勿使用舊連結付款。</p>}
      <p>付款由藍新金流處理；本頁不會自動判定付款成功。主辦核對後，才會另行提供報名確認通知。未收到確認時，請以登記編號聯絡官方 LINE。</p>
    </div>}
    <p className="registration-error" role="status" aria-live="polite">{error}</p>
    {open && !saved && fallback === "duplicate" && <div className="registration-direct"><p><strong>這支手機之前已經填過表了，不用再填一次。</strong><br/>還沒付款的話，直接付款就好：</p><a className="cta" href={paymentUrl} target="_blank" rel="noopener noreferrer">前往藍新付款 NT$2,900 ↗</a><p>付款時請填跟報名表一樣的姓名和手機。已經付過的話請不要重複付款。</p></div>}
    {open && !saved && fallback === "unsaved" && <div className="registration-direct"><p><strong>資料暫時沒有存成功。</strong><br/>可以再按一次送出。急著付款的話也可以先付，付款時填的姓名、手機和 Email 我們會拿來核對，之後再補報名資料。</p><a className="cta" href={paymentUrl} target="_blank" rel="noopener noreferrer">先到藍新付款 NT$2,900 ↗</a></div>}
    <p className="registration-contact">已填表、已付款或需要協助？<a href="https://line.me/R/ti/p/@740meybx" target="_blank" rel="noopener noreferrer">聯絡官方 LINE</a>，請勿重複報名。</p>
  </div>;
}
