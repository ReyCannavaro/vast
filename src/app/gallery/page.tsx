import { batikPatterns } from "@/data/batikPatterns";
import { destinations } from "@/data/destinations";
import { foods } from "@/data/foods";
import { heritageItems } from "@/data/heritageItems";
import { GalleryRandomSections, type GalleryItem } from "@/components/gallery/GalleryRandomSections";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getAllRegions } from "@/lib/regionService";
import type { ImageAsset } from "@/types/region";

function getShortRegionName(regionName: string) {
  return regionName.replace(/^Kabupaten\s+/i, "").replace(/^Kota\s+/i, "");
}

function createRegionNameLookup() {
  return new Map(
    getAllRegions().map((region) => [region.slug, getShortRegionName(region.name)]),
  );
}

function normalizeImage(image?: ImageAsset) {
  if (!image) {
    return undefined;
  }

  return {
    alt: image.alt,
    src: image.src,
  };
}

function createGalleryItems() {
  const regionNames = createRegionNameLookup();
  const getRegionName = (regionSlug: string) => regionNames.get(regionSlug) ?? regionSlug;

  const culture: GalleryItem[] = heritageItems.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    regionName: getRegionName(item.regionSlug),
    regionSlug: item.regionSlug,
    image: normalizeImage(item.image),
  }));

  const foodGalleryItems: GalleryItem[] = foods.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    regionName: getRegionName(item.regionSlug),
    regionSlug: item.regionSlug,
    image: normalizeImage(item.image),
  }));

  const destinationGalleryItems: GalleryItem[] = destinations.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    regionName: getRegionName(item.regionSlug),
    regionSlug: item.regionSlug,
    image: normalizeImage(item.image),
  }));

  const batik: GalleryItem[] = batikPatterns.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    regionName: getRegionName(item.regionSlug),
    regionSlug: item.regionSlug,
    image: normalizeImage(item.image),
  }));

  return {
    batik,
    culture,
    destinations: destinationGalleryItems,
    foods: foodGalleryItems,
  };
}

export default function GalleryPage() {
  const galleryItems = createGalleryItems();

  return (
    <div className="min-h-screen bg-white text-[#292520]">
      <SiteHeader />
      <main>
        <GalleryRandomSections items={galleryItems} />
      </main>
      <SiteFooter />
    </div>
  );
}
