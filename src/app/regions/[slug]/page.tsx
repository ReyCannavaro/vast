import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { destinations } from "@/data/destinations";
import { foods } from "@/data/foods";
import { heritageItems } from "@/data/heritageItems";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RegionCultureShowcase, RegionDetailShowcase } from "@/components/regions";
import { getAllRegions, getRegionBySlug } from "@/lib/regionService";
import type { Region } from "@/types/region";

type RegionDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type FactItem = {
  title: string;
  body: string;
  icon: "spark" | "mountain" | "pin";
};

const categoryLabels: Record<string, string> = {
  batik: "Batik",
  budaya: "Budaya",
  destinasi: "Destinasi",
  kuliner: "Kuliner",
  pegunungan: "Pegunungan",
  pesisir: "Pesisir",
  showcase: "Showcase",
};

function formatType(region: Region) {
  return region.type === "kota" ? "KOTA" : "KABUPATEN";
}

function getShortName(region: Region) {
  return region.name.replace(/^Kabupaten\s+/i, "").replace(/^Kota\s+/i, "");
}

function formatCategories(region: Region) {
  return region.categories
    .map((category) => categoryLabels[category] ?? category)
    .join(" & ");
}

function formatRegionCharacter(region: Region) {
  return region.culturalArea ?? formatCategories(region);
}

function getRegionCollections(region: Region) {
  return {
    heritage: heritageItems.filter((item) => item.regionSlug === region.slug),
    foods: foods.filter((item) => item.regionSlug === region.slug),
    destinations: destinations.filter((item) => item.regionSlug === region.slug),
  };
}

function buildFactItems(region: Region): FactItem[] {
  const factIcons: FactItem["icon"][] = ["spark", "mountain", "pin"];
  const facts: FactItem[] = region.uniqueFacts.map((fact, index) => ({
    title:
      index === 0
        ? region.nickname ?? "Fakta Utama"
        : region.cultureHighlights[index] ?? "Identitas Lokal",
    body: fact,
    icon: factIcons[index % factIcons.length],
  }));

  const fallbackFacts: FactItem[] = [
    {
      title: region.dialect ?? "Bahasa Daerah",
      body: `${region.name} memiliki warna budaya yang kuat lewat ${region.dialect ?? "tradisi lokal"} dan ragam ekspresi masyarakatnya.`,
      icon: "spark",
    },
    {
      title: region.nickname ?? formatRegionCharacter(region),
      body: `${region.nickname ?? formatRegionCharacter(region)} menjadi salah satu penanda yang membuat ${getShortName(region)} mudah dikenali dalam peta budaya Jawa Timur.`,
      icon: "mountain",
    },
  ];

  return [...facts, ...fallbackFacts].slice(0, 3);
}

function getNearbyRegions(region: Region) {
  const matchingCategory = getAllRegions().filter(
    (item) =>
      item.slug !== region.slug &&
      item.categories.some((category) => region.categories.includes(category)),
  );

  const fallbackRegions = getAllRegions().filter((item) => item.slug !== region.slug);

  return [...matchingCategory, ...fallbackRegions]
    .filter((item, index, collection) => collection.findIndex((target) => target.slug === item.slug) === index)
    .slice(0, 4);
}

function InlineIcon({ type }: { type: FactItem["icon"] | "map" | "arrow" }) {
  if (type === "arrow") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12h14m-6-6 6 6-6 6"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  if (type === "map") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M12 10.5h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="4" />
      </svg>
    );
  }

  const paths = {
    spark: "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Zm6 10 1 2.7 2.7 1-2.7 1-1 2.7-1-2.7-2.7-1 2.7-1 1-2.7Z",
    mountain: "M4 18 9.4 8.7l3.1 5 2.1-3.2L20 18H4Z",
    pin: "M12 21s6-4.8 6-10a6 6 0 1 0-12 0c0 5.2 6 10 6 10Zm0-8.2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  };

  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <path d={paths[type]} stroke="currentColor" strokeLinejoin="round" strokeWidth="1.9" />
    </svg>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[10px] border border-[#e5dcd1] bg-[#f4f1ec] px-6 py-7">
      <p className="text-[15px] text-[#74675e]">{label}</p>
      <p className="mt-3 text-[15px] font-medium text-primary">{value}</p>
    </div>
  );
}

export function generateStaticParams() {
  return getAllRegions().map((region) => ({
    slug: region.slug,
  }));
}

export async function generateMetadata({
  params,
}: RegionDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const region = getRegionBySlug(slug);

  if (!region) {
    return {
      title: "Region tidak ditemukan - VAST",
    };
  }

  return {
    title: `${region.name} - VAST`,
    description: region.summary,
  };
}

