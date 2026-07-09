"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { ImageAsset, RegionType } from "@/types/region";

export type GameRegionSelectorItem = {
  slug: string;
  name: string;
  type: RegionType;
  summary: string;
  culturalArea?: string;
  heroImage?: ImageAsset;
  itemCount: number;
};

type GameRegionSelectorClientProps = {
  regions: GameRegionSelectorItem[];
  baseHref: string;
  itemLabel: string;
  actionLabel: string;
  tone: "quiz" | "matching" | "puzzle";
};

const toneStyles = {
  quiz: {
    badge: "bg-[#f0e3d8] text-primary",
    action: "bg-primary text-white group-hover:bg-secondary",
    activeFilter: "border-primary bg-primary text-white",
  },
  matching: {
    badge: "bg-[#eef5e8] text-[#617554]",
    action: "border border-[#617554] text-[#617554] group-hover:bg-[#617554] group-hover:text-white",
    activeFilter: "border-[#617554] bg-[#617554] text-white",
  },
  puzzle: {
    badge: "bg-[#f4ead4] text-[#8a5923]",
    action: "bg-[#8f5a23] text-white group-hover:bg-primary",
    activeFilter: "border-[#8f5a23] bg-[#8f5a23] text-white",
  },
};

const filters = [
  { label: "Semua", value: "all" },
  { label: "Kabupaten", value: "kabupaten" },
  { label: "Kota", value: "kota" },
] as const;

function formatRegionType(type: RegionType) {
  return type === "kota" ? "Kota" : "Kabupaten";
}

function getShortName(name: string) {
  return name.replace(/^Kabupaten\s|^Kota\s/, "");
}

export function GameRegionSelectorClient({
  regions,
  baseHref,
  itemLabel,
  actionLabel,
  tone,
}: GameRegionSelectorClientProps) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]["value"]>("all");
  const styles = toneStyles[tone];

  const filteredRegions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return regions.filter((region) => {
      const matchesType = activeFilter === "all" || region.type === activeFilter;

      if (!matchesType) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const searchableText = [
        region.name,
        getShortName(region.name),
        region.culturalArea,
        region.summary,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [activeFilter, query, regions]);

  return (
    <div className="mt-12">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <label className="block">
          <span className="sr-only">Cari wilayah</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari kota, kabupaten, atau kawasan budaya..."
            className="h-14 w-full rounded-[14px] border border-[#dfd0c2] bg-white px-5 text-base font-medium text-[#2a2521] shadow-[0_12px_34px_rgb(92_61_39/0.06)] outline-none transition placeholder:text-[#9c9188] focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
        </label>

        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className={`h-12 rounded-[10px] border px-6 text-sm font-bold transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] ${
                  isActive
                    ? styles.activeFilter
                    : "border-[#dfd0c2] bg-white text-[#675a51] hover:border-primary hover:text-primary"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-5 text-sm font-semibold text-[#8a7e75]">
        Menampilkan {filteredRegions.length} dari {regions.length} wilayah.
      </p>

      {filteredRegions.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRegions.map((region) => (
            <Link
              key={region.slug}
              href={`${baseHref}/${region.slug}`}
              className="group overflow-hidden rounded-[16px] border border-[#dfd0c2] bg-white transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-[0_24px_70px_rgb(92_61_39/0.13)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div className="relative h-44 bg-[#d9d1ca]">
                {region.heroImage ? (
                  <Image
                    src={region.heroImage.src}
                    alt={region.heroImage.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/54 via-black/8 to-transparent" />
                <span className="absolute bottom-4 left-4 rounded-[8px] bg-white/88 px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-primary">
                  {formatRegionType(region.type)}
                </span>
              </div>

              <div className="px-6 py-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold tracking-[-0.02em] text-[#2a2521]">
                      {getShortName(region.name)}
                    </h3>
                    <p className="mt-2 text-sm text-[#8a7e75]">
                      {region.culturalArea ?? "Jawa Timur"}
                    </p>
                  </div>
                  <span className={`rounded-[8px] px-4 py-2 text-sm font-bold ${styles.badge}`}>
                    {region.itemCount} {itemLabel}
                  </span>
                </div>
                <p className="mt-5 line-clamp-2 text-sm leading-6 text-[#625850]">
                  {region.summary}
                </p>
                <span
                  className={`mt-6 inline-flex h-11 w-full items-center justify-center rounded-[10px] text-sm font-bold transition ${styles.action}`}
                >
                  {actionLabel}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-[18px] border border-[#dfd0c2] bg-[#fbfaf8] px-6 py-10 text-center">
          <h3 className="text-2xl font-bold tracking-[-0.02em] text-[#2a2521]">
            Wilayah tidak ditemukan
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#756a61]">
            Coba pakai kata kunci lain, atau kembali ke filter semua wilayah.
          </p>
        </div>
      )}
    </div>
  );
}
