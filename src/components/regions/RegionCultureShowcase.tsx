"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { CtaArrowIcon } from "@/components/ui/CtaArrowIcon";
import type { HeritageItem, ImageAsset } from "@/types/region";

type CultureModalItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  image?: ImageAsset;
};

type RegionCultureShowcaseProps = {
  items: HeritageItem[];
  regionName: string;
};

const heritageLabels: Record<string, string> = {
  batik: "Tradisi",
  budaya: "Budaya",
  festival: "Festival",
  ikon: "Ikon",
  lainnya: "Budaya",
  sejarah: "Sejarah",
  seni: "Seni Tari",
  tradisi: "Ritual",
};

function clampText(text: string, maxLength = 92) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trim()}...`;
}

function CultureModal({
  item,
  onClose,
  regionName,
}: {
  item: CultureModalItem | null;
  onClose: () => void;
  regionName: string;
}) {
  useEffect(() => {
    if (!item) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[#15110e]/68 px-4 py-6 backdrop-blur-[6px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${item.id}-culture-title`}
      onMouseDown={onClose}
    >
      <div
        className="relative grid max-h-[calc(100dvh-48px)] min-h-0 w-full max-w-5xl overflow-hidden rounded-[18px] border border-white/18 bg-[#f8f5ef] text-[#211f1d] shadow-[0_34px_120px_rgb(0_0_0/0.42)] md:grid-cols-[minmax(0,1fr)_minmax(360px,0.82fr)]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="relative min-h-[300px] bg-[#e2ddd5] md:min-h-[min(610px,calc(100dvh-48px))]">
          {item.image ? (
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes="(min-width: 768px) 560px, 100vw"
              className="object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-[#1b130d]/18" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#160f0a]/66 via-[#160f0a]/14 to-[#160f0a]/16" />
          <div className="absolute bottom-7 left-7 right-7 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/75">
              {item.category}
            </p>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/82">
              {item.image?.caption ?? `${item.name} dari ${regionName}`}
            </p>
          </div>
        </div>

        <div className="relative min-h-0 overflow-y-auto overscroll-contain px-7 py-8 md:max-h-[calc(100dvh-48px)] md:px-10 md:py-11">
          <button
            type="button"
            aria-label="Tutup detail budaya"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#d9cec2] bg-white/82 text-sm font-bold text-[#3a312a] shadow-sm transition hover:bg-white active:scale-95"
            onClick={onClose}
          >
            X
          </button>

          <p className="max-w-max border-b border-primary/35 pb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Catatan Budaya
          </p>
          <h3
            id={`${item.id}-culture-title`}
            className="mt-8 max-w-[12ch] text-5xl font-semibold leading-[0.94] text-[#171411] md:text-6xl"
          >
            {item.name}
          </h3>

          <div className="mt-8 grid gap-3 border-y border-[#ded4c9] py-5">
            <div className="grid grid-cols-[92px_1fr] gap-4 text-sm">
              <span className="text-[#8b8076]">Kategori</span>
              <span className="font-semibold text-primary">{item.category}</span>
            </div>
            <div className="grid grid-cols-[92px_1fr] gap-4 text-sm">
              <span className="text-[#8b8076]">Wilayah</span>
              <span className="font-medium text-[#352c25]">{regionName}</span>
            </div>
          </div>

          <p className="mt-8 text-[17px] leading-8 text-[#51483f]">{item.description}</p>
        </div>
      </div>
    </div>
  );
}

function CultureCard({
  item,
  onOpen,
}: {
  item: CultureModalItem;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      className="group flex min-h-[268px] flex-col overflow-hidden rounded-[10px] border border-[#eadfd6] bg-white text-left transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_42px_rgb(64_45_31/0.10)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      onClick={onOpen}
    >
      <div className="relative h-36 bg-[#f3f1ed]">
        {item.image ? (
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(min-width: 1024px) 288px, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.035]"
          />
        ) : null}
        <div className="absolute inset-0 bg-[#1b130d]/10" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(22_15_10_/_0.18),rgb(22_15_10_/_0.05)_42%,rgb(22_15_10_/_0.52))]" />
        <p className="absolute left-5 top-5 text-[11px] font-bold uppercase tracking-[0.08em] text-white drop-shadow-[0_1px_8px_rgb(0_0_0_/_0.35)]">
          {item.category}
        </p>
        <span
          aria-hidden="true"
          className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-[8px] border border-white/24 bg-[#17110d]/52 text-white shadow-[0_10px_24px_rgb(0_0_0/0.20)] backdrop-blur-md transition group-hover:translate-x-0.5 group-hover:bg-white/18"
        >
          <CtaArrowIcon className="h-4 w-4" />
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-end px-6 pb-6 pt-5">
        <h3 className="text-lg font-medium leading-tight text-[#2a2622]">{item.name}</h3>
        <p className="mt-3 text-sm leading-6 text-[#675b53]">
          {clampText(item.description)}
        </p>
        <span className="mt-5 inline-flex w-max items-center gap-3 rounded-[8px] border border-[#e2d6ca] bg-[#fffaf5] px-4 py-2 text-sm font-semibold text-[#17110d] shadow-[0_10px_24px_rgb(64_45_31/0.08)] transition duration-300 group-hover:border-primary/40 group-hover:bg-white group-hover:text-primary">
          <span>Buka detail</span>
          <span
            aria-hidden="true"
            className="inline-flex h-5 w-5 items-center justify-center transition duration-300 group-hover:translate-x-1"
          >
            <CtaArrowIcon className="h-4 w-4" />
          </span>
        </span>
      </div>
    </button>
  );
}

export function RegionCultureShowcase({ items, regionName }: RegionCultureShowcaseProps) {
  const [selectedItem, setSelectedItem] = useState<CultureModalItem | null>(null);
  const cultureItems = items.map<CultureModalItem>((item) => ({
    id: item.id,
    name: item.name,
    category: heritageLabels[item.category] ?? item.category,
    description: item.description,
    image: item.image,
  }));

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-4xl font-medium tracking-[-0.03em]">
              Kekayaan Budaya
            </h2>
            <p className="mt-3 text-base text-[#5f554e]">
              Menelusuri jejak tradisi yang masih hidup di {regionName}.
            </p>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-base font-bold text-primary transition hover:text-secondary"
          >
            Lihat Semua Budaya
            <CtaArrowIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cultureItems.map((item) => (
            <CultureCard
              key={item.id}
              item={item}
              onOpen={() => setSelectedItem(item)}
            />
          ))}
        </div>
      </section>

      <CultureModal
        item={selectedItem}
        regionName={regionName}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
}
