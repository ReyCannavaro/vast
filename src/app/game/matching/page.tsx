import Image from "next/image";
import Link from "next/link";

import { SiteFooter, SiteHeader } from "@/components/layout";
import { getMatchingGameItemsByRegion } from "@/lib/matchingService";
import { getAllRegions } from "@/lib/regionService";

function formatRegionType(type: string) {
  return type === "kota" ? "Kota" : "Kabupaten";
}

export default function MatchingPage() {
  const regions = getAllRegions().map((region) => ({
    ...region,
    matchingCount: getMatchingGameItemsByRegion(region.slug).length,
  }));

  const totalPairs = regions.reduce((total, region) => total + region.matchingCount, 0);

  return (
    <div className="min-h-screen bg-white text-[#241f1b]">
      <SiteHeader />

      <main>
        <section className="relative isolate overflow-hidden bg-[#6b6563] px-6 pb-24 pt-36 text-white">
          <Image
            src="/images/regions/kabupaten-ponorogo/hero/hero.jpg"
            alt="Pertunjukan Reog Ponorogo sebagai latar pemilihan matching"
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover object-center"
          />
          <div className="absolute inset-0 -z-10 bg-[#625b58]/80" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_18%,rgb(141_84_35_/_0.28),transparent_38%)]" />

          <div className="mx-auto max-w-6xl text-center">
            <Link
              href="/game"
              className="inline-flex text-sm font-bold text-white/72 transition hover:text-white"
            >
              <span aria-hidden="true">&lt;-</span>&nbsp;Kembali ke Mini Game
            </Link>
            <h1 className="mt-16 text-5xl font-bold leading-none tracking-[-0.04em] text-primary md:text-7xl">
              Pilih Wilayah Matching
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/62">
              Cocokkan nama wilayah dengan simbol budaya, kuliner, batik, dan destinasi
              yang menjadi identitas lokalnya.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <span className="inline-flex h-11 items-center rounded-full bg-[#f5f0e9] px-7 text-sm font-bold text-[#74481f]">
                {regions.length} Wilayah
              </span>
              <span className="inline-flex h-11 items-center rounded-full bg-[#f5f0e9] px-7 text-sm font-bold text-[#74481f]">
                {totalPairs} Pasangan
              </span>
              <span className="inline-flex h-11 items-center rounded-full bg-[#f5f0e9] px-7 text-sm font-bold text-[#74481f]">
                6 Pasangan per ronde
              </span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
              Match the Heritage
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.03em] md:text-5xl">
              Pilih wilayah, lalu pasangkan ikon budaya yang tepat.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {regions.map((region) => (
              <Link
                key={region.slug}
                href={`/game/matching/${region.slug}`}
                className="group overflow-hidden rounded-[16px] border border-[#dfd0c2] bg-white transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-[0_24px_70px_rgb(92_61_39/0.13)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="relative h-44 bg-[#d9d1ca]">
                  {region.heroImage ? (
                    <Image
                      src={region.heroImage.src}
                      alt={region.heroImage.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/54 via-black/8 to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/88 px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-primary">
                    {formatRegionType(region.type)}
                  </span>
                </div>

                <div className="px-6 py-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold tracking-[-0.02em] text-[#2a2521]">
                        {region.name.replace(/^Kabupaten\s|^Kota\s/, "")}
                      </h3>
                      <p className="mt-2 text-sm text-[#8a7e75]">
                        {region.culturalArea ?? "Jawa Timur"}
                      </p>
                    </div>
                    <span className="rounded-full bg-[#eef5e8] px-4 py-2 text-sm font-bold text-[#617554]">
                      {region.matchingCount} item
                    </span>
                  </div>
                  <p className="mt-5 line-clamp-2 text-sm leading-6 text-[#625850]">
                    {region.summary}
                  </p>
                  <span className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-[10px] border border-[#617554] text-sm font-bold text-[#617554] transition group-hover:bg-[#617554] group-hover:text-white">
                    Mulai Matching
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
