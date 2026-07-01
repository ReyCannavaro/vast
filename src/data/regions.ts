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

function createRegion(type: RegionType, name: string): Region {
  const slug = slugify(type, name);
  const isFeatured = featuredSlugs.has(slug);
  const showcase = regionShowcase[slug];
  const displayName = `${type === "kota" ? "Kota" : "Kabupaten"} ${name}`;

  return {
    id: slug,
    name: displayName,
    slug,
    type,
    categories: isFeatured
      ? ["budaya", "kuliner", "destinasi", "showcase"]
      : ["budaya", "kuliner", "destinasi"],
    tagline: showcase?.tagline ?? "Data budaya sedang dikurasi untuk showcase VAST.",
    summary:
      showcase?.summary ??
      "Ringkasan budaya, kuliner, destinasi, dan fakta unik daerah ini akan diisi dari data statis lokal.",
    nickname: showcase?.nickname,
    dialect: showcase?.dialect,
    cultureHighlights: showcase?.cultureHighlights ?? ["Data budaya sedang dikurasi"],
    foods: showcase?.foods ?? ["Data kuliner sedang dikurasi"],
    destinations: showcase?.destinations ?? ["Data destinasi sedang dikurasi"],
    uniqueFacts: showcase?.uniqueFacts ?? ["Fakta unik daerah sedang dikurasi"],
    heroImage: {
      src: `/images/regions/${slug}/hero/hero.${heroImageExtensions[slug] ?? "jpg"}`,
      alt: `Foto hero ${displayName}`,
    },
    foodIds: [],
    destinationIds: [],
    batikPatternIds: [],
    heritageItemIds: [],
    isFeatured,
    sourceNotes: [],
  };
}

export const regions: Region[] = [
  ...kabupatenNames.map((name) => createRegion("kabupaten", name)),
  ...kotaNames.map((name) => createRegion("kota", name)),
];
