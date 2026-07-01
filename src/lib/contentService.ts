import { batikPatterns } from "@/data/batikPatterns";
import { destinations } from "@/data/destinations";
import { foods } from "@/data/foods";
import { heritageItems } from "@/data/heritageItems";
import { getRegionBySlug } from "@/lib/regionService";

export function getFoodsByRegionSlug(regionSlug: string) {
  return foods.filter((food) => food.regionSlug === regionSlug);
}

export function getDestinationsByRegionSlug(regionSlug: string) {
  return destinations.filter((destination) => destination.regionSlug === regionSlug);
}

export function getHeritageItemsByRegionSlug(regionSlug: string) {
  return heritageItems.filter((heritageItem) => heritageItem.regionSlug === regionSlug);
}

export function getBatikPatternsByRegionSlug(regionSlug: string) {
  return batikPatterns.filter((batikPattern) => batikPattern.regionSlug === regionSlug);
}

export function getRegionContentBySlug(regionSlug: string) {
  const region = getRegionBySlug(regionSlug);

  if (!region) {
    return null;
  }

  return {
    region,
    foods: getFoodsByRegionSlug(regionSlug),
    destinations: getDestinationsByRegionSlug(regionSlug),
    heritageItems: getHeritageItemsByRegionSlug(regionSlug),
    batikPatterns: getBatikPatternsByRegionSlug(regionSlug),
  };
}
