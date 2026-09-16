import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { optimizeWebImage } from "./optimize-web-image.js";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const conversionConcurrency = Number(process.env.IMAGE_WORKERS || 8);
// 列表與燈箱共用清晰的 WebP 網站副本；原始照片保持不變。
const imageMaxEdge = Number(process.env.IMAGE_MAX_EDGE || 1200);
const imageQuality = Number(process.env.IMAGE_QUALITY || 70);
const imagePattern = /\.(?:jpe?g|png|webp|heic|tiff?)$/i;
const technicalFolderPattern = /^(?:新增包含項目的檔案夾(?: \d+)?|未命名檔案夾(?: \d+)?|上傳)$/i;

const collections = [
  {
    slug: "motor",
    name: "MOTOR",
    label: "機車攝影",
    sourceRoot: process.env.MOTOR_SOURCE || "/Users/KobeKEKE/Pictures/Pic/Pic For iPhone/MOTOR",
  },
  {
    slug: "portrait",
    name: "PORTRAIT",
    label: "人像攝影",
    sourceRoot: process.env.PORTRAIT_SOURCE || "/Users/KobeKEKE/Pictures/Pic/iPHONE PIC/Portrait",
  },
];

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

function cleanName(name) {
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

  // 延續 ROCK 的規則：若更深一層已有成品，只收最底層，避免原檔與完成版重複。
  if (descendantLeaves.length) return descendantLeaves;
  return ownImages.length ? [{ relativeParts, files: ownImages }] : [];
}

function optimizeImage(source, destination) {
  return optimizeWebImage(source, destination, imageMaxEdge, imageQuality);
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

async function generateCollection(config) {
  if (!fs.existsSync(config.sourceRoot)) throw new Error(`${config.name} source not found: ${config.sourceRoot}`);

  const outputRoot = path.join(projectRoot, "public", config.slug);
  const dataPath = path.join(projectRoot, "src", "data", `${config.slug}-catalog.json`);
  fs.rmSync(outputRoot, { recursive: true, force: true });
  fs.mkdirSync(outputRoot, { recursive: true });

  const groups = new Map();
  for (const leaf of findImageLeaves(config.sourceRoot)) {
    if (!leaf.relativeParts.length) continue;
    const projectName = cleanName(leaf.relativeParts[0]);
    const seriesParts = leaf.relativeParts.slice(1).filter((part) => !technicalFolderPattern.test(part));
    const seriesName = seriesParts.map(cleanName).join(" / ") || "完成版";
    if (!groups.has(projectName)) groups.set(projectName, []);
    groups.get(projectName).push({
      name: seriesName,
      sourcePath: leaf.relativeParts.join("/"),
      files: leaf.files,
    });
  }

  const tasks = [];
  let imageCount = 0;
  const projects = [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b, "zh-Hant", { numeric: true }))
    .map(([name, sourceSeries], projectIndex) => {
      const slug = slugify(name, `project-${projectIndex + 1}`);
      const series = sourceSeries.map((item, seriesIndex) => {
        const seriesSlug = slugify(item.sourcePath, `series-${seriesIndex + 1}`);
        const seriesDirectory = path.join(outputRoot, slug, seriesSlug);
        fs.mkdirSync(seriesDirectory, { recursive: true });
        const images = item.files.map((source, imageIndex) => {
          const filename = `${String(imageIndex + 1).padStart(3, "0")}.webp`;
          const src = `/${config.slug}/${slug}/${seriesSlug}/${filename}`;
          tasks.push({ source, destination: path.join(seriesDirectory, filename) });
          imageCount += 1;
          return { src, sourceName: path.basename(source) };
        });
        return {
          name: item.name,
          slug: seriesSlug,
          sourcePath: item.sourcePath,
          sourceImageCount: item.files.length,
          images,
        };
      });
      return {
        name,
        slug,
        sourceImageCount: series.reduce((total, item) => total + item.sourceImageCount, 0),
        cover: series[0]?.images[0]?.src || null,
        series,
      };
    });

  const catalog = {
    generatedAt: new Date().toISOString(),
    sourceRoot: config.sourceRoot,
    slug: config.slug,
    name: config.name,
    label: config.label,
    selectionPolicy: "All images from every deepest source folder",
    stats: {
      projectCount: projects.length,
      seriesCount: projects.reduce((total, project) => total + project.series.length, 0),
      sourceImageCount: imageCount,
      selectedImageCount: imageCount,
    },
    projects,
  };

  console.log(`Optimizing ${imageCount} ${config.name} images with ${conversionConcurrency} workers...`);
  await runTasks(tasks);
  fs.mkdirSync(path.dirname(dataPath), { recursive: true });
  fs.writeFileSync(dataPath, `${JSON.stringify(catalog, null, 2)}\n`);
  console.log(`Generated ${projects.length} ${config.name} projects, ${catalog.stats.seriesCount} series, ${imageCount} images.`);
}

for (const collection of collections) await generateCollection(collection);
