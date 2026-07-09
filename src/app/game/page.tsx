import Link from "next/link";
import Image from "next/image";

import { GameModeCard } from "@/components/game";
import { SiteFooter, SiteHeader } from "@/components/layout";
import { getGameCatalog, getGameSummary } from "@/lib/gameService";

const cardToneByHref = {
  "/game/quiz": "quiz",
  "/game/matching": "matching",
  "/game/puzzle": "puzzle",
} as const;

const cardBadgeByHref: Record<string, string> = {
  "/game/quiz": "Maks. 10 Soal",
  "/game/matching": "Memory Game",
  "/game/puzzle": "Logic",
};

function HeroPillIcon({ type }: { type: "game" | "region" | "score" }) {
  if (type === "game") {
    return (
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <rect x="4" y="8" width="16" height="9" rx="2.2" />
        <path d="M8 12h3" />
        <path d="M9.5 10.5v3" />
        <path d="M15.5 12h.01" />
        <path d="M18 12h.01" />
      </svg>
    );
  }

  if (type === "region") {
    return (
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M5 5.5 10 4l5 1.5 4-1.2v14.2L14.8 20 10 18.5 5 20V5.5Z" />
        <path d="M10 4v14.5" />
        <path d="M15 5.5V20" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M4 16.5 9 11l4 3.4 6-7.4" />
      <path d="M15 7h4v4" />
    </svg>
  );
}

export default function GamePage() {
  const gameItems = getGameCatalog();
  const summary = getGameSummary();
  const progressItems = [
    {
      label: "Quiz",
      value: summary.quiz.totalQuestions,
      meta: `${summary.quiz.coveredRegions} wilayah`,
    },
    {
      label: "Matching",
      value: summary.matching.totalPairs,
      meta: `${summary.matching.coveredRegions} wilayah`,
    },
    {
      label: "Puzzle",
      value: summary.puzzle.totalPuzzles,
      meta: `${summary.puzzle.coveredRegions} wilayah`,
    },
  ];
  const badgeItems = [
    {
      label: "Pilih wilayah",
      text: `${summary.playableRegions}/${summary.totalRegions}`,
    },
    {
      label: "Mode aktif",
      text: `${gameItems.length}`,
    },
    {
      label: "Data game",
      text: `${summary.quiz.totalQuestions + summary.matching.totalPairs + summary.puzzle.totalPuzzles}`,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#241f1b]">
      <SiteHeader />

      <main>
        <section className="relative flex min-h-[740px] items-center justify-center overflow-hidden bg-[#2f2118] px-6 pb-20 pt-32 text-center text-white">
          <Image
            src="/images/regions/kabupaten-ponorogo/hero/hero.jpg"
            alt="Pertunjukan Reog Ponorogo di antara rumpun bambu"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#17110d]/62" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgb(195_125_62_/_0.18),transparent_38%),linear-gradient(180deg,rgb(18_13_10_/_0.38),rgb(18_13_10_/_0.46)_52%,rgb(18_13_10_/_0.78))]" />

          <div className="relative mx-auto max-w-4xl">
            <h1 className="text-5xl font-bold leading-none tracking-[-0.04em] text-[#fff5ec] drop-shadow-[0_10px_34px_rgb(0_0_0_/_0.34)] sm:text-6xl lg:text-[72px]">
              Belajar Sambil Bermain
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-[20px] leading-8 text-white/84">
              Uji wawasan budayamu lewat kuis, mencocokkan warisan, dan menyusun puzzle
              Jawa Timur secara interaktif.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <span className="hero-stat-pill inline-flex h-11 items-center gap-3 rounded-[10px] border border-white/18 bg-[#f5f0e9]/92 px-7 text-sm font-bold text-[#74481f] shadow-[0_14px_30px_rgb(19_12_8_/_0.18)] backdrop-blur-md">
                <HeroPillIcon type="game" />
                {gameItems.length} Mini Game
              </span>
              <span className="hero-stat-pill inline-flex h-11 items-center gap-3 rounded-[10px] border border-white/18 bg-[#f5f0e9]/92 px-7 text-sm font-bold text-[#74481f] shadow-[0_14px_30px_rgb(19_12_8_/_0.18)] backdrop-blur-md">
                <HeroPillIcon type="region" />
                {summary.quiz.coveredRegions} Wilayah
              </span>
              <span className="hero-stat-pill inline-flex h-11 items-center gap-3 rounded-[10px] border border-white/18 bg-[#f5f0e9]/92 px-7 text-sm font-bold text-[#74481f] shadow-[0_14px_30px_rgb(19_12_8_/_0.18)] backdrop-blur-md">
                <HeroPillIcon type="score" />
                Skor &amp; Progress
              </span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
          <div className="grid gap-7 lg:grid-cols-3">
            {gameItems.map((game) => (
              <GameModeCard
                key={game.href}
                game={game}
                tone={cardToneByHref[game.href as keyof typeof cardToneByHref] ?? "quiz"}
                badge={cardBadgeByHref[game.href]}
              />
            ))}
          </div>

          <div className="mt-32 border-t border-[#d8c8bb] pt-16">
            <div className="grid gap-8 lg:grid-cols-[380px_1fr] lg:items-center">
              <aside className="rounded-[14px] border border-[#d9c6b8] bg-[#e9e5df] p-6">
                <h2 className="text-2xl font-bold text-[#78471f]">Kesiapan Game</h2>
                <p className="mt-2 text-sm leading-6 text-[#6c625b]">
                  Semua angka diambil dari data statis game, tanpa menampilkan ranking
                  simulasi.
                </p>
                <div className="mt-5 grid gap-4">
                  {progressItems.map((item, index) => (
                    <div
                      key={item.label}
                      className="grid grid-cols-[44px_1fr_auto] items-center gap-3 rounded-[10px] border border-[#dfd3c8] bg-[#f9f6f1] px-4 py-4 text-[#332d28]"
                    >
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                          index === 0 ? "bg-[#815016] text-white" : "bg-[#ebe7e0] text-[#554d45]"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span>
                        <span className="block font-bold">{item.label}</span>
                        <span className="text-xs font-semibold text-[#8a8179]">{item.meta}</span>
                      </span>
                      <span className="font-bold text-[#7a4d22]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </aside>

              <div>
                <h2 className="text-4xl font-bold tracking-[-0.03em] text-[#78471f]">
                  Mulai dari Wilayah yang Kamu Kenal
                </h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-[#b3aaa3]">
                  Mode game sekarang memakai alur yang sama: pilih kota atau kabupaten,
                  lalu masuk ke ronde yang spesifik untuk wilayah tersebut.
                </p>

                <div className="mt-8 flex flex-wrap gap-5">
                  {badgeItems.map((badge, index) => (
                    <div
                      key={badge.label}
                      className={`grid h-24 w-24 place-items-center rounded-[18px] border text-center ${
                        index === 0
                          ? "border-[#cba98e] bg-[#fbf5ef] text-primary"
                          : index === 1
                            ? "border-[#b6c6aa] bg-[#f3f8ec] text-[#617554]"
                            : "border-[#d7b5a5] bg-[#fbf1ec] text-[#a65939]"
                      }`}
                    >
                      <span>
                        <span className="block text-2xl font-bold">{badge.text}</span>
                        <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.1em]">
                          {badge.label}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/game/quiz"
                  className="mt-10 inline-flex h-12 items-center justify-center rounded-[10px] bg-primary px-7 text-sm font-bold text-white transition hover:bg-secondary"
                >
                  Mulai dari Culture Quiz
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
