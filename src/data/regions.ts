import { batikPatterns } from "@/data/batikPatterns";
import { destinations as destinationItems } from "@/data/destinations";
import { foods as foodItems } from "@/data/foods";
import { heritageItems } from "@/data/heritageItems";
import type { Region, RegionType } from "@/types/region";

const kabupatenNames = [
  "Bangkalan",
  "Banyuwangi",
  "Blitar",
  "Bojonegoro",
  "Bondowoso",
  "Gresik",
  "Jember",
  "Jombang",
  "Kediri",
  "Lamongan",
  "Lumajang",
  "Madiun",
  "Magetan",
  "Malang",
  "Mojokerto",
  "Nganjuk",
  "Ngawi",
  "Pacitan",
  "Pamekasan",
  "Pasuruan",
  "Ponorogo",
  "Probolinggo",
  "Sampang",
  "Sidoarjo",
  "Situbondo",
  "Sumenep",
  "Trenggalek",
  "Tuban",
  "Tulungagung",
];

const kotaNames = [
  "Batu",
  "Blitar",
  "Kediri",
  "Madiun",
  "Malang",
  "Mojokerto",
  "Pasuruan",
  "Probolinggo",
  "Surabaya",
];

const featuredSlugs = new Set([
  "kota-surabaya",
  "kota-malang",
  "kabupaten-banyuwangi",
  "kabupaten-ponorogo",
  "kabupaten-sidoarjo",
  "kota-batu",
]);

const heroImageExtensions: Record<string, string> = {
  "kabupaten-lamongan": "webp",
  "kabupaten-malang": "jpeg",
  "kabupaten-mojokerto": "jpeg",
  "kota-madiun": "jpeg",
};

const regionMetadata: Record<
  string,
  Pick<Region, "area" | "culturalArea" | "nickname" | "population"> &
    Partial<Pick<Region, "dialect">>
