import { GameTodoPage } from "@/components/game";
import { getGameSummary } from "@/lib/gameService";

export default function QuizPage() {
  const summary = getGameSummary();

  return (
    <GameTodoPage
      eyebrow="Culture Quiz"
      title="Quiz budaya Jawa Timur"
      description="Halaman quiz sudah terhubung dengan ringkasan data, namun interaction state belum dislicing."
      todo="TODO: Buat komponen client quiz untuk pilih jawaban, next question, dan hasil skor."
      stats={[
        { label: "Pertanyaan", value: summary.quiz.totalQuestions },
        { label: "Region", value: summary.quiz.coveredRegions },
        { label: "Hard", value: summary.quiz.difficulties.hard },
      ]}
    />
  );
}
