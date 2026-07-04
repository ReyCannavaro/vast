import { notFound } from "next/navigation";

import { QuizPlayClient } from "@/components/game/QuizPlayClient";
import { getAllRegions, getRegionBySlug } from "@/lib/regionService";
import { getQuizQuestionsForRound } from "@/lib/quizService";

type QuizRegionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllRegions().map((region) => ({
    slug: region.slug,
  }));
}

export async function generateMetadata({ params }: QuizRegionPageProps) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);

  if (!region) {
    return {
      title: "Quiz Wilayah - VAST",
    };
  }

  return {
    title: `Quiz ${region.name} - VAST`,
    description: `Mainkan quiz budaya, kuliner, batik, dan destinasi ${region.name}.`,
  };
}

export default async function QuizRegionPage({ params }: QuizRegionPageProps) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);

  if (!region) {
    notFound();
  }

  const questions = getQuizQuestionsForRound({
    regionSlug: region.slug,
    limit: 10,
    seed: `quiz:${region.slug}`,
  });

  return <QuizPlayClient questions={questions} region={region} />;
}
