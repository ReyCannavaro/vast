import {
  eastJavaGeoBounds,
  eastJavaMapPoints,
  eastJavaMapViewBox,
  eastJavaProvincePath,
  type EastJavaMapPoint,
} from "@/data/eastJavaMap";
import { getAllRegions, getRegionBySlug } from "@/lib/regionService";
import type { Region } from "@/types/region";

export type EastJavaMapRegion = EastJavaMapPoint & {
  region: Region;
  x: number;
  y: number;
  href: string;
  contentCounts: {
    foods: number;
    destinations: number;
    heritageItems: number;
    batikPatterns: number;
  };
};

export type EastJavaMapData = {
  path: string;
  viewBox: string;
  regions: EastJavaMapRegion[];
  totalRegions: number;
  mappedRegions: number;
  missingRegionSlugs: string[];
};

function longitudeToX(longitude: number) {
  const ratio =
    (longitude - eastJavaGeoBounds.minLongitude) /
    (eastJavaGeoBounds.maxLongitude - eastJavaGeoBounds.minLongitude);

  return eastJavaMapViewBox.x + ratio * eastJavaMapViewBox.width;
}

function latitudeToY(latitude: number) {
  const ratio =
    (eastJavaGeoBounds.maxLatitude - latitude) /
    (eastJavaGeoBounds.maxLatitude - eastJavaGeoBounds.minLatitude);

  return eastJavaMapViewBox.y + ratio * eastJavaMapViewBox.height;
}

export function projectEastJavaCoordinate(point: EastJavaMapPoint) {
  return {
    x: longitudeToX(point.longitude) + (point.offsetX ?? 0),
    y: latitudeToY(point.latitude) + (point.offsetY ?? 0),
  };
}

export function getEastJavaMapRegions() {
  return eastJavaMapPoints.flatMap((point): EastJavaMapRegion[] => {
    const region = getRegionBySlug(point.slug);

    if (!region) {
      return [];
    }

    const { x, y } = projectEastJavaCoordinate(point);

    return [
      {
        ...point,
        region,
        x,
        y,
        href: `/regions/${region.slug}`,
        contentCounts: {
          foods: region.foodIds.length,
          destinations: region.destinationIds.length,
          heritageItems: region.heritageItemIds.length,
          batikPatterns: region.batikPatternIds.length,
        },
      },
    ];
  });
}

export function getEastJavaMapData(): EastJavaMapData {
  const regions = getAllRegions();
  const mappedRegions = getEastJavaMapRegions();
  const mappedSlugs = new Set(mappedRegions.map((item) => item.region.slug));

  return {
    path: eastJavaProvincePath,
    viewBox: `${eastJavaMapViewBox.x} ${eastJavaMapViewBox.y} ${eastJavaMapViewBox.width} ${eastJavaMapViewBox.height}`,
    regions: mappedRegions,
    totalRegions: regions.length,
    mappedRegions: mappedRegions.length,
    missingRegionSlugs: regions
      .map((region) => region.slug)
      .filter((slug) => !mappedSlugs.has(slug)),
  };
}
