import { getAllRegions, getFeaturedRegions, getRegionBySlug } from "@/lib/regionService";
import {
  getMatchingGameItems,
  getMatchingGameItemsByRegion,
  getMatchingRound,
  type MatchingRound,
} from "@/lib/matchingService";
import {
  getPuzzleItems,
  getPuzzleItemsByRegion,
  getPuzzleRound,
  type PuzzleBoardState,
  createPuzzleBoard,
} from "@/lib/puzzleService";
import {
  getQuizQuestions,
  getQuizQuestionsByRegion,
  getQuizQuestionsForRound,
} from "@/lib/quizService";
import type { MatchingCategory, PuzzleDifficulty, QuizDifficulty, Region } from "@/types/region";

export type GameMode = "quiz" | "matching" | "puzzle";

export type GameCatalogItem = {
  mode: GameMode;
  title: string;
  description: string;
  href: string;
  totalItems: number;
  coveredRegions: number;
};

export type RegionGameAvailability = {
  region: Region;
  quizCount: number;
  matchingCount: number;
  puzzleCount: number;
  availableModes: GameMode[];
};

export type GameSummary = {
  totalRegions: number;
  playableRegions: number;
  catalog: GameCatalogItem[];
  quiz: {
    totalQuestions: number;
    coveredRegions: number;
    difficulties: Record<QuizDifficulty, number>;
  };
  matching: {
    totalPairs: number;
    coveredRegions: number;
    categories: Record<MatchingCategory, number>;
  };
  puzzle: {
    totalPuzzles: number;
    coveredRegions: number;
    difficulties: Record<PuzzleDifficulty, number>;
  };
};

export type RegionGameContent = RegionGameAvailability & {
  quizQuestions: ReturnType<typeof getQuizQuestionsByRegion>;
  matchingItems: ReturnType<typeof getMatchingGameItemsByRegion>;
  puzzleItems: ReturnType<typeof getPuzzleItemsByRegion>;
};

export type GameStarterPack = {
  region: Region;
  quizQuestions: ReturnType<typeof getQuizQuestionsForRound>;
  matchingRound: MatchingRound;
  puzzleBoard: PuzzleBoardState | null;
};

function countUniqueRegions(regionSlugs: Array<string | undefined>) {
  return new Set(regionSlugs.filter(Boolean)).size;
}

function createDifficultyCounter<T extends string>(values: T[], keys: T[]) {
  return values.reduce(
    (counter, value) => ({
      ...counter,
      [value]: counter[value] + 1,
    }),
    Object.fromEntries(keys.map((key) => [key, 0])) as Record<T, number>,
  );
}

function getAvailableModesByCount(counts: {
  quizCount: number;
  matchingCount: number;
  puzzleCount: number;
}) {
  const modes: GameMode[] = [];

  if (counts.quizCount > 0) {
    modes.push("quiz");
  }

  if (counts.matchingCount > 0) {
    modes.push("matching");
  }

  if (counts.puzzleCount > 0) {
    modes.push("puzzle");
  }

  return modes;
}

export function getGameCatalog(): GameCatalogItem[] {
  const quizItems = getQuizQuestions();
  const matchingItems = getMatchingGameItems();
  const puzzles = getPuzzleItems();

  return [
    {
      mode: "quiz",
      title: "Culture Quiz",
      description: "Kuis pilihan ganda tentang budaya, kuliner, batik, dan destinasi Jawa Timur.",
      href: "/game/quiz",
      totalItems: quizItems.length,
      coveredRegions: countUniqueRegions(quizItems.map((question) => question.regionSlug)),
    },
    {
      mode: "matching",
      title: "Match the Heritage",
      description: "Permainan mencocokkan daerah dengan ikon budaya, kuliner, batik, dan destinasi.",
      href: "/game/matching",
      totalItems: matchingItems.length,
      coveredRegions: countUniqueRegions(matchingItems.map((item) => item.regionSlug)),
    },
    {
      mode: "puzzle",
      title: "Sliding Puzzle",
      description: "Puzzle visual dari landmark dan aset budaya daerah Jawa Timur.",
      href: "/game/puzzle",
      totalItems: puzzles.length,
      coveredRegions: countUniqueRegions(puzzles.map((puzzle) => puzzle.regionSlug)),
    },
  ];
}

