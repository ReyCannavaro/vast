import Link from "next/link";

const navItems = [
  { href: "/#home", label: "Home" },
  { href: "/#explore", label: "Explore" },
  { href: "/#culture", label: "Culture" },
  { href: "/#game", label: "Game" },
  { href: "/gallery", label: "Gallery" },
  { href: "/#about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="text-xl font-bold tracking-normal text-primary">
          VAST
        </Link>
        <div className="hidden items-center gap-6 text-sm font-medium text-muted md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-secondary">
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