> = {
  "kabupaten-pacitan": {
    population: "589.034 jiwa (estimasi 2025)",
    area: "1.433,59 km²",
    culturalArea: "Mataraman pesisir selatan",
    nickname: "Kota 1001 Goa",
    dialect: "Jawa Mataraman",
  },
  "kabupaten-ponorogo": {
    population: "966.111 jiwa (estimasi 2025)",
    area: "1.418,62 km²",
    culturalArea: "Mataraman",
    nickname: "Kota Reog",
    dialect: "Jawa Mataraman",
  },
  "kabupaten-trenggalek": {
    population: "747.614 jiwa (estimasi 2025)",
    area: "1.249,23 km²",
    culturalArea: "Mataraman pesisir selatan",
    nickname: "Kota Gaplek",
    dialect: "Jawa Mataraman",
  },
  "kabupaten-tulungagung": {
    population: "1.119.588 jiwa (estimasi 2025)",
    area: "1.144,53 km²",
    culturalArea: "Mataraman",
    nickname: "Kota Marmer",
    dialect: "Jawa Mataraman",
  },
  "kabupaten-blitar": {
    population: "1.273.451 jiwa (estimasi 2025)",
    area: "1.745,16 km²",
    culturalArea: "Mataraman",
    nickname: "Bumi Penataran",
    dialect: "Jawa Mataraman",
  },
  "kabupaten-kediri": {
    population: "1.702.262 jiwa (estimasi 2025)",
    area: "1.523,56 km²",
    culturalArea: "Mataraman",
    nickname: "Bumi Panjalu",
    dialect: "Jawa Mataraman",
  },
  "kabupaten-malang": {
    population: "2.755.438 jiwa (estimasi 2025)",
    area: "3.473,44 km²",
    culturalArea: "Arek Malangan",
    nickname: "Bumi Kanjuruhan",
    dialect: "Jawa Malangan",
  },
  "kabupaten-lumajang": {
    population: "1.152.264 jiwa (estimasi 2025)",
    area: "1.797,10 km²",
    culturalArea: "Tapal Kuda",
    nickname: "Kota Pisang",
    dialect: "Jawa Timur-Tapalkuda",
  },
  "kabupaten-jember": {
    population: "2.620.135 jiwa (estimasi 2025)",
    area: "3.313,46 km²",
    culturalArea: "Tapal Kuda",
    nickname: "Kota Tembakau",
    dialect: "Jawa dan Madura Pendalungan",
  },
  "kabupaten-banyuwangi": {
    population: "1.764.540 jiwa (estimasi 2025)",
    area: "3.592,90 km²",
    culturalArea: "Osing / Tapal Kuda",
    nickname: "The Sunrise of Java",
    dialect: "Osing",
  },
  "kabupaten-bondowoso": {
    population: "796.300 jiwa (estimasi 2025)",
    area: "1.554,99 km²",
    culturalArea: "Tapal Kuda",
    nickname: "Kota Tape",
    dialect: "Jawa dan Madura Pendalungan",
  },
  "kabupaten-situbondo": {
    population: "704.243 jiwa (estimasi 2025)",
    area: "1.653,72 km²",
    culturalArea: "Tapal Kuda pesisir utara",
    nickname: "Kota Santri",
    dialect: "Madura dan Jawa Tapalkuda",
  },
  "kabupaten-probolinggo": {
    population: "1.193.272 jiwa (estimasi 2025)",
    area: "1.724,51 km²",
    culturalArea: "Tapal Kuda / Tengger",
    nickname: "Bromo Tengger",
    dialect: "Jawa Tengger dan Madura Pendalungan",
  },
  "kabupaten-pasuruan": {
    population: "1.669.400 jiwa (estimasi 2025)",
    area: "1.493,29 km²",
    culturalArea: "Arek / Tapal Kuda barat",
    nickname: "Bumi Santri",
    dialect: "Jawa Arek dan Madura Pendalungan",
  },
  "kabupaten-sidoarjo": {
    population: "2.193.692 jiwa (estimasi 2025)",
    area: "724,04 km²",
    culturalArea: "Arek metropolitan",
    nickname: "Kota Delta",
    dialect: "Jawa Suroboyoan",
  },
  "kabupaten-mojokerto": {
    population: "1.162.696 jiwa (estimasi 2025)",
    area: "984,64 km²",
    culturalArea: "Arek / Majapahit",
    nickname: "Bumi Majapahit",
    dialect: "Jawa Arek",
  },
  "kabupaten-lamongan": {
    population: "1.386.390 jiwa (estimasi 2025)",
    area: "1.752,71 km²",
    culturalArea: "Pesisir utara",
    nickname: "Kota Soto",
    dialect: "Jawa Pesisiran",
  },
  "kabupaten-gresik": {
    population: "1.377.287 jiwa (estimasi 2025)",
    area: "1.256,36 km²",
    culturalArea: "Pesisir utara / Arek",
    nickname: "Kota Pudak",
    dialect: "Jawa Suroboyoan dan Bawean",
  },
  "kabupaten-jombang": {
    population: "1.373.793 jiwa (estimasi 2025)",
    area: "1.109,84 km²",
    culturalArea: "Arek / Mataraman timur",
    nickname: "Kota Santri",
    dialect: "Jawa Arek dan Mataraman",
  },
  "kabupaten-nganjuk": {
    population: "1.138.604 jiwa (estimasi 2025)",
    area: "1.289,07 km²",
    culturalArea: "Mataraman",
    nickname: "Kota Angin",
    dialect: "Jawa Mataraman",
  },
  "kabupaten-madiun": {
    population: "760.948 jiwa (estimasi 2025)",
    area: "1.113,63 km²",
    culturalArea: "Mataraman",
    nickname: "Kampung Pesilat",
    dialect: "Jawa Mataraman",
  },
  "kabupaten-magetan": {
    population: "689.209 jiwa (estimasi 2025)",
    area: "706,44 km²",
    culturalArea: "Mataraman lereng Lawu",
    nickname: "The Nice of Java",
    dialect: "Jawa Mataraman",
  },
  "kabupaten-ngawi": {
    population: "887.172 jiwa (estimasi 2025)",
    area: "1.395,80 km²",
    culturalArea: "Mataraman barat",
    nickname: "Bumi Orek-Orek",
    dialect: "Jawa Mataraman",
  },
  "kabupaten-bojonegoro": {
    population: "1.330.516 jiwa (estimasi 2025)",
    area: "2.312,63 km²",
    culturalArea: "Mataraman Bengawan Solo",
    nickname: "Bumi Angling Dharma",
    dialect: "Jawa Mataraman",
  },
  "kabupaten-tuban": {
    population: "1.231.374 jiwa (estimasi 2025)",
    area: "1.973,50 km²",
    culturalArea: "Pesisir utara",
    nickname: "Bumi Wali",
    dialect: "Jawa Pesisiran",
  },
  "kabupaten-bangkalan": {
    population: "1.112.956 jiwa (estimasi 2025)",
    area: "1.301,03 km²",
    culturalArea: "Madura barat",
    nickname: "Kota Dzikir dan Shalawat",
    dialect: "Madura",
  },
  "kabupaten-sampang": {
    population: "1.027.538 jiwa (estimasi 2025)",
    area: "1.228,25 km²",
    culturalArea: "Madura",
    nickname: "Kota Bahari",
    dialect: "Madura",
  },
  "kabupaten-pamekasan": {
    population: "893.327 jiwa (estimasi 2025)",
    area: "795,15 km²",
    culturalArea: "Madura",
    nickname: "Gerbang Salam",
    dialect: "Madura",
  },
  "kabupaten-sumenep": {
    population: "1.159.397 jiwa (estimasi 2025)",
    area: "2.084,02 km²",
    culturalArea: "Madura timur dan kepulauan",
    nickname: "The Soul of Madura",
    dialect: "Madura",
  },
  "kota-kediri": {
    population: "301.202 jiwa (estimasi 2025)",
    area: "67,23 km²",
    culturalArea: "Mataraman perkotaan",
    nickname: "Kota Tahu",
    dialect: "Jawa Mataraman",
  },
  "kota-blitar": {
    population: "156.330 jiwa (estimasi 2025)",
    area: "33,20 km²",
    culturalArea: "Mataraman perkotaan",
    nickname: "Bumi Bung Karno",
    dialect: "Jawa Mataraman",
  },
  "kota-malang": {
    population: "879.873 jiwa (estimasi 2025)",
    area: "111,08 km²",
    culturalArea: "Arek Malangan",
    nickname: "Kota Pendidikan",
    dialect: "Jawa Malangan",
  },
  "kota-probolinggo": {
    population: "252.085 jiwa (estimasi 2025)",
    area: "54,68 km²",
    culturalArea: "Tapal Kuda perkotaan",
    nickname: "Kota Bayuangga",
    dialect: "Jawa dan Madura Pendalungan",
  },
  "kota-pasuruan": {
    population: "222.334 jiwa (estimasi 2025)",
    area: "39,00 km²",
    culturalArea: "Arek pesisir",
    nickname: "Kota Santri",
    dialect: "Jawa Arek",
  },
  "kota-mojokerto": {
    population: "138.613 jiwa (estimasi 2025)",
    area: "20,22 km²",
    culturalArea: "Arek / Majapahit",
    nickname: "Kota Onde-Onde",
    dialect: "Jawa Arek",
  },
  "kota-madiun": {
    population: "203.552 jiwa (estimasi 2025)",
    area: "36,13 km²",
    culturalArea: "Mataraman perkotaan",
    nickname: "Kota Pendekar",
    dialect: "Jawa Mataraman",
  },
  "kota-surabaya": {
    population: "2.931.611 jiwa (estimasi 2025)",
    area: "350,60 km²",
    culturalArea: "Arek metropolitan",
    nickname: "Kota Pahlawan",
    dialect: "Jawa Suroboyoan",
  },
  "kota-batu": {
    population: "225.120 jiwa (estimasi 2025)",
    area: "194,17 km²",
    culturalArea: "Arek Malangan pegunungan",
    nickname: "Kota Wisata Batu",
    dialect: "Jawa Malangan",
  },
};

