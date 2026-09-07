import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = process.env.ROCK_SOURCE || "/Users/KobeKEKE/Pictures/Pic/ROCK";
const outputRoot = path.join(projectRoot, "public", "rock");
const dataPath = path.join(projectRoot, "src", "data", "rock-catalog.json");
const maximumSelected = process.env.MAX_PER_SERIES
  ? Number(process.env.MAX_PER_SERIES)
  : Number.POSITIVE_INFINITY;
const conversionConcurrency = Number(process.env.IMAGE_WORKERS || 6);
const imageMaxEdge = process.env.IMAGE_MAX_EDGE || "1000";
const imageQuality = process.env.IMAGE_QUALITY || "65";
const imagePattern = /\.(?:jpe?g|png|webp)$/i;
const technicalFolderPattern = /^(?:新增包含項目的檔案夾(?: \d+)?|未命名檔案夾(?: \d+)?|上傳)$/i;
const genericFolderPattern = /^(?:新增包含項目的檔案夾(?: \d+)?|未命名檔案夾(?: \d+)?|B&W|黑白|第二調色|第二版|上傳|重調|嘗試|試驗版)$/i;
const optimizationTasks = [];

function hash(value) {
  let result = 2166136261;
  for (const character of value) {
    result ^= character.codePointAt(0);
    result = Math.imul(result, 16777619);
  }
  return (result >>> 0).toString(36).slice(0, 6);
}

function slugify(value, fallback) {
  const ascii = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 54);
  return `${ascii || fallback}-${hash(value)}`;
}

function cleanBandName(name) {
  return name.replace(/^ROCK[~～]/i, "").replace(/☑️?/gu, "").trim();
}

function cleanDisplayName(name) {
  return name.replace(/☑️?/gu, "").trim();
}

function findImageLeaves(directory, relativeParts = []) {
  const entries = fs.readdirSync(directory, { withFileTypes: true })
    .filter((entry) => !entry.name.startsWith("."));
  const ownImages = entries
    .filter((entry) => entry.isFile() && imagePattern.test(entry.name))
    .map((entry) => path.join(directory, entry.name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
  const descendantLeaves = entries
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => findImageLeaves(path.join(directory, entry.name), [...relativeParts, entry.name]));

  // 只保留照片樹的最底層：只要更深的資料夾有照片，就忽略這一層的原檔。
  if (descendantLeaves.length) return descendantLeaves;
  return ownImages.length ? [{ relativeParts, files: ownImages }] : [];
}

function dateKey(file) {
  const match = path.basename(file).match(/(?:19|20)\d{6}/);
  return match?.[0] || null;
}

function displayDate(rawDate) {
  return rawDate ? `${rawDate.slice(0, 4)}.${rawDate.slice(4, 6)}.${rawDate.slice(6, 8)}` : null;
}

function chooseEvenly(files, limit) {
  if (!Number.isFinite(limit)) return files;
  if (files.length <= limit) return files;
  if (limit === 1) return [files[Math.floor(files.length / 2)]];
  return Array.from({ length: limit }, (_, index) => files[Math.round(index * (files.length - 1) / (limit - 1))]);
}

function collectEvents(bandDirectory) {
  const groups = new Map();
  const leaves = findImageLeaves(bandDirectory);

  for (const leaf of leaves) {
    const activityIndex = leaf.relativeParts.findIndex((part) => !genericFolderPattern.test(part));
    const namedActivity = activityIndex >= 0 ? leaf.relativeParts[activityIndex] : null;
    if (namedActivity) {
      const seriesParts = leaf.relativeParts
        .slice(activityIndex + 1)
        .filter((part) => !technicalFolderPattern.test(part));
      const seriesName = seriesParts.join(" / ") || "完成版";
      const eventName = cleanDisplayName(namedActivity);
      if (!groups.has(eventName)) groups.set(eventName, []);
      groups.get(eventName).push({
        name: seriesName,
        sourcePath: leaf.relativeParts.join("/"),
        files: leaf.files,
      });
    } else {
      const seriesName = leaf.relativeParts
        .filter((part) => !technicalFolderPattern.test(part))
        .join(" / ") || "完成版";
      const key = dateKey(leaf.files[0]);
      const eventName = key ? `${displayDate(key)} 現場演出` : "未分類演出";
      if (!groups.has(eventName)) groups.set(eventName, []);
      groups.get(eventName).push({
        name: seriesName,
        sourcePath: leaf.relativeParts.join("/") || ".",
        files: leaf.files,
      });
    }
  }

  return [...groups].map(([name, series]) => ({
    name,
    series: series.map((item) => ({
      ...item,
      files: item.files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })),
    })),
  }));
}

function optimizeImage(source, destination) {
  optimizationTasks.push({ source, destination });
}

