# 飛騰人事系統 主管交接教育訓練網站

直效行銷部（IB）主管交接教育訓練網站，以 Next.js 14 + Tailwind CSS 建置，可直接部署到 Vercel。

內容來源：`飛騰人事系統_主管交接手冊_完整版.docx` 與「教育訓練整理」資料夾內所有附件。

---

## 專案結構

```
飛騰教育訓練網站/
├─ app/                    # Next.js App Router
│  ├─ layout.tsx           # 全站 layout（含側邊欄）
│  ├─ page.tsx             # 首頁（章節目錄）
│  ├─ globals.css          # 全站樣式
│  └─ chapters/[slug]/
│     └─ page.tsx          # 各章節頁（動態路由）
├─ components/
│  ├─ Sidebar.tsx          # 側邊欄（手機版可收合）
│  ├─ BlockRenderer.tsx    # 內容區塊渲染（段落/表格/清單/callout）
│  ├─ Callout.tsx          # 資訊/注意/重要 框
│  └─ AttachmentCard.tsx   # 附件下載卡片
├─ lib/
│  ├─ types.ts             # TypeScript 型別
│  └─ chapters.ts          # 所有章節內容資料（單一資料源）
├─ public/
│  └─ files/               # 23 個附件（PDF/DOCX/XLSX/PPTX）
├─ package.json
├─ next.config.js
├─ tailwind.config.ts
├─ tsconfig.json
└─ README.md
```

---

## 本地預覽（需先安裝 Node.js）

若要在本機預覽，請先安裝 Node.js 18 以上：
官網下載：https://nodejs.org/zh-tw/download

安裝完成後：

```bash
cd "C:\Users\Joan\Desktop\飛騰教育訓練網站"
npm install
npm run dev
```

打開瀏覽器：http://localhost:3000

---

## 部署到 Vercel（推薦）

### 方法 A：透過 GitHub（最簡單、最推薦）

1. **建立 GitHub repository**（若尚無帳號請先至 https://github.com 註冊）
2. 在 GitHub 網站建立新的空白 repo，例如命名為 `feiteng-hr-training`
3. 本機開啟命令列（PowerShell 或 Git Bash）執行：
   ```bash
   cd "C:\Users\Joan\Desktop\飛騰教育訓練網站"
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/你的帳號/feiteng-hr-training.git
   git push -u origin main
   ```
4. 前往 https://vercel.com/new 使用 GitHub 登入
5. 選擇剛才 push 的 repo，點【Import】
6. 框架偵測會自動選 Next.js；直接按【Deploy】
7. 約 1-2 分鐘後取得公開網址：`https://你的專案名.vercel.app`

### 方法 B：透過 Vercel CLI（不需 GitHub）

1. 安裝 Node.js（若尚未安裝）
2. 安裝 Vercel CLI：
   ```bash
   npm i -g vercel
   ```
3. 進入專案資料夾執行部署：
   ```bash
   cd "C:\Users\Joan\Desktop\飛騰教育訓練網站"
   vercel
   ```
4. 依 CLI 引導登入並部署（首次會問專案名稱、框架等）

---

## 重要說明

### 關於大型檔案

`Rita-[顯榮]-考勤出勤課程-20240912.mp4` 檔案約 **491 MB**，超過 Vercel 單檔 100 MB 上限，**未納入網站**。網站於附錄章節中已加註「請至內部網路資料夾觀看」與原始路徑：

```
\\10.168.8.180\15-直效行銷\05-AM專案管理\直效行銷IB交接資料夾\直效行銷主管用\飛騰-人事系統\教育訓練整理\
```

若希望讓網站也能觀看影片，建議：

- 上傳 YouTube（未列出或私人）後，於 `lib/chapters.ts` 附錄章節加入 `externalUrl`
- 或上傳 Google Drive／SharePoint，改為超連結

### 資料來源單一化

所有章節內容都寫在 `lib/chapters.ts` 這一個檔案。如果文件內容更新，直接修改這個檔案，再 push 到 GitHub（或 `vercel --prod`）即可重新部署。

### 權限說明

部署到 Vercel 後網站預設公開於網路上。若僅供內部使用，請於 Vercel Dashboard 開啟 Password Protection（Vercel Pro 功能）或設定密碼保護。

---

## 網站功能

- ✅ 10 章 + 附錄完整內容（SOP / 班別代碼 / 薪資 / 排班…）
- ✅ 23 個原始附件可直接下載（PDF / Word / Excel / PowerPoint）
- ✅ RWD 響應式設計（電腦、平板、手機皆可使用）
- ✅ 側邊欄章節導航（手機版可收合）
- ✅ 每章節自動產生本章目錄
- ✅ 上一章／下一章連結
- ✅ 各種內容類型支援：段落、有序／無序清單、表格、資訊/注意/重要框
- ✅ 繁體中文優化字型（PingFang TC / Microsoft JhengHei / Noto Sans TC）

---

## 維護更新

如需新增或修改章節：

1. 編輯 `lib/chapters.ts` 增加新的章節物件或修改現有內容
2. 若需要新附件：將檔案放進 `public/files/`，並在 `chapters.ts` 對應 section 的 `attachments` 陣列中加入物件
3. Commit 並 push，Vercel 會自動重新部署

章節資料結構可參考 `lib/types.ts` 中的 TypeScript 型別定義。
