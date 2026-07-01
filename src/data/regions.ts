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
  return `${displayName} dalam kurasi budaya, kuliner, dan destinasi Jawa Timur.`;
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

  return `${displayName} memiliki ${relatedHeritageItems.length} data budaya, ${relatedFoods.length} data kuliner, dan ${relatedDestinations.length} data destinasi dalam kurasi awal VAST${highlights.length > 0 ? `, termasuk ${highlights.join(", ")}.` : "."}`;
}

function createGeneratedFacts(
  displayName: string,
  relatedHeritageItems: typeof heritageItems,
  relatedFoods: typeof foodItems,
  relatedDestinations: typeof destinationItems,
  relatedBatikPatterns: typeof batikPatterns,
) {
  const facts = [
    `Kurasi awal ${displayName} memuat ${relatedHeritageItems.length} budaya, ${relatedFoods.length} kuliner, dan ${relatedDestinations.length} destinasi lokal.`,
  ];

  if (relatedBatikPatterns.length > 0) {
    facts.push(
      `${displayName} memiliki ${relatedBatikPatterns.length} data motif batik atau identitas visual yang siap ditampilkan di galeri.`,
    );
  }

  return facts;
}

function createRegion(type: RegionType, name: string): Region {
  const slug = slugify(type, name);
  const isFeatured = featuredSlugs.has(slug);
  const showcase = regionShowcase[slug];
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
    nickname: showcase?.nickname,
    dialect: showcase?.dialect,
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
        label: "Kurasi Tim VAST",
        note: "Relasi data region dikurasi dari konten budaya, kuliner, destinasi, dan batik/pattern yang tersedia di data statis VAST.",
      },
    ],
  };
}

export const regions: Region[] = [
  ...kabupatenNames.map((name) => createRegion("kabupaten", name)),
  ...kotaNames.map((name) => createRegion("kota", name)),
];