const regionShowcase: Record<
  string,
  Partial<
    Pick<
      Region,
      | "tagline"
      | "summary"
      | "nickname"
      | "dialect"
      | "cultureHighlights"
      | "foods"
      | "destinations"
      | "uniqueFacts"
    >
  >
> = {
  "kota-surabaya": {
    tagline: "Kota Pahlawan dengan denyut budaya urban pesisir.",
    summary:
      "Surabaya menyimpan jejak sejarah perjuangan, budaya Arek, kuliner legendaris, dan kawasan heritage yang membentuk identitas kota modern Jawa Timur.",
    nickname: "Kota Pahlawan",
    dialect: "Jawa Suroboyoan",
    cultureHighlights: ["Budaya Arek", "Ludruk", "Kawasan Kota Lama"],
    foods: ["Rujak Cingur", "Lontong Balap", "Semanggi Surabaya"],
    destinations: ["Tugu Pahlawan", "Kota Lama Surabaya", "Jembatan Suramadu"],
    uniqueFacts: [
      "Surabaya menjadi salah satu pusat sejarah perjuangan kemerdekaan Indonesia.",
    ],
  },
  "kota-malang": {
    tagline: "Kota dingin dengan warisan kolonial dan kreativitas muda.",
    summary:
      "Kota Malang dikenal lewat suasana sejuk, kampung tematik, arsitektur heritage, dan kuliner populer yang dekat dengan kehidupan pelajar.",
    nickname: "Kota Pendidikan",
    dialect: "Jawa Malangan",
    cultureHighlights: ["Kampung Warna-Warni", "Topeng Malangan", "Kayutangan Heritage"],
    foods: ["Bakso Malang", "Cwie Mie", "Orem-Orem"],
    destinations: ["Kayutangan Heritage", "Kampung Warna-Warni", "Alun-Alun Malang"],
    uniqueFacts: ["Bahasa walikan menjadi salah satu ciri khas percakapan anak muda Malang."],
  },
  "kabupaten-banyuwangi": {
    tagline: "Ujung timur Jawa dengan festival, gandrung, dan lanskap alam kuat.",
    summary:
      "Banyuwangi menonjol dengan budaya Osing, Tari Gandrung, tradisi lokal, pantai, dan kawasan alam yang membuatnya kuat sebagai showcase budaya-destinasi.",
    nickname: "The Sunrise of Java",
    dialect: "Osing",
    cultureHighlights: ["Tari Gandrung", "Tradisi Kebo-Keboan", "Budaya Osing"],
    foods: ["Sego Tempong", "Rujak Soto", "Pecel Pitik"],
    destinations: ["Kawah Ijen", "Pantai Pulau Merah", "Desa Kemiren"],
    uniqueFacts: ["Banyuwangi dikenal sebagai pintu matahari terbit di ujung timur Pulau Jawa."],
  },
  "kabupaten-ponorogo": {
    tagline: "Rumah Reog dengan identitas seni pertunjukan yang ikonik.",
    summary:
      "Ponorogo dikenal luas melalui Reog, seni pertunjukan yang menjadi ikon budaya Jawa Timur dan mudah dikenali secara visual.",
    nickname: "Kota Reog",
    dialect: "Jawa Mataraman",
    cultureHighlights: ["Reog Ponorogo", "Grebeg Suro", "Jaranan"],
    foods: ["Sate Ponorogo", "Dawet Jabung", "Jenang Mirah"],
    destinations: ["Alun-Alun Ponorogo", "Telaga Ngebel", "Museum Reog"],
    uniqueFacts: ["Topeng dadak merak pada Reog menjadi salah satu ikon budaya paling kuat di Jawa Timur."],
  },
  "kabupaten-sidoarjo": {
    tagline: "Kota Delta dengan kekayaan kuliner pesisir dan batik lokal.",
    summary:
      "Sidoarjo memiliki identitas kuat melalui olahan bandeng, petis, kampung batik, dan peninggalan sejarah di kawasan delta.",
    nickname: "Kota Delta",
    dialect: "Jawa Suroboyoan",
    cultureHighlights: ["Batik Jetis", "Nyadran", "Tari Banjar Kemuning"],
    foods: ["Bandeng Asap", "Lontong Kupang", "Petis"],
    destinations: ["Kampung Batik Jetis", "Candi Pari", "Lumpur Lapindo"],
    uniqueFacts: ["Sidoarjo dikenal sebagai salah satu pusat olahan bandeng di Jawa Timur."],
  },
  "kota-batu": {
    tagline: "Kota wisata pegunungan dengan lanskap apel dan udara sejuk.",
    summary:
      "Kota Batu dikenal sebagai daerah wisata pegunungan dengan agrowisata, destinasi keluarga, dan identitas alam yang kuat.",
    nickname: "Kota Wisata Batu",
    dialect: "Jawa Malangan",
    cultureHighlights: ["Agrowisata Apel", "Kesenian Bantengan", "Desa Wisata"],
    foods: ["Sari Apel", "Keripik Apel", "Susu Batu"],
    destinations: ["Selecta", "Alun-Alun Batu", "Coban Talun"],
    uniqueFacts: ["Batu menjadi salah satu destinasi wisata pegunungan paling populer di Jawa Timur."],
  },
};

