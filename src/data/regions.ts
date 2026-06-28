import type { Region } from "@/types/region";

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

function slugify(type: "kota" | "kabupaten", name: string) {
  return `${type}-${name.toLowerCase().replaceAll(" ", "-")}`;
}

function createRegion(type: "kota" | "kabupaten", name: string): Region {
  const slug = slugify(type, name);
  const isFeatured = featuredSlugs.has(slug);

  return {
    id: slug,
    name: `${type === "kota" ? "Kota" : "Kabupaten"} ${name}`,
    slug,
    type,
    categories: isFeatured
      ? ["budaya", "kuliner", "destinasi", "showcase"]
      : ["budaya", "kuliner", "destinasi"],
    tagline: "Data budaya sedang dikurasi untuk showcase VAST.",
    summary:
      "Ringkasan budaya, kuliner, destinasi, dan fakta unik daerah ini akan diisi dari data statis lokal.",
    isFeatured,
  };
}

export const regions: Region[] = [
  ...kabupatenNames.map((name) => createRegion("kabupaten", name)),
  ...kotaNames.map((name) => createRegion("kota", name)),
];
