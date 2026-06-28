import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-14">
        <p className="text-sm font-semibold uppercase text-secondary">
          Culture Quiz
        </p>
        <h1 className="mt-2 text-4xl font-bold text-foreground">
          Quiz budaya Jawa Timur
        </h1>
        <p className="mt-4 text-muted">
          Halaman ini sudah disiapkan untuk logic quiz client-side berbasis
          React state tanpa storage permanen.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
