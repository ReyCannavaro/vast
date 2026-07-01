import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const regionsRoot = join(process.cwd(), "public", "images", "regions");
const dataRoot = join(process.cwd(), "src", "data");

const SOURCE_NOTE =
  "Dikurasi oleh Tim VAST dari aset visual daerah Jawa Timur dan referensi publik budaya/pariwisata; lisensi aset final tetap dicatat pada dokumentasi submit.";

const acronymWords = new Set(["b29", "bns", "jfc", "sby", "wbl"]);
const properWords = new Map([
  ["cwie", "Cwie"],
  ["de", "De"],
  ["djawatan", "Djawatan"],
  ["kyai", "Kyai"],
  ["mbah", "Mbah"],
  ["ndaru", "Ndaru"],
  ["osing", "Osing"],
  ["suroboyoan", "Suroboyoan"],
]);

function listDirectories(path) {
  return readdirSync(path)
    .filter((entry) => statSync(join(path, entry)).isDirectory())
    .sort((a, b) => a.localeCompare(b));
}

function listFiles(path) {
  return readdirSync(path)
    .filter((entry) => statSync(join(path, entry)).isFile())
    .sort((a, b) => a.localeCompare(b));
}

function stripExtension(filename) {
  const lastDot = filename.lastIndexOf(".");

  if (lastDot <= 0) {
    return filename;
  }

  return filename.slice(0, lastDot);
}

