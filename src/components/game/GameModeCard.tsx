import Link from "next/link";
import type { GameCatalogItem } from "@/lib/gameService";

type GameModeCardProps = {
  game: GameCatalogItem;
};

export function GameModeCard({ game }: GameModeCardProps) {
  return (
    <Link
      href={game.href}
      className="border border-border bg-surface p-5 transition hover:border-secondary"
    >
      <h2 className="text-lg font-semibold text-primary">{game.title}</h2>
      <p className="mt-3 text-sm leading-6 text-muted">{game.description}</p>
      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-muted">Item</dt>
          <dd className="font-semibold text-foreground">{game.totalItems}</dd>
        </div>
        <div>
          <dt className="text-muted">Region</dt>
          <dd className="font-semibold text-foreground">{game.coveredRegions}</dd>
        </div>
      </dl>
    </Link>
  );
}
