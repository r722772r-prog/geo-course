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
流程：藍新付款成功 → POST `https://course.chaozhibai.ai/api/newebpay-notify`（EPG 快速收款連結格式：一般表單＋CheckCode，依 EPG 回傳參數手冊；會帶 PayerName／PayerTel／PayerEmail）→ 課程站驗 CheckCode（MPG 的 TradeInfo／TradeSha 格式保留為備用）→ ①轉送 Apps Script（kind `payment-notify`）寫入試算表「付款紀錄」分頁 ②LINE 推播給 `LINE_NOTIFY_TO`。卡號欄位一律丟棄。

Vercel 要加（Production）：
- `NEWEBPAY_HASH_KEY`、`NEWEBPAY_HASH_IV`（Secret；藍新 會員中心 → 基本資料設定／商店管理 → API 串接金鑰）
- `LINE_CHANNEL_ACCESS_TOKEN`、`LINE_CHANNEL_SECRET`（Secret；LINE Developers Messaging API）
- `LINE_NOTIFY_TO`（Config；收通知的 LINE userId，逗號分隔。由白白／玉燕自行提供，課程站不接 LINE webhook）

藍新：會員中心 → 快速收款連結 → 進階設定 → Notify URL 填 `https://course.chaozhibai.ai/api/newebpay-notify`（只對之後新建的連結生效；既有 aAXr9i 連結請在編輯頁確認有無 Notify 欄位，沒有就重建一條 4,900 連結替換）。

Apps Script：Code.gs 新增 `recordPayment_`，需「部署 → 管理部署 → 編輯 → 新版本」重新部署同一個網址。

測試：建一條 10 元測試連結，自己刷一筆，確認 LINE 收到推播、試算表「付款紀錄」多一列，再於藍新退款。
- 2026-11-04 Vercel 七個變數就緒（含 NEWEBPAY_HASH_KEY/IV、LINE_CHANNEL_ACCESS_TOKEN/SECRET、LINE_NOTIFY_TO），重新部署。

## 官網故事版申請收件（2026-11-17 加）
官網 chaozhibai.ai 的「申請免費故事版」表單，原本送到 chatgpt.site 的收件區（白白看不到）。改成送到課程站 `POST https://course.chaozhibai.ai/api/story-request`（只接受來自 chaozhibai.ai 的請求）。

收到後做兩件事，任一成功就算收件：
1. LINE 推播完整申請內容給 `LINE_NOTIFY_TO`（沿用既有環境變數，不用新設定）。
2. 轉送 Apps Script（kind `story-request`），寫進報名試算表的「故事版申請」分頁。

**試算表這一步要重新部署 Apps Script 才會生效**：把 Code.gs 的 `recordStoryRequest_`、`STORY_HEADERS`，以及 doPost 裡 `story-request` 那一行貼進 Google 專案，「部署 → 管理部署 → 編輯 → 新版本」。沒重新部署之前，只有 LINE 推播，試算表不會有資料。

照片不再上傳檔案：表單只收照片連結（選填），沒附的話推播會寫「要跟對方要」。
改用之前的舊申請留在 chatgpt.site 的收件區，沒有搬過來。

## 藍新付款頁文字（2026-11-18 更新，連結 6ccU9q）
- 商品名稱：AI IP 兩日班｜2026/12/12–12/13 線上直播
- 商品說明：兩天線上直播，從零做出一個 AI 角色、一組帳號、第一支影片。不用露臉，不用會拍、會剪。含 12/23 線上回顧、課後 LINE 群、30 天錄影回看。工具積分另自購約 NT$1,500。退費規則見 course.chaozhibai.ai/refund
- 商店簡介（全商店共用，所有收款連結都會顯示）：超直白行銷股份有限公司｜AI 行銷影片製作與 AI IP 課程。販售內容為單次線上直播課程，一次付款，沒有訂閱或自動扣款。課程網站：course.chaozhibai.ai
- 有效期間：2026/11/4–12/11（欄位只能選日期）。金額 NT$2,900、Notify URL、連結代碼、付款方式都沒動。
- 付款頁不寫接案池：付款頁的文字等於買到的東西，接案池的說明與條件留在課程站。
- 上面「上線前確認」第 2 點說的舊課名與實體課程，已在這次改掉。

