import fs from "node:fs";
import path from "node:path";

const sourceRoot = process.env.MIDJOURNEY_SOURCE
  || "/Users/KobeKEKE/Pictures/Pic/Pic For iPhone/AI/Midjourney/新增包含項目的檔案夾";
const shouldApply = process.argv.includes("--apply");

// 只修正明顯拼字或過度籠統的名稱；其餘保留創作者原本選定的關鍵字。
const clearerNames = new Map([
  ["Andel Of War", "Biomechanical Angel"],
  ["Arch", "Architectural Illustration"],
  ["Arch Cover", "Architecture Magazine Cover"],
  ["Blue", "Blue Surreal Fashion"],
  ["Dark Fantasy", "Dead Astronaut"],
  ["Doom", "Doomcore Metal"],
  ["Film", "Film Portrait"],
  ["General", "Chinese General"],
  ["God Of Born", "Lord Shiva Visionary"],
  ["Greek", "Greek Colosseum"],
  ["Half Born", "Orange Surreal Portrait"],
  ["Hole", "Black Hole Surreal"],
  ["Machine Greek", "Greek Overlords 3D"],
  ["Model", "Studio Model"],
  ["Orange", "Orange Sportswear"],
  ["Pardon", "Monochrome Fashion"],
  ["Photo", "Street Fashion"],
  ["Red", "Red Fashion"],
]);

function splitSequence(folderName) {
  const match = folderName.match(/^(.*?)(?:\s+(\d{2}))$/);
  return match
    ? { base: match[1].trim(), sequence: Number(match[2]) }
    : { base: folderName.trim(), sequence: 1 };
}

if (!fs.existsSync(sourceRoot)) throw new Error(`Midjourney source not found: ${sourceRoot}`);

const folders = fs.readdirSync(sourceRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
  .map((entry) => {
    const { base, sequence } = splitSequence(entry.name);
    return {
      currentName: entry.name,
      base: clearerNames.get(base) || base,
      sequence,
    };
  });

const families = new Map();
for (const folder of folders) {
  const family = families.get(folder.base) || [];
  family.push(folder);
  families.set(folder.base, family);
}

const renames = [];
for (const [base, family] of families) {
  family.sort((a, b) => a.sequence - b.sequence || a.currentName.localeCompare(b.currentName, "en"));
  const needsSequence = family.length > 1;
  for (const [index, folder] of family.entries()) {
    const desiredName = needsSequence
      ? `${base} ${String(index + 1).padStart(2, "0")}`
      : base;
    if (folder.currentName !== desiredName) {
      renames.push({ from: folder.currentName, to: desiredName });
    }
  }
}

const desiredNames = new Set(renames.map((item) => item.to));
if (desiredNames.size !== renames.length) throw new Error("Folder rename collision detected.");

for (const item of renames.sort((a, b) => a.from.localeCompare(b.from, "en", { numeric: true }))) {
  console.log(`${item.from} -> ${item.to}`);
}

if (!shouldApply) {
  console.log(`Dry run: ${renames.length} folders would be renamed. Add --apply to continue.`);
  process.exit(0);
}

// 先換成暫存名稱，避免 A -> A 01 與既有 A 01 互相碰撞。
const staged = renames.map((item, index) => {
  const temporaryName = `.midjourney-rename-${process.pid}-${index}`;
  fs.renameSync(path.join(sourceRoot, item.from), path.join(sourceRoot, temporaryName));
  return { ...item, temporaryName };
});

for (const item of staged) {
  fs.renameSync(path.join(sourceRoot, item.temporaryName), path.join(sourceRoot, item.to));
}

console.log(`Renamed ${renames.length} Midjourney folders.`);
