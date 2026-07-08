import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/layout";
import { heritageItems } from "@/data/heritageItems";
import { getEastJavaMapData } from "@/lib/mapService";
import { getAllRegions } from "@/lib/regionService";

const featureCards = [
  {
    title: "Galeri Warisan Budaya",
    description:
      "Jelajahi koleksi pertunjukan seni tradisional, situs bersejarah, kerajinan lokal, dan perayaan budaya dari berbagai daerah di Jawa Timur.",
    icon: "heritage",
  },
  {
    title: "Kuliner Khas",
    description:
      "Temukan cita rasa autentik dan hidangan khas yang mencerminkan kekayaan kuliner dari setiap kota dan kabupaten di Jawa Timur.",
    icon: "culinary",
  },
  {
    title: "Destinasi Budaya",
    description:
      "Temukan berbagai destinasi bersejarah, wisata budaya, dan tempat ikonik yang mencerminkan kekayaan warisan Jawa Timur.",
    icon: "destination",
  },
];

const cultureHighlights = [
  {
    title: "Identitas Budaya",
    description:
      "Kenali ciri khas setiap kota dan kabupaten melalui tradisi, pakaian adat, bahasa daerah, kesenian, serta warisan budaya yang masih lestari.",
    icon: "heritage",
  },
  {
    title: "Peta Budaya Interaktif",
    description:
      "Jelajahi setiap daerah melalui peta interaktif dan temukan kisah unik di balik kekayaan budaya yang dimiliki setiap kota dan kabupaten di Jawa Timur.",
    icon: "pin",
  },
  {
    title: "Galeri Warisan Budaya",
    description:
      "Jelajahi koleksi foto dan dokumentasi yang menampilkan seni tradisional, festival budaya, situs bersejarah, serta keindahan berbagai daerah di Jawa Timur.",
    icon: "gallery",
  },
];

const regionFilters = ["Semua Daerah", "Tapal Kuda", "Mataraman", "Areman", "Madura"];

