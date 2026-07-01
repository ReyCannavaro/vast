import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const regionsRoot = join(root, "public", "images", "regions");
const dataRoot = join(root, "src", "data");

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

function listDirectories(path) {
  if (!existsSync(path)) {
    return [];
  }

  return readdirSync(path)
    .filter((entry) => statSync(join(path, entry)).isDirectory())
    .sort((a, b) => a.localeCompare(b));
}

function listFiles(path) {
  if (!existsSync(path)) {
    return [];
  }

  return readdirSync(path)
    .filter((entry) => statSync(join(path, entry)).isFile())
    .sort((a, b) => a.localeCompare(b));
}

function toDiskPath(publicSrc) {
  return join(root, "public", ...publicSrc.replace(/^\/+/, "").split("/"));
}

function hasSuspiciousAssetName(filename) {
  return /[A-Z_]/.test(filename) || !/\.[a-zA-Z0-9]+$/.test(filename);
}

function pushIssue(target, item) {
  target.push(item);
}

const regionsContent = readFileSync(join(dataRoot, "regions.ts"), "utf8");
const expectedSlugs = [
  ...parseNamesArray(regionsContent, "kabupatenNames").map((name) =>
    slugify("kabupaten", name),
  ),
  ...parseNamesArray(regionsContent, "kotaNames").map((name) => slugify("kota", name)),
];
const expectedSlugSet = new Set(expectedSlugs);
const actualRegionFolders = listDirectories(regionsRoot);
const actualRegionFolderSet = new Set(actualRegionFolders);

const datasets = [
  {
    filename: "heritageItems.ts",
    exportName: "heritageItems",
    label: "heritageItems",
    items: parseJsonArrayFromDataFile("heritageItems.ts", "heritageItems"),
  },
  {
    filename: "foods.ts",
    exportName: "foods",
    label: "foods",
    items: parseJsonArrayFromDataFile("foods.ts", "foods"),
  },
  {
    filename: "destinations.ts",
    exportName: "destinations",
    label: "destinations",
    items: parseJsonArrayFromDataFile("destinations.ts", "destinations"),
  },
  {
    filename: "batikPatterns.ts",
    exportName: "batikPatterns",
    label: "batikPatterns",
    items: parseJsonArrayFromDataFile("batikPatterns.ts", "batikPatterns"),
  },
];

const summary = {
  expectedRegions: expectedSlugs.length,
  regionFolders: actualRegionFolders.length,
  heritageItems: datasets[0].items.length,
  foods: datasets[1].items.length,
  destinations: datasets[2].items.length,
  batikPatterns: datasets[3].items.length,
};

const errors = [];
const warnings = [];

for (const slug of expectedSlugs) {
  if (!actualRegionFolderSet.has(slug)) {
    pushIssue(errors, `Folder region belum ada: public/images/regions/${slug}`);
  }

  const heroFiles = listFiles(join(regionsRoot, slug, "hero")).filter((filename) =>
    /^hero\./i.test(filename),
  );

  if (heroFiles.length === 0) {
    pushIssue(errors, `Hero image belum ada untuk ${slug}`);
  }
}

for (const folder of actualRegionFolders) {
  if (!expectedSlugSet.has(folder)) {
    pushIssue(warnings, `Folder region ekstra tidak ada di regions.ts: ${folder}`);
  }

  for (const group of ["hero", "budaya", "foods", "destinations"]) {
    for (const filename of listFiles(join(regionsRoot, folder, group))) {
      if (hasSuspiciousAssetName(filename)) {
        pushIssue(
          warnings,
          `Nama aset perlu dinormalisasi: public/images/regions/${folder}/${group}/${filename}`,
        );
      }
    }
  }
}

for (const dataset of datasets) {
  const ids = new Set();

  for (const item of dataset.items) {
    if (!item.id) {
      pushIssue(errors, `${dataset.label}: ada item tanpa id`);
    }

    if (ids.has(item.id)) {
      pushIssue(errors, `${dataset.label}: duplikasi id ${item.id}`);
    }

    ids.add(item.id);

    if (!expectedSlugSet.has(item.regionSlug)) {
      pushIssue(errors, `${dataset.label}: regionSlug tidak valid ${item.regionSlug}`);
    }

    if (!item.name || !item.description) {
      pushIssue(errors, `${dataset.label}: item ${item.id} belum punya name/description`);
    }

    if (item.image?.src) {
      const diskPath = toDiskPath(item.image.src);

      if (!existsSync(diskPath)) {
        pushIssue(errors, `${dataset.label}: gambar belum ada untuk ${item.id}: ${item.image.src}`);
      }
    }
  }
}

for (const slug of expectedSlugs) {
  const counts = {
    heritage: datasets[0].items.filter((item) => item.regionSlug === slug).length,
    foods: datasets[1].items.filter((item) => item.regionSlug === slug).length,
    destinations: datasets[2].items.filter((item) => item.regionSlug === slug).length,
    batik: datasets[3].items.filter((item) => item.regionSlug === slug).length,
  };

  if (counts.heritage === 0) {
    pushIssue(errors, `${slug}: belum punya data budaya`);
  }

  if (counts.foods === 0) {
    pushIssue(errors, `${slug}: belum punya data kuliner`);
  }

  if (counts.destinations === 0) {
    pushIssue(errors, `${slug}: belum punya data destinasi`);
  }

  if (counts.batik === 0) {
    pushIssue(warnings, `${slug}: belum punya item batik/pattern`);
  }
}

const result = {
  summary,
  passed: errors.length === 0,
  errors,
  warnings,
};

console.log(JSON.stringify(result, null, 2));

if (errors.length > 0) {
  process.exitCode = 1;
}
