import { notFound } from "next/navigation";

import { MatchingPlayClient } from "@/components/game/MatchingPlayClient";
import { getMatchingRound } from "@/lib/matchingService";
import { getAllRegions, getRegionBySlug } from "@/lib/regionService";

type MatchingRegionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllRegions().map((region) => ({
    slug: region.slug,
  }));
}

export async function generateMetadata({ params }: MatchingRegionPageProps) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);

  if (!region) {
    return {
      title: "Matching Wilayah - VAST",
    };
  }

  return {
    title: `Matching ${region.name} - VAST`,
    description: `Cocokkan simbol budaya, kuliner, batik, dan destinasi ${region.name}.`,
  };
}

export default async function MatchingRegionPage({ params }: MatchingRegionPageProps) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);

  if (!region) {
    notFound();
  }

  const round = getMatchingRound({
    regionSlug: region.slug,
    limit: 6,
    seed: `matching:${region.slug}`,
  });

  return <MatchingPlayClient round={round} region={region} />;
}
