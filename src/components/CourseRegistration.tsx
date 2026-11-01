"use client";

import { useRef, useState, type FormEvent } from "react";
import { registrationClosesAt, registrationVersion } from "@/lib/course-registration";
import "./course-registration.css";

export default function CourseRegistration() {
  const requestId = useRef("");
  const submitting = useRef(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState<{ id: string; paymentUrl: string | null } | null>(null);
  const confirmation = useRef<HTMLDivElement>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (submitting.current || saved || !form.reportValidity()) return;
    submitting.current = true; setBusy(true); setError("");
    requestId.current ||= crypto.randomUUID();
    const fields = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/course-registration", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, version: registrationVersion, requestId: requestId.current, consent: fields.consent === "on" }),
        signal: AbortSignal.timeout(30000),
      });
      const result = await response.json();
      if (!response.ok || !result.saved) throw new Error(result.error || "尚未完成收件，請稍後重試。");
      if (result.paymentUrl && result.paymentUrl !== "https://core.newebpay.com/EPG/chaozhibai/aAXr9i") throw new Error("付款連結無法確認，請聯絡主辦。");
      setSaved({ id: result.id, paymentUrl: result.paymentUrl });
      requestAnimationFrame(() => confirmation.current?.focus());
    } catch (err) {
      setError(err instanceof Error && err.name === "TimeoutError" ? "連線逾時，請留在同一頁重試。系統會核對同一編號，避免重複登記；若已付款，請勿再次付款。" : err instanceof Error ? err.message : "收件暫時無法確認，請稍後再試。");
    } finally { submitting.current = false; setBusy(false); }
  }
  return <div className="course-registration">
    <div className="registration-intro"><p className="eyebrow">REGISTRATION</p><h3>先留下資料，再完成付款</h3><p>AI IP 兩日班｜2026/12/12–13 全程線上，12/23 晚上回顧。</p><p><strong>首期學員價 NT$4,900，之後會調漲。</strong><br/>工具費另自購約 NT$1,500。付款截止為 12/11 23:59。</p><ol aria-label="報名步驟"><li>填寫下方資料</li><li>收件成功後前往藍新</li><li>主辦核款後通知確認</li></ol></div>
    {!saved ? <form onSubmit={submit} aria-label="AI IP 兩日班報名表">
      <fieldset disabled={busy}><legend className="sr-only">報名與聯絡資料</legend>
        <div className="registration-fields">
          <label>姓名（必填）<input name="name" required maxLength={60} autoComplete="name"/></label>
          <label>手機（必填）<input name="phone" required maxLength={30} type="tel" autoComplete="tel" inputMode="tel" placeholder="0912345678" aria-describedby="phone-hint"/><small id="phone-hint">藍新付款時，請填相同姓名與手機，方便核對。</small></label>
          <label className="registration-wide">Email（必填）<input name="email" required maxLength={254} type="email" autoComplete="email"/><small>主辦以此信箱聯絡報名、付款確認與課前通知。</small></label>
          <label className="registration-wide">你想做什麼 AI IP 帳號？（必填）<textarea name="goal" required maxLength={1000} rows={3} placeholder="例如：為自己的店設計角色、練習不露臉內容，或增加接案服務。"/></label>
        </div>
        <div className="registration-trap" aria-hidden="true"><label>網站<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
        <p className="registration-plan">付款方案：<strong>全額 NT$4,900</strong>，由藍新金流處理。此表不收卡號或銀行帳號。</p>
        <label className="registration-consent"><input type="checkbox" name="consent" required/><span>我已閱讀<a href="/privacy" target="_blank" rel="noopener noreferrer">隱私權政策</a>、<a href="/terms" target="_blank" rel="noopener noreferrer">服務條款</a>與<a href="/refund" target="_blank" rel="noopener noreferrer">退費說明</a>，同意主辦為報名、付款核對及課程通知處理本表資料。我了解填表不代表已付款或名額確認，課程不保證接案、訂單或收入。</span></label>
        <button className="cta" type="submit">{busy ? "正在保存報名資料…" : "送出資料，下一步付款 →"}</button>
      </fieldset>
    </form> : <div className="registration-complete" ref={confirmation} tabIndex={-1} role="region" aria-label="報名資料已收件">
      <p className="eyebrow">資料已保存 · 尚待付款與核對</p><h3>報名資料已收件</h3><p>登記編號：<strong>{saved.id}</strong><br/>請保存此編號，方便聯絡查詢。</p>
      {saved.paymentUrl && Date.now() <= Date.parse(registrationClosesAt) ? <><p>下一步前往藍新支付 <strong>NT$4,900</strong>。請填與報名表相同的姓名與手機；若你已完成付款，請勿重複繳費。</p><a className="cta" href={saved.paymentUrl} target="_blank" rel="noopener noreferrer">前往藍新付款 NT$4,900 ↗</a></> : <p>本期付款期限已到，請聯絡主辦核對，勿使用舊連結付款。</p>}
      <p>付款由藍新金流處理；本頁不會自動判定付款成功。主辦核對後，才會另行提供報名確認通知。未收到確認時，請以登記編號聯絡官方 LINE。</p>
    </div>}
    <p className="registration-error" role="status" aria-live="polite">{error}</p>
    <p className="registration-contact">已填表、已付款或需要協助？<a href="https://line.me/R/ti/p/@740meybx" target="_blank" rel="noopener noreferrer">聯絡官方 LINE</a>，請勿重複報名。</p>
  </div>;
}
