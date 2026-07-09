import Image from "next/image";
import Link from "next/link";

import { GameRegionSelectorClient } from "@/components/game";
import { SiteFooter, SiteHeader } from "@/components/layout";
import { getAllRegions } from "@/lib/regionService";
import { getQuizQuestionsByRegion } from "@/lib/quizService";

export default function QuizPage() {
  const regions = getAllRegions().map((region) => ({
    ...region,
    itemCount: getQuizQuestionsByRegion(region.slug).length,
  }));

  const totalQuestions = regions.reduce((total, region) => total + region.itemCount, 0);

  return (
    <div className="min-h-screen bg-white text-[#241f1b]">
      <SiteHeader />

      <main>
        <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#2f2118] px-6 py-24 pt-40 text-white">
          <Image
            src="/images/regions/kabupaten-ponorogo/hero/hero.jpg"
            alt="Pertunjukan Reog Ponorogo sebagai latar pemilihan quiz"
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover object-center"
          />
          <div className="absolute inset-0 -z-10 bg-[#17110d]/62" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_34%,rgb(195_125_62_/_0.18),transparent_39%),linear-gradient(180deg,rgb(18_13_10_/_0.38),rgb(18_13_10_/_0.48)_55%,rgb(18_13_10_/_0.78))]" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-white via-white/70 to-transparent" />

          <div className="mx-auto max-w-6xl text-center">
            <Link
              href="/game"
              className="inline-flex text-sm font-bold text-white/72 transition hover:text-white"
            >
              <span aria-hidden="true">&lt;-</span>&nbsp;Kembali ke Mini Game
            </Link>
            <h1 className="mt-12 text-5xl font-bold leading-none tracking-[-0.04em] text-[#fff5ec] drop-shadow-[0_10px_34px_rgb(0_0_0_/_0.34)] md:text-7xl">
              Pilih Wilayah Quiz
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/82">
              Mulai dari satu kota atau kabupaten, lalu jawab paket pertanyaan budaya,
              kuliner, batik, dan destinasi dari wilayah tersebut.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <span className="quiz-hero-pill inline-flex h-11 items-center rounded-[10px] border border-white/18 bg-[#f5f0e9]/92 px-7 text-sm font-bold text-[#74481f] shadow-[0_14px_30px_rgb(19_12_8_/_0.18)] backdrop-blur-md">
                {regions.length} Wilayah
              </span>
              <span className="quiz-hero-pill inline-flex h-11 items-center rounded-[10px] border border-white/18 bg-[#f5f0e9]/92 px-7 text-sm font-bold text-[#74481f] shadow-[0_14px_30px_rgb(19_12_8_/_0.18)] backdrop-blur-md">
                {totalQuestions} Soal
              </span>
              <span className="quiz-hero-pill inline-flex h-11 items-center rounded-[10px] border border-white/18 bg-[#f5f0e9]/92 px-7 text-sm font-bold text-[#74481f] shadow-[0_14px_30px_rgb(19_12_8_/_0.18)] backdrop-blur-md">
                Maks. 10 soal per ronde
              </span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
              Culture Quiz
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.03em] md:text-5xl">
              Pilih kota atau kabupaten yang ingin kamu taklukkan dulu.
            </h2>
          </div>

          <GameRegionSelectorClient
            regions={regions}
            baseHref="/game/quiz"
            itemLabel="soal"
            actionLabel="Mulai Quiz"
            tone="quiz"
          />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
