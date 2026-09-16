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
6. 每個獨立系列的照片全部收錄，長邊縮至 900px、JPEG 品質 45，輸出至 `public/rock`；原始檔不會被修改。
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

先預覽資料夾名稱的正規化結果；確認後再加上 `--apply` 套用：

```bash
npm run organize:midjourney
npm run organize:midjourney -- --apply
```

相同主題的多個資料夾會統一補上 `01`、`02`、`03` 等序號，但每個資料夾仍保持獨立，不會互相合併。

```bash
npm run generate:midjourney
```

產生器只會讀取 `/Users/KobeKEKE/Pictures/Pic/Pic For iPhone/AI/Midjourney/新增包含項目的檔案夾` 的第一層分類資料夾；每一個資料夾會建立一個獨立 Prompt 系列與作品頁，`01`、`02`、`03` 等編號不會合併。根目錄中未成組的散落檔案不會收錄，原始圖片也不會被修改。網頁圖片會縮至長邊 900px、JPEG 品質 45，輸出至 `public/midjourney`。

可用 `MIDJOURNEY_SOURCE` 改寫來源；測試時也能用 `MAX_PER_SERIES=6 npm run generate:midjourney` 限制每組張數。

## GitHub 與 Vercel 部署

四個網站圖片目錄 `public/rock`、`public/motor`、`public/portrait`、`public/midjourney` 會和程式碼一起保存在 GitHub，並透過相對路徑由同一個 Vercel 部署提供。完整網站副本共 12,129 張、約 725 MB；原始照片仍只保留在來源資料夾，不會被產生器修改。

由於 Vercel Hobby 的 CLI 原始檔上傳限制為 100 MB，這個專案必須透過已連接的 GitHub `main` 分支自動部署，不使用 `vercel --prod` 直接上傳。每次重新產生圖片後，先確認四個目錄總容量仍保有足夠空間，再提交到 GitHub。
