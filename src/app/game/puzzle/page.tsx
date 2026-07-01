import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function PuzzlePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-14">
        <p className="text-sm font-semibold uppercase text-secondary">
          Sliding Puzzle
        </p>
        <h1 className="mt-2 text-4xl font-bold text-foreground">
          Puzzle budaya
        </h1>
        <p className="mt-4 text-muted">
          Route puzzle sudah tersedia sebagai fitur lanjutan jika waktu MVP
          mencukupi.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
