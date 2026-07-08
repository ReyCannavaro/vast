import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
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

function toDiskPath(publicSrc) {
  return join(root, "public", ...publicSrc.replace(/^\/+/, "").split("/"));
}

const regionsContent = readFileSync(join(dataRoot, "regions.ts"), "utf8");
const expectedSlugs = [
  ...parseNamesArray(regionsContent, "kabupatenNames").map((name) =>
    slugify("kabupaten", name),
  ),
  ...parseNamesArray(regionsContent, "kotaNames").map((name) => slugify("kota", name)),
];
const expectedSlugSet = new Set(expectedSlugs);
const matchingGameItems = parseJsonArrayFromDataFile(
  "matchingGameItems.ts",
  "matchingGameItems",
);
const quizQuestions = parseJsonArrayFromDataFile("quizQuestions.ts", "quizQuestions");
const puzzleItems = parseJsonArrayFromDataFile("puzzleItems.ts", "puzzleItems");
const heritageItems = parseJsonArrayFromDataFile("heritageItems.ts", "heritageItems");
const foods = parseJsonArrayFromDataFile("foods.ts", "foods");
const destinations = parseJsonArrayFromDataFile("destinations.ts", "destinations");
const batikPatterns = parseJsonArrayFromDataFile("batikPatterns.ts", "batikPatterns");
const validCategories = new Set(["food", "batik", "destination", "culture"]);
const validDifficulties = new Set(["easy", "medium", "hard"]);
const regionNameBySlug = new Map([
  ...parseNamesArray(regionsContent, "kabupatenNames").map((name) => [
    slugify("kabupaten", name),
    `Kabupaten ${name}`,
  ]),
  ...parseNamesArray(regionsContent, "kotaNames").map((name) => [
    slugify("kota", name),
    `Kota ${name}`,
  ]),
]);
const sourceItemsByCategory = {
  culture: heritageItems,
  food: foods,
  destination: destinations,
  batik: batikPatterns,
};
const sourceLabelsByCategoryAndRegion = Object.fromEntries(
  Object.entries(sourceItemsByCategory).map(([category, items]) => [
    category,
    items.reduce((groups, item) => {
      const labels = groups.get(item.regionSlug) ?? new Set();
      labels.add(item.name);
      groups.set(item.regionSlug, labels);
      return groups;
    }, new Map()),
  ]),
);
const sourceLabelsByCategory = Object.fromEntries(
  Object.entries(sourceItemsByCategory).map(([category, items]) => [
    category,
    items.reduce((labels, item) => {
      labels.add(item.name);
      return labels;
    }, new Set()),
  ]),
);
const sourceImageSrcs = new Set(
  [...heritageItems, ...destinations, ...batikPatterns]
    .map((item) => item.image?.src)
    .filter(Boolean),
);
const ids = new Set();
const pairs = new Set();
const quizIds = new Set();
const puzzleIds = new Set();
const errors = [];
const warnings = [];
const coverage = new Map(expectedSlugs.map((slug) => [slug, 0]));
const quizCoverage = new Map(expectedSlugs.map((slug) => [slug, 0]));
const puzzleCoverage = new Map(expectedSlugs.map((slug) => [slug, 0]));

for (const item of matchingGameItems) {
  if (!item.id || !item.regionSlug || !item.leftLabel || !item.rightLabel) {
    errors.push(`Item matching tidak lengkap: ${JSON.stringify(item)}`);
  }

  if (ids.has(item.id)) {
    errors.push(`Duplikasi id matching: ${item.id}`);
  }

  ids.add(item.id);

  if (!expectedSlugSet.has(item.regionSlug)) {
    errors.push(`regionSlug matching tidak valid: ${item.regionSlug}`);
  }

  if (!validCategories.has(item.category)) {
    errors.push(`Kategori matching tidak valid: ${item.category}`);
  }

  const validSourceLabels =
    sourceLabelsByCategoryAndRegion[item.category]?.get(item.regionSlug) ?? new Set();

  if (!validSourceLabels.has(item.rightLabel)) {
    errors.push(
      `Pasangan matching tidak ada di data sumber: ${item.regionSlug} ${item.category} ${item.rightLabel}`,
    );
  }

  if (item.leftLabel !== regionNameBySlug.get(item.regionSlug)) {
    errors.push(
      `leftLabel matching tidak cocok dengan regionSlug ${item.regionSlug}: ${item.leftLabel}`,
    );
  }

  const pairKey = `${item.regionSlug}|${item.category}|${item.rightLabel}`;

  if (pairs.has(pairKey)) {
    errors.push(`Duplikasi pasangan matching: ${pairKey}`);
  }

  pairs.add(pairKey);
  coverage.set(item.regionSlug, (coverage.get(item.regionSlug) ?? 0) + 1);
}

for (const [regionSlug, count] of coverage) {
  if (count < 5) {
    warnings.push(`${regionSlug}: hanya punya ${count} pasangan matching`);
  }
}

