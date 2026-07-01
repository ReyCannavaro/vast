import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/layout";
import { EastJavaMap } from "@/components/regions";
import { PageContainer, PageHeader } from "@/components/ui";
import { getEastJavaMapData } from "@/lib/mapService";
import { getAllRegions } from "@/lib/regionService";

export default function RegionsPage() {
  const regions = getAllRegions();
  const mapData = getEastJavaMapData();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageContainer>
        <PageHeader
          eyebrow="Regions"
          title="38 kota dan kabupaten Jawa Timur"
          description="Jelajahi kabupaten dan kota Jawa Timur melalui peta, lalu masuk ke cerita budaya, kuliner, destinasi, batik, dan game tiap daerah."
        />

        <EastJavaMap mapData={mapData} />

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
      </PageContainer>
      <SiteFooter />
    </div>
  );
}
