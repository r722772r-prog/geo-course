# 課程站內報名與藍新付款

報名表位於課程頁的 `#registration-form`。伺服器確認名單已保存後，才回傳既有 NT$4,900 藍新付款連結；不使用原 chatgpt.site。

## 正式連線設定

在既有 Vercel 專案 `r722772r-progs-projects/geo-course` 設定以下伺服器環境變數，至少勾選 Production。需要測試預覽時也勾選 Preview。

- `COURSE_REGISTRATION_WEBAPP_URL`：`https://script.google.com/macros/s/AKfycbwO1NtNQ58BEIaiBAFc8Cx3boVfRLuNrnKkWOmiBlmwJKJmlvDA771FNvDdbiUlPJwp/exec`
- `COURSE_REGISTRATION_SECRET`：從下方 Google 專案的「專案設定 → 指令碼屬性 → REGISTRATION_SECRET」取得。設定為敏感值，不可加上 NEXT_PUBLIC 前綴、提交至 Git 或貼進對話。

Google 專案：
https://script.google.com/u/1/home/projects/1ll8TufluvB6QuMl3hAxE0yfALi283KZpkjLvNFBQo8RizIZAivcW-ZC5/edit

2026-11-01 已完成 initializeRegistration 與網頁應用程式第 1 版部署。名單保持私人；公開 GET 只回傳健康狀態，寫入仍須伺服器密鑰。

## 上線前確認

1. 設定兩個環境變數後重新部署，先在 Preview 驗證保存名單、同一請求重試與重複手機處理。尚未以正式個資送出報名或實際付款。
2. 藍新連結金額已確認為 NT$4,900，但付款頁目前仍顯示舊課名「AI 行銷影片實戰班」，商店簡介仍寫實體課程；由金流負責人同步更新。
3. 表單填寫成功不表示付款完成，付款由主辦人工核對。此版本沒有自動收件通知信、金流回呼或名額同步功能；請勿宣稱已自動寄信或自動確認名額。
4. 原網站的既有名單未遷移，須保留原名單核對。新名單可從上述專案指令碼屬性 REGISTRATION_SHEET_ID 找到。

缺少環境設定時 API 回覆服務未就緒，不會顯示付款連結或宣稱已保存報名。

## 2026-11-04 上線紀錄
- 站內報名表上線；Vercel 需 COURSE_REGISTRATION_WEBAPP_URL、COURSE_REGISTRATION_SECRET 兩個環境變數（Production）。

## 藍新 Notify URL 自動付款通知（2026-11-04 加）
流程：藍新付款成功 → POST `https://course.chaozhibai.ai/api/newebpay-notify` → 課程站驗 TradeSha、解密 TradeInfo → ①轉送 Apps Script（kind `payment-notify`）寫入試算表「付款紀錄」分頁 ②LINE 推播給 `LINE_NOTIFY_TO`。卡號欄位一律丟棄。

Vercel 要加（Production）：
- `NEWEBPAY_HASH_KEY`、`NEWEBPAY_HASH_IV`（Secret；藍新 會員中心 → 基本資料設定／商店管理 → API 串接金鑰）
- `LINE_CHANNEL_ACCESS_TOKEN`、`LINE_CHANNEL_SECRET`（Secret；LINE Developers Messaging API）
- `LINE_NOTIFY_TO`（Config；收通知的 LINE userId，逗號分隔。取得方式：LINE Developers 把 Webhook URL 設 `https://course.chaozhibai.ai/api/line-webhook` 並開啟，然後傳「ID」給官方帳號，機器人會回 userId）

藍新：會員中心 → 快速收款連結 → 進階設定 → Notify URL 填 `https://course.chaozhibai.ai/api/newebpay-notify`（只對之後新建的連結生效；既有 aAXr9i 連結請在編輯頁確認有無 Notify 欄位，沒有就重建一條 4,900 連結替換）。

Apps Script：Code.gs 新增 `recordPayment_`，需「部署 → 管理部署 → 編輯 → 新版本」重新部署同一個網址。

測試：建一條 10 元測試連結，自己刷一筆，確認 LINE 收到推播、試算表「付款紀錄」多一列，再於藍新退款。
