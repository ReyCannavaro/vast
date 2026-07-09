import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/layout";
import { EastJavaMap } from "@/components/regions";
import { getEastJavaMapData } from "@/lib/mapService";
import { getRegionBySlug } from "@/lib/regionService";
import type { Region } from "@/types/region";

const popularRegionCards = [
  { slug: "kota-malang", label: "Kota Malang", zone: "Areman" },
  { slug: "kabupaten-probolinggo", label: "Probolinggo", zone: "Tapal Kuda" },
  { slug: "kota-surabaya", label: "Surabaya", zone: "Metropolitan" },
  { slug: "kabupaten-ponorogo", label: "Ponorogo", zone: "Mataraman" },
  { slug: "kabupaten-sumenep", label: "Sumenep", zone: "Madura" },
  { slug: "kabupaten-kediri", label: "Kediri", zone: "Mataraman" },
];

function PopularRegionCard({
  region,
  label,
  zone,
}: {
  region: Region;
  label: string;
  zone: string;
}) {
  const image = region.thumbnailImage ?? region.heroImage;

  return (
    <Link href={`/regions/${region.slug}`} className="group block">
      <div className="relative aspect-[0.86] overflow-hidden rounded-[16px] bg-[#c6c6c6] shadow-[0_18px_42px_rgb(63_47_29_/_0.08)]">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 220px, 45vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgb(0_0_0_/_0.68))]" />
        <div className="absolute left-4 top-4 rounded-full bg-white/86 px-3 py-1 text-[11px] font-bold text-[#6f3f1b] backdrop-blur-md">
          {zone}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <h2 className="text-[22px] font-bold leading-tight tracking-[-0.04em]">
            {label}
          </h2>
          <p className="mt-2 text-[12px] font-semibold text-white/76">
            {region.destinationIds.length} destinasi, {region.foodIds.length} kuliner
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function RegionsPage() {
  const mapData = getEastJavaMapData();
  const popularRegions = popularRegionCards.flatMap((item) => {
    const region = getRegionBySlug(item.slug);

    return region ? [{ ...item, region }] : [];
  });

  const totalDestinations = popularRegions.reduce(
    (total, item) => total + item.region.destinationIds.length,
    0,
  );

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#111111]">
      <SiteHeader />
      <main className="pb-24 pt-[210px] sm:pt-[224px]">
        <section className="mx-auto grid max-w-[1460px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.88fr_0.62fr] lg:px-10">
          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#8c531f]">
              Explore Map Jawa Timur
            </p>
            <h1 className="mt-5 max-w-[760px] text-[48px] font-semibold leading-[1.02] tracking-[-0.06em] text-[#1d1d1b] sm:text-[64px]">
              Satu peta untuk membaca 38 identitas daerah.
            </h1>
          </div>
          <div className="flex flex-col justify-end lg:pb-3">
            <p className="max-w-[500px] text-[16px] leading-7 text-[#61574d]">
              Jelajahi kabupaten dan kota Jawa Timur melalui peta interaktif yang
              terhubung langsung dengan data budaya, kuliner, destinasi, dan batik.
            </p>
            <div className="mt-7 grid grid-cols-3 gap-3">
              <div className="rounded-[14px] border border-[#e8dfd5] bg-white px-4 py-4 shadow-[0_12px_34px_rgb(63_47_29_/_0.045)]">
                <p className="text-[26px] font-semibold leading-none">38</p>
                <p className="mt-2 text-[11px] font-bold text-[#756a60]">Wilayah</p>
              </div>
              <div className="rounded-[14px] border border-[#e8dfd5] bg-white px-4 py-4 shadow-[0_12px_34px_rgb(63_47_29_/_0.045)]">
                <p className="text-[26px] font-semibold leading-none">
                  {mapData.mappedRegions}
                </p>
                <p className="mt-2 text-[11px] font-bold text-[#756a60]">Terhubung</p>
              </div>
              <div className="rounded-[14px] border border-[#e8dfd5] bg-white px-4 py-4 shadow-[0_12px_34px_rgb(63_47_29_/_0.045)]">
                <p className="text-[26px] font-semibold leading-none">
                  {totalDestinations}
                </p>
                <p className="mt-2 text-[11px] font-bold text-[#756a60]">Destinasi</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-[1460px] px-5 sm:px-8 lg:mt-16 lg:px-10">
          <EastJavaMap mapData={mapData} />
        </section>

        <section className="mx-auto mt-20 max-w-[1320px] px-5 sm:px-8 lg:px-10">
          <div className="max-w-[620px]">
            <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#8c531f]">
              Rekomendasi Awal
            </p>
            <h2 className="mt-4 text-[38px] font-semibold leading-tight tracking-[-0.05em]">
              Mulai dari wilayah dengan cerita paling kuat.
            </h2>
          </div>
          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {popularRegions.map((item) => (
              <PopularRegionCard
                key={item.slug}
                region={item.region}
                label={item.label}
                zone={item.zone}
              />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
