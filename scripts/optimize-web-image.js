import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import sharp from "sharp";

const execFileAsync = promisify(execFile);
let fallbackIndex = 0;

// 多張圖片並行時限制單張圖片的執行緒，避免 CPU 過度競爭。
sharp.concurrency(Number(process.env.SHARP_THREADS || 2));

function convert(source, destination, maxEdge, quality) {
  return sharp(source)
    .rotate()
    .resize({
      width: maxEdge,
      height: maxEdge,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality, effort: 2, smartSubsample: true })
    .toFile(destination);
}

export async function optimizeWebImage(source, destination, maxEdge, quality) {
  try {
    await convert(source, destination, maxEdge, quality);
  } catch (sharpError) {
    const tempName = `chun-web-image-${process.pid}-${fallbackIndex += 1}.jpg`;
    const temporaryJpeg = path.join(os.tmpdir(), tempName);
    try {
      await execFileAsync("sips", ["-s", "format", "jpeg", source, "--out", temporaryJpeg]);
      await convert(temporaryJpeg, destination, maxEdge, quality);
      console.warn(`Used sips fallback for ${source}`);
    } catch (fallbackError) {
      throw new Error(`Unable to optimize ${source}`, { cause: fallbackError || sharpError });
    } finally {
      fs.rmSync(temporaryJpeg, { force: true });
    }
  }
}
