# English Gym v1.1 SECURE FREE

個人英語輸出訓練工具：Dictation → Echo/Shadowing → Retrieval → Free Speaking。

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
- 錄音只留在本機裝置，不上傳。
- GitHub 只包含 publishable key；沒有 service-role key、密碼或私人同步鑰匙。

## 安全驗收
- Supabase Security Advisor：0 warnings。
- Supabase Performance Advisor：0 warnings。
- RLS policy 已確認包含 SELECT / INSERT / UPDATE / DELETE 四種 owner-only 規則。
- anon table privilege：SELECT=false、INSERT=false。
- 非主人 Email owner check=false；主人 Email owner check=true。

## 學習設計
- Active recall：遮掉原句後重新表達。
- Spaced practice：1 / 3 / 7 / 14 / 30 天動態複習。
- Desirable difficulty：依近 5 次聽寫表現調整難度。
- Low-frustration rule：第一次低分先給提示再試一次；連續低分先縮短句子。
- Minimum viable habit：5 / 15 / 25 分鐘，沒有懲罰式 streak。
- 輸出優先：固定從聽寫進到跟讀、回想與自由口說。

## 第一次使用
1. 開啟 GitHub Pages 網址。
2. 輸入主人 Email 與自己設定的密碼，按「第一次使用：建立帳號」。
3. 如果 Supabase 寄 Email 驗證信，先完成驗證，再回 English Gym 登入。
4. 登入成功後，學習介面才會出現。
5. 手機、平板、筆電都用同一組帳號密碼登入即可同步。

## 維護 SOP
每次更新：
1. 先保留目前正式版。
2. 修改新版。
3. 測試核心學習邏輯。
4. 發布測試版本。
5. 驗證登入、RLS、首頁、同步、安全與行動裝置操作。
6. Security Advisor 與 Performance Advisor 都必須檢查。
7. 確認正常後更新 Google Drive 最新正式版。
8. 最後才清除舊版。
9. 任何新增付費功能，部署前一定先取得使用者明確同意。
