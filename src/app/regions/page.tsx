import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/layout";
import { EastJavaMap } from "@/components/regions";
import { getEastJavaMapData } from "@/lib/mapService";
import { getRegionBySlug } from "@/lib/regionService";
import type { Region } from "@/types/region";

const popularRegionCards = [
  { slug: "kota-malang", label: "Kota Malang" },
  { slug: "kabupaten-probolinggo", label: "Probolinggo" },
  { slug: "kota-surabaya", label: "Surabaya" },
  { slug: "kabupaten-ponorogo", label: "Ponorogo" },
  { slug: "kabupaten-sumenep", label: "Sumenep" },
  { slug: "kabupaten-kediri", label: "Kediri" },
];

function PopularRegionCard({ region, label }: { region: Region; label: string }) {
  const image = region.thumbnailImage ?? region.heroImage;

  return (
    <Link href={`/regions/${region.slug}`} className="group block">
      <div className="relative aspect-[1.02] overflow-hidden rounded-[8px] bg-[#c6c6c6]">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 170px, 45vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-black/5 transition group-hover:bg-black/0" />
      </div>
      <h2 className="mt-4 text-[18px] font-bold tracking-[-0.03em] text-[#111111]">
        {label}
      </h2>
      <p className="mt-1 text-[13px] text-[#5f5a56]">
        {region.destinationIds.length} Destinasi
      </p>
    </Link>
  );
}

export default function RegionsPage() {
  const mapData = getEastJavaMapData();
  const popularRegions = popularRegionCards.flatMap((item) => {
    const region = getRegionBySlug(item.slug);

    return region ? [{ ...item, region }] : [];
  });

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#111111]">
      <SiteHeader />
      <main className="pt-[128px]">
        <section className="mx-auto max-w-[1480px] px-4 sm:px-6">
          <EastJavaMap mapData={mapData} />
        </section>

        <section className="mx-auto mt-16 max-w-[1200px] border-t border-[#ebe3db] px-6 pb-24 pt-12">
          <h2 className="text-[28px] font-bold tracking-[-0.04em]">
            Wilayah Populer Lainnya
          </h2>
          <div className="mt-7 grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {popularRegions.map((item) => (
              <PopularRegionCard
                key={item.slug}
                region={item.region}
                label={item.label}
              />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
