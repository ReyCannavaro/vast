import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function MatchingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-14">
        <p className="text-sm font-semibold uppercase text-secondary">
          Match the Heritage
        </p>
        <h1 className="mt-2 text-4xl font-bold text-foreground">
          Cocokkan daerah dan warisan budaya
        </h1>
        <p className="mt-4 text-muted">
          Halaman ini menjadi fondasi board matching berbasis data statis.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
