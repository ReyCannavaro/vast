import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/layout";
import { batikPatterns } from "@/data/batikPatterns";
import { destinations } from "@/data/destinations";
import { foods } from "@/data/foods";
import { heritageItems } from "@/data/heritageItems";
import { getGameCatalog } from "@/lib/gameService";
import { getEastJavaMapData } from "@/lib/mapService";
import { getAllRegions, getFeaturedRegions } from "@/lib/regionService";

const categoryCards = [
  {
    title: "Galeri Warisan Budaya",
    description:
      "Jelajahi koleksi pertunjukan, tradisi, ritual, dan ikon budaya daerah Jawa Timur.",
    total: heritageItems.length,
  },
  {
    title: "Kuliner Khas",
    description:
      "Temukan cita rasa autentik dari hidangan khas yang mencerminkan karakter daerah.",
    total: foods.length,
  },
  {
    title: "Destinasi Budaya",
    description:
      "Telusuri tempat bersejarah, lanskap alam, dan landmark yang menyimpan cerita lokal.",
    total: destinations.length,
  },
  {
    title: "Batik Khas Daerah",
    description:
      "Kenali motif batik lokal yang membawa simbol, warna, dan inspirasi khas tiap daerah.",
    total: batikPatterns.length,
  },
];

function MiniMapPreview() {
  const mapData = getEastJavaMapData();
  const selectedRegion = mapData.regions.find(
    (item) => item.region.slug === "kabupaten-banyuwangi",
  );

  return (
    <div className="rounded-[18px] border border-border bg-surface p-5 shadow-[0_18px_50px_rgb(38_35_31_/_0.06)]">
      <div className="mb-4 flex items-center justify-between text-xs font-semibold text-muted">
        <span>Interactive Region Map</span>
        <span>{mapData.mappedRegions} regions</span>
      </div>
      <div className="grid min-h-[250px] place-items-center rounded-[10px] bg-[#5b97a0] p-5">
        <svg
          viewBox={mapData.viewBox}
          role="img"
          aria-label="Preview peta Jawa Timur"
          className="h-auto w-full max-w-[360px]"
        >
          <path d={mapData.path} fill="#e8dfcb" stroke="#f8f4ea" strokeWidth="0.55" />
          {selectedRegion ? (
            <circle
              cx={selectedRegion.x}
              cy={selectedRegion.y}
              r="2.4"
              fill="#d86435"
              stroke="#f8f4ea"
              strokeWidth="0.55"
            />
          ) : null}
        </svg>
      </div>
      <p className="mt-4 text-center text-xs text-muted">
        Click on a region to explore its unique identity.
      </p>
    </div>
  );
}

