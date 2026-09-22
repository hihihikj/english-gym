# English Gym v1.2 SECURE FREE

個人英語輸出訓練工具：Dictation → Echo/Shadowing → Retrieval Speaking + Feedback → Free Speaking + Feedback。

## 成本安全
- GitHub Pages：public repository 的免費靜態網站。
- Supabase organization：Free。
- OpenAI API：OFF。
- paidApisEnabled=false。
- 沒有付費語音、Realtime AI、cron、自動加值或背景付費。
- 未經使用者明確同意，不新增任何會產生額外費用的服務。

## 安全架構
- Supabase Auth：Email + password。
- 未登入時不顯示學習介面。
- Supabase Row Level Security（RLS）保護學習資料。
- anon 角色沒有 SELECT / INSERT 權限。
- authenticated 使用者只能讀寫自己的 `user_id`。
- 另加主人 Email 限制；非授權 Email 即使登入也無法讀寫進度。
- 舊 shared sync-key 資料表已刪除。
- 舊 shared-key Edge Function 已退役並改為 JWT-required + HTTP 410。
- Echo 錄音只留在本機裝置，不上傳。
- 口說全文不寫入 Supabase，只儲存分數與弱點標籤。
- GitHub 只包含 publishable key；沒有 service-role key、密碼或私人同步鑰匙。

## v1.2 口說回饋循環
- Retrieval Speaking：語音轉文字後評估「意思完整度 / 是否真正改述 / 句子清晰度」。
- Free Speaking：評估「流暢度 / 結構 / 詞彙變化」，並顯示 words/min。
- 每次回饋只要求下一輪改善 1 件事，避免一次糾正太多造成認知負荷。
- 低分不是直接結束，而是提供「再說一次」按鈕，形成 attempt → feedback → retry。
- 深度文法與自然度不假裝用規則引擎判斷；按「複製給 ChatGPT 深度批改」後，用現有 ChatGPT 手動分析，不呼叫付費 API。
- Browser SpeechRecognition 的語音轉文字由瀏覽器能力提供；部分瀏覽器可能使用其線上語音服務。

## 學習設計
- Active recall：遮掉原句後重新表達。
- Corrective feedback loop：說 → 回饋 → 立刻再說。
- Spaced practice：1 / 3 / 7 / 14 / 30 天動態複習。
- Desirable difficulty：依近 5 次聽寫表現調整難度。
- Low-frustration rule：第一次低分先給提示再試一次；連續低分先縮短句子。
- Minimum viable habit：5 / 15 / 25 分鐘，沒有懲罰式 streak。
- 輸出優先：固定從聽寫進到跟讀、重述與自由口說。

## 安全驗收
- Supabase Security Advisor：0 warnings。
- Supabase Performance Advisor：0 warnings。
- RLS policy 已確認包含 SELECT / INSERT / UPDATE / DELETE 四種 owner-only 規則。
- anon table privilege：SELECT=false、INSERT=false。
- 非主人 Email owner check=false；主人 Email owner check=true。

## 維護 SOP
每次更新：
1. 先保留目前正式版。
2. 修改新版。
3. 測試核心學習邏輯與 JavaScript 語法。
4. 發布新版。
5. 驗證登入、RLS、同步、語音回饋與行動裝置操作。
6. Security Advisor 與 Performance Advisor 都必須檢查。
7. 確認正常後更新 Google Drive 最新正式版。
8. 最後才清除舊版。
9. 任何新增付費功能，部署前一定先取得使用者明確同意。
