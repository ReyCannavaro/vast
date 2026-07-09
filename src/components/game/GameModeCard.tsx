import Link from "next/link";
import type { GameCatalogItem } from "@/lib/gameService";

type GameModeCardProps = {
  game: GameCatalogItem;
  tone?: "quiz" | "matching" | "puzzle";
  badge?: string;
};

const cardStyles = {
  quiz: {
    top: "bg-[#986532] text-white",
    title: "text-[#78471f]",
    button: "bg-[#815016] text-white hover:bg-[#9b6120]",
    badge: "border-white/35 bg-white/18 text-white",
  },
  matching: {
    top: "bg-[#d8e8c1] text-[#5d7150]",
    title: "text-[#55664c]",
    button: "border border-[#617554] bg-transparent text-[#55664c] hover:bg-[#617554] hover:text-white",
    badge: "border-[#9fb28e]/55 bg-[#e8f1db]/60 text-[#617554]",
  },
  puzzle: {
    top: "bg-[#a65939] text-white",
    title: "text-[#873f25]",
    button: "bg-[#873f25] text-white hover:bg-[#a65939]",
    badge: "border-white/35 bg-white/16 text-white",
  },
};

function GameIcon({ tone }: { tone: NonNullable<GameModeCardProps["tone"]> }) {
  if (tone === "quiz") {
    return (
      <span className="flex h-16 w-16 items-center justify-center rounded-full border-[5px] border-white text-5xl font-bold leading-none">
        ?
      </span>
    );
  }

  if (tone === "matching") {
    return (
      <span className="relative block h-16 w-16 rounded-[12px] border-[6px] border-[#617554]">
        <span className="absolute -right-4 top-5 h-6 w-6 rounded-full border-[6px] border-[#617554] bg-[#d8e8c1]" />
        <span className="absolute left-5 -top-4 h-6 w-6 rounded-full border-[6px] border-[#617554] bg-[#d8e8c1]" />
        <span className="absolute -left-[6px] bottom-3 h-6 w-5 bg-[#d8e8c1]" />
      </span>
    );
  }

  return (
    <span className="grid h-14 w-14 grid-cols-2 gap-[7px]">
      {Array.from({ length: 4 }).map((_, index) => (
        <span key={index} className="border-[5px] border-white" />
      ))}
    </span>
  );
}

export function GameModeCard({ game, tone = "quiz", badge }: GameModeCardProps) {
  const styles = cardStyles[tone];

  return (
    <Link
      href={game.href}
      className="group flex min-h-[430px] flex-col overflow-hidden rounded-[14px] border border-[#d9c6b8] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgb(93_54_27/0.14)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div className={`relative flex min-h-[160px] items-center justify-center ${styles.top}`}>
        <GameIcon tone={tone} />
        <span
          className={`absolute bottom-5 right-5 rounded-[8px] border px-4 py-2 text-sm ${styles.badge}`}
        >
          {badge ?? `${game.totalItems} Item`}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-7">
        <h2 className={`text-[25px] font-bold leading-tight ${styles.title}`}>{game.title}</h2>
        <p className="mt-4 text-[16px] leading-7 text-[#5e5148]">{game.description}</p>
        <div className="mt-5 flex gap-3 text-xs font-semibold uppercase tracking-[0.06em] text-[#8b735f]">
          <span>{game.coveredRegions} wilayah</span>
          <span aria-hidden="true">/</span>
          <span>{game.totalItems} data</span>
        </div>
        <span
          className={`mt-auto inline-flex h-[56px] items-center justify-center rounded-[10px] text-base font-medium transition ${styles.button}`}
        >
          Mainkan
          <span className="ml-2 text-sm transition group-hover:translate-x-1" aria-hidden="true">
            &gt;
          </span>
        </span>
      </div>
    </Link>
  );
}
