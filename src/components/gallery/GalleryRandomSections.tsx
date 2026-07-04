"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export type GalleryItem = {
  id: string;
  name: string;
  description: string;
  regionName: string;
  regionSlug: string;
  image?: {
    src: string;
    alt: string;
  };
};

export type GallerySections = {
  batik: GalleryItem[];
  culture: GalleryItem[];
  destinations: GalleryItem[];
  foods: GalleryItem[];
};

type GalleryRandomSectionsProps = {
  items: GallerySections;
};

type GallerySectionKey = keyof GallerySections;

const sectionLimits: Record<GallerySectionKey, number> = {
  batik: 12,
  culture: 8,
  destinations: 8,
  foods: 8,
};

function clampText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trim()}...`;
}

function shuffleItems<T>(items: T[], limit: number) {
  const nextItems = [...items];

  for (let index = nextItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [nextItems[index], nextItems[randomIndex]] = [nextItems[randomIndex], nextItems[index]];
  }

  return nextItems.slice(0, limit);
}

function createInitialSections(items: GallerySections): GallerySections {
  return {
    batik: items.batik.slice(0, sectionLimits.batik),
    culture: items.culture.slice(0, sectionLimits.culture),
    destinations: items.destinations.slice(0, sectionLimits.destinations),
    foods: items.foods.slice(0, sectionLimits.foods),
  };
}

function createRandomSections(items: GallerySections): GallerySections {
  return {
    batik: shuffleItems(items.batik, sectionLimits.batik),
    culture: shuffleItems(items.culture, sectionLimits.culture),
    destinations: shuffleItems(items.destinations, sectionLimits.destinations),
    foods: shuffleItems(items.foods, sectionLimits.foods),
  };
}

function GalleryCard({
  item,
  mode = "plain",
}: {
  item: GalleryItem;
  mode?: "imageTop" | "plain";
}) {
  const href = `/regions/${item.regionSlug}`;
  const hasImage = Boolean(item.image);
  const imageHeight = mode === "imageTop" ? "h-44" : "h-36";

  return (
    <Link
      href={href}
      className="group flex min-h-[278px] flex-col overflow-hidden rounded-[8px] border border-[#8b7d6f]/78 bg-white transition duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_18px_42px_rgb(64_45_31/0.14)]"
    >
      <div className={`relative ${imageHeight} bg-[#e7e4de]`}>
        {hasImage ? (
          <Image
            src={item.image!.src}
            alt={item.image!.alt}
            fill
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        ) : null}
        <div className="absolute inset-x-0 top-0 flex justify-end p-3">
          <span className="rounded-full bg-[#e5efd2] px-3 py-1 text-[10px] font-bold uppercase text-[#5f7a34]">
            {item.regionName}
          </span>
        </div>
        {mode === "imageTop" ? (
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-6">
        <h3 className="text-lg font-bold leading-tight text-[#292520]">{item.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-[#6d6258]">
          {clampText(item.description, mode === "imageTop" ? 96 : 104)}
        </p>
        <span className="mt-5 text-xs font-bold text-primary transition group-hover:text-secondary">
          Lihat Detail +
        </span>
      </div>
    </Link>
  );
}

function SectionTitle({
  align = "left",
  description,
  id,
  title,
}: {
  align?: "center" | "left" | "right";
  description: string;
  id?: string;
  title: string;
}) {
  const alignment =
    align === "right"
      ? "items-end text-right"
      : align === "center"
        ? "items-center text-center"
        : "items-start text-left";
  const linePlacement = align === "right" ? "order-2 ml-4" : "mr-4";

  return (
    <div id={id} className={`mb-10 flex flex-col ${alignment}`}>
      <div className="flex items-center">
        {align !== "center" ? <span className={`h-16 w-[2px] bg-primary ${linePlacement}`} /> : null}
        <div>
          <h2 className="text-3xl font-semibold leading-tight text-primary">{title}</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#9b9289]">{description}</p>
        </div>
      </div>
    </div>
  );
}

export function GalleryRandomSections({ items }: GalleryRandomSectionsProps) {
  const initialSections = useMemo(() => createInitialSections(items), [items]);
  const [sections, setSections] = useState(initialSections);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setSections(createRandomSections(items));
    });

    return () => window.cancelAnimationFrame(frame);
  }, [items]);

  return (
    <>
      <section className="bg-[#3c3a38] px-6 pb-28 pt-44 text-center text-white lg:px-10">
        <div className="mx-auto flex min-h-[520px] max-w-5xl flex-col items-center justify-center">
          <p className="rounded-full border border-white/42 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white/80">
            Eksplorasi Warisan Nusantara
          </p>
          <h1 className="mt-6 text-5xl font-bold leading-none text-primary md:text-7xl">
            Budaya Jawa Timur
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/76 md:text-base">
            Menelusuri kekayaan tak ternilai dari 38 kota dan kabupaten. Dari
            gemulai tarian tradisional, kelezatan kuliner otentik, hingga mahakarya
            batik yang menyimpan filosofi luhur di setiap helai kainnya.
          </p>
          <Link
            href="#ragam-budaya"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-[8px] bg-primary px-7 text-sm font-bold text-white transition hover:bg-secondary"
          >
            Jelajahi Sekarang
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <SectionTitle
          id="ragam-budaya"
          title="Ragam Budaya Jawa Timur"
          description="Kesenian, tarian, dan tradisi lokal yang membentuk identitas masyarakat Jawa Timur."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sections.culture.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <SectionTitle
          align="right"
          title="Makanan Khas Jawa Timur"
          description="Cita rasa otentik yang kaya rempah dan menggugah selera dari ujung barat ke ujung timur."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sections.foods.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <SectionTitle
          title="Destinasi Wisata Jawa Timur"
          description="Tempat wisata alam, sejarah, dan budaya yang menjadi saksi bisu kekayaan daerah."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sections.destinations.map((item) => (
            <GalleryCard key={item.id} item={item} mode="imageTop" />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
        <SectionTitle
          align="center"
          title="Batik Khas Jawa Timur"
          description="Motif dan corak batik yang menceritakan filosofi hidup serta kekayaan alam pesisir dan pedalaman."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sections.batik.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}
