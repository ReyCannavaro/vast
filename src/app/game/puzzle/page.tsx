import Image from "next/image";
import Link from "next/link";

import { GameRegionSelectorClient } from "@/components/game";
import { SiteFooter, SiteHeader } from "@/components/layout";
import { getPuzzleItemsByRegion } from "@/lib/puzzleService";
import { getAllRegions } from "@/lib/regionService";

export default function PuzzlePage() {
  const regions = getAllRegions().map((region) => ({
    ...region,
    itemCount: getPuzzleItemsByRegion(region.slug).length,
  }));

  const totalPuzzles = regions.reduce((total, region) => total + region.itemCount, 0);

  return (
    <div className="min-h-screen bg-white text-[#241f1b]">
      <SiteHeader />

      <main>
        <section className="relative isolate overflow-hidden bg-[#6b6563] px-6 pb-24 pt-36 text-white">
          <Image
            src="/images/regions/kabupaten-ponorogo/hero/hero.jpg"
            alt="Pertunjukan Reog Ponorogo sebagai latar pemilihan puzzle"
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
              Pilih Wilayah Puzzle
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/62">
              Susun ulang potongan gambar destinasi dari kota atau kabupaten pilihanmu,
              lalu lihat seberapa cepat kamu mengenali wajah Jawa Timur.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <span className="hero-stat-pill inline-flex h-11 items-center rounded-full border border-white/18 bg-[#f5f0e9]/92 px-7 text-sm font-bold text-[#74481f] shadow-[0_14px_30px_rgb(19_12_8_/_0.18)] backdrop-blur-md">
                {regions.length} Wilayah
              </span>
              <span className="hero-stat-pill inline-flex h-11 items-center rounded-full border border-white/18 bg-[#f5f0e9]/92 px-7 text-sm font-bold text-[#74481f] shadow-[0_14px_30px_rgb(19_12_8_/_0.18)] backdrop-blur-md">
                {totalPuzzles} Puzzle
              </span>
              <span className="hero-stat-pill inline-flex h-11 items-center rounded-full border border-white/18 bg-[#f5f0e9]/92 px-7 text-sm font-bold text-[#74481f] shadow-[0_14px_30px_rgb(19_12_8_/_0.18)] backdrop-blur-md">
                Board 3x3
              </span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
              Sliding Puzzle
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.03em] md:text-5xl">
              Pilih wilayah, lalu susun ulang potongan visual ikoniknya.
            </h2>
          </div>

          <GameRegionSelectorClient
            regions={regions}
            baseHref="/game/puzzle"
            itemLabel="puzzle"
            actionLabel="Mulai Puzzle"
            tone="puzzle"
          />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
