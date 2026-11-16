# English Gym v2.3 — 極簡學習介面

## v2.3 使用方式
- 登入後進入「今天」：只顯示 B2→C1 主線的下一堂、16 堂進度、一個開始按鈕。
- 點「開始這堂課」開啟完整主線教材；完成後沿用原本的私人同步紀錄，返回首頁即可看到新進度。
- 「今天只有 5 分鐘」會開啟原本的 5 分鐘 English Gym。
- 「練習」集中 Speak Smart 9、Reading 10、Phrase Recall、English Gym 與 IELTS。
- 「進度」保留本週足跡、口說和聽寫指標；「設定」集中雲端同步、費用防護、帳號與備份。
- 原本的課程、檢定練習、間隔複習、語音與狀態 schema 全數保留；沒有 Supabase schema 或付費 API 變更。
- 界面資產：simple-ui.js、simple-ui.css；PWA 快取版本：english-gym-v2-3。
- 注意：程式中的 16 堂是 B2→C1 橋接學習進度，不是官方 CEFR 能力認證或預測考試分數。

---
# English Gym v1.3 SECURE FREE

個人英語系統：Reading 10 + Dictation → Echo/Shadowing → Retrieval Speaking + Feedback → Free Speaking + Feedback。

## 成本安全
- GitHub Pages：public repository 的免費靜態網站。
- Supabase organization：Free。
- OpenAI API：OFF。
- paidApisEnabled=false、aiEnabled=false。
- 沒有付費語音、Realtime AI、cron、自動加值或背景付費。
- 未經使用者明確同意，不新增任何會產生額外費用的服務。

## 安全架構
- Supabase Auth：Email + password。
- 未登入時不顯示學習介面。
- Supabase Row Level Security（RLS）保護學習資料。
- anon 角色沒有 SELECT / INSERT 權限。
- authenticated 使用者只能讀寫自己的 `user_id`。
- 另加主人 Email 限制；非授權 Email 即使登入也無法讀寫進度。
- 舊 shared sync-key 資料表已刪除；舊 shared-key Edge Function 已退役。
- Echo 錄音只留在本機裝置，不上傳。
- 口說全文不寫入 Supabase，只儲存分數與弱點標籤。
- GitHub 只包含 publishable key；沒有 service-role key、密碼或私人同步鑰匙。

## v1.3 Reading 10
- Reading 10 是獨立入口，不強迫塞進原本 15 分鐘口說流程。
- 首批原創短篇採三種高興趣元素：隱藏世界／魔幻探索、跨國心靈連結與群像、醫療病例推理。
- 不使用既有作品角色、台詞或世界觀，只取高層次題材元素。
- 每篇約 8–12 分鐘，先追故事，不要求逐字查字。
- 每篇只保留 3 個高價值 phrase、1 個理解題、1 個 Speaking prompt。
- Speaking prompt 可直接接既有 Speaking Feedback。
- 讀完只回報「太簡單／剛好／太難」；最近 3 篇中 2 篇偏簡單才升級，2 篇偏難才降級。
- 閱讀程度由 B1+ → B2 → B2+ 漸進，優先維持可讀性與持續性，不追求一次跳 C1。
- 已讀篇數、難度回饋與選取的 phrases 會存入私人同步 state。

## v1.2 口說回饋循環
- Retrieval Speaking：評估意思完整度 / 是否真正改述 / 句子清晰度。
- Free Speaking：評估流暢度 / 結構 / 詞彙變化，並顯示 words/min。
- 每次回饋只要求下一輪改善 1 件事。
- 低分可立即 Retry，形成 attempt → feedback → retry。
- 深度文法與自然度使用「複製給 ChatGPT 深度批改」，不自動呼叫付費 API。

## 學習設計
- Extensive reading：高興趣、可理解內容優先增加閱讀量。
- Active recall：遮掉原句後重新表達。
- Corrective feedback loop：說 → 回饋 → 立刻再說。
- Spaced practice：1 / 3 / 7 / 14 / 30 天動態複習。
- Desirable difficulty：依表現逐步調整。
- Low-frustration rule：一次只推進一小步，不追懲罰式 streak。
- Minimum viable habit：Reading 10 可單獨做；口說 Gym 保留 5 / 15 / 25 分鐘。

## 維護 SOP
每次更新：
1. 先保留目前正式版。
2. 修改新版。
3. 測試核心學習邏輯與 JavaScript 語法。
4. 發布新版。
5. 驗證登入、RLS、同步、閱讀與語音回饋。
6. 有資料庫變更時檢查 Security Advisor / Performance Advisor。
7. 確認正常後更新 Google Drive 最新正式版。
8. 最後才清除舊版。
9. 任何新增付費功能，部署前一定先取得使用者明確同意。
