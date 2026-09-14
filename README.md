# CHUN / VISUAL PORTFOLIO

以 Next.js（JavaScript）製作的個人視覺作品集。網站不只收錄樂團攝影，而是以創作類型為第一層：

- Photography：包含 ROCK 現場、MOTOR 機車與 Portrait 人像攝影典藏。
- Midjourney：依整理後的 Prompt 關鍵字資料夾，自動產生系列索引與作品頁。
- VJ / Live Visuals：已建立未來作品入口與版型。
- About：作者介紹。
- Contact：聯絡方式；真實信箱與 Instagram 可在 `lib/site.js` 填入。

ROCK 的資訊架構由原始資料夾自動產生：一個樂團一個頁面，每個活動是該樂團下的獨立頁面，活動內再保留「重調」、「黑白」、「第二調色」等不同最底層系列。

## 本機啟動

```bash
npm install
npm run dev
```

開啟 `http://localhost:3000`。主要路徑如下：

- `/works`
- `/works/photography`
- `/works/photography/rock`
- `/works/photography/motor`
- `/works/photography/portrait`
- `/works/midjourney`
- `/works/vj`
- `/about`
- `/contact`

舊的 `/bands` 網址會自動轉向新的 ROCK 路徑，既有書籤仍可使用。

## 從 ROCK 原始檔重新產生網站素材

```bash
npm run generate:rock
```

產生器會讀取 `/Users/KobeKEKE/Pictures/Pic/ROCK`，不會修改原始照片。它會：

1. 將 `ROCK~樂團名稱` 視為一個樂團頁面。
2. 將有名稱的第一層子資料夾視為活動頁面。
3. 只讀照片樹最底層的資料夾；只要子資料夾還有照片，父層的照片就略過，避免原檔與完成版重複出現。
4. 將每個最底層資料夾保留為活動頁裡的獨立系列；「重調」「黑白」「第二調色」不會互相合併。
5. 沒有活動名稱的最底層資料夾依檔名日期分組。
6. 每個獨立系列的照片全部收錄，長邊縮至 1000px、JPEG 品質 65，輸出至 `public/rock`；原始檔不會被修改。
7. 產生 `src/data/rock-catalog.json`，供 Next.js 動態路由使用。

可用環境變數調整來源：

```bash
ROCK_SOURCE="/path/to/ROCK" npm run generate:rock
```

若只是要快速製作測試版，可暫時限制每個系列的張數：

```bash
MAX_PER_SERIES=6 npm run generate:rock
```

MOTOR 與 Portrait 也使用相同的「只取照片樹最底層」規則：

```bash
npm run generate:photography
```

預設來源分別是 `/Users/KobeKEKE/Pictures/Pic/Pic For iPhone/MOTOR` 與 `/Users/KobeKEKE/Pictures/Pic/iPHONE PIC/Portrait`，也可用 `MOTOR_SOURCE`、`PORTRAIT_SOURCE` 環境變數改寫。

## 從 Midjourney 整理資料夾重新產生網站素材

```bash
npm run generate:midjourney
```

產生器會讀取 `/Users/KobeKEKE/Pictures/Pic/Pic For iPhone/AI/Midjourney` 的第一層分類資料夾；相同關鍵字且名稱只差結尾 `02`、`03` 等編號的資料夾，會合併成一個 Prompt 系列與作品頁。根目錄中未成組的散落檔案不會收錄，原始圖片也不會被修改。網頁圖片會縮至長邊 1000px、JPEG 品質 65，輸出至 `public/midjourney`。

可用 `MIDJOURNEY_SOURCE` 改寫來源；測試時也能用 `MAX_PER_SERIES=6 npm run generate:midjourney` 限制每組張數。

## GitHub 與照片的分流

網站程式碼、頁面資料與產生器會進 GitHub；`public/rock` 的大量照片被 `.gitignore` 排除，不會塞進 Git 儲存庫。這些照片在本機開發時直接從 `public/rock` 顯示，上線時則由外部公開媒體網址提供。

## Vercel 部署準備

專案已包含 `vercel.json`、`.vercelignore`、`.env.example` 與 Vercel Blob 上傳腳本。由於 Vercel CLI 的 Hobby 原始檔上傳限制是 100 MB，`.vercelignore` 會排除 `public/rock`，只部署網站程式。

### 1. 建立照片儲存空間

在 Vercel 專案建立 Public Blob store，取得 `BLOB_READ_WRITE_TOKEN`，並在本機 `.env.local` 設定：

```bash
BLOB_READ_WRITE_TOKEN="你的 token"
```

先匯入環境變數，再執行照片上傳：

```bash
set -a
source .env.local
set +a
npm run upload:media
```

上傳完成後，腳本會輸出公開網域。把該網域同時設在本機 `.env.local` 與 Vercel 專案環境變數：

```bash
NEXT_PUBLIC_MEDIA_BASE_URL="https://你的儲存空間.public.blob.vercel-storage.com"
```

注意：每張照片的 `put()` 都算一次 Blob Advanced Operation。ROCK、MOTOR、Portrait 完整 10,237 張第一次上傳會超過 Hobby 每月內含的 2,000 次；請先確認 Vercel 方案或改接其他相容的公開物件儲存空間，再執行完整上傳。

### 2. 部署網站

完成 GitHub 推送並把儲存庫匯入 Vercel 後，在 Vercel 專案設定 `NEXT_PUBLIC_MEDIA_BASE_URL`。每次推送到 GitHub 的 `main` 分支即可觸發部署；也可以在已登入的 Vercel CLI 執行：

```bash
vercel --prod
```
