import { notFound } from "next/navigation";

import { PuzzlePlayClient } from "@/components/game/PuzzlePlayClient";
import { getPuzzleRound } from "@/lib/puzzleService";
import { getAllRegions, getRegionBySlug } from "@/lib/regionService";

type PuzzleRegionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllRegions().map((region) => ({
    slug: region.slug,
  }));
}

export async function generateMetadata({ params }: PuzzleRegionPageProps) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);

  if (!region) {
    return {
      title: "Puzzle Wilayah - VAST",
    };
  }

  return {
    title: `Puzzle ${region.name} - VAST`,
    description: `Susun ulang gambar destinasi dan budaya ${region.name}.`,
  };
}

export default async function PuzzleRegionPage({ params }: PuzzleRegionPageProps) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);

  if (!region) {
    notFound();
  }

  const [puzzle] = getPuzzleRound({
    regionSlug: region.slug,
    limit: 1,
    seed: `puzzle:${region.slug}`,
  });

  return <PuzzlePlayClient puzzle={puzzle ?? null} region={region} />;
}