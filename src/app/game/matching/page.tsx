import { GameTodoPage } from "@/components/game";
import { getGameSummary } from "@/lib/gameService";

export default function MatchingPage() {
  const summary = getGameSummary();

  return (
    <GameTodoPage
      eyebrow="Match the Heritage"
      title="Cocokkan daerah dan warisan budaya"
      description="Halaman matching sudah siap membaca data pair dari service game."
      todo="TODO: Buat board matching client untuk memilih kartu kiri-kanan dan menampilkan skor."
      stats={[
        { label: "Pasangan", value: summary.matching.totalPairs },
        { label: "Region", value: summary.matching.coveredRegions },
        { label: "Batik", value: summary.matching.categories.batik },
      ]}
    />
  );
}
