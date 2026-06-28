import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-14">
        <p className="text-sm font-semibold uppercase text-secondary">
          About VAST
        </p>
        <h1 className="mt-2 text-4xl font-bold text-foreground">
          Preserving heritage through design
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted">
          VAST adalah landing page interaktif statis untuk mengenalkan budaya
          Jawa Timur kepada generasi muda. Project ini mendukung SDG 11 melalui
          pelestarian warisan budaya lokal dalam pengalaman web modern.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
