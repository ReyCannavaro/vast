import Link from "next/link";
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

export default async function RegionDetailPage({ params }: RegionDetailPageProps) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);

  if (!region) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-14">
        <Link href="/regions" className="text-sm font-semibold text-primary">
          Kembali ke regions
        </Link>
        <p className="mt-8 text-sm font-semibold uppercase text-secondary">
          {region.type}
        </p>
        <h1 className="mt-2 text-4xl font-bold text-foreground">{region.name}</h1>
        <p className="mt-4 text-lg leading-8 text-muted">{region.summary}</p>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="border border-border bg-surface p-5">
            <p className="text-sm font-semibold text-primary">Budaya</p>
            <p className="mt-2 text-sm text-muted">Data sedang dikurasi.</p>
          </div>
          <div className="border border-border bg-surface p-5">
            <p className="text-sm font-semibold text-primary">Kuliner</p>
            <p className="mt-2 text-sm text-muted">Data sedang dikurasi.</p>
          </div>
          <div className="border border-border bg-surface p-5">
            <p className="text-sm font-semibold text-primary">Destinasi</p>
            <p className="mt-2 text-sm text-muted">Data sedang dikurasi.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
