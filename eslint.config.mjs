import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  {
    rules: {
      // 圖片已由本機產生器統一縮圖，不需要再經 next/image 二次轉檔。
      "@next/next/no-img-element": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "public/rock/**",
    "src/data/rock-catalog.json",
  ]),
]);
