import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getAllRegions, getRegionBySlug } from "@/lib/regionService";

type RegionDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

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

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-14">
        <Link href="/regions" className="text-sm font-semibold text-primary">
          Kembali ke regions
        </Link>
        <section className="mt-8 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-stretch">
          <div className="border border-border bg-surface p-6 md:p-8">
            <p className="text-sm font-semibold uppercase text-secondary">
              {region.type}
            </p>
            <h1 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">
              {region.name}
            </h1>
            <p className="mt-4 text-xl font-semibold text-primary">
              {region.tagline}
            </p>
            <p className="mt-5 text-base leading-8 text-muted">{region.summary}</p>
          </div>

          <aside className="border border-border bg-background p-6">
            <h2 className="text-lg font-semibold text-foreground">
              Cultural Identity Card
            </h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-primary">Julukan</dt>
                <dd className="mt-1 text-muted">
                  {region.nickname ?? "Data sedang dikurasi"}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-primary">Dialek/Bahasa</dt>
                <dd className="mt-1 text-muted">
                  {region.dialect ?? "Data sedang dikurasi"}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-primary">Kategori</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {region.categories.map((category) => (
                    <span
                      key={category}
                      className="border border-border bg-surface px-3 py-1 text-xs font-semibold text-muted"
                    >
                      {category}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </aside>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="border border-border bg-surface p-5">
            <p className="text-sm font-semibold text-primary">Budaya</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {region.cultureHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="border border-border bg-surface p-5">
            <p className="text-sm font-semibold text-primary">Kuliner</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {region.foods.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="border border-border bg-surface p-5">
            <p className="text-sm font-semibold text-primary">Destinasi</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {region.destinations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-4 border border-border bg-surface p-5">
          <p className="text-sm font-semibold text-primary">Fakta unik</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
            {region.uniqueFacts.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