function toKebab(value) {
  return value
    .trim()
    .replaceAll("_", "-")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function titleWord(word) {
  const lower = word.toLowerCase();

  if (acronymWords.has(lower)) {
    return lower.toUpperCase();
  }

  if (properWords.has(lower)) {
    return properWords.get(lower);
  }

  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

function toTitle(value) {
  return stripExtension(value)
    .replaceAll("_", "-")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map(titleWord)
    .join(" ");
}

function regionNameFromSlug(regionSlug) {
  return regionSlug
    .split("-")
    .map(titleWord)
    .join(" ");
}

function imageAsset(regionSlug, folder, filename, label, altPrefix) {
  const src = `/images/regions/${regionSlug}/${folder}/${filename}`;

  return {
    src,
    alt: `${altPrefix} ${label} dari ${regionNameFromSlug(regionSlug)}`,
    source: {
      label: "Kurasi Tim VAST",
      note: SOURCE_NOTE,
    },
  };
}

function inferHeritageCategory(name) {
  const slug = toKebab(name);

  if (slug.includes("batik")) return "batik";
  if (
    [
      "festival",
      "parade",
      "carnival",
      "jfc",
    ].some((keyword) => slug.includes(keyword))
  ) {
    return "festival";
  }
  if (
    [
      "upacara",
      "tradisi",
      "nyadran",
      "rokat",
      "petik",
      "labuhan",
      "grebeg",
      "ruwat",
      "larung",
      "kasada",
      "karo",
      "tetaken",
      "sedudo",
      "bersih",
      "mojotirto",
      "dam-bagong",
      "ulur",
      "praon",
      "peraon",
      "lampah",
      "siraman",
      "mendhak",
      "kerapan",
      "karapan",
    ].some((keyword) => slug.includes(keyword))
  ) {
    return "tradisi";
  }
  if (
    [
      "tari",
      "reog",
      "reyog",
      "ludruk",
      "jaran",
      "janger",
      "gandrung",
      "topeng",
      "wayang",
      "ketoprak",
      "bantengan",
      "sandur",
      "dongkrek",
      "thengul",
      "pencak",
      "musik",
      "ojung",
      "ojhung",
      "daul",
      "can-macanan",
      "gajah",
      "bregada",
      "terbang",
      "glipang",
      "besutan",
      "kesenian",
      "seblang",
    ].some((keyword) => slug.includes(keyword))
  ) {
    return "seni";
  }
  if (["candi", "situs", "sejarah"].some((keyword) => slug.includes(keyword))) {
    return "sejarah";
  }

  return "ikon";
}

function inferDestinationType(name) {
  const slug = toKebab(name);

  if (
    [
      "air-terjun",
      "pantai",
      "bukit",
      "telaga",
      "gua",
      "goa",
      "kawah",
      "coban",
      "ranu",
      "pulau",
      "sungai",
      "savana",
      "taman-galuh",
      "hutan",
      "sumber",
      "sendang",
      "alas",
      "padusan",
      "baluran",
      "rengganis",
      "watu",
      "dermaga",
      "mercusuar",
      "de-djawatan",
    ].some((keyword) => slug.includes(keyword))
  ) {
    return "alam";
  }
  if (
    ["masjid", "makam", "sunan", "vihara", "ziarah"].some((keyword) =>
      slug.includes(keyword),
    )
  ) {
    return "religi";
  }
  if (
    ["candi", "museum", "monumen", "tugu", "situs", "benteng"].some((keyword) =>
      slug.includes(keyword),
    )
  ) {
    return "sejarah";
  }
  if (["batik", "kampung", "heritage", "kya-kya"].some((keyword) => slug.includes(keyword))) {
    return "budaya";
  }

  return "kota";
}

function inferFoodTags(name) {
  const slug = toKebab(name);
  const tags = new Set(["kuliner-lokal"]);

  if (
    ["keripik", "kripik", "brem", "jenang", "pudak", "suwar", "tape", "wingko", "pia", "bipang", "opak", "enting", "ledre", "strundel"].some(
      (keyword) => slug.includes(keyword),
    )
  ) {
    tags.add("oleh-oleh");
  }
  if (
    ["soto", "rawon", "kaldu", "kupang", "bakso", "sayur", "tajin", "lontong", "campor", "becek"].some(
      (keyword) => slug.includes(keyword),
    )
  ) {
    tags.add("kuah");
  }
  if (["sambal", "pecel", "bledek", "setan", "rujak"].some((keyword) => slug.includes(keyword))) {
    tags.add("pedas");
  }
  if (["nasi", "sego", "lontong", "kupat"].some((keyword) => slug.includes(keyword))) {
    tags.add("makanan-utama");
  }
  if (["sate", "ayam", "bebek", "bandeng", "ikan", "belut", "rajungan", "lorjuk"].some((keyword) => slug.includes(keyword))) {
    tags.add("lauk");
  }
  if (["dawet", "wedang", "susu", "sirup", "legen", "jamu"].some((keyword) => slug.includes(keyword))) {
    tags.add("minuman");
  }
  if (["kue", "klepon", "wajik", "jadah", "getuk", "gethuk", "lupis", "cenil", "onde", "madumongso", "dumreg"].some((keyword) => slug.includes(keyword))) {
    tags.add("manis");
  }

  return [...tags].sort((a, b) => a.localeCompare(b));
}

function sourceObject() {
  return {
    label: "Kurasi Tim VAST",
    note: SOURCE_NOTE,
  };
}

function writeDataFile(filename, importName, exportName, data) {
  const content = [
    `import type { ${importName} } from "@/types/region";`,
    "",
    `export const ${exportName}: ${importName}[] = ${JSON.stringify(data, null, 2)};`,
    "",
  ].join("\n");

  writeFileSync(join(dataRoot, filename), content);
}

const heritageItems = [];
const foods = [];
const destinations = [];
const batikPatterns = [];

for (const regionSlug of listDirectories(regionsRoot)) {
  const regionPath = join(regionsRoot, regionSlug);

  const budayaPath = join(regionPath, "budaya");
  if (statExists(budayaPath)) {
    for (const filename of listFiles(budayaPath)) {
      const base = stripExtension(filename);
      const itemSlug = toKebab(base);
      const name = toTitle(base);
      const category = inferHeritageCategory(base);
      const regionName = regionNameFromSlug(regionSlug);

      heritageItems.push({
        id: `${regionSlug}-heritage-${itemSlug}`,
        regionSlug,
        name,
        category,
        description: `${name} menjadi salah satu representasi budaya ${regionName} yang disiapkan sebagai konten kurasi VAST.`,
        image: imageAsset(regionSlug, "budaya", filename, name, "Gambar budaya"),
        source: sourceObject(),
      });

      if (category === "batik") {
        batikPatterns.push({
          id: `${regionSlug}-batik-${itemSlug}`,
          regionSlug,
          name,
          description: `${name} menjadi motif atau identitas visual batik yang terkait dengan ${regionName}.`,
          inspiration: `Identitas budaya ${regionName}`,
          colors: [],
          image: imageAsset(regionSlug, "budaya", filename, name, "Gambar motif"),
          source: sourceObject(),
        });
      }
    }
  }

  const foodsPath = join(regionPath, "foods");
  if (statExists(foodsPath)) {
    for (const filename of listFiles(foodsPath)) {
      const base = stripExtension(filename);
      const itemSlug = toKebab(base);
      const name = toTitle(base);
      const regionName = regionNameFromSlug(regionSlug);

      foods.push({
        id: `${regionSlug}-food-${itemSlug}`,
        regionSlug,
        name,
        description: `${name} adalah kuliner khas atau populer yang menjadi bagian dari identitas ${regionName}.`,
        image: imageAsset(regionSlug, "foods", filename, name, "Gambar kuliner"),
        tags: inferFoodTags(base),
        source: sourceObject(),
      });
    }
  }

  const destinationsPath = join(regionPath, "destinations");
  if (statExists(destinationsPath)) {
    for (const filename of listFiles(destinationsPath)) {
      const base = stripExtension(filename);
      const itemSlug = toKebab(base);
      const name = toTitle(base);
      const regionName = regionNameFromSlug(regionSlug);

      destinations.push({
        id: `${regionSlug}-destination-${itemSlug}`,
        regionSlug,
        name,
        type: inferDestinationType(base),
        description: `${name} menjadi salah satu destinasi atau landmark yang merepresentasikan karakter ${regionName}.`,
        image: imageAsset(regionSlug, "destinations", filename, name, "Gambar destinasi"),
        source: sourceObject(),
      });
    }
  }
}

function statExists(path) {
  try {
    return statSync(path).isDirectory();
  } catch {
    return false;
  }
}

writeDataFile("heritageItems.ts", "HeritageItem", "heritageItems", heritageItems);
writeDataFile("foods.ts", "FoodItem", "foods", foods);
writeDataFile("destinations.ts", "DestinationItem", "destinations", destinations);
writeDataFile("batikPatterns.ts", "BatikPattern", "batikPatterns", batikPatterns);

console.log(
  JSON.stringify(
    {
      heritageItems: heritageItems.length,
      foods: foods.length,
      destinations: destinations.length,
      batikPatterns: batikPatterns.length,
    },
    null,
    2,
  ),
);
