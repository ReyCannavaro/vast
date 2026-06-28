import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-sm font-semibold uppercase text-secondary">Gallery</p>
        <h1 className="mt-2 text-4xl font-bold text-foreground">
          Galeri budaya dan pattern
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Area ini disiapkan untuk aset visual yang aman lisensi dan akan
          dihubungkan ke data statis lokal.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
