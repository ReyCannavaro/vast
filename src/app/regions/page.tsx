import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getAllRegions } from "@/lib/regionService";

export default function RegionsPage() {
  const regions = getAllRegions();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-sm font-semibold uppercase text-secondary">
          Regions
        </p>
        <h1 className="mt-2 text-4xl font-bold text-foreground">
          38 kota dan kabupaten Jawa Timur
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          List ini menjadi fallback mobile dan fondasi untuk peta interaktif.
          Semua item berasal dari data statis lokal.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((region) => (
            <Link
              key={region.slug}
              href={`/regions/${region.slug}`}
              className="border border-border bg-surface p-4 transition hover:border-secondary"
            >
              <p className="text-xs font-semibold uppercase text-muted">
                {region.type}
              </p>
              <h2 className="mt-1 text-lg font-semibold text-primary">
                {region.name}
              </h2>
              <p className="mt-2 text-sm text-muted">{region.tagline}</p>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
