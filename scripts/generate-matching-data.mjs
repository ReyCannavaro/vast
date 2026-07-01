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

function regionNameFromSlug(regionSlug, regionNames) {
  return (
    regionNames.get(regionSlug) ??
    regionSlug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

function groupByRegion(items) {
  return items.reduce((groups, item) => {
    const existingItems = groups.get(item.regionSlug) ?? [];
    existingItems.push(item);
    groups.set(item.regionSlug, existingItems);
    return groups;
  }, new Map());
}

function sortByName(items) {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
}

function pickHeritageItems(items) {
  const priority = ["tradisi", "seni", "ikon", "festival", "sejarah", "batik", "lainnya"];
  const sorted = [...items].sort((a, b) => {
    const categoryDiff = priority.indexOf(a.category) - priority.indexOf(b.category);

    if (categoryDiff !== 0) {
      return categoryDiff;
    }

    return a.name.localeCompare(b.name);
  });

  return sorted.slice(0, 2);
}

function pickItems(items, count = 2) {
  return sortByName(items).slice(0, count);
}

function createMatchingItem({ regionSlug, regionName, item, category }) {
  const typeText = {
    food: "kuliner",
    destination: "destinasi",
    culture: "warisan budaya",
    batik: "motif atau identitas batik",
  }[category];

  return {
    id: `${regionSlug}-match-${category}-${item.id.split("-").slice(-2).join("-")}`,
    regionSlug,
    leftLabel: regionName,
    rightLabel: item.name,
    category,
    explanation: `${item.name} termasuk ${typeText} yang dikaitkan dengan ${regionName} dalam kurasi VAST.`,
  };
}

function uniqueByPair(items) {
  const seen = new Set();
  const uniqueItems = [];

  for (const item of items) {
    const key = `${item.regionSlug}|${item.category}|${item.rightLabel}`;

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    uniqueItems.push(item);
  }

  return uniqueItems;
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

const heritageItems = parseJsonArrayFromDataFile("heritageItems.ts", "heritageItems");
const foods = parseJsonArrayFromDataFile("foods.ts", "foods");
const destinations = parseJsonArrayFromDataFile("destinations.ts", "destinations");
const batikPatterns = parseJsonArrayFromDataFile("batikPatterns.ts", "batikPatterns");

const heritageByRegion = groupByRegion(heritageItems);
const foodsByRegion = groupByRegion(foods);
const destinationsByRegion = groupByRegion(destinations);
const batikByRegion = groupByRegion(batikPatterns);
const matchingGameItems = [];

for (const regionSlug of [...regionNames.keys()].sort((a, b) => a.localeCompare(b))) {
  const regionName = regionNameFromSlug(regionSlug, regionNames);

  for (const item of pickHeritageItems(heritageByRegion.get(regionSlug) ?? [])) {
    matchingGameItems.push(
      createMatchingItem({ regionSlug, regionName, item, category: "culture" }),
    );
  }

  for (const item of pickItems(foodsByRegion.get(regionSlug) ?? [])) {
    matchingGameItems.push(
      createMatchingItem({ regionSlug, regionName, item, category: "food" }),
    );
  }

  for (const item of pickItems(destinationsByRegion.get(regionSlug) ?? [])) {
    matchingGameItems.push(
      createMatchingItem({ regionSlug, regionName, item, category: "destination" }),
    );
  }

  for (const item of pickItems(batikByRegion.get(regionSlug) ?? [], 1)) {
    matchingGameItems.push(
      createMatchingItem({ regionSlug, regionName, item, category: "batik" }),
    );
  }
}

const uniqueMatchingGameItems = uniqueByPair(matchingGameItems);
const content = [
  `import type { MatchingGameItem } from "@/types/region";`,
  "",
  `export const matchingGameItems: MatchingGameItem[] = ${JSON.stringify(
    uniqueMatchingGameItems,
    null,
    2,
  )};`,
  "",
].join("\n");

writeFileSync(join(dataRoot, "matchingGameItems.ts"), content);

const categoryCounts = uniqueMatchingGameItems.reduce((counts, item) => {
  counts[item.category] = (counts[item.category] ?? 0) + 1;
  return counts;
}, {});

console.log(
  JSON.stringify(
    {
      total: uniqueMatchingGameItems.length,
      categories: categoryCounts,
    },
    null,
    2,
  ),
);
