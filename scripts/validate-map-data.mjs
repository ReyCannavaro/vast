import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const rootDir = process.cwd();
const regionsPath = resolve(rootDir, "src/data/regions.ts");
const mapPath = resolve(rootDir, "src/data/eastJavaMap.ts");

function readSource(path) {
  return readFileSync(path, "utf8");
}

function extractStringArray(source, variableName) {
  const match = source.match(new RegExp(`const ${variableName} = \\[([\\s\\S]*?)\\];`));

  if (!match) {
    return [];
  }

  return [...match[1].matchAll(/"([^"]+)"/g)].map((item) => item[1]);
}

function slugify(type, name) {
  return `${type}-${name.toLowerCase().replace(/\s+/g, "-")}`;
}

const regionsSource = readSource(regionsPath);
const mapSource = readSource(mapPath);

const regionSlugs = [
  ...extractStringArray(regionsSource, "kabupatenNames").map((name) =>
    slugify("kabupaten", name),
  ),
  ...extractStringArray(regionsSource, "kotaNames").map((name) => slugify("kota", name)),
];

const mapPointMatches = [...mapSource.matchAll(/slug: "([^"]+)"/g)];
const mapSlugs = mapPointMatches.map((match) => match[1]);
const mapPointBlocks = [...mapSource.matchAll(/\{ slug: "([^"]+)", longitude: ([\d.]+), latitude: (-?[\d.]+)/g)];
const provincePath = mapSource.match(/export const eastJavaProvincePath =\s+"([^"]+)"/)?.[1] ?? "";
const bounds = {
  minLongitude: Number(mapSource.match(/minLongitude: ([\d.]+)/)?.[1]),
  maxLongitude: Number(mapSource.match(/maxLongitude: ([\d.]+)/)?.[1]),
  minLatitude: Number(mapSource.match(/minLatitude: (-?[\d.]+)/)?.[1]),
  maxLatitude: Number(mapSource.match(/maxLatitude: (-?[\d.]+)/)?.[1]),
};

const errors = [];
const warnings = [];
const regionSlugSet = new Set(regionSlugs);
const mapSlugSet = new Set(mapSlugs);

for (const slug of regionSlugs) {
  if (!mapSlugSet.has(slug)) {
    errors.push(`Missing map point for region slug: ${slug}`);
  }
}

for (const slug of mapSlugs) {
  if (!regionSlugSet.has(slug)) {
    errors.push(`Map point slug has no matching region: ${slug}`);
  }
}

if (mapSlugs.length !== mapSlugSet.size) {
  errors.push("Map point slugs must be unique.");
}

if (mapSlugs.length !== mapPointBlocks.length) {
  errors.push("Every map point must include slug, longitude, and latitude.");
}

for (const match of mapPointBlocks) {
  const slug = match[1];
  const longitude = Number(match[2]);
  const latitude = Number(match[3]);

  if (longitude < bounds.minLongitude || longitude > bounds.maxLongitude) {
    errors.push(`Longitude for ${slug} is outside East Java bounds.`);
  }

  if (latitude < bounds.minLatitude || latitude > bounds.maxLatitude) {
    errors.push(`Latitude for ${slug} is outside East Java bounds.`);
  }
}

if (provincePath.length < 1000) {
  errors.push("East Java province path looks too short.");
}

if (regionSlugs.length !== 38) {
  warnings.push(`Expected 38 region slugs, found ${regionSlugs.length}.`);
}

const result = {
  summary: {
    regionSlugs: regionSlugs.length,
    mapPoints: mapSlugs.length,
    uniqueMapPoints: mapSlugSet.size,
    provincePathLength: provincePath.length,
  },
  passed: errors.length === 0,
  errors,
  warnings,
};

console.log(JSON.stringify(result, null, 2));

if (errors.length > 0) {
  process.exit(1);
}
