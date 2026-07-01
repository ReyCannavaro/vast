import { regions } from "@/data/regions";
import type { RegionCategory } from "@/types/region";

export function getAllRegions() {
  return regions;
}

export function getFeaturedRegions() {
  return regions.filter((region) => region.isFeatured);
}

export function getRegionBySlug(slug: string) {
  return regions.find((region) => region.slug === slug) ?? null;
}

export function filterRegions(category: RegionCategory) {
  return regions.filter((region) => region.categories.includes(category));
}

export function searchRegions(keyword: string) {
  const normalizedKeyword = keyword.trim().toLowerCase();

  if (!normalizedKeyword) {
    return regions;
  }

  return regions.filter((region) => {
    const searchableText = [
      region.name,
      region.slug,
      region.type,
      region.tagline,
      region.summary,
      ...region.categories,
      ...region.cultureHighlights,
      ...region.foods,
      ...region.destinations,
      ...region.uniqueFacts,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedKeyword);
  });
}