async function runOptimizations() {
  let cursor = 0;
  async function worker() {
    while (cursor < optimizationTasks.length) {
      const task = optimizationTasks[cursor];
      cursor += 1;
      await new Promise((resolve, reject) => {
        const child = spawn("sips", [
          "-s", "format", "jpeg",
          "-Z", imageMaxEdge,
          "--setProperty", "formatOptions", imageQuality,
          task.source,
          "--out", task.destination,
        ], { stdio: "ignore" });
        child.once("error", reject);
        child.once("exit", (code) => code === 0
          ? resolve()
          : reject(new Error(`sips failed for ${task.source} with exit code ${code}`)));
      });
    }
  }
  await Promise.all(Array.from({ length: conversionConcurrency }, () => worker()));
}

if (!fs.existsSync(sourceRoot)) throw new Error(`ROCK source not found: ${sourceRoot}`);
fs.rmSync(outputRoot, { recursive: true, force: true });
fs.mkdirSync(outputRoot, { recursive: true });

const bandDirectories = fs.readdirSync(sourceRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && /^ROCK[~～]/i.test(entry.name))
  .sort((a, b) => cleanBandName(a.name).localeCompare(cleanBandName(b.name), "zh-Hant", { numeric: true }));

let selectedImageCount = 0;
let sourceImageCount = 0;

const bands = bandDirectories.map((bandEntry, bandIndex) => {
  const name = cleanBandName(bandEntry.name);
  const slug = slugify(name, `band-${bandIndex + 1}`);
  const bandDirectory = path.join(sourceRoot, bandEntry.name);
  const eventGroups = collectEvents(bandDirectory)
    .filter((event) => event.series.some((series) => series.files.length))
    .sort((a, b) => {
      const aDate = dateKey(a.name) || dateKey(a.series[0].files[0]) || "99999999";
      const bDate = dateKey(b.name) || dateKey(b.series[0].files[0]) || "99999999";
      return aDate.localeCompare(bDate) || a.name.localeCompare(b.name, "zh-Hant");
    });

  const events = eventGroups.map((group, eventIndex) => {
    const eventSlug = slugify(group.name, `session-${eventIndex + 1}`);
    const eventDirectory = path.join(outputRoot, slug, eventSlug);
    fs.mkdirSync(eventDirectory, { recursive: true });
    const series = group.series.map((sourceSeries, seriesIndex) => {
      const seriesSlug = slugify(sourceSeries.sourcePath, `series-${seriesIndex + 1}`);
      const seriesDirectory = path.join(eventDirectory, seriesSlug);
      fs.mkdirSync(seriesDirectory, { recursive: true });
      const selected = chooseEvenly(sourceSeries.files, maximumSelected);
      const images = selected.map((source, imageIndex) => {
        const filename = `${String(imageIndex + 1).padStart(2, "0")}.jpg`;
        optimizeImage(source, path.join(seriesDirectory, filename));
        selectedImageCount += 1;
        return {
          src: `/rock/${slug}/${eventSlug}/${seriesSlug}/${filename}`,
          sourceName: path.basename(source),
        };
      });
      sourceImageCount += sourceSeries.files.length;
      return {
        name: sourceSeries.name,
        slug: seriesSlug,
        sourceImageCount: sourceSeries.files.length,
        images,
      };
    });
    const rawDate = group.name.match(/(?:19|20)\d{6}/)?.[0] || dateKey(group.series[0].files[0]);
    return {
      name: group.name,
      slug: eventSlug,
      date: displayDate(rawDate),
      sourceImageCount: series.reduce((total, item) => total + item.sourceImageCount, 0),
      cover: series[0].images[0].src,
      series,
    };
  });

  return {
    name,
    slug,
    sourceFolder: bandEntry.name,
    sourceImageCount: events.reduce((total, event) => total + event.sourceImageCount, 0),
    cover: events[0]?.cover || null,
    events: events.map((event, index) => ({
      ...event,
      previous: index > 0 ? { name: events[index - 1].name, slug: events[index - 1].slug } : null,
      next: index < events.length - 1 ? { name: events[index + 1].name, slug: events[index + 1].slug } : null,
    })),
  };
});

const catalog = {
  generatedAt: new Date().toISOString(),
  sourceRoot,
  selectionPolicy: Number.isFinite(maximumSelected)
    ? `Up to ${maximumSelected} evenly distributed, web-optimized images per deepest source folder`
    : "All images from every deepest source folder",
  stats: {
    bandCount: bands.length,
    eventCount: bands.reduce((total, band) => total + band.events.length, 0),
    sourceImageCount,
    selectedImageCount,
  },
  bands,
};

fs.mkdirSync(path.dirname(dataPath), { recursive: true });
console.log(`Optimizing ${optimizationTasks.length} preview images with ${conversionConcurrency} workers...`);
await runOptimizations();
fs.writeFileSync(dataPath, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`Generated ${bands.length} bands, ${catalog.stats.eventCount} events, ${selectedImageCount} optimized images from ${sourceImageCount} source files.`);
