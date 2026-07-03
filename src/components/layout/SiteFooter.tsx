import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 md:grid-cols-[1.15fr_1fr] lg:px-10">
        <div>
          <h2 className="max-w-sm text-3xl font-semibold leading-tight">
            Discover East Java&apos;s Stories
          </h2>
          <div className="mt-12 flex items-end gap-3">
            <p className="text-3xl font-black tracking-[-0.04em]">VAST</p>
            <p className="max-w-[130px] text-[9px] font-semibold uppercase leading-4 tracking-[0.18em] text-white/60">
              Java East Cultural Explorer
            </p>
          </div>
          <p className="mt-8 max-w-sm text-sm leading-7 text-white/70">
            Preserving East Java&apos;s cultural heritage through interactive
            exploration, visual storytelling, and immersive digital experiences.
          </p>
          <div className="mt-10 flex gap-4 text-sm font-bold text-primary">
            <span>IG</span>
            <span>FB</span>
            <span>TW</span>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-white/55">Explore</p>
            <div className="mt-5 grid gap-3 text-sm text-white/80">
              <Link href="/regions">Interactive Map</Link>
              <Link href="/gallery">Cultural Identity</Link>
              <Link href="/game">Mini Game</Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-white/55">Discover</p>
            <div className="mt-5 grid gap-3 text-sm text-white/80">
              <Link href="/gallery">Traditional Cuisine</Link>
              <Link href="/regions">Iconic Destinations</Link>
              <Link href="/gallery">Local Traditions</Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-white/55">Journey</p>
            <div className="mt-5 grid gap-3 text-sm text-white/80">
              <Link href="/regions">Travel Inspiration</Link>
              <Link href="/">Privacy Policy</Link>
              <Link href="/">Cookies Policy</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/55">
        Copyright 2026, All Rights Reserved
      </div>
    </footer>
  );
}
