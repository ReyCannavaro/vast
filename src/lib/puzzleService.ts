import { puzzleItems } from "@/data/puzzleItems";
import type { PuzzleDifficulty, PuzzleItem } from "@/types/region";

export type PuzzleItemFilters = {
  regionSlug?: string;
  difficulty?: PuzzleDifficulty;
  keyword?: string;
};

export type PuzzleRoundOptions = PuzzleItemFilters & {
  limit?: number;
  seed?: string;
};

export type PuzzleTile = {
  id: string;
  puzzleId: string;
  correctIndex: number;
  currentIndex: number;
  correctRow: number;
  correctColumn: number;
  currentRow: number;
  currentColumn: number;
  imagePosition: string;
};

export type PuzzleBoardState = {
  puzzle: PuzzleItem;
  gridSize: number;
  totalTiles: number;
  tiles: PuzzleTile[];
};

export type PuzzleMoveResult = {
  tiles: PuzzleTile[];
  moved: boolean;
  isSolved: boolean;
};

function normalizeText(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
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

function getTileCoordinates(index: number, gridSize: number) {
  return {
    row: Math.floor(index / gridSize),
    column: index % gridSize,
  };
}

function getTileImagePosition(index: number, gridSize: number) {
  if (gridSize <= 1) {
    return "0% 0%";
  }

  const { row, column } = getTileCoordinates(index, gridSize);
  const x = Math.round((column / (gridSize - 1)) * 100);
  const y = Math.round((row / (gridSize - 1)) * 100);

  return `${x}% ${y}%`;
}

function applyCurrentPositions(tiles: PuzzleTile[], gridSize: number) {
  return tiles.map((tile, currentIndex) => {
    const { row, column } = getTileCoordinates(currentIndex, gridSize);

    return {
      ...tile,
      currentIndex,
      currentRow: row,
      currentColumn: column,
    };
  });
}

export function getPuzzleItems() {
  return puzzleItems;
}

export function getPuzzleItemById(puzzleId: string) {
  return puzzleItems.find((puzzle) => puzzle.id === puzzleId) ?? null;
}

export function getPuzzleItemsByRegion(regionSlug: string) {
  return puzzleItems.filter((puzzle) => puzzle.regionSlug === regionSlug);
}

export function getPuzzleItemsByDifficulty(difficulty: PuzzleDifficulty) {
  return puzzleItems.filter((puzzle) => puzzle.difficulty === difficulty);
}

export function filterPuzzleItems(filters: PuzzleItemFilters = {}) {
  const normalizedKeyword = filters.keyword ? normalizeText(filters.keyword) : "";

  return puzzleItems.filter((puzzle) => {
    if (filters.regionSlug && puzzle.regionSlug !== filters.regionSlug) {
      return false;
    }

    if (filters.difficulty && puzzle.difficulty !== filters.difficulty) {
      return false;
    }

    if (!normalizedKeyword) {
      return true;
    }

    const searchableText = [
      puzzle.id,
      puzzle.regionSlug,
      puzzle.title,
      puzzle.image.alt,
      puzzle.image.caption,
      puzzle.difficulty,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedKeyword);
  });
}

export function getPuzzleRound(options: PuzzleRoundOptions = {}) {
  const filteredPuzzles = filterPuzzleItems(options);
  const orderedPuzzles = options.seed
    ? deterministicShuffle(filteredPuzzles, options.seed)
    : filteredPuzzles;

  if (!options.limit || options.limit <= 0) {
    return orderedPuzzles;
  }

  return orderedPuzzles.slice(0, options.limit);
}

export function createSolvedPuzzleTiles(puzzle: PuzzleItem): PuzzleTile[] {
  const totalTiles = puzzle.gridSize * puzzle.gridSize;

  return Array.from({ length: totalTiles }, (_, index) => {
    const { row, column } = getTileCoordinates(index, puzzle.gridSize);

    return {
      id: `${puzzle.id}-tile-${index + 1}`,
      puzzleId: puzzle.id,
      correctIndex: index,
      currentIndex: index,
      correctRow: row,
      correctColumn: column,
      currentRow: row,
      currentColumn: column,
      imagePosition: getTileImagePosition(index, puzzle.gridSize),
    };
  });
}

export function createPuzzleBoard(
  puzzle: PuzzleItem,
  options: { seed?: string; shuffled?: boolean } = {},
): PuzzleBoardState {
  const solvedTiles = createSolvedPuzzleTiles(puzzle);
  const shouldShuffle = options.shuffled ?? Boolean(options.seed);
  const initialTiles =
    shouldShuffle && options.seed
      ? deterministicShuffle(solvedTiles, options.seed)
      : solvedTiles;
  const positionedTiles = applyCurrentPositions(initialTiles, puzzle.gridSize);
  const tiles =
    shouldShuffle && positionedTiles.length > 1 && isPuzzleSolved(positionedTiles)
      ? applyCurrentPositions(
          [positionedTiles[1], positionedTiles[0], ...positionedTiles.slice(2)],
          puzzle.gridSize,
        )
      : positionedTiles;

  return {
    puzzle,
    gridSize: puzzle.gridSize,
    totalTiles: tiles.length,
    tiles,
  };
}

export function isPuzzleSolved(tiles: PuzzleTile[]) {
  return tiles.every((tile) => tile.currentIndex === tile.correctIndex);
}

export function arePuzzleTilesAdjacent(firstTile: PuzzleTile, secondTile: PuzzleTile) {
  const rowDistance = Math.abs(firstTile.currentRow - secondTile.currentRow);
  const columnDistance = Math.abs(firstTile.currentColumn - secondTile.currentColumn);

  return rowDistance + columnDistance === 1;
}

export function swapPuzzleTiles(
  tiles: PuzzleTile[],
  firstTileId: string,
  secondTileId: string,
): PuzzleMoveResult {
  const firstIndex = tiles.findIndex((tile) => tile.id === firstTileId);
  const secondIndex = tiles.findIndex((tile) => tile.id === secondTileId);

  if (firstIndex === -1 || secondIndex === -1 || firstIndex === secondIndex) {
    return {
      tiles,
      moved: false,
      isSolved: isPuzzleSolved(tiles),
    };
  }

  const nextTiles = [...tiles];
  const firstTile = nextTiles[firstIndex];

  nextTiles[firstIndex] = nextTiles[secondIndex];
  nextTiles[secondIndex] = firstTile;

  const positionedTiles = applyCurrentPositions(nextTiles, Math.sqrt(nextTiles.length));

  return {
    tiles: positionedTiles,
    moved: true,
    isSolved: isPuzzleSolved(positionedTiles),
  };
}

export function getPuzzleProgress(tiles: PuzzleTile[]) {
  const placedTiles = tiles.filter((tile) => tile.currentIndex === tile.correctIndex).length;

  return {
    totalTiles: tiles.length,
    placedTiles,
    remainingTiles: tiles.length - placedTiles,
    progressPercentage: tiles.length === 0 ? 0 : Math.round((placedTiles / tiles.length) * 100),
    isSolved: placedTiles === tiles.length,
  };
}
