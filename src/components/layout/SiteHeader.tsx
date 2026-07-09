"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/regions", label: "Explore Map" },
  { href: "/gallery", label: "Gallery" },
  { href: "/game", label: "Mini Game" },
];

type NavTone = "darkText" | "lightText";

function readRgb(color: string) {
  const match = color.match(/rgba?\(([^)]+)\)/);

  if (!match) {
    return null;
  }

  const [r, g, b, a = "1"] = match[1].split(",").map((value) => value.trim());

  return {
    r: Number(r),
    g: Number(g),
    b: Number(b),
    a: Number(a),
  };
}

function getLuminance({ r, g, b }: { r: number; g: number; b: number }) {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

function getSaturation({ r, g, b }: { r: number; g: number; b: number }) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  return max === 0 ? 0 : (max - min) / max;
}

export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const toneRef = useRef<NavTone>("lightText");
  const [tone, setTone] = useState<NavTone>("lightText");

  useEffect(() => {
    const header = headerRef.current;

    if (!header) {
      return;
    }

    let frame = 0;

    const detectTone = () => {
      frame = 0;

      const rect = header.getBoundingClientRect();
      const sampleY = rect.top + rect.height / 2;
      const sampleXs = [
        rect.left + rect.width * 0.28,
        rect.left + rect.width * 0.5,
        rect.left + rect.width * 0.72,
      ];

      const surfaceScores = sampleXs.map((sampleX) => {
        const target = document
          .elementsFromPoint(sampleX, sampleY)
          .find((element) => !header.contains(element));

        let current: Element | null | undefined = target;

        while (current && current !== document.documentElement) {
          const styles = window.getComputedStyle(current);

          if (styles.backgroundImage !== "none") {
            return 0;
          }

          const rgb = readRgb(styles.backgroundColor);

          if (rgb && rgb.a > 0.2) {
            const luminance = getLuminance(rgb);
            const saturation = getSaturation(rgb);

            if (saturation > 0.12) {
              return 0;
            }

            return luminance;
          }

          current = current.parentElement;
        }

        const bodyColor = readRgb(window.getComputedStyle(document.body).backgroundColor);

        return bodyColor ? getLuminance(bodyColor) : 1;
      });

      const brightNeutralCount = surfaceScores.filter((score) => score > 0.84).length;
      const nextTone: NavTone = brightNeutralCount >= 2 ? "darkText" : "lightText";

      if (toneRef.current !== nextTone) {
        toneRef.current = nextTone;
        setTone(nextTone);
      }
    };

    const scheduleDetectTone = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(detectTone);
    };

    scheduleDetectTone();
    window.addEventListener("scroll", scheduleDetectTone, { passive: true });
    window.addEventListener("resize", scheduleDetectTone);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", scheduleDetectTone);
      window.removeEventListener("resize", scheduleDetectTone);
    };
  }, []);

  const isDarkText = tone === "darkText";

  return (
    <header ref={headerRef} className="fixed left-0 right-0 top-4 z-30 px-4 sm:top-6">
      <nav className="relative isolate mx-auto flex h-[58px] max-w-[960px] items-center justify-between overflow-hidden rounded-full border border-white/24 bg-white/16 px-6 shadow-[inset_0_1px_1px_rgb(255_255_255_/_0.30),0_18px_54px_rgb(0_0_0_/_0.18)] backdrop-blur-2xl backdrop-saturate-150 sm:h-[68px] sm:px-10 lg:max-w-[1040px]">
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[linear-gradient(145deg,rgb(255_255_255_/_0.20),rgb(255_255_255_/_0.08)_45%,rgb(0_0_0_/_0.08)_100%)]" />
        <div className="pointer-events-none absolute inset-x-8 top-0 -z-10 h-px bg-white/45" />
        <div className="pointer-events-none absolute inset-px -z-10 rounded-full border border-primary/20" />
        <Link href="/" className="relative h-12 w-[142px] shrink-0 sm:h-[58px] sm:w-[178px]">
          <Image
            src="/logo.png"
            alt="VAST"
            fill
            priority
            sizes="178px"
            className="object-contain object-left"
          />
        </Link>
        <div
          className={`hidden items-center gap-10 text-[14px] font-bold transition-colors duration-300 md:flex lg:gap-14 ${
            isDarkText
              ? "text-ink drop-shadow-[0_1px_10px_rgb(255_255_255_/_0.62)]"
              : "text-white drop-shadow-[0_1px_8px_rgb(0_0_0_/_0.24)]"
          }`}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap transition hover:text-[#e6a061]"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          href="/regions"
          className="inline-flex h-9 shrink-0 items-center justify-center rounded-[10px] bg-primary px-5 text-[11px] font-bold text-white shadow-[0_10px_22px_rgb(138_79_29_/_0.22)] transition hover:bg-secondary active:translate-y-px sm:h-10 sm:px-6"
        >
          Get Started
        </Link>
      </nav>
    </header>
  );
}
