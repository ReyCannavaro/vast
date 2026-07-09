"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { EastJavaMapData } from "@/lib/mapService";

type EastJavaMapProps = {
  mapData: EastJavaMapData;
};

type SelectedMapItem = {
  kind: "region";
  slug: string;
} | null;

const displayMapViewBox = "0 118 1000 594";

function parseViewBox(viewBox: string) {
  const [x, y, width, height] = viewBox.split(" ").map(Number);

  return { x, y, width, height };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getContentSummary(region: EastJavaMapData["regions"][number]) {
  const counts = region.contentCounts;

  return `${counts.heritageItems} budaya, ${counts.foods} kuliner, ${counts.destinations} destinasi, ${counts.batikPatterns} batik`;
}

function getRegionTypeLabel(region: EastJavaMapData["regions"][number]) {
  return region.region.type === "kabupaten" ? "Kabupaten" : "Kota";
}

function getShortRegionName(region: EastJavaMapData["regions"][number]) {
  return region.region.name.replace(/^(Kabupaten|Kota)\s+/i, "");
}

function getTooltipPosition(
  region: EastJavaMapData["regions"][number],
  viewBox: ReturnType<typeof parseViewBox>,
) {
  return {
    x: clamp(region.areaCenter.x - 88, viewBox.x + 16, viewBox.x + viewBox.width - 176),
    y: clamp(region.areaCenter.y - 40, viewBox.y + 16, viewBox.y + viewBox.height - 38),
  };
}

export function EastJavaMap({ mapData }: EastJavaMapProps) {
  const [selectedItem, setSelectedItem] = useState<SelectedMapItem>(null);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const viewBox = useMemo(() => parseViewBox(displayMapViewBox), []);
  const fallbackRegion =
    mapData.regions.find((item) => item.region.slug === "kota-surabaya") ??
    mapData.regions[0];

  const selectedRegion =
    selectedItem?.kind === "region"
      ? mapData.regions.find((item) => item.region.slug === selectedItem.slug)
      : null;
  const hoveredRegion = hoveredSlug
    ? mapData.regions.find((item) => item.region.slug === hoveredSlug)
    : null;
  const activeRegion = selectedRegion ?? fallbackRegion;
  const tooltipPosition = hoveredRegion
    ? getTooltipPosition(hoveredRegion, viewBox)
    : null;
  const featuredRegions = [
    "kota-surabaya",
    "kota-malang",
    "kabupaten-banyuwangi",
    "kabupaten-ponorogo",
  ].flatMap((slug) => {
    const region = mapData.regions.find((item) => item.region.slug === slug);

    return region ? [region] : [];
  });
  return (
    <section className="overflow-hidden rounded-[18px] border border-[#e7ddd3] bg-white shadow-[0_28px_90px_rgb(33_30_27_/_0.08)]">
      <div className="grid lg:grid-cols-[360px_1fr]">
        <aside className="relative z-10 flex min-h-[580px] flex-col justify-between border-b border-[#e7ddd3] bg-white p-7 lg:border-b-0 lg:border-r">
          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#8c531f]">
              {getRegionTypeLabel(activeRegion)}
            </p>
            <h2 className="mt-4 min-h-[76px] text-[36px] font-semibold leading-[1.02] tracking-[-0.05em] text-[#202020]">
              {activeRegion.region.name}
            </h2>
            <p className="mt-5 text-[14px] leading-6 text-[#64594f]">
              {activeRegion.region.summary}
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-[12px] border border-[#ece4dc] bg-[#fbfbfa] px-4 py-4">
                <p className="text-[24px] font-semibold leading-none text-[#2d2925]">
                  {activeRegion.contentCounts.heritageItems}
                </p>
                <p className="mt-2 text-[11px] font-semibold text-[#75685d]">Budaya</p>
              </div>
              <div className="rounded-[12px] border border-[#ece4dc] bg-[#fbfbfa] px-4 py-4">
                <p className="text-[24px] font-semibold leading-none text-[#2d2925]">
                  {activeRegion.contentCounts.destinations}
                </p>
                <p className="mt-2 text-[11px] font-semibold text-[#75685d]">Destinasi</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                ...activeRegion.region.cultureHighlights.slice(0, 1),
                ...activeRegion.region.foods.slice(0, 1),
                ...activeRegion.region.destinations.slice(0, 1),
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-[8px] bg-[#f2eee9] px-3 py-2 text-[11px] font-bold text-[#6f3f1b]"
                >
                  {item}
                </span>
              ))}
            </div>

            <Link
              href={activeRegion.href}
              className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-[10px] bg-[#8c531f] px-5 text-[13px] font-bold text-white transition hover:bg-[#a2632c] active:translate-y-px"
            >
              Lihat Detail Wilayah
            </Link>
          </div>

          <div className="mt-8 border-t border-[#ece4dc] pt-6">
            <p className="text-[12px] font-bold text-[#7a6d62]">
              Wilayah sorotan
            </p>
            <div className="mt-3 grid gap-2">
              {featuredRegions.map((item) => (
                <button
                  key={item.region.slug}
                  type="button"
                  onClick={() => setSelectedItem({ kind: "region", slug: item.region.slug })}
                  className="flex items-center justify-between rounded-[12px] border border-[#ece4dc] bg-[#fbfbfa] px-4 py-3 text-left transition hover:border-[#8c531f]"
                >
                  <span className="text-[13px] font-bold text-[#302a25]">
                    {item.region.name}
                  </span>
                  <span className="text-[11px] font-semibold text-[#8c531f]">
                    {item.contentCounts.destinations} destinasi
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="relative min-h-[580px] overflow-hidden bg-[#a9dbe8] lg:min-h-[680px]">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(255_255_255_/_0.24),transparent_34%),radial-gradient(circle_at_28%_20%,rgb(255_255_255_/_0.24),transparent_24%),radial-gradient(circle_at_74%_70%,rgb(15_89_111_/_0.12),transparent_30%)]" />
          <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgb(255_255_255_/_0.55)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255_/_0.45)_1px,transparent_1px)] [background-size:72px_72px]" />
          <svg
            viewBox={displayMapViewBox}
            aria-label="Peta interaktif kabupaten dan kota Jawa Timur"
            className="absolute inset-0 h-full w-full"
            role="img"
          >
            <defs>
              <filter id="regency-map-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow
                  dx="0"
                  dy="7"
                  floodColor="#37505b"
                  floodOpacity="0.18"
                  stdDeviation="8"
                />
              </filter>
            </defs>

            <rect
              x={viewBox.x}
              y={viewBox.y}
              width={viewBox.width}
              height={viewBox.height}
              fill="transparent"
            />
            <text
              x="78"
              y="270"
              fill="#397484"
              fontSize="22"
              fontWeight="700"
              opacity="0.34"
            >
              Laut Jawa
            </text>
            <text
              x="520"
              y="470"
              fill="#397484"
              fontSize="18"
              fontWeight="700"
              opacity="0.30"
            >
              Selat Madura
            </text>

            <g filter="url(#regency-map-shadow)">
              {mapData.regions.map((item) => {
                const isSelected =
                  selectedItem?.kind === "region" && selectedItem.slug === item.region.slug;
                const isHovered = hoveredSlug === item.region.slug;
                const isActive = isSelected || isHovered;

                return (
                  <path
                    key={item.region.slug}
                    d={item.areaPath}
                    fill={isActive ? "#d8b56f" : "#fbf2d7"}
                    fillRule="evenodd"
                    stroke={isActive ? "#764413" : "#6f6a60"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={isActive ? 1.45 : 0.64}
                    vectorEffect="non-scaling-stroke"
                    role="button"
                    tabIndex={0}
                    aria-label={`Pilih ${item.region.name}`}
                    className="cursor-pointer outline-none transition duration-150"
                    onMouseEnter={() => setHoveredSlug(item.region.slug)}
                    onMouseLeave={() => setHoveredSlug(null)}
                    onFocus={() => setHoveredSlug(item.region.slug)}
                    onBlur={() => setHoveredSlug(null)}
                    onClick={() => setSelectedItem({ kind: "region", slug: item.region.slug })}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setSelectedItem({ kind: "region", slug: item.region.slug });
                      }
                    }}
                  />
                );
              })}
            </g>

            {tooltipPosition && hoveredRegion ? (
              <foreignObject
                x={tooltipPosition.x}
                y={tooltipPosition.y}
                width={176}
                height={38}
                className="pointer-events-none"
              >
                <div className="rounded-[12px] border border-white/70 bg-white/95 px-4 py-2 text-center text-[#563016] shadow-[0_8px_20px_rgb(43_29_14_/_0.18)]">
                  <span className="block text-[10px] font-black uppercase leading-none tracking-[0.14em] text-[#8c531f]">
                    {getRegionTypeLabel(hoveredRegion)}
                  </span>
                  <span className="mt-1 block truncate text-[14px] font-black leading-none tracking-[0.02em]">
                    {getShortRegionName(hoveredRegion)}
                  </span>
                </div>
              </foreignObject>
            ) : null}
          </svg>

          <div className="absolute bottom-5 right-5 rounded-[8px] border border-[#eadfd3] bg-[#fffaf5] px-4 py-2 text-[12px] font-bold text-[#6f3f1b] shadow-[0_12px_28px_rgb(56_45_34_/_0.12)]">
            {getContentSummary(activeRegion)}
          </div>
        </div>
      </div>
    </section>
  );
}
