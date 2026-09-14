import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = process.env.MIDJOURNEY_SOURCE
  || "/Users/KobeKEKE/Pictures/Pic/Pic For iPhone/AI/Midjourney";
const outputRoot = path.join(projectRoot, "public", "midjourney");
const dataPath = path.join(projectRoot, "src", "data", "midjourney-catalog.json");
const conversionConcurrency = Number(process.env.IMAGE_WORKERS || 8);
const imageMaxEdge = process.env.IMAGE_MAX_EDGE || "1000";
const imageQuality = process.env.IMAGE_QUALITY || "65";
const maximumSelected = process.env.MAX_PER_SERIES
  ? Number(process.env.MAX_PER_SERIES)
  : Number.POSITIVE_INFINITY;
const imagePattern = /\.(?:jpe?g|png|webp|heic|tiff?)$/i;

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

function chooseEvenly(files, limit) {
  if (!Number.isFinite(limit) || files.length <= limit) return files;
  if (limit === 1) return [files[Math.floor(files.length / 2)]];
  return Array.from(
    { length: limit },
    (_, index) => files[Math.round(index * (files.length - 1) / (limit - 1))],
  );
}

// 同一關鍵字後方的 02、03…只是分批整理標記，在網站上合併成同一作品主題。
function getProjectName(folderName) {
  return folderName.replace(/\s+\d{2}$/, "").trim();
}

function optimizeImage(source, destination) {
  return new Promise((resolve, reject) => {
    const child = spawn("sips", [
      "-s", "format", "jpeg",
      "-Z", imageMaxEdge,
      "--setProperty", "formatOptions", imageQuality,
      source,
      "--out", destination,
    ], { stdio: "ignore" });
    child.once("error", reject);
    child.once("exit", (code) => code === 0
      ? resolve()
      : reject(new Error(`sips failed for ${source} with exit code ${code}`)));
  });
}

async function runTasks(tasks) {
  let cursor = 0;
  async function worker() {
    while (cursor < tasks.length) {
      const task = tasks[cursor];
      cursor += 1;
      await optimizeImage(task.source, task.destination);
    }
  }
  await Promise.all(Array.from({ length: conversionConcurrency }, () => worker()));
}

if (!fs.existsSync(sourceRoot)) throw new Error(`Midjourney source not found: ${sourceRoot}`);

fs.rmSync(outputRoot, { recursive: true, force: true });
fs.mkdirSync(outputRoot, { recursive: true });

const folders = fs.readdirSync(sourceRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
  .sort((a, b) => a.name.localeCompare(b.name, "en", { numeric: true, sensitivity: "base" }));

const projectGroups = new Map();
for (const folder of folders) {
  const projectName = getProjectName(folder.name);
  const group = projectGroups.get(projectName) || [];
  group.push(folder.name);
  projectGroups.set(projectName, group);
}

const tasks = [];
let sourceImageCount = 0;
let selectedImageCount = 0;

// 第一層資料夾依關鍵字成為 Prompt 系列；名稱末尾的 02、03…會合併，根目錄散落檔案不會混入。
const projects = Array.from(projectGroups, ([projectName, folderNames], projectIndex) => {
  const sourceFiles = folderNames.flatMap((folderName) => {
    const folderPath = path.join(sourceRoot, folderName);
    return fs.readdirSync(folderPath, { withFileTypes: true })
      .filter((entry) => entry.isFile() && imagePattern.test(entry.name))
      .map((entry) => path.join(folderPath, entry.name));
  })
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
  const selectedFiles = chooseEvenly(sourceFiles, maximumSelected);
  const slug = slugify(projectName, `series-${projectIndex + 1}`);
  const projectOutput = path.join(outputRoot, slug);
  fs.mkdirSync(projectOutput, { recursive: true });

  const images = selectedFiles.map((source, imageIndex) => {
    const filename = `${String(imageIndex + 1).padStart(3, "0")}.jpg`;
    tasks.push({ source, destination: path.join(projectOutput, filename) });
    return {
      src: `/midjourney/${slug}/${filename}`,
      sourceName: path.basename(source),
    };
  });

  sourceImageCount += sourceFiles.length;
  selectedImageCount += images.length;
  return {
    name: projectName,
    slug,
    sourceFolder: folderNames[0],
    sourceFolders: folderNames,
    sourceImageCount: sourceFiles.length,
    cover: images[0]?.src || null,
    series: [{
      name: "PROMPT SERIES",
      slug: "prompt-series",
      sourcePath: folderNames.join(" + "),
      sourceImageCount: sourceFiles.length,
      images,
    }],
  };
}).filter((project) => project.sourceImageCount > 0);

console.log(`Optimizing ${selectedImageCount} Midjourney images with ${conversionConcurrency} workers...`);
await runTasks(tasks);

const catalog = {
  generatedAt: new Date().toISOString(),
  sourceRoot,
  slug: "midjourney",
  name: "MIDJOURNEY",
  label: "生成影像",
  selectionPolicy: Number.isFinite(maximumSelected)
    ? `Up to ${maximumSelected} evenly distributed images from every organized folder`
    : "All images from every organized folder",
  stats: {
    projectCount: projects.length,
    seriesCount: projects.length,
    sourceImageCount,
    selectedImageCount,
  },
  projects,
};

fs.mkdirSync(path.dirname(dataPath), { recursive: true });
fs.writeFileSync(dataPath, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`Generated ${projects.length} Midjourney series and ${selectedImageCount} optimized images.`);
