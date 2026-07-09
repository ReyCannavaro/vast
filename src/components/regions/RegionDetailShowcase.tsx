"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import type { DestinationItem, FoodItem, ImageAsset } from "@/types/region";

type ModalItem = {
  id: string;
  name: string;
  description: string;
  badge: string;
  kind: "destination" | "food";
  meta: string[];
  image?: ImageAsset;
};

type RegionDetailShowcaseProps = {
  destinations: DestinationItem[];
  foods: FoodItem[];
  regionName: string;
  tasteLabel: string;
};

function clampText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trim()}...`;
}

function normalizeDestinationType(type: DestinationItem["type"]) {
  const labels: Record<DestinationItem["type"], string> = {
    alam: "Alam",
    budaya: "Budaya",
    kota: "Kota",
    lainnya: "Destinasi",
    religi: "Religi",
    sejarah: "Sejarah",
  };

  return labels[type] ?? "Destinasi";
}

function DetailModal({
  item,
  onClose,
}: {
  item: ModalItem | null;
  onClose: () => void;
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

  const modalLabel = item.kind === "food" ? "Cerita Kuliner" : "Catatan Destinasi";
  const imageCaption = item.image?.caption ?? `${item.name} dari ${item.meta.at(-1) ?? "Jawa Timur"}`;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[#16110d]/68 px-4 py-6 backdrop-blur-[6px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${item.id}-title`}
      onMouseDown={onClose}
    >
      <div
        className="relative grid max-h-[calc(100dvh-48px)] min-h-0 w-full max-w-5xl overflow-hidden rounded-[18px] border border-white/18 bg-[#f8f5ef] text-[#211f1d] shadow-[0_34px_120px_rgb(0_0_0/0.42)] md:grid-cols-[minmax(0,0.98fr)_minmax(360px,0.82fr)]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="relative min-h-[300px] bg-[#2f2a24] md:min-h-[min(620px,calc(100dvh-48px))]">
          {item.image ? (
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes="(min-width: 768px) 560px, 100vw"
              className="object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-black/10 to-black/14" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
            <p className="max-w-sm text-sm leading-6 text-white/78">{imageCaption}</p>
            <div className="mt-5 h-px w-24 bg-white/50" />
          </div>
        </div>

        <div className="relative min-h-0 overflow-y-auto overscroll-contain px-7 py-8 md:max-h-[calc(100dvh-48px)] md:px-10 md:py-11">
          <button
            type="button"
            aria-label="Tutup detail"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#d9cec2] bg-white/80 text-sm font-bold text-[#3a312a] shadow-sm transition hover:bg-white active:scale-95"
            onClick={onClose}
          >
            X
          </button>

          <p className="max-w-max border-b border-primary/35 pb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            {modalLabel}
          </p>
          <h3
            id={`${item.id}-title`}
            className="mt-8 max-w-[11ch] text-5xl font-semibold leading-[0.94] text-[#171411] md:text-6xl"
          >
            {item.name}
          </h3>

          <div className="mt-8 grid gap-3 border-y border-[#ded4c9] py-5">
            <div className="grid grid-cols-[92px_1fr] gap-4 text-sm">
              <span className="text-[#8b8076]">Kategori</span>
              <span className="font-semibold text-primary">{item.badge}</span>
            </div>
            {item.meta.map((meta, index) => (
              <div key={meta} className="grid grid-cols-[92px_1fr] gap-4 text-sm">
                <span className="text-[#8b8076]">
                  {index === item.meta.length - 1 ? "Wilayah" : "Tag"}
                </span>
                <span className="font-medium text-[#352c25]">{meta}</span>
              </div>
            ))}
          </div>

          <p className="mt-8 text-[17px] leading-8 text-[#51483f]">{item.description}</p>

          <div className="mt-9 rounded-[14px] border border-[#e2d7cb] bg-white/58 px-5 py-4">
            <p className="text-sm font-semibold text-[#2d2721]">Ringkasan</p>
            <p className="mt-2 text-sm leading-6 text-[#6b6259]">
              {item.kind === "food"
                ? `${item.name} ditampilkan sebagai salah satu rasa lokal yang mewakili ${item.meta.at(-1) ?? "daerah ini"}.`
                : `${item.name} dipilih sebagai salah satu ruang perjalanan yang memperlihatkan karakter ${item.meta.at(-1) ?? "daerah ini"}.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailCard({
  item,
  onClick,
  variant,
}: {
  item: ModalItem;
  onClick: () => void;
  variant: "destination" | "food";
}) {
  const minHeight = variant === "food" ? "min-h-[300px]" : "min-h-[304px]";
  const radius = variant === "food" ? "rounded-[10px]" : "rounded-[12px]";
  const gradient =
    variant === "food"
      ? "from-[#160f0a]/86 via-[#160f0a]/34 to-[#160f0a]/8"
      : "from-[#160f0a]/78 via-[#160f0a]/28 to-[#160f0a]/6";

  return (
    <button
      type="button"
      className={`group relative ${minHeight} overflow-hidden ${radius} border border-[#eadfd6] bg-[#e7e2dc] text-left transition duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
      onClick={onClick}
    >
      {item.image ? (
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="(min-width: 1024px) 384px, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
        />
      ) : null}
      <div className="absolute inset-0 bg-[#1b130d]/12" />
      <div className={`absolute inset-0 bg-gradient-to-t ${gradient}`} />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <p className="mb-3 inline-flex rounded-[8px] bg-white/18 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-white backdrop-blur">
          {item.badge}
        </p>
        <h3 className="text-lg font-bold">{item.name}</h3>
        <p className="mt-3 text-sm leading-6 text-white/82">
          {clampText(item.description, variant === "food" ? 104 : 68)}
        </p>
        <span className="mt-5 inline-flex min-h-9 items-center justify-center rounded-[8px] border border-white/24 bg-[#17110d]/46 px-4 text-xs font-bold uppercase tracking-[0.08em] text-white shadow-[0_10px_24px_rgb(0_0_0/0.20)] backdrop-blur-md transition group-hover:border-white/38 group-hover:bg-white/16">
          Baca lengkap
        </span>
      </div>
    </button>
  );
}

export function RegionDetailShowcase({
  destinations,
  foods,
  regionName,
  tasteLabel,
}: RegionDetailShowcaseProps) {
  const [selectedItem, setSelectedItem] = useState<ModalItem | null>(null);
  const foodItems = useMemo(
    () =>
      foods.map<ModalItem>((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        badge: "Kuliner",
        kind: "food",
        meta: item.tags.length > 0 ? [...item.tags, regionName] : [regionName],
        image: item.image,
      })),
    [foods, regionName],
  );
  const destinationItems = useMemo(
    () =>
      destinations.map<ModalItem>((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        badge: normalizeDestinationType(item.type),
        kind: "destination",
        meta: [normalizeDestinationType(item.type), regionName],
        image: item.image,
      })),
    [destinations, regionName],
  );

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
        <h2 className="text-4xl font-medium tracking-[-0.03em]">
          Cita Rasa {tasteLabel}
        </h2>
        <p className="mt-3 text-base text-[#5f554e]">
          Kuliner khas yang menyimpan karakter rasa lokal {regionName}.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {foodItems.map((item) => (
            <DetailCard
              key={item.id}
              item={item}
              variant="food"
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
        <h2 className="text-center text-4xl font-medium tracking-[-0.03em]">
          Destinasi Pilihan
        </h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {destinationItems.map((item) => (
            <DetailCard
              key={item.id}
              item={item}
              variant="destination"
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
      </section>

      <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  );
}
