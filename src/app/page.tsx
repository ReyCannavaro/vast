import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getAllRegions, getFeaturedRegions } from "@/lib/regionService";

export default function Home() {
  const regions = getAllRegions();
  const featuredRegions = getFeaturedRegions();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase text-secondary">
              Culture Verse - SDG 11
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-foreground md:text-6xl">
              VAST: Java East Cultural Explorer
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              One Map, 38 Regions, Endless Stories. Jelajahi budaya, kuliner,
              destinasi, dan cerita lokal Jawa Timur dalam satu landing page
              interaktif berbasis data statis.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#explore"
                className="inline-flex h-12 items-center justify-center bg-primary px-6 text-sm font-semibold text-white transition hover:bg-secondary"
              >
                Mulai Jelajah
              </Link>
              <Link
                href="/games"
                className="inline-flex h-12 items-center justify-center border border-border bg-surface px-6 text-sm font-semibold text-primary transition hover:border-secondary hover:text-secondary"
              >
                Lihat Mini Game
              </Link>
            </div>
          </div>

          <div className="border border-border bg-surface p-5 shadow-sm">
            <div className="grid aspect-[4/3] place-items-center border border-dashed border-border bg-background p-6 text-center">
              <div>
                <p className="text-5xl font-bold text-accent">38</p>
                <p className="mt-2 text-sm font-semibold uppercase text-primary">
                  Kota dan Kabupaten
                </p>
                <p className="mt-4 text-sm leading-6 text-muted">
                  Area ini disiapkan untuk visual peta SVG Jawa Timur dari
                  Figma atau aset orisinal tim.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="explore" className="border-y border-border bg-surface py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase text-secondary">
                  Region Explorer
                </p>
                <h2 className="mt-2 text-3xl font-bold text-foreground">
                  Struktur awal untuk 38 daerah Jawa Timur
                </h2>
              </div>
              <Link href="/regions" className="text-sm font-semibold text-primary">
                Buka halaman regions
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {regions.slice(0, 8).map((region) => (
                <Link
                  key={region.slug}
                  href={`/regions/${region.slug}`}
                  className="border border-border bg-background p-4 transition hover:border-secondary"
                >
                  <p className="text-sm text-muted">{region.type}</p>
                  <h3 className="mt-1 font-semibold text-foreground">{region.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16">
          <p className="text-sm font-semibold uppercase text-secondary">
            Featured Regions
          </p>
          <h2 className="mt-2 text-3xl font-bold text-foreground">
            Showcase awal yang siap diperdalam
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {featuredRegions.map((region) => (
              <article key={region.slug} className="border border-border bg-surface p-5">
                <h3 className="text-lg font-semibold text-primary">{region.name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{region.summary}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