export function getRegionGameAvailability(regionSlug: string): RegionGameAvailability | null {
  const region = getRegionBySlug(regionSlug);

  if (!region) {
    return null;
  }

  const counts = {
    quizCount: getQuizQuestionsByRegion(regionSlug).length,
    matchingCount: getMatchingGameItemsByRegion(regionSlug).length,
    puzzleCount: getPuzzleItemsByRegion(regionSlug).length,
  };

  return {
    region,
    ...counts,
    availableModes: getAvailableModesByCount(counts),
  };
}

export function getPlayableRegions() {
  return getAllRegions()
    .map((region) => getRegionGameAvailability(region.slug))
    .filter((availability): availability is RegionGameAvailability => {
      return availability !== null && availability.availableModes.length > 0;
    });
}

export function getFeaturedGameRegions(limit = 6) {
  const featuredSlugs = new Set(getFeaturedRegions().map((region) => region.slug));
  const playableRegions = getPlayableRegions();
  const featuredPlayableRegions = playableRegions.filter((item) => {
    return featuredSlugs.has(item.region.slug);
  });
  const fallbackRegions = playableRegions.filter((item) => {
    return !featuredSlugs.has(item.region.slug);
  });

  return [...featuredPlayableRegions, ...fallbackRegions].slice(0, limit);
}

export function getRegionGameContent(regionSlug: string): RegionGameContent | null {
  const availability = getRegionGameAvailability(regionSlug);

  if (!availability) {
    return null;
  }

  return {
    ...availability,
    quizQuestions: getQuizQuestionsByRegion(regionSlug),
    matchingItems: getMatchingGameItemsByRegion(regionSlug),
    puzzleItems: getPuzzleItemsByRegion(regionSlug),
  };
}

export function getGameSummary(): GameSummary {
  const quizItems = getQuizQuestions();
  const matchingItems = getMatchingGameItems();
  const puzzles = getPuzzleItems();

  return {
    totalRegions: getAllRegions().length,
    playableRegions: getPlayableRegions().length,
    catalog: getGameCatalog(),
    quiz: {
      totalQuestions: quizItems.length,
      coveredRegions: countUniqueRegions(quizItems.map((question) => question.regionSlug)),
      difficulties: createDifficultyCounter(
        quizItems.map((question) => question.difficulty),
        ["easy", "medium", "hard"],
      ),
    },
    matching: {
      totalPairs: matchingItems.length,
      coveredRegions: countUniqueRegions(matchingItems.map((item) => item.regionSlug)),
      categories: createDifficultyCounter(
        matchingItems.map((item) => item.category),
        ["food", "batik", "destination", "culture"],
      ),
    },
    puzzle: {
      totalPuzzles: puzzles.length,
      coveredRegions: countUniqueRegions(puzzles.map((puzzle) => puzzle.regionSlug)),
      difficulties: createDifficultyCounter(
        puzzles.map((puzzle) => puzzle.difficulty),
        ["easy", "medium", "hard"],
      ),
    },
  };
}

export function getGameStarterPack(regionSlug: string, seed = regionSlug): GameStarterPack | null {
  const region = getRegionBySlug(regionSlug);

  if (!region) {
    return null;
  }

  const puzzle = getPuzzleRound({
    regionSlug,
    limit: 1,
    seed: `${seed}:puzzle`,
  })[0];

  return {
    region,
    quizQuestions: getQuizQuestionsForRound({
      regionSlug,
      limit: 5,
      seed: `${seed}:quiz`,
    }),
    matchingRound: getMatchingRound({
      regionSlug,
      limit: 6,
      seed: `${seed}:matching`,
    }),
    puzzleBoard: puzzle
      ? createPuzzleBoard(puzzle, {
          seed: `${seed}:board`,
          shuffled: true,
        })
      : null,
  };
}
