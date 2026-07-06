"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { CSSProperties } from "react";

import type { PuzzleItem, Region } from "@/types/region";

type PuzzlePlayClientProps = {
  puzzle: PuzzleItem | null;
  region: Region;
};

type PuzzleGameSurfaceProps = {
  puzzle: PuzzleItem;
  region: Region;
};

type TileValue = number | null;

function getStableHash(value: string) {
  return [...value].reduce((hash, character) => {
    return (hash * 31 + character.charCodeAt(0)) >>> 0;
  }, 0);
}

function getAdjacentIndexes(index: number, gridSize: number) {
  const row = Math.floor(index / gridSize);
  const column = index % gridSize;
  const adjacentIndexes: number[] = [];

  if (row > 0) {
    adjacentIndexes.push(index - gridSize);
  }

  if (row < gridSize - 1) {
    adjacentIndexes.push(index + gridSize);
  }

  if (column > 0) {
    adjacentIndexes.push(index - 1);
  }

  if (column < gridSize - 1) {
    adjacentIndexes.push(index + 1);
  }

  return adjacentIndexes;
}

function createSolvedBoard(gridSize: number): TileValue[] {
  const totalTiles = gridSize * gridSize;

  return Array.from({ length: totalTiles }, (_, index) =>
    index === totalTiles - 1 ? null : index,
  );
}

function isBoardSolved(board: TileValue[]) {
  return board.every((tile, index) => {
    if (index === board.length - 1) {
      return tile === null;
    }

    return tile === index;
  });
}

function createShuffledBoard(seed: string, gridSize: number, shuffleTurn: number) {
  const board = createSolvedBoard(gridSize);
  let emptyIndex = board.length - 1;
  let previousEmptyIndex = -1;
  const moveCount = Math.max(42, gridSize * gridSize * 8);

  for (let step = 0; step < moveCount + shuffleTurn * 7; step += 1) {
    const options = getAdjacentIndexes(emptyIndex, gridSize).filter(
      (option) => option !== previousEmptyIndex,
    );
    const availableOptions = options.length > 0 ? options : getAdjacentIndexes(emptyIndex, gridSize);
    const optionIndex = getStableHash(`${seed}:${shuffleTurn}:${step}`) % availableOptions.length;
    const selectedIndex = availableOptions[optionIndex];

    board[emptyIndex] = board[selectedIndex];
    board[selectedIndex] = null;
    previousEmptyIndex = emptyIndex;
    emptyIndex = selectedIndex;
  }

  if (isBoardSolved(board)) {
    const swapIndex = emptyIndex === 0 ? 1 : emptyIndex - 1;
    board[emptyIndex] = board[swapIndex];
    board[swapIndex] = null;
  }

  return board;
}

function areIndexesAdjacent(firstIndex: number, secondIndex: number, gridSize: number) {
  const firstRow = Math.floor(firstIndex / gridSize);
  const secondRow = Math.floor(secondIndex / gridSize);
  const firstColumn = firstIndex % gridSize;
  const secondColumn = secondIndex % gridSize;

  return Math.abs(firstRow - secondRow) + Math.abs(firstColumn - secondColumn) === 1;
}

function getTileStyle({
  tile,
  gridSize,
  imageSrc,
}: {
  tile: number;
  gridSize: number;
  imageSrc: string;
}): CSSProperties {
  const row = Math.floor(tile / gridSize);
  const column = tile % gridSize;
  const positionX = gridSize <= 1 ? 0 : Math.round((column / (gridSize - 1)) * 100);
  const positionY = gridSize <= 1 ? 0 : Math.round((row / (gridSize - 1)) * 100);

  return {
    backgroundImage: `url(${imageSrc})`,
    backgroundPosition: `${positionX}% ${positionY}%`,
    backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
  };
}

function formatPuzzleName(puzzle: PuzzleItem, region: Region) {
  return (
    puzzle.image.caption ??
    puzzle.title
      .replace(/^Puzzle\s+/i, "")
      .replace(` - ${region.name}`, "")
      .trim()
  );
}

function formatDifficulty(value: PuzzleItem["difficulty"]) {
  if (value === "easy") {
    return "Mudah";
  }

  if (value === "medium") {
    return "Sedang";
  }

  return "Sulit";
}

