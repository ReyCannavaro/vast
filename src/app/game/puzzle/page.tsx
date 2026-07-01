import { GameTodoPage } from "@/components/game";
import { getGameSummary } from "@/lib/gameService";

export default function PuzzlePage() {
  const summary = getGameSummary();

  return (
    <GameTodoPage
      eyebrow="Sliding Puzzle"
      title="Puzzle budaya"
      description="Halaman puzzle sudah siap memakai board tile dari puzzle service."
      todo="TODO: Buat komponen puzzle client untuk swap tile, progress, dan state selesai."
      stats={[
        { label: "Puzzle", value: summary.puzzle.totalPuzzles },
        { label: "Region", value: summary.puzzle.coveredRegions },
        { label: "Medium", value: summary.puzzle.difficulties.medium },
      ]}
    />
  );
}
