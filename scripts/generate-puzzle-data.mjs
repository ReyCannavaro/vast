import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dataRoot = join(process.cwd(), "src", "data");

function parseJsonArrayFromDataFile(filename, exportName) {
  const content = readFileSync(join(dataRoot, filename), "utf8");
  const marker = `export const ${exportName}:`;
  const markerIndex = content.indexOf(marker);

  if (markerIndex === -1) {
    throw new Error(`Tidak menemukan export ${exportName} di ${filename}`);
  }

  const assignmentIndex = content.indexOf("=", markerIndex);
  const arrayStart = content.indexOf("[", assignmentIndex);
  const arrayEnd = content.lastIndexOf("];");

  if (arrayStart === -1 || arrayEnd === -1) {
    throw new Error(`Format array ${exportName} di ${filename} tidak terbaca`);
  }

  return JSON.parse(content.slice(arrayStart, arrayEnd + 1));
}

function parseNamesArray(content, constantName) {
  const match = content.match(new RegExp(`const ${constantName} = \\[([\\s\\S]*?)\\];`));

  if (!match) {
    throw new Error(`Tidak menemukan ${constantName} di regions.ts`);
  }

  return [...match[1].matchAll(/"([^"]+)"/g)].map((item) => item[1]);
}

function slugify(type, name) {
  return `${type}-${name.toLowerCase().replaceAll(" ", "-")}`;
}

function groupByRegion(items) {
  return items.reduce((groups, item) => {
    const existingItems = groups.get(item.regionSlug) ?? [];
    existingItems.push(item);
    groups.set(item.regionSlug, existingItems);
    return groups;
  }, new Map());
}

function scoreDestination(item) {
  const text = `${item.name} ${item.type}`.toLowerCase();
  let score = 0;

  if (item.type === "alam") score += 5;
  if (item.type === "sejarah") score += 4;
  if (item.type === "budaya") score += 3;
  if (/(pantai|kawah|air terjun|bukit|telaga|ranu|coban|monumen|candi|museum|pulau|gua|goa|tugu)/.test(text)) {
    score += 3;
  }
  if (/(mall|waterpark|zoo|park|taman safari|cimory)/.test(text)) {
    score -= 2;
  }

  return score;
}

function pickPuzzleSource(regionSlug, destinationsByRegion, heritageByRegion) {
  const destinations = [...(destinationsByRegion.get(regionSlug) ?? [])].sort((a, b) => {
    const scoreDiff = scoreDestination(b) - scoreDestination(a);

    if (scoreDiff !== 0) {
      return scoreDiff;
    }

    return a.name.localeCompare(b.name);
  });

  if (destinations[0]?.image) {
    return {
      item: destinations[0],
      sourceType: "destination",
    };
  }

  const heritageItems = [...(heritageByRegion.get(regionSlug) ?? [])].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  if (heritageItems[0]?.image) {
    return {
      item: heritageItems[0],
      sourceType: "culture",
    };
  }

  return null;
}

function difficultyFromSource(sourceType, item) {
  if (sourceType === "culture") {
    return "medium";
  }

  if (item.type === "alam") {
    return "easy";
  }

  if (item.type === "sejarah" || item.type === "budaya") {
    return "medium";
  }

  return "easy";
}

const regionsContent = readFileSync(join(dataRoot, "regions.ts"), "utf8");
const kabupatenNames = parseNamesArray(regionsContent, "kabupatenNames");
const kotaNames = parseNamesArray(regionsContent, "kotaNames");
const regionNames = new Map([
  ...kabupatenNames.map((name) => [
    slugify("kabupaten", name),
    `Kabupaten ${name}`,
  ]),
  ...kotaNames.map((name) => [slugify("kota", name), `Kota ${name}`]),
]);
const destinations = parseJsonArrayFromDataFile("destinations.ts", "destinations");
const heritageItems = parseJsonArrayFromDataFile("heritageItems.ts", "heritageItems");
const destinationsByRegion = groupByRegion(destinations);
const heritageByRegion = groupByRegion(heritageItems);
const puzzleItems = [];

for (const [regionSlug, regionName] of [...regionNames.entries()].sort((a, b) =>
  a[0].localeCompare(b[0]),
)) {
  const source = pickPuzzleSource(regionSlug, destinationsByRegion, heritageByRegion);

  if (!source) {
    continue;
  }

  const { item, sourceType } = source;
  const title =
    sourceType === "destination"
      ? `Puzzle ${item.name} - ${regionName}`
      : `Puzzle Budaya ${item.name} - ${regionName}`;

  puzzleItems.push({
    id: `${regionSlug}-puzzle-${item.id.split("-").slice(-2).join("-")}`,
    regionSlug,
    title,
    image: {
      ...item.image,
      alt: `Gambar puzzle ${item.name} dari ${regionName}`,
      caption: `${item.name} dari ${regionName}`,
    },
    gridSize: 3,
    difficulty: difficultyFromSource(sourceType, item),
  });
}

const content = [
  `import type { PuzzleItem } from "@/types/region";`,
  "",
  `export const puzzleItems: PuzzleItem[] = ${JSON.stringify(puzzleItems, null, 2)};`,
  "",
].join("\n");

writeFileSync(join(dataRoot, "puzzleItems.ts"), content);

const difficultyCounts = puzzleItems.reduce((counts, item) => {
  counts[item.difficulty] = (counts[item.difficulty] ?? 0) + 1;
  return counts;
}, {});

console.log(
  JSON.stringify(
    {
      total: puzzleItems.length,
      difficulties: difficultyCounts,
    },
    null,
    2,
  ),
);
