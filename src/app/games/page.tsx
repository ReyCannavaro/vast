import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

const games = [
  {
    href: "/games/quiz",
    title: "Culture Quiz",
    description: "Kuis pilihan ganda tentang budaya Jawa Timur.",
  },
  {
    href: "/games/matching",
    title: "Match the Heritage",
    description: "Cocokkan daerah dengan ikon budaya, kuliner, atau destinasi.",
  },
  {
    href: "/games/puzzle",
    title: "Sliding Puzzle",
    description: "Puzzle visual untuk landmark atau motif budaya.",
  },
];

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-sm font-semibold uppercase text-secondary">Games</p>
        <h1 className="mt-2 text-4xl font-bold text-foreground">
          Mini game edukatif VAST
        </h1>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {games.map((game) => (
            <Link
              key={game.href}
              href={game.href}
              className="border border-border bg-surface p-5 transition hover:border-secondary"
            >
              <h2 className="text-lg font-semibold text-primary">{game.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{game.description}</p>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