function FeatureIcon({ type }: { type: string }) {
  if (type === "culinary") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
        <path
          d="M6.5 11.5c0-4 3-7 5.5-7s5.5 3 5.5 7m-13 0h15l-1.4 5.7a2 2 0 0 1-1.9 1.5H7.3a2 2 0 0 1-1.9-1.5L4 11.5Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.7"
        />
        <path
          d="M8 9.5c.8-.9 2-1.5 4-1.5s3.2.6 4 1.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.7"
        />
      </svg>
    );
  }

  if (type === "destination") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
        <path
          d="M4.5 6.5h6v7h-6v-7Zm9 0h6v7h-6v-7ZM7.5 16.5c1 1.2 2.5 2 4.5 2s3.5-.8 4.5-2"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.7"
        />
        <path
          d="M7 10h1m8 0h1"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.7"
        />
      </svg>
    );
  }

  if (type === "pin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
        <path
          d="M12 20s6-5.3 6-10a6 6 0 0 0-12 0c0 4.7 6 10 6 10Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.7"
        />
        <circle cx="12" cy="10" r="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }

  if (type === "gallery") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
        <path
          d="M5 6h14v12H5V6Zm3 8 2.5-2.5 2 2 1.5-1.5L17 15"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.7"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
      <path
        d="M5 19h14M7 19V8l5-3 5 3v11M10 19v-5h4v5M9 10h1m4 0h1"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function MiniMapPreview() {
  const mapData = getEastJavaMapData();
  const selectedRegion =
    mapData.regions.find((item) => item.region.slug === "kabupaten-banyuwangi") ??
    mapData.regions[0];
  const labeledRegions = [
    "kota-surabaya",
    "kota-malang",
    "kabupaten-banyuwangi",
    "kabupaten-sumenep",
  ].flatMap((slug) => {
    const item = mapData.regions.find((region) => region.region.slug === slug);

    return item ? [item] : [];
  });

  return (
    <div className="rounded-[10px] border border-[#d9c8b8] bg-white p-6 shadow-[0_18px_42px_rgb(56_45_34_/_0.045)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#8c531f]">
            Peta Budaya Interaktif
          </p>
          <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-[#332f2a]">
            38 Daerah Jawa Timur
          </h2>
        </div>
        <Link
          href="/regions"
          className="rounded-full border border-[#d9c8b8] px-4 py-2 text-[12px] font-bold text-[#6f3f1b] transition hover:border-[#8c531f] hover:text-[#8c531f]"
        >
          Buka Peta
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-[10px] bg-[#5f9fab] p-5 shadow-inner">
        <div className="relative grid min-h-[300px] place-items-center rounded-[8px] bg-[#5f9fab]">
          <svg
            viewBox={mapData.regencyViewBox}
            role="img"
            aria-label="Preview peta kabupaten dan kota Jawa Timur"
            className="h-auto w-full max-w-[620px]"
          >
            <defs>
              <filter id="home-map-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow
                  dx="0"
                  dy="7"
                  floodColor="#243e45"
                  floodOpacity="0.22"
                  stdDeviation="8"
                />
              </filter>
            </defs>

            <g filter="url(#home-map-shadow)">
              {mapData.regions.map((item) => {
                const isSelected = item.region.slug === selectedRegion.region.slug;

                return (
                  <a key={item.region.slug} href={item.href} aria-label={`Buka ${item.region.name}`}>
                    <path
                      d={item.areaPath}
                      fill={isSelected ? "#8c531f" : "#eadfc6"}
                      fillRule="evenodd"
                      stroke="#fff8ed"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={isSelected ? 1.3 : 0.7}
                      vectorEffect="non-scaling-stroke"
                      className="transition duration-150 hover:fill-[#c99f66]"
                    />
                  </a>
                );
              })}
            </g>

            {labeledRegions.map((item) => (
              <g key={item.region.slug} className="pointer-events-none">
                <circle
                  cx={item.areaCenter.x}
                  cy={item.areaCenter.y}
                  r={item.region.slug === selectedRegion.region.slug ? 9 : 6}
                  fill={item.region.slug === selectedRegion.region.slug ? "#8c531f" : "#ffffff"}
                  stroke="#8c531f"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            ))}
          </svg>

          <div className="absolute bottom-4 left-4 max-w-[250px] rounded-[10px] border border-white/60 bg-white/88 px-4 py-3 text-[#332f2a] shadow-[0_14px_30px_rgb(36_42_36_/_0.16)] backdrop-blur-md">
            <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#8c531f]">
              Highlight
            </p>
            <h3 className="mt-1 text-[17px] font-bold tracking-[-0.03em]">
              {selectedRegion.region.name}
            </h3>
            <p className="mt-2 line-clamp-2 text-[12px] leading-5 text-[#62584e]">
              {selectedRegion.region.tagline}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-[8px] bg-[#f7f2ec] px-4 py-4">
          <p className="text-[24px] font-semibold leading-none text-[#332f2a]">38</p>
          <p className="mt-2 text-[12px] font-medium text-[#756b62]">Kota & Kabupaten</p>
        </div>
        <div className="rounded-[8px] bg-[#f7f2ec] px-4 py-4">
          <p className="text-[24px] font-semibold leading-none text-[#332f2a]">4</p>
          <p className="mt-2 text-[12px] font-medium text-[#756b62]">Kawasan Budaya</p>
        </div>
        <div className="rounded-[8px] bg-[#f7f2ec] px-4 py-4">
          <p className="text-[24px] font-semibold leading-none text-[#332f2a]">1</p>
          <p className="mt-2 text-[12px] font-medium text-[#756b62]">Peta Terhubung</p>
        </div>
      </div>

      <p className="mt-5 text-center text-sm text-[#4f4942]">
        Klik wilayah pada peta untuk membuka detail budaya, kuliner, dan destinasi.
      </p>
    </div>
  );
}

export default function Home() {
  const regions = getAllRegions();

  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <SiteHeader />
      <main>
        <section id="home" className="relative min-h-[820px] overflow-visible bg-[#1b1714] text-white">
          <Image
            src="/images/regions/kota-surabaya/hero/hero.jpg"
            alt="Surabaya sebagai pembuka eksplorasi budaya Jawa Timur"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(0_0_0_/_0.34),rgb(0_0_0_/_0.18)_46%,rgb(0_0_0_/_0.10)),linear-gradient(180deg,rgb(0_0_0_/_0.22),rgb(0_0_0_/_0.08)_48%,rgb(0_0_0_/_0.30))]" />

          <div className="relative mx-auto max-w-[1340px] px-6 pb-48 pt-[178px] sm:px-10 lg:px-20">
            <div className="max-w-[610px]">
              <h1 className="text-[52px] font-semibold leading-[1.24] tracking-[-0.02em] sm:text-[66px] lg:text-[78px]">
                Satu Peta, 38 Daerah, Tak Terbatas Cerita.
              </h1>
              <p className="mt-12 max-w-[730px] text-[15px] font-medium leading-6 text-white/72">
                Jelajahi kekayaan budaya Jawa Timur melalui satu pengalaman interaktif.
                Temukan tradisi lokal, destinasi ikonik, kuliner khas, dan kisah unik
                dari setiap kota dan kabupaten.
              </p>
            </div>
          </div>

          <div className="absolute bottom-[-118px] left-1/2 z-10 w-[calc(100%-2rem)] max-w-[700px] -translate-x-1/2 rounded-[14px] bg-white/95 px-7 py-7 text-[#111111] shadow-[0_22px_42px_rgb(0_0_0_/_0.085)] backdrop-blur-sm sm:px-8 lg:left-[6.4%] lg:w-[700px] lg:translate-x-0">
            <div className="grid gap-7 md:grid-cols-[285px_1fr] md:items-center">
              <div className="relative min-h-[192px] overflow-hidden rounded-[14px] bg-[#c8c8c8]">
                <Image
                  src="/images/regions/kabupaten-banyuwangi/budaya/gandrung-banyuwangi.jpg"
                  alt="Tari Gandrung Banyuwangi"
                  fill
                  className="object-cover"
                  sizes="285px"
                />
              </div>
              <div className="md:pl-6">
                <h2 className="max-w-[300px] text-[26px] font-bold leading-[1.28] tracking-[-0.03em]">
                  Jelajahi Pesona Budaya Jawa Timur
                </h2>
                <p className="mt-5 max-w-[320px] text-[12px] leading-6 text-[#7a746e]">
                  Temukan kekayaan budaya, destinasi, dan kuliner khas dari setiap
                  daerah melalui pengalaman digital yang interaktif dan mudah dijelajahi.
                </p>
                <div className="mt-7 flex flex-wrap gap-4">
                  <Link
                    href="/regions"
                    className="inline-flex h-10 items-center justify-center rounded-full bg-[#8c531f] px-5 text-[12px] font-semibold text-white transition hover:bg-[#a2632c]"
                  >
                    Mulai Menjelajah
                  </Link>
                  <Link
                    href="/regions"
                    className="inline-flex h-10 items-center justify-center rounded-full bg-black px-5 text-[12px] font-semibold text-white transition hover:bg-[#8c531f]"
                  >
                    Lihat Daerah
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1350px] gap-16 px-6 pb-24 pt-[158px] sm:px-10 lg:grid-cols-[0.98fr_0.9fr] lg:px-20">
          <div className="relative min-h-[480px] overflow-hidden bg-[#c9c9c9] lg:min-h-[590px]">
            <Image
              src="/images/regions/kota-surabaya/destinations/tugu-pahlawan.jpg"
              alt="Tugu Pahlawan Surabaya"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 48vw, 100vw"
            />
          </div>

          <div className="flex flex-col justify-center pb-2 lg:pl-10">
            <h2 className="max-w-[520px] text-[40px] font-semibold leading-[1.12] tracking-[-0.03em] text-[#252b35] sm:text-[50px]">
              Temukan Kisah di Balik Setiap Daerah
            </h2>
            <p className="mt-7 max-w-[520px] text-[17px] leading-[1.25] tracking-[-0.02em] text-[#5f5a56]">
              Jelajahi keberagaman budaya Jawa Timur melalui tradisi, destinasi
              ikonik, kuliner khas, dan warisan budaya yang tersaji dalam satu
              platform interaktif.
            </p>

            <div className="mt-16 grid gap-4 rounded-[8px] bg-[#e8dfd8] px-4 py-2 shadow-[0_12px_34px_rgb(63_48_37/0.06)] sm:px-5 sm:py-2 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
              <p className="max-w-[285px] text-[18px] leading-[1.8] tracking-[-0.02em] text-[#262b35] sm:text-[19px]">
                Menjelajahi Warisan Budaya, Satu Daerah dalam Setiap Perjalanan.
              </p>
              <div className="rounded-[8px] bg-[#8c531f] px-9 py-5 text-white shadow-[0_10px_28px_rgb(82_46_21/0.14)]">
                <h3 className="max-w-[280px] text-[16px] font-semibold leading-[1.25]">
                  Menjelajahi Warisan Budaya Jawa Timur
                </h3>
                <p className="mt-4 max-w-[300px] text-[14px] leading-[1.12] text-white/78">
                  Discover authentic traditions, regional specialties, breathtaking
                  destinations, and inspiring stories from all 38 cities and regencies.
                </p>
              </div>
            </div>

            <div className="mt-[72px] grid grid-cols-2 gap-10">
              <div>
                <p className="text-[50px] font-light leading-none tracking-[-0.04em] text-[#252b35]">
                  {heritageItems.length}+
                </p>
                <p className="mt-5 text-[15px] text-[#252b35]">Warisan Budaya</p>
              </div>
              <div>
                <p className="text-[50px] font-light leading-none tracking-[-0.04em] text-[#252b35]">
                  {regions.length}+
                </p>
                <p className="mt-5 text-[15px] text-[#252b35]">Kota & Kabupaten</p>
              </div>
            </div>
          </div>
        </section>

        <section id="culture" className="mx-auto max-w-[1350px] px-6 py-20 sm:px-10 lg:px-20">
          <div className="relative min-h-[440px] lg:min-h-[520px]">
            <div className="absolute right-0 top-0 hidden h-[410px] w-[58%] overflow-hidden rounded-[26px] bg-[#c9c9c9] lg:block">
              <Image
                src="/images/regions/kabupaten-ponorogo/budaya/reog-ponorogo.jpeg"
                alt="Reog Ponorogo"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div className="relative top-20 max-w-[630px] rounded-[18px] bg-white px-14 py-14 shadow-[0_18px_42px_rgb(0_0_0_/_0.06)] sm:px-16 sm:py-16">
              <h2 className="text-[46px] font-semibold leading-[1.24] tracking-[-0.04em] sm:text-[60px]">
                Jelajahi Warisan Budaya Jawa Timur
              </h2>
              <p className="mt-12 max-w-[520px] text-[15px] leading-[1.6] text-[#6f6a64]">
                Temukan kekayaan budaya Jawa Timur melalui peta interaktif yang
                menghadirkan tradisi, kuliner khas, destinasi ikonik, dan kisah dari
                38 kota dan kabupaten.
              </p>
            </div>
          </div>

          <div className="mt-28 grid gap-12 md:grid-cols-3">
            {featureCards.map((item) => (
              <article
                key={item.title}
                className="min-h-[330px] rounded-[10px] bg-white px-12 py-14 text-center shadow-[0_16px_42px_rgb(0_0_0_/_0.045)]"
              >
                <div className="mx-auto grid h-[58px] w-[58px] place-items-center rounded-[6px] bg-[#8c531f] text-white">
                  <FeatureIcon type={item.icon} />
                </div>
                <h3 className="mt-14 text-[24px] font-semibold tracking-[-0.03em]">
                  {item.title}
                </h3>
                <p className="mx-auto mt-10 max-w-[280px] text-[15px] leading-[1.65] text-[#807a73]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="explore" className="mx-auto grid max-w-[1210px] gap-12 px-6 pb-32 pt-40 sm:px-10 lg:grid-cols-[1.08fr_0.75fr] lg:px-0">
          <MiniMapPreview />

          <div className="pt-5">
            <h2 className="text-[42px] font-semibold leading-tight tracking-[-0.04em]">
              Temukan Daerah Tujuan
            </h2>
            <div className="mt-8 flex h-[60px] items-center gap-4 rounded-[10px] border border-[#d9c8b8] bg-[#fffdf9] px-5 text-[#7b7480]">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 text-[#332f2a]">
                <path
                  d="m20 20-4.8-4.8m2-5.2a7.2 7.2 0 1 1-14.4 0 7.2 7.2 0 0 1 14.4 0Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
              </svg>
              <span className="text-[18px]">Cari kota, budaya, atau kuliner...</span>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              {regionFilters.map((item, index) => (
                <Link
                  key={item}
                  href="/regions"
                  className={`inline-flex h-11 items-center rounded-full border px-5 text-[15px] font-medium transition ${
                    index === 0
                      ? "border-[#8c531f] bg-[#8c531f] text-white hover:bg-[#a2632c]"
                      : "border-[#d9c8b8] bg-white text-[#594d43] hover:border-[#8c531f] hover:text-[#8c531f]"
                  }`}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1210px] px-6 pb-28 pt-10 text-center sm:px-10 lg:px-0">
          <h2 className="text-[44px] font-semibold leading-tight tracking-[-0.04em] sm:text-[58px]">
            Rasakan Kekayaan Budaya Jawa Timur
          </h2>
          <p className="mx-auto mt-8 max-w-[860px] text-[17px] font-semibold leading-[1.55] tracking-[-0.02em]">
            Jelajahi tradisi, kuliner khas, destinasi ikonik, dan warisan budaya dari
            38 kota dan kabupaten dalam satu pengalaman digital yang interaktif.
          </p>

          <div className="mt-28 grid gap-16 text-left lg:grid-cols-[0.95fr_0.85fr] lg:items-start">
            <div className="relative min-h-[540px] rounded-[22px] bg-[#c9c9c9]">
              <Image
                src="/images/regions/kabupaten-banyuwangi/destinations/kawah-ijen.jpg"
                alt="Kawah Ijen Banyuwangi"
                fill
                className="rounded-[22px] object-cover"
                sizes="(min-width: 1024px) 48vw, 100vw"
              />
              <div className="absolute bottom-[-44px] left-1/2 w-[88%] -translate-x-1/2 rounded-[20px] bg-white px-12 py-12 shadow-[0_18px_42px_rgb(0_0_0_/_0.055)]">
                <h3 className="text-[28px] font-semibold tracking-[-0.04em]">
                  Learn While You Play
                </h3>
                <p className="mt-10 max-w-[420px] text-[13px] leading-[1.55] text-[#7c766f]">
                  Challenge yourself with educational mini games designed to make
                  exploring East Java&apos;s culture engaging and memorable for everyone.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/regions"
                    className="inline-flex h-11 items-center rounded-full bg-[#8c531f] px-6 text-[12px] font-semibold text-white transition hover:bg-[#a2632c]"
                  >
                    Explore the Map
                  </Link>
                  <Link
                    href="/game"
                    className="inline-flex h-11 items-center rounded-full bg-black px-6 text-[12px] font-semibold text-white transition hover:bg-[#8c531f]"
                  >
                    Play Mini Game
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid gap-12 pb-10 lg:pt-6">
              {cultureHighlights.map((item) => (
                <article key={item.title} className="grid gap-6 sm:grid-cols-[50px_1fr]">
                  <div className="grid h-[50px] w-[50px] place-items-center rounded-[6px] bg-[#8c531f] text-white">
                    <FeatureIcon type={item.icon} />
                  </div>
                  <div>
                    <h3 className="text-[23px] font-semibold leading-tight tracking-[-0.03em]">
                      {item.title}
                    </h3>
                    <p className="mt-5 max-w-[500px] text-[13px] leading-[1.65] text-[#807a73]">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