export default function Home() {
  const regions = getAllRegions();
  const featuredRegions = getFeaturedRegions();
  const gameCatalog = getGameCatalog();
  const spotlightRegion = featuredRegions.find(
    (region) => region.slug === "kabupaten-banyuwangi",
  ) ?? featuredRegions[0];
  const featuredDestinations = destinations
    .filter((destination) => destination.image)
    .slice(0, 3);

  return (
    <div className="vast-shell">
      <SiteHeader />
      <main>
        <section id="home" className="relative min-h-[760px] overflow-hidden bg-ink text-white">
          <Image
            src="/images/regions/kabupaten-banyuwangi/hero/hero.jpg"
            alt="Lanskap budaya Banyuwangi sebagai pembuka VAST"
            fill
            priority
            className="object-cover opacity-60"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/36 to-black/24" />
          <div className="relative mx-auto flex min-h-[760px] max-w-7xl flex-col justify-center px-6 pb-24 pt-32 lg:px-10">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold leading-[1.08] tracking-[-0.04em] md:text-7xl">
                Satu Peta, 38 Daerah, Tak Terbatas Cerita.
              </h1>
              <p className="mt-8 max-w-xl text-sm leading-7 text-white/78 md:text-base">
                Jelajahi kekayaan budaya Jawa Timur melalui pengalaman interaktif:
                temukan tradisi lokal, destinasi ikonik, kuliner khas, dan kisah unik
                dari setiap kota dan kabupaten.
              </p>
            </div>
          </div>
          <div className="absolute bottom-[-82px] left-1/2 hidden w-[680px] -translate-x-1/2 rounded-[18px] bg-surface p-7 text-foreground shadow-[0_26px_80px_rgb(0_0_0_/_0.16)] lg:grid lg:grid-cols-[260px_1fr] lg:gap-9">
            <div className="relative overflow-hidden rounded-[12px] bg-sand">
              <Image
                src={spotlightRegion.heroImage?.src ?? "/images/regions/kota-surabaya/hero/hero.jpg"}
                alt={spotlightRegion.heroImage?.alt ?? spotlightRegion.name}
                fill
                className="object-cover"
                sizes="260px"
              />
            </div>
            <div className="py-3">
              <h2 className="text-2xl font-bold">Jelajahi Pesona Budaya Jawa Timur</h2>
              <p className="mt-4 text-sm leading-6 text-muted">
                Temukan kekayaan budaya, destinasi, dan kuliner khas dari halaman
                daerah yang saling terhubung dengan data lokal.
              </p>
              <div className="mt-6 flex gap-3">
                <Link
                  href="/regions"
                  className="inline-flex h-10 items-center rounded-full bg-primary px-5 text-xs font-bold text-white transition hover:bg-secondary"
                >
                  Mulai Menjelajah
                </Link>
                <Link
                  href="/gallery"
                  className="inline-flex h-10 items-center rounded-full bg-ink px-5 text-xs font-bold text-white transition hover:bg-primary"
                >
                  Lihat Galeri
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-16 px-6 pb-24 pt-36 lg:grid-cols-[1fr_0.86fr] lg:px-10">
          <div className="relative min-h-[660px] overflow-hidden rounded-[4px] bg-sand">
            <Image
              src="/images/regions/kota-surabaya/destinations/tugu-pahlawan.jpg"
              alt="Tugu Pahlawan Surabaya"
              fill
              className="object-cover opacity-80"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute bottom-0 left-0 h-1/2 w-1/2 bg-gradient-to-t from-background to-transparent" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="max-w-md text-4xl font-bold leading-tight tracking-[-0.03em] text-foreground">
              Temukan Kisah di Balik Setiap Daerah
            </h2>
            <p className="mt-7 max-w-md text-sm leading-7 text-muted">
              Jelajahi keberagaman budaya Jawa Timur melalui tradisi, destinasi
              ikonik, kuliner khas, dan warisan budaya yang tersaji dalam satu
              platform interaktif.
            </p>
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-4xl font-semibold text-foreground">{heritageItems.length}+</p>
                <p className="mt-2 text-sm text-muted">Warisan Budaya</p>
              </div>
              <div>
                <p className="text-4xl font-semibold text-foreground">{regions.length}+</p>
                <p className="mt-2 text-sm text-muted">Kota dan Kabupaten</p>
              </div>
            </div>
            <div className="mt-10 max-w-sm rounded-[10px] bg-primary p-5 text-white">
              <p className="text-sm font-bold">Menjelajahi Warisan Budaya Jawa Timur</p>
              <p className="mt-3 text-xs leading-6 text-white/75">
                Discover authentic traditions, regional specialties, breathtaking
                destinations, and inspiring stories from all 38 cities and regencies.
              </p>
            </div>
          </div>
        </section>

        <section id="culture" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="relative min-h-[380px]">
            <div className="absolute right-0 top-0 hidden h-[300px] w-[58%] overflow-hidden rounded-[18px] bg-sand lg:block">
              <Image
                src="/images/regions/kabupaten-ponorogo/budaya/reog-ponorogo.jpeg"
                alt="Reog Ponorogo"
                fill
                className="object-cover opacity-80"
                sizes="50vw"
              />
            </div>
            <div className="relative max-w-xl rounded-[18px] bg-white p-12 shadow-[0_20px_70px_rgb(38_35_31_/_0.08)]">
              <h2 className="text-4xl font-bold leading-tight tracking-[-0.03em]">
                Jelajahi Warisan Budaya Jawa Timur
              </h2>
              <p className="mt-6 text-sm leading-7 text-muted">
                Temukan kekayaan budaya Jawa Timur melalui peta interaktif yang
                menghadirkan tradisi, kuliner khas, destinasi ikonik, dan kisah
                daerah dari 38 kota dan kabupaten.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-4">
            {categoryCards.map((item) => (
              <article
                key={item.title}
                className="rounded-[18px] bg-white p-9 text-center shadow-[0_18px_55px_rgb(38_35_31_/_0.05)]"
              >
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-[8px] bg-primary text-sm font-black text-white">
                  {item.total}
                </div>
                <h3 className="mt-8 text-lg font-bold text-foreground">{item.title}</h3>
                <p className="mt-5 text-sm leading-7 text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="explore" className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1fr_0.9fr] lg:px-10">
          <MiniMapPreview />
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold tracking-[-0.03em]">
              Temukan Daerah Tujuan
            </h2>
            <div className="mt-7 rounded-[10px] border border-border bg-surface px-5 py-4 text-sm text-muted">
              Cari kota, budaya, atau kuliner...
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              {["Semua Daerah", "Tapal Kuda", "Mataraman", "Arek", "Madura"].map((item, index) => (
                <span
                  key={item}
                  className={`rounded-full px-4 py-2 text-xs font-bold ${
                    index === 0 ? "bg-primary text-white" : "bg-sand text-muted"
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
            <Link
              href="/regions"
              className="mt-9 inline-flex h-12 w-fit items-center rounded-full bg-primary px-6 text-sm font-bold text-white transition hover:bg-secondary"
            >
              Buka Explore Map
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-10">
          <h2 className="text-4xl font-bold tracking-[-0.03em]">
            Rasakan Kekayaan Budaya Jawa Timur
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-muted">
            Jelajahi tradisi, kuliner khas, destinasi ikonik, dan warisan budaya
            dari 38 kota dan kabupaten dalam satu pengalaman digital interaktif.
          </p>
          <div className="mt-16 grid gap-10 text-left lg:grid-cols-[0.95fr_1fr]">
            <div className="relative min-h-[540px] overflow-hidden rounded-[18px] bg-sand">
              <Image
                src="/images/regions/kabupaten-probolinggo/hero/hero.jpg"
                alt="Bentang alam Probolinggo"
                fill
                className="object-cover opacity-80"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute bottom-8 left-8 right-8 rounded-[16px] bg-white p-8 shadow-[0_18px_55px_rgb(38_35_31_/_0.12)]">
                <h3 className="text-xl font-bold">Learn While You Play</h3>
                <p className="mt-4 text-sm leading-7 text-muted">
                  Challenge yourself with educational mini games designed to make
                  exploring East Java&apos;s culture engaging and memorable.
                </p>
                <div className="mt-6 flex gap-3">
                  <Link
                    href="/game"
                    className="rounded-full bg-primary px-5 py-3 text-xs font-bold text-white"
                  >
                    Explore the Map
                  </Link>
                  <Link
                    href="/game"
                    className="rounded-full bg-ink px-5 py-3 text-xs font-bold text-white"
                  >
                    Play Mini Game
                  </Link>
                </div>
              </div>
            </div>
            <div className="grid content-center gap-10">
              {[
                [
                  "Identitas Budaya",
                  "Kenali ciri khas setiap kota dan kabupaten melalui tradisi, pakaian adat, bahasa daerah, kesenian, serta warisan budaya yang masih lestari.",
                ],
                [
                  "Peta Budaya Interaktif",
                  "Jelajahi spot budaya melalui peta interaktif dan temukan kisah unik di balik kabupaten dan kota Jawa Timur.",
                ],
                [
                  "Galeri Warisan Budaya",
                  "Jelajahi koleksi foto dan dokumentasi yang menampilkan seni tradisional, festival budaya, situs bersejarah, serta kekayaan kerajinan daerah.",
                ],
              ].map(([title, description]) => (
                <article key={title} className="grid gap-5 sm:grid-cols-[54px_1fr]">
                  <div className="grid h-12 w-12 place-items-center rounded-[8px] bg-primary text-sm font-black text-white">
                    {title.slice(0, 1)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="game" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="grid gap-6 md:grid-cols-3">
            {gameCatalog.map((game) => (
              <Link
                key={game.mode}
                href={game.href}
                className="rounded-[18px] border border-border bg-white p-7 transition hover:-translate-y-1 hover:shadow-[0_20px_70px_rgb(38_35_31_/_0.08)]"
              >
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
                  {game.totalItems} data
                </p>
                <h3 className="mt-6 text-2xl font-bold">{game.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">{game.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="grid gap-6 md:grid-cols-3">
            {featuredDestinations.map((destination) => (
              <article
                key={destination.id}
                className="overflow-hidden rounded-[18px] bg-white shadow-[0_18px_55px_rgb(38_35_31_/_0.05)]"
              >
                <div className="relative aspect-[4/3] bg-sand">
                  {destination.image ? (
                    <Image
                      src={destination.image.src}
                      alt={destination.image.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                  ) : null}
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold uppercase text-primary">
                    {destination.regionSlug.replaceAll("-", " ")}
                  </p>
                  <h3 className="mt-3 text-xl font-bold">{destination.name}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
