import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/regions", label: "Explore Map" },
  { href: "/#culture", label: "Culture" },
  { href: "/gallery", label: "Gallery" },
  { href: "/game", label: "Mini Game" },
];

export function SiteHeader() {
  return (
    <header className="fixed left-0 right-0 top-4 z-30 px-4 sm:top-6">
      <nav className="relative isolate mx-auto flex h-[58px] max-w-[860px] items-center justify-between overflow-hidden rounded-full border border-primary/35 bg-[#2d2b29]/42 px-5 shadow-[0_16px_48px_rgb(0_0_0_/_0.16)] backdrop-blur-2xl backdrop-saturate-150 sm:h-[68px] sm:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[linear-gradient(110deg,rgb(255_255_255_/_0.16),rgb(255_255_255_/_0.055)_34%,rgb(18_16_14_/_0.34)_100%)]" />
        <div className="pointer-events-none absolute inset-px -z-10 rounded-full border border-white/10" />
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
        <div className="hidden items-center gap-9 text-[14px] font-semibold text-white md:flex lg:gap-12">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap transition hover:text-[#e1a15f]"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          href="/regions"
          className="inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-primary px-4 text-[11px] font-bold text-white shadow-[0_10px_22px_rgb(138_79_29_/_0.22)] transition hover:bg-secondary active:translate-y-px sm:h-10 sm:px-5"
        >
          Get Started
        </Link>
      </nav>
    </header>
  );
}