for (const question of quizQuestions) {
  if (
    !question.id ||
    !question.question ||
    !question.correctAnswer ||
    !question.explanation ||
    !Array.isArray(question.options)
  ) {
    errors.push(`Soal quiz tidak lengkap: ${JSON.stringify(question)}`);
  }

  if (quizIds.has(question.id)) {
    errors.push(`Duplikasi id quiz: ${question.id}`);
  }

  quizIds.add(question.id);

  if (question.regionSlug && !expectedSlugSet.has(question.regionSlug)) {
    errors.push(`regionSlug quiz tidak valid: ${question.regionSlug}`);
  }

  const quizCategory = question.id.match(/^quiz-(culture|food|destination|batik)-/)?.[1];

  if (!quizCategory) {
    errors.push(`Kategori quiz tidak terbaca dari id: ${question.id}`);
  }

  if (question.regionSlug && quizCategory) {
    const validSourceLabels =
      sourceLabelsByCategoryAndRegion[quizCategory]?.get(question.regionSlug) ?? new Set();

    if (!validSourceLabels.has(question.correctAnswer)) {
      errors.push(
        `correctAnswer quiz tidak ada di data sumber ${question.regionSlug} ${quizCategory}: ${question.correctAnswer}`,
      );
    }
  }

  for (const option of question.options) {
    if (quizCategory && !sourceLabelsByCategory[quizCategory]?.has(option)) {
      errors.push(`Opsi quiz bukan item ${quizCategory} valid di ${question.id}: ${option}`);
    }
  }

  if (!validDifficulties.has(question.difficulty)) {
    errors.push(`Difficulty quiz tidak valid: ${question.difficulty}`);
  }

  if (question.options.length !== 4) {
    errors.push(`Soal ${question.id} tidak memiliki 4 opsi`);
  }

  if (new Set(question.options).size !== question.options.length) {
    errors.push(`Soal ${question.id} memiliki opsi duplikat`);
  }

  if (!question.options.includes(question.correctAnswer)) {
    errors.push(`Soal ${question.id} tidak memuat correctAnswer di options`);
  }

  if (question.regionSlug) {
    quizCoverage.set(question.regionSlug, (quizCoverage.get(question.regionSlug) ?? 0) + 1);
  }
}

for (const [regionSlug, count] of quizCoverage) {
  if (count < 5) {
    warnings.push(`${regionSlug}: hanya punya ${count} soal quiz`);
  }
}

for (const puzzle of puzzleItems) {
  if (!puzzle.id || !puzzle.regionSlug || !puzzle.title || !puzzle.image?.src) {
    errors.push(`Puzzle tidak lengkap: ${JSON.stringify(puzzle)}`);
  }

  if (puzzleIds.has(puzzle.id)) {
    errors.push(`Duplikasi id puzzle: ${puzzle.id}`);
  }

  puzzleIds.add(puzzle.id);

  if (!expectedSlugSet.has(puzzle.regionSlug)) {
    errors.push(`regionSlug puzzle tidak valid: ${puzzle.regionSlug}`);
  }

  if (!validDifficulties.has(puzzle.difficulty)) {
    errors.push(`Difficulty puzzle tidak valid: ${puzzle.difficulty}`);
  }

  if (!Number.isInteger(puzzle.gridSize) || puzzle.gridSize < 3 || puzzle.gridSize > 4) {
    errors.push(`Grid puzzle tidak valid untuk ${puzzle.id}: ${puzzle.gridSize}`);
  }

  if (puzzle.image?.src && !existsSync(toDiskPath(puzzle.image.src))) {
    errors.push(`Gambar puzzle belum ada untuk ${puzzle.id}: ${puzzle.image.src}`);
  }

  if (puzzle.image?.src && !sourceImageSrcs.has(puzzle.image.src)) {
    errors.push(`Gambar puzzle tidak berasal dari data budaya/destinasi/batik: ${puzzle.id}`);
  }

  puzzleCoverage.set(puzzle.regionSlug, (puzzleCoverage.get(puzzle.regionSlug) ?? 0) + 1);
}

for (const [regionSlug, count] of puzzleCoverage) {
  if (count === 0) {
    warnings.push(`${regionSlug}: belum punya item puzzle`);
  }
}

const categoryCounts = matchingGameItems.reduce((counts, item) => {
  counts[item.category] = (counts[item.category] ?? 0) + 1;
  return counts;
}, {});
const difficultyCounts = quizQuestions.reduce((counts, question) => {
  counts[question.difficulty] = (counts[question.difficulty] ?? 0) + 1;
  return counts;
}, {});
const puzzleDifficultyCounts = puzzleItems.reduce((counts, puzzle) => {
  counts[puzzle.difficulty] = (counts[puzzle.difficulty] ?? 0) + 1;
  return counts;
}, {});

const result = {
  summary: {
    matchingGameItems: matchingGameItems.length,
    coveredRegions: [...coverage.values()].filter((count) => count > 0).length,
    matchingCategories: categoryCounts,
    quizQuestions: quizQuestions.length,
    quizCoveredRegions: [...quizCoverage.values()].filter((count) => count > 0).length,
    quizDifficulties: difficultyCounts,
    puzzleItems: puzzleItems.length,
    puzzleCoveredRegions: [...puzzleCoverage.values()].filter((count) => count > 0).length,
    puzzleDifficulties: puzzleDifficultyCounts,
  },
  passed: errors.length === 0,
  errors,
  warnings,
};

console.log(JSON.stringify(result, null, 2));

if (errors.length > 0) {
  process.exitCode = 1;
}