function slugify(type: RegionType, name: string) {
  return `${type}-${name.toLowerCase().replaceAll(" ", "-")}`;
}

function getNames<T extends { name: string }>(items: T[]) {
  return items.map((item) => item.name);
}

function getIds<T extends { id: string }>(items: T[]) {
  return items.map((item) => item.id);
}

function createCategories(
  isFeatured: boolean,
  relatedDestinations: typeof destinationItems,
  relatedBatikPatterns: typeof batikPatterns,
) {
  const categories = new Set<Region["categories"][number]>([
    "budaya",
    "kuliner",
    "destinasi",
  ]);
  const destinationText = relatedDestinations
    .map((destination) => `${destination.name} ${destination.type}`)
    .join(" ")
    .toLowerCase();

  if (relatedBatikPatterns.length > 0) {
    categories.add("batik");
  }

  if (/(pantai|pulau|dermaga|mercusuar|pesisir|laut|gili)/.test(destinationText)) {
    categories.add("pesisir");
  }

  if (/(gunung|bukit|kawah|air terjun|coban|telaga|ranu|hutan|puncak|pegunungan)/.test(destinationText)) {
    categories.add("pegunungan");
  }

  if (isFeatured) {
    categories.add("showcase");
  }

  return [...categories];
}

function createGeneratedTagline(displayName: string) {
  return `${displayName} dengan ragam tradisi, kuliner lokal, dan tujuan perjalanan Jawa Timur.`;
}

