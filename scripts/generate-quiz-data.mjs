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

function hashText(text) {
  let hash = 0;

  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }

  return hash;
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

function pickItems(items, count) {
  return sortByName(items).slice(0, count);
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

function createOptions(correctItem, categoryItems, seed) {
  const candidates = sortByName(categoryItems).filter(
    (item) =>
      item.id !== correctItem.id &&
      item.name.toLowerCase() !== correctItem.name.toLowerCase(),
  );
  const offset = candidates.length > 0 ? hashText(seed) % candidates.length : 0;
  const distractors = [];

  for (let index = 0; distractors.length < 3 && index < candidates.length * 2; index += 1) {
    const candidate = candidates[(offset + index * 7) % candidates.length];

    if (!distractors.some((item) => item.name === candidate.name)) {
      distractors.push(candidate);
    }
  }

  const options = [correctItem.name, ...distractors.map((item) => item.name)];
  const rotation = hashText(`${seed}-rotation`) % options.length;
  return [
    ...options.slice(rotation),
    ...options.slice(0, rotation),
  ];
}

function createQuizQuestion({ item, category, categoryItems, regionNames }) {
  const regionName = regionNames.get(item.regionSlug);
  const correctAnswer = item.name;
  const typeText = {
    culture: "warisan budaya",
    food: "kuliner",
    destination: "destinasi atau landmark",
    batik: "motif atau identitas batik",
  }[category];
  const questionText = {
    culture: `Manakah warisan budaya yang dikurasi sebagai bagian dari identitas ${regionName}?`,
    food: `Manakah kuliner lokal yang dikaitkan dengan ${regionName}?`,
    destination: `Manakah destinasi atau landmark yang berada dalam kurasi ${regionName}?`,
    batik: `Manakah motif atau identitas batik yang dikaitkan dengan ${regionName}?`,
  }[category];
  const difficulty = {
    culture: "hard",
    food: "medium",
    destination: "medium",
    batik: "hard",
  }[category];

  return {
    id: `quiz-${category}-${item.id}`,
    regionSlug: item.regionSlug,
    question: questionText,
    options: createOptions(item, categoryItems, `${category}-${item.id}`),
    correctAnswer,
    explanation: `${item.name} termasuk ${typeText} yang dikurasi sebagai bagian dari identitas ${regionName}. ${item.description}`,
    difficulty,
  };
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
const quizQuestions = [];

for (const regionSlug of [...regionNames.keys()].sort((a, b) => a.localeCompare(b))) {
  for (const item of pickHeritageItems(heritageByRegion.get(regionSlug) ?? [])) {
    quizQuestions.push(
      createQuizQuestion({ item, category: "culture", categoryItems: heritageItems, regionNames }),
    );
  }

  for (const item of pickItems(foodsByRegion.get(regionSlug) ?? [], 2)) {
    quizQuestions.push(
      createQuizQuestion({ item, category: "food", categoryItems: foods, regionNames }),
    );
  }

  for (const item of pickItems(destinationsByRegion.get(regionSlug) ?? [], 2)) {
    quizQuestions.push(
      createQuizQuestion({
        item,
        category: "destination",
        categoryItems: destinations,
        regionNames,
      }),
    );
  }

  for (const item of pickItems(batikByRegion.get(regionSlug) ?? [], 1)) {
    quizQuestions.push(
      createQuizQuestion({ item, category: "batik", categoryItems: batikPatterns, regionNames }),
    );
  }
}

const content = [
  `import type { QuizQuestion } from "@/types/region";`,
  "",
  `export const quizQuestions: QuizQuestion[] = ${JSON.stringify(
    quizQuestions,
    null,
    2,
  )};`,
  "",
].join("\n");

writeFileSync(join(dataRoot, "quizQuestions.ts"), content);

const difficultyCounts = quizQuestions.reduce((counts, question) => {
  counts[question.difficulty] = (counts[question.difficulty] ?? 0) + 1;
  return counts;
}, {});

console.log(
  JSON.stringify(
    {
      total: quizQuestions.length,
      difficulties: difficultyCounts,
    },
    null,
    2,
  ),
);