export default async function RegionDetailPage({ params }: RegionDetailPageProps) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);

  if (!region) {
    notFound();
  }

  const shortName = getShortName(region);
  const regionCollections = getRegionCollections(region);
  const cultureItems = regionCollections.heritage.slice(0, 4);
  const foodItems = regionCollections.foods.slice(0, 3);
  const destinationItems = regionCollections.destinations.slice(0, 3);
  const factItems = buildFactItems(region);
  const nearbyRegions = getNearbyRegions(region);
  const heroImage = region.heroImage;
  const chips = [
    region.cultureHighlights[0],
    region.cultureHighlights[1],
    region.foods[0],
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-white text-[#211f1d]">
      <SiteHeader />

      <main>
        <section className="relative min-h-[700px] overflow-hidden bg-[#776e6b] text-white">
          {heroImage ? (
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-[#19120d]/28" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_64%_30%,rgb(155_96_45_/_0.14),transparent_42%),linear-gradient(180deg,rgb(17_13_10_/_0.18),rgb(17_13_10_/_0.36)_46%,rgb(17_13_10_/_0.68))]" />
          <div className="absolute inset-x-0 top-0 h-[320px] bg-gradient-to-b from-[#17110d]/72 via-[#17110d]/34 to-transparent" />
          <div className="relative mx-auto flex min-h-[700px] max-w-7xl flex-col px-6 pb-14 pt-44 lg:px-10">
            <nav
              className="text-lg font-medium text-white/72 drop-shadow-[0_2px_12px_rgb(0_0_0_/_0.38)]"
              aria-label="Breadcrumb"
            >
              <Link href="/gallery" className="transition hover:text-white">
                Gallery
              </Link>
              <span className="mx-2 text-white/42">›</span>
              <span className="text-white/92">{shortName}</span>
            </nav>

            <div className="mt-auto flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="inline-flex rounded-[8px] bg-[#ffd4b8] px-4 py-2 text-sm font-medium uppercase tracking-[0.02em] text-[#3a2820]">
                  {formatType(region)}
                </p>
                <h1 className="mt-6 text-6xl font-semibold leading-none tracking-[-0.03em] text-white md:text-7xl">
                  {shortName}
                </h1>
                <p className="mt-4 text-base text-white/82">{region.tagline}</p>
              </div>

              <Link
                href="/regions"
                className="inline-flex h-12 items-center justify-center rounded-[10px] border border-white/22 bg-white/7 px-8 text-base font-medium text-white transition hover:bg-white/14"
              >
                Kembali
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="grid gap-6 md:grid-cols-4">
            <StatCard label="Populasi" value={region.population ?? "Belum tersedia"} />
            <StatCard label="Luas Wilayah" value={region.area ?? "Belum tersedia"} />
            <StatCard label="Karakter Wilayah" value={formatRegionCharacter(region)} />
            <StatCard label="Julukan/Identitas" value={region.nickname ?? formatRegionCharacter(region)} />
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-20 lg:grid-cols-[1fr_375px] lg:px-10">
          <article className="overflow-hidden rounded-[12px] border border-[#eadfd6] bg-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.92),0_22px_58px_rgb(72_54_39_/_0.075)]">
            {heroImage ? (
              <div className="relative aspect-[16/5] w-full overflow-hidden bg-[#d9d4ce]">
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  fill
                  sizes="(min-width: 1024px) 760px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[#1b130d]/12" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(18_13_10_/_0.04),rgb(18_13_10_/_0.18)_54%,rgb(18_13_10_/_0.42))]" />
              </div>
            ) : null}
            <div className="p-8 md:p-10">
            <h2 className="text-4xl font-medium tracking-[-0.03em] text-primary">
              Identitas Budaya
            </h2>
            <p className="mt-7 max-w-3xl text-base leading-8 text-[#675b53]">
              {region.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {chips.map((chip, index) => (
                <span
                  key={chip}
                  className={`rounded-[8px] border px-4 py-2 text-sm ${
                    index === 1
                      ? "border-[#d8ded0] bg-[#eef2ea] text-[#65755a]"
                      : "border-[#ead5cb] bg-[#fbf0e9] text-primary"
                  }`}
                >
                  {chip}
                </span>
              ))}
            </div>
            </div>
          </article>

          <aside>
            <h2 className="text-base font-medium text-[#342f2b]">Fakta Unik</h2>
            <div className="mt-5 grid gap-4">
              {factItems.map((fact, index) => (
                <article
                  key={`${fact.title}-${index}`}
                  className="border-l-4 border-primary bg-[#e7e4df] px-7 py-6"
                >
                  <div className="flex gap-4">
                    <span className="mt-1 text-primary">
                      <InlineIcon type={fact.icon} />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-[#262321]">{fact.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#5f554e]">{fact.body}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </section>

        <RegionCultureShowcase items={cultureItems} regionName={shortName} />

        <RegionDetailShowcase
          destinations={destinationItems}
          foods={foodItems}
          regionName={shortName}
          tasteLabel={region.dialect ?? shortName}
        />

        <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
          <div className="flex flex-col gap-8 rounded-[18px] bg-primary px-8 py-10 text-white md:flex-row md:items-center md:justify-between md:px-12">
            <div>
              <p className="text-base">Tes Pengetahuan Budayamu?</p>
              <p className="mt-3 text-base text-white/84">
                Ikuti kuis interaktif tentang tradisi dan sejarah {region.name}.
              </p>
            </div>
            <Link
              href="/game/quiz"
              className="inline-flex min-h-14 items-center justify-center rounded-[10px] bg-white px-10 text-base font-bold text-primary transition hover:bg-[#f7efe8]"
            >
              Coba Culture Quiz tentang {shortName}
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
          <h2 className="text-base font-medium">Jelajahi Wilayah Sekitar</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {nearbyRegions.map((item) => (
              <Link
                key={item.slug}
                href={`/regions/${item.slug}`}
                className="flex min-h-20 items-center gap-4 rounded-[10px] border border-[#eadfd6] bg-[#fbfaf8] px-5 transition hover:-translate-y-0.5 hover:border-primary/40"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-[#ece8e2] text-primary">
                  <InlineIcon type="map" />
                </span>
                <span className="font-bold text-[#25211e]">{getShortName(item)}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
