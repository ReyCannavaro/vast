import { matchingGameItems } from "@/data/matchingGameItems";
import type { MatchingCategory, MatchingGameItem } from "@/types/region";

export type MatchingGameFilters = {
  regionSlug?: string;
  category?: MatchingCategory;
  keyword?: string;
};

export type MatchingRoundOptions = MatchingGameFilters & {
  limit?: number;
  seed?: string;
};

export type MatchingCardSide = "left" | "right";

export type MatchingGameCard = {
  id: string;
  itemId: string;
  side: MatchingCardSide;
  label: string;
  regionSlug: string;
  category: MatchingCategory;
};

export type MatchingRound = {
  items: MatchingGameItem[];
  leftCards: MatchingGameCard[];
  rightCards: MatchingGameCard[];
};

export type MatchingAttempt = {
  leftCardId: string;
  rightCardId: string;
};

export type MatchingAttemptResult = {
  leftCardId: string;
  rightCardId: string;
  item: MatchingGameItem | null;
  isCorrect: boolean;
};

export type MatchingScoreResult = {
  totalPairs: number;
  attemptedPairs: number;
  correctPairs: number;
  wrongPairs: number;
  scorePercentage: number;
  results: MatchingAttemptResult[];
};

function normalizeText(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getCategoryClueLabel(category: MatchingCategory) {
  const labels: Record<MatchingCategory, string> = {
    batik: "Motif batik",
    culture: "Budaya",
    destination: "Destinasi",
    food: "Kuliner",
  };

  return labels[category];
}

function createLeftCardLabel(item: MatchingGameItem) {
  if (!item.explanation) {
    return `${getCategoryClueLabel(item.category)} dari ${item.leftLabel}`;
  }

  const answerPattern = new RegExp(escapeRegExp(item.rightLabel), "gi");
  const regionPattern = new RegExp(escapeRegExp(item.leftLabel), "gi");
  const cleanedExplanation = item.explanation
    .replace(answerPattern, "Ikon ini")
    .replace(regionPattern, "wilayah ini")
    .replace(/\s+/g, " ")
    .trim();
  const sentences = cleanedExplanation.split(/(?<=[.!?])\s+/);
  const clue =
    sentences.find((sentence) => !sentence.toLowerCase().includes("termasuk")) ??
    sentences[0] ??
    `Berasal dari ${item.leftLabel}`;

  return `${getCategoryClueLabel(item.category)}: ${clue.replace(/[.!?]$/, "")}`;
}

function getStableHash(value: string) {
  return [...value].reduce((hash, character) => {
    return (hash * 31 + character.charCodeAt(0)) >>> 0;
  }, 0);
}

function deterministicShuffle<T extends { id: string }>(items: T[], seed: string) {
  return [...items].sort((firstItem, secondItem) => {
    const firstHash = getStableHash(`${seed}:${firstItem.id}`);
    const secondHash = getStableHash(`${seed}:${secondItem.id}`);

    return firstHash - secondHash;
  });
}

function createMatchingCard(item: MatchingGameItem, side: MatchingCardSide): MatchingGameCard {
  return {
    id: `${item.id}-${side}`,
    itemId: item.id,
    side,
    label: side === "left" ? createLeftCardLabel(item) : item.rightLabel,
    regionSlug: item.regionSlug,
    category: item.category,
  };
}

function findCardById(round: MatchingRound, cardId: string) {
  return [...round.leftCards, ...round.rightCards].find((card) => card.id === cardId) ?? null;
}

export function getMatchingGameItems() {
  return matchingGameItems;
}

export function getMatchingGameItemById(itemId: string) {
  return matchingGameItems.find((item) => item.id === itemId) ?? null;
}

export function getMatchingGameItemsByRegion(regionSlug: string) {
  return matchingGameItems.filter((item) => item.regionSlug === regionSlug);
}

export function getMatchingGameItemsByCategory(category: MatchingCategory) {
  return matchingGameItems.filter((item) => item.category === category);
}

export function filterMatchingGameItems(filters: MatchingGameFilters = {}) {
  const normalizedKeyword = filters.keyword ? normalizeText(filters.keyword) : "";

  return matchingGameItems.filter((item) => {
    if (filters.regionSlug && item.regionSlug !== filters.regionSlug) {
      return false;
    }

    if (filters.category && item.category !== filters.category) {
      return false;
    }

    if (!normalizedKeyword) {
      return true;
    }

    const searchableText = [
      item.id,
      item.regionSlug,
      item.leftLabel,
      item.rightLabel,
      item.category,
      item.explanation,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedKeyword);
  });
}

export function getMatchingRound(options: MatchingRoundOptions = {}): MatchingRound {
  const filteredItems = filterMatchingGameItems(options);
  const orderedItems = options.seed
    ? deterministicShuffle(filteredItems, `${options.seed}:items`)
    : filteredItems;
  const roundItems =
    options.limit && options.limit > 0 ? orderedItems.slice(0, options.limit) : orderedItems;

  const leftCards = roundItems.map((item) => createMatchingCard(item, "left"));
  const rightCards = roundItems.map((item) => createMatchingCard(item, "right"));

  return {
    items: roundItems,
    leftCards: options.seed
      ? deterministicShuffle(leftCards, `${options.seed}:left`)
      : leftCards,
    rightCards: options.seed
      ? deterministicShuffle(rightCards, `${options.seed}:right`)
      : rightCards,
  };
}

export function isMatchingPairCorrect(leftCard: MatchingGameCard, rightCard: MatchingGameCard) {
  if (leftCard.side === rightCard.side) {
    return false;
  }

  return leftCard.itemId === rightCard.itemId;
}

export function validateMatchingAttempt(
  round: MatchingRound,
  attempt: MatchingAttempt,
): MatchingAttemptResult {
  const leftCard = findCardById(round, attempt.leftCardId);
  const rightCard = findCardById(round, attempt.rightCardId);
  const itemId =
    leftCard !== null && rightCard !== null && leftCard.itemId === rightCard.itemId
      ? leftCard.itemId
      : null;

  return {
    leftCardId: attempt.leftCardId,
    rightCardId: attempt.rightCardId,
    item: itemId ? round.items.find((item) => item.id === itemId) ?? null : null,
    isCorrect:
      leftCard !== null && rightCard !== null
        ? isMatchingPairCorrect(leftCard, rightCard)
        : false,
  };
}

export function calculateMatchingScore(
  round: MatchingRound,
  attempts: MatchingAttempt[],
): MatchingScoreResult {
  const results = attempts.map((attempt) => validateMatchingAttempt(round, attempt));
  const correctPairs = results.filter((result) => result.isCorrect).length;

  return {
    totalPairs: round.items.length,
    attemptedPairs: attempts.length,
    correctPairs,
    wrongPairs: attempts.length - correctPairs,
    scorePercentage:
      round.items.length === 0 ? 0 : Math.round((correctPairs / round.items.length) * 100),
    results,
  };
}