function PuzzleGameSurface({ puzzle, region }: PuzzleGameSurfaceProps) {
  const gridSize = puzzle.gridSize;
  const [shuffleTurn, setShuffleTurn] = useState(0);
  const [moves, setMoves] = useState(0);
  const [board, setBoard] = useState<TileValue[]>(() =>
    createShuffledBoard(puzzle.id, gridSize, 0),
  );

  const puzzleName = useMemo(() => formatPuzzleName(puzzle, region), [puzzle, region]);
  const placedTiles = board.filter((tile, index) => tile !== null && tile === index).length;
  const progress = Math.round((placedTiles / (gridSize * gridSize - 1)) * 100);
  const isComplete = isBoardSolved(board);

  const handleTileClick = (tileIndex: number) => {
    const emptyIndex = board.findIndex((tile) => tile === null);

    if (!areIndexesAdjacent(tileIndex, emptyIndex, gridSize) || isComplete) {
      return;
    }

    setBoard((currentBoard) => {
      const nextBoard = [...currentBoard];

      nextBoard[emptyIndex] = nextBoard[tileIndex];
      nextBoard[tileIndex] = null;

      return nextBoard;
    });
    setMoves((currentMoves) => currentMoves + 1);
  };

  const handleShuffle = () => {
    const nextShuffleTurn = shuffleTurn + 1;

    setShuffleTurn(nextShuffleTurn);
    setMoves(0);
    setBoard(createShuffledBoard(puzzle.id, gridSize, nextShuffleTurn));
  };

  return (
    <main className="min-h-[100dvh] bg-[#8c8783] px-6 pb-8 pt-9 text-[#221b16]">
      <section className="mx-auto flex min-h-[calc(100dvh-2.25rem)] max-w-7xl flex-col">
        <header className="grid gap-5 md:grid-cols-3 md:items-center">
          <Link
            href="/game/puzzle"
            className="inline-flex justify-self-start text-sm font-bold text-white/86 transition hover:text-white"
          >
            <span aria-hidden="true">&lt;-</span>&nbsp;Kembali ke Mini Game
          </Link>
          <h1 className="text-center text-5xl font-bold leading-none tracking-[-0.04em] text-[#7f4b20] md:text-7xl">
            Sliding Puzzle
          </h1>
          <div className="justify-self-start rounded-full bg-[#7f4b20] px-7 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_18px_45px_rgb(77_44_22/0.20)] md:justify-self-end">
            Moves {moves}
          </div>
        </header>

        <div className="mt-12 grid flex-1 gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
          <section>
            <div className="rounded-[30px] bg-[#e9e2dc] p-5 shadow-[0_30px_90px_rgb(44_35_29/0.16)] md:p-7">
              <div
                className="grid aspect-square gap-3 rounded-[24px] bg-[#d7d1cc] p-4"
                style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
              >
                {board.map((tile, index) =>
                  tile === null ? (
                    <div
                      key="empty"
                      className="flex items-center justify-center rounded-[16px] border-2 border-dashed border-[#a9a29d] bg-[#d9d3cf]/58"
                      aria-label="Slot kosong puzzle"
                    >
                      <span className="grid h-9 w-9 grid-cols-2 gap-1.5" aria-hidden="true">
                        <span className="rounded-[4px] bg-[#b8b0aa]" />
                        <span className="rounded-[4px] bg-[#b8b0aa]" />
                        <span className="rounded-[4px] bg-[#b8b0aa]" />
                        <span className="rounded-[4px] bg-[#b8b0aa]" />
                      </span>
                    </div>
                  ) : (
                    <button
                      key={`${puzzle.id}-${tile}`}
                      type="button"
                      onClick={() => handleTileClick(index)}
                      className="rounded-[16px] border border-white/34 bg-cover bg-no-repeat shadow-[inset_0_0_0_1px_rgb(255_255_255/0.25),0_10px_24px_rgb(64_50_41/0.16)] transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.015] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7f4b20] active:scale-[0.985]"
                      style={getTileStyle({
                        tile,
                        gridSize,
                        imageSrc: puzzle.image.src,
                      })}
                      aria-label={`Pindahkan tile ${tile + 1}`}
                    />
                  ),
                )}
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleShuffle}
                className="inline-flex h-[58px] items-center justify-center rounded-[18px] bg-[#8f5a23] px-7 text-lg font-bold text-white shadow-[0_18px_45px_rgb(77_44_22/0.18)] transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary active:scale-[0.98]"
              >
                Acak Gambar
              </button>
              <Link
                href="/game/puzzle"
                className="inline-flex h-[58px] items-center justify-center rounded-[18px] border border-[#ded2c7] bg-[#f5f0eb] px-7 text-lg font-bold text-[#2d2620] transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-primary hover:text-primary active:scale-[0.98]"
              >
                Pilih Gambar Lain
              </Link>
            </div>

            {isComplete ? (
              <div className="mt-6 rounded-[24px] border border-white/40 bg-[#f7f2ed] px-6 py-6 shadow-[0_24px_70px_rgb(49_39_33/0.13)]">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8f5a23]">
                  Puzzle Selesai
                </p>
                <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <h2 className="text-3xl font-bold tracking-[-0.03em] text-[#251f1a]">
                      Gambar sudah kembali utuh.
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-[#756a61]">
                      Kamu menyelesaikan {puzzleName} dari {region.name} dalam {moves} langkah.
                    </p>
                  </div>
                  <Link
                    href="/game/puzzle"
                    className="inline-flex h-12 items-center justify-center rounded-[14px] bg-[#8f5a23] px-6 text-sm font-bold text-white transition hover:bg-primary active:scale-[0.98]"
                  >
                    Pilih Wilayah
                  </Link>
                </div>
              </div>
            ) : null}
          </section>

          <aside className="grid gap-5">
            <section className="rounded-[28px] bg-[#f7f2ed] p-6 shadow-[0_24px_70px_rgb(49_39_33/0.15)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8f5a23]">
                Gambar Referensi
              </p>
              <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-[22px] bg-[#d9d1ca]">
                <Image
                  src={puzzle.image.src}
                  alt={puzzle.image.alt}
                  fill
                  sizes="(min-width: 1024px) 390px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
              <h2 className="mt-5 text-2xl font-bold tracking-[-0.03em] text-[#251f1a]">
                {puzzleName}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#756a61]">
                {region.name} - tingkat {formatDifficulty(puzzle.difficulty)} - {gridSize}x
                {gridSize} board.
              </p>
              <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#e3d9d0]">
                <div
                  className="h-full rounded-full bg-[#8f5a23] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-[#8c8178]">
                {progress}% tersusun
              </p>
            </section>

            <section className="rounded-[28px] bg-[#8f5a23] p-7 text-white shadow-[0_24px_70px_rgb(77_44_22/0.22)]">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/62">
                Tahukah Kamu?
              </p>
              <h3 className="mt-5 text-3xl font-bold tracking-[-0.03em]">
                {region.name.replace(/^Kabupaten\s|^Kota\s/, "")}
              </h3>
              <p className="mt-5 text-sm leading-7 text-white/78">
                {region.summary} Puzzle ini memakai visual {puzzleName} sebagai cara cepat
                mengenali destinasi unggulan wilayah tersebut.
              </p>
              {isComplete ? (
                <div className="mt-6 rounded-[18px] bg-white px-5 py-4 text-sm font-bold text-[#8f5a23]">
                  Selesai dalam {moves} langkah. Mantap, gambar sudah kembali utuh.
                </div>
              ) : null}
            </section>

            <section className="rounded-[28px] border border-[#ded2c7] bg-[#f7f2ed] p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8f5a23]">
                Tips Bermain
              </p>
              <div className="mt-6 grid gap-5">
                {[
                  "Selesaikan baris pertama lebih dulu agar pola gambar mulai terbaca.",
                  "Jaga slot kosong tetap dekat dengan tile yang ingin dipindahkan.",
                  "Bandingkan warna dan garis utama dengan gambar referensi di kanan.",
                ].map((tip, index) => (
                  <div key={tip} className="grid grid-cols-[42px_1fr] gap-4">
                    <span className="text-sm font-bold text-[#8f5a23]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-6 text-[#625850]">{tip}</p>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>

        <footer className="mt-10 grid gap-5 border-t border-white/22 py-7 text-sm text-white/72 md:grid-cols-[1fr_auto_auto] md:items-center">
          <div>
            <p className="font-bold text-white">VAST</p>
            <p className="mt-1">
              &copy; 2026 VAST, Java East Cultural Explorer. Celebrating the Culture of East
              Java, One Region at a Time.
            </p>
          </div>
          <Link href="/privacy" className="font-bold hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/terms" className="font-bold hover:text-white">
            Terms of Service
          </Link>
        </footer>
      </section>
    </main>
  );
}

export function PuzzlePlayClient({ puzzle, region }: PuzzlePlayClientProps) {
  if (!puzzle) {
    return (
      <main className="flex min-h-[100dvh] items-center justify-center bg-[#8c8783] px-6 text-center">
        <div className="max-w-lg rounded-[28px] bg-[#f7f2ed] px-8 py-10 shadow-[0_24px_70px_rgb(49_39_33/0.16)]">
          <h1 className="text-3xl font-bold text-primary">Belum ada puzzle</h1>
          <p className="mt-4 text-[#6f625a]">
            Wilayah ini belum memiliki paket puzzle yang bisa dimainkan.
          </p>
          <Link
            href="/game/puzzle"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-[10px] bg-primary px-6 font-bold text-white"
          >
            Pilih wilayah lain
          </Link>
        </div>
      </main>
    );
  }

  return <PuzzleGameSurface puzzle={puzzle} region={region} />;
}