function createGeneratedSummary(
  displayName: string,
  relatedHeritageItems: typeof heritageItems,
  relatedFoods: typeof foodItems,
  relatedDestinations: typeof destinationItems,
) {
  const highlights = [
    ...getNames(relatedHeritageItems).slice(0, 2),
    ...getNames(relatedFoods).slice(0, 2),
    ...getNames(relatedDestinations).slice(0, 2),
  ];

  if (highlights.length === 0) {
    return `${displayName} memperlihatkan wajah Jawa Timur melalui tradisi warga, kuliner lokal, dan ruang perjalanan yang membentuk identitas daerahnya.`;
  }

  return `${displayName} memperlihatkan wajah Jawa Timur melalui ${highlights.join(", ")}. Daerah ini menyatukan tradisi warga, citarasa lokal, dan ruang perjalanan yang membentuk identitasnya.`;
}

function createGeneratedFacts(
  displayName: string,
  relatedHeritageItems: typeof heritageItems,
  relatedFoods: typeof foodItems,
  relatedDestinations: typeof destinationItems,
  relatedBatikPatterns: typeof batikPatterns,
) {
  const facts = [
    `${displayName} memiliki jejak budaya, kuliner, dan destinasi yang saling terhubung dalam keseharian masyarakat setempat.`,
  ];

  if (relatedBatikPatterns.length > 0) {
    facts.push(
      `${displayName} juga memiliki motif batik atau identitas visual lokal yang memperkaya cerita daerahnya.`,
    );
  }

  return facts;
}

