import type { EastJavaMapData } from "@/lib/mapService";

type EastJavaMapProps = {
  mapData: EastJavaMapData;
};

function formatContentSummary(region: EastJavaMapData["regions"][number]) {
  const counts = region.contentCounts;

  return [
    `${counts.heritageItems} budaya`,
    `${counts.foods} kuliner`,
    `${counts.destinations} destinasi`,
    `${counts.batikPatterns} batik`,
  ].join(", ");
}

export function EastJavaMap({ mapData }: EastJavaMapProps) {
  return (
    <section className="mt-8 border border-border bg-surface p-5">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-primary">Peta Jawa Timur</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Jelajahi sebaran kabupaten dan kota Jawa Timur dari pesisir utara,
            kawasan Mataraman, Tapal Kuda, hingga Madura.
          </p>
        </div>
        <p className="text-sm font-semibold text-secondary">
          {mapData.mappedRegions}/{mapData.totalRegions} region terhubung
        </p>
      </div>

      <div className="mt-6 overflow-hidden border border-border bg-background">
        <svg
          viewBox={mapData.viewBox}
          role="img"
          aria-labelledby="east-java-map-title east-java-map-description"
          className="h-auto w-full"
        >
          <title id="east-java-map-title">Peta interaktif Jawa Timur</title>
          <desc id="east-java-map-description">
            Peta Jawa Timur dengan marker kabupaten dan kota yang dapat dibuka
            menuju halaman detail region.
          </desc>
          <path
            d={mapData.path}
            fill="var(--surface)"
            stroke="var(--primary)"
            strokeWidth="0.55"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={mapData.path}
            fill="var(--accent)"
            fillOpacity="0.16"
            stroke="none"
          />

          {mapData.regions.map((item) => (
            <a
              key={item.region.slug}
              href={item.href}
              aria-label={`Buka detail ${item.region.name}`}
            >
              <title>
                {item.region.name} - {formatContentSummary(item)}
              </title>
              <circle
                cx={item.x}
                cy={item.y}
                r={item.region.isFeatured ? 1.35 : 1.05}
                fill={item.region.isFeatured ? "var(--secondary)" : "var(--primary)"}
                stroke="var(--surface)"
                strokeWidth="0.45"
                vectorEffect="non-scaling-stroke"
              />
            </a>
          ))}
        </svg>
      </div>

      <div className="mt-4 grid gap-3 text-sm text-muted sm:grid-cols-2 lg:grid-cols-4">
        <p>
          <span className="font-semibold text-foreground">Marker:</span>{" "}
          {mapData.mappedRegions} titik
        </p>
        <p>
          <span className="font-semibold text-foreground">Coverage:</span>{" "}
          {mapData.missingRegionSlugs.length === 0 ? "Lengkap" : "Belum lengkap"}
        </p>
        <p>
          <span className="font-semibold text-foreground">Merah:</span> featured
        </p>
        <p>
          <span className="font-semibold text-foreground">Hijau:</span> region reguler
        </p>
      </div>
    </section>
  );
}
