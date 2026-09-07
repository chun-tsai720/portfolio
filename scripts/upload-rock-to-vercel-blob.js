import fs from "node:fs";
import path from "node:path";
import { put } from "@vercel/blob";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imageRoot = path.join(projectRoot, "public", "rock");
const concurrency = Number(process.env.UPLOAD_WORKERS || 8);

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  throw new Error("缺少 BLOB_READ_WRITE_TOKEN。請先在 Vercel 專案建立 Public Blob store，並執行 vercel env pull .env.local。");
}

function listFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(target) : [target];
  });
}

const files = listFiles(imageRoot).filter((file) => /\.jpe?g$/i.test(file));
let cursor = 0;
let finished = 0;
let mediaBaseUrl = "";

async function worker() {
  while (cursor < files.length) {
    const file = files[cursor];
    cursor += 1;
    const pathname = path.relative(path.join(projectRoot, "public"), file).split(path.sep).join("/");
    const blob = await put(pathname, fs.createReadStream(file), {
      access: "public",
      addRandomSuffix: false,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    if (!mediaBaseUrl) mediaBaseUrl = new URL(blob.url).origin;
    finished += 1;
    if (finished % 100 === 0 || finished === files.length) {
      console.log(`Uploaded ${finished}/${files.length}`);
    }
  }
}

console.log(`Uploading ${files.length} images with ${concurrency} workers...`);
await Promise.all(Array.from({ length: concurrency }, () => worker()));
console.log(`Upload complete. Set NEXT_PUBLIC_MEDIA_BASE_URL=${mediaBaseUrl}`);