function createRegion(type: RegionType, name: string): Region {
  const slug = slugify(type, name);
  const isFeatured = featuredSlugs.has(slug);
  const showcase = regionShowcase[slug];
  const metadata = regionMetadata[slug];
  const displayName = `${type === "kota" ? "Kota" : "Kabupaten"} ${name}`;
  const relatedFoods = foodItems.filter((food) => food.regionSlug === slug);
  const relatedDestinations = destinationItems.filter(
    (destination) => destination.regionSlug === slug,
  );
  const relatedHeritageItems = heritageItems.filter(
    (heritageItem) => heritageItem.regionSlug === slug,
  );
  const relatedBatikPatterns = batikPatterns.filter(
    (batikPattern) => batikPattern.regionSlug === slug,
  );

  return {
    id: slug,
    name: displayName,
    slug,
    type,
    categories: createCategories(isFeatured, relatedDestinations, relatedBatikPatterns),
    tagline: showcase?.tagline ?? createGeneratedTagline(displayName),
    summary:
      showcase?.summary ??
      createGeneratedSummary(
        displayName,
        relatedHeritageItems,
        relatedFoods,
        relatedDestinations,
      ),
    nickname: showcase?.nickname ?? metadata?.nickname,
    dialect: showcase?.dialect ?? metadata?.dialect,
    culturalArea: metadata?.culturalArea,
    population: metadata?.population,
    area: metadata?.area,
    cultureHighlights: showcase?.cultureHighlights ?? getNames(relatedHeritageItems),
    foods: showcase?.foods ?? getNames(relatedFoods),
    destinations: showcase?.destinations ?? getNames(relatedDestinations),
    uniqueFacts:
      showcase?.uniqueFacts ??
      createGeneratedFacts(
        displayName,
        relatedHeritageItems,
        relatedFoods,
        relatedDestinations,
        relatedBatikPatterns,
      ),
    heroImage: {
      src: `/images/regions/${slug}/hero/hero.${heroImageExtensions[slug] ?? "jpg"}`,
      alt: `Foto hero ${displayName}`,
    },
    foodIds: getIds(relatedFoods),
    destinationIds: getIds(relatedDestinations),
    batikPatternIds: getIds(relatedBatikPatterns),
    heritageItemIds: getIds(relatedHeritageItems),
    isFeatured,
    sourceNotes: [
      {
        label: "Riset Data Publik",
        note: "Populasi dan luas wilayah memakai tabel pembagian administratif Jawa Timur estimasi 2025; relasi budaya, kuliner, dan destinasi disusun dari referensi publik serta aset visual proyek.",
      },
    ],
  };
}

export const regions: Region[] = [
  ...kabupatenNames.map((name) => createRegion("kabupaten", name)),
  ...kotaNames.map((name) => createRegion("kota", name)),
];
