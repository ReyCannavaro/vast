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

function getTooltipPosition(
  region: EastJavaMapData["regions"][number],
  viewBox: ReturnType<typeof parseViewBox>,
) {
  return {
    x: clamp(region.areaCenter.x - 84, viewBox.x + 12, viewBox.x + viewBox.width - 168),
    y: clamp(region.areaCenter.y - 44, viewBox.y + 12, viewBox.y + viewBox.height - 38),
  };
}

export function EastJavaMap({ mapData }: EastJavaMapProps) {
  const [selectedItem, setSelectedItem] = useState<SelectedMapItem>(null);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const viewBox = useMemo(() => parseViewBox(mapData.regencyViewBox), [mapData.regencyViewBox]);

  const selectedRegion =
    selectedItem?.kind === "region"
      ? mapData.regions.find((item) => item.region.slug === selectedItem.slug)
      : null;
  const hoveredRegion = hoveredSlug
    ? mapData.regions.find((item) => item.region.slug === hoveredSlug)
    : null;
  const tooltipPosition = hoveredRegion
    ? getTooltipPosition(hoveredRegion, viewBox)
    : null;

  return (
    <section className="relative overflow-hidden rounded-[16px] border border-[#d9c9b7] bg-[#bfe9fb] shadow-[0_24px_70px_rgb(64_45_24_/_0.10)]">
      <div className="relative min-h-[560px] overflow-hidden bg-[#bfe9fb] lg:min-h-[660px]">
        <svg
          viewBox={mapData.regencyViewBox}
          aria-label="Peta interaktif kabupaten dan kota Jawa Timur"
          className="absolute inset-0 h-full w-full"
          role="img"
        >
          <defs>
            <filter id="regency-map-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="6"
                floodColor="#37505b"
                floodOpacity="0.16"
                stdDeviation="8"
              />
            </filter>
          </defs>

          <rect
            x={viewBox.x}
            y={viewBox.y}
            width={viewBox.width}
            height={viewBox.height}
            fill="#bfe9fb"
          />

          <g filter="url(#regency-map-shadow)">
            {mapData.regions.map((item) => {
              const isSelected =
                selectedItem?.kind === "region" && selectedItem.slug === item.region.slug;
              const isHovered = hoveredSlug === item.region.slug;

              return (
                <path
                  key={item.region.slug}
                  d={item.areaPath}
                  fill={isSelected || isHovered ? "#e7d29d" : "#fbf6dc"}
                  fillRule="evenodd"
                  stroke={isSelected || isHovered ? "#8c531f" : "#6f6a60"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={isSelected || isHovered ? 1.3 : 0.58}
                  vectorEffect="non-scaling-stroke"
                  role="button"
                  tabIndex={0}
                  aria-label={`Buka popup ${item.region.name}`}
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

          {hoveredRegion && tooltipPosition ? (
            <foreignObject
              x={tooltipPosition.x}
              y={tooltipPosition.y}
              width={168}
              height={38}
              className="pointer-events-none"
            >
              <div className="truncate rounded-full border border-white/70 bg-white/95 px-4 py-2 text-center text-[13px] font-black uppercase tracking-[0.04em] text-[#563016] shadow-[0_8px_20px_rgb(43_29_14_/_0.18)]">
                {hoveredRegion.region.name}
              </div>
            </foreignObject>
          ) : null}
        </svg>

        <div className="pointer-events-none absolute left-6 top-6 max-w-[300px] rounded-[14px] border border-white/60 bg-white/78 px-5 py-4 text-[#332920] shadow-[0_16px_46px_rgb(56_45_34_/_0.12)] backdrop-blur-xl">
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#8c531f]">
            Explore Map
          </p>
          <p className="mt-2 text-[13px] leading-5 text-[#5f554b]">
            Arahkan kursor ke wilayah, lalu klik kabupaten/kota untuk membuka ringkasan data.
          </p>
        </div>

        <div className="pointer-events-none absolute bottom-6 left-6 rounded-full border border-white/70 bg-white/78 px-4 py-2 text-[12px] font-bold text-[#6f3f1b] shadow-[0_12px_28px_rgb(56_45_34_/_0.12)] backdrop-blur-xl">
          {mapData.regions.length}/{mapData.totalRegions} wilayah terhubung
        </div>

        {selectedRegion ? (
          <div className="absolute right-6 top-6 z-30 w-[380px] max-w-[calc(100%-3rem)] overflow-hidden rounded-[16px] border border-[#dfd1c4] bg-[#f9f5ee]/96 text-[#332920] shadow-[0_24px_70px_rgb(56_45_34_/_0.20)] backdrop-blur-xl">
            <div className="relative border-b border-[#e3d5c8] px-6 py-5 pr-14">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white/80 text-lg font-bold text-[#5f554b] transition hover:bg-[#8c531f] hover:text-white"
                aria-label="Tutup popup wilayah"
              >
                x
              </button>
              <p className="text-[11px] font-black uppercase tracking-[0.15em] text-[#8c531f]">
                {selectedRegion.region.type === "kabupaten" ? "Kabupaten" : "Kota"}
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">
                {selectedRegion.region.name}
              </h2>
              <p className="mt-2 text-sm leading-5 text-[#6b6056]">
                {selectedRegion.region.nickname ?? selectedRegion.region.tagline}
              </p>
            </div>

            <div className="px-6 py-5">
              <p className="line-clamp-4 text-sm leading-6 text-[#5f554b]">
                {selectedRegion.region.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  ...selectedRegion.region.cultureHighlights.slice(0, 1),
                  ...selectedRegion.region.foods.slice(0, 1),
                  ...selectedRegion.region.destinations.slice(0, 1),
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white/86 px-3 py-2 text-[12px] font-bold text-[#8c531f]"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-4 rounded-[10px] bg-white/78 px-4 py-3 text-[12px] font-bold text-[#6f3f1b]">
                {getContentSummary(selectedRegion)}
              </p>
              <Link
                href={selectedRegion.href}
                className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-full bg-[#8c531f] px-5 text-[13px] font-bold text-white transition hover:bg-[#a2632c]"
              >
                Lihat Detail
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
