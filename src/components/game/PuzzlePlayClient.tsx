"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { CSSProperties } from "react";

import { GamePlayBackground } from "@/components/game/GamePlayBackground";
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
    <GamePlayBackground>
      {/* Top navigation overlay */}
      <div className="absolute top-0 left-0 w-full p-6 lg:p-8 z-10 flex justify-between items-center">
         <Link href="/game/puzzle" className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-white/72 transition-colors hover:text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Kembali ke Peta
         </Link>
         <div className="text-sm font-semibold text-white/64">
            VAST // {region?.name || 'Puzzle'}
         </div>
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-surface shadow-2xl ring-1 ring-border mt-16 lg:mt-12 p-6 sm:p-10 lg:p-12">
        
        {/* Header - Unified Stats Dashboard */}
        <div className="relative z-10 flex flex-col xl:flex-row xl:items-end justify-between gap-8 border-b border-border pb-8">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-[8px] border border-border bg-background px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-muted">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              Sliding Puzzle
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl lg:text-4xl leading-[1.25]">
              Susun Kembali Visual
            </h1>
          </div>
          
          {/* Neat Stats Dashboard */}
          <div className="flex items-center gap-4 sm:gap-8 rounded-2xl bg-background px-6 py-4 ring-1 ring-border shadow-sm">
             <div className="flex flex-col items-center">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Progress</span>
                 <span className="text-lg font-bold text-ink">{progress}<span className="text-sm text-muted">%</span></span>
             </div>
             <div className="h-8 w-px bg-border"></div>
             <div className="flex flex-col items-center">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Tersusun</span>
                 <span className="text-lg font-bold text-ink">{placedTiles} <span className="text-sm text-muted">/ {gridSize * gridSize - 1}</span></span>
             </div>
             <div className="h-8 w-px bg-border"></div>
             <div className="flex flex-col items-center">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Langkah</span>
                 <span className="text-lg font-bold text-primary">{moves}</span>
             </div>
          </div>
        </div>

        {/* Museum Placard Fact Banner */}
        <div className="relative z-10 mt-8 animate-in fade-in duration-500">
          <div className="flex flex-col sm:flex-row gap-5 border-l-[6px] border-primary bg-background p-6 ring-1 ring-border shadow-sm rounded-r-2xl">
             <div className="flex shrink-0 items-center justify-center">
               <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1.5 rounded-md">
                 Tahukah Anda?
               </span>
             </div>
             <p className="text-sm font-medium leading-relaxed text-ink/80 italic">
               &quot;{region.summary} Puzzle ini memakai visual {puzzleName} sebagai cara untuk mengamati detail kebudayaan secara perlahan.&quot;
             </p>
          </div>
        </div>

        {/* Main Game Area Split */}
        <div className="mt-12 flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10">
           
           {/* Left Column: Game Board & Controls */}
           <div className="flex-1 flex flex-col gap-6">
              <div className="rounded-[2rem] bg-background p-6 sm:p-10 ring-1 ring-border shadow-inner relative overflow-hidden">
                {/* Flash effect when complete */}
                {isComplete && (
                  <motion.div 
                    initial={{ opacity: 1 }} 
                    animate={{ opacity: 0 }} 
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute inset-0 bg-white z-20 pointer-events-none" 
                  />
                )}
                
                <div
                  className={`mx-auto grid aspect-square w-full max-w-2xl overflow-hidden transition-all duration-1000 ease-in-out ${isComplete ? 'gap-0 p-0 rounded-2xl bg-transparent' : 'gap-2 sm:gap-3 rounded-2xl bg-border/50 p-2 sm:p-3'}`}
                  style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
                >
                  {board.map((tile, index) =>
                    tile === null ? (
                      isComplete ? (
                        <motion.div
                          layout
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                          key="final-piece"
                          className="bg-cover bg-no-repeat z-10"
                          style={getTileStyle({
                            tile: gridSize * gridSize - 1,
                            gridSize,
                            imageSrc: puzzle.image.src,
                          })}
                        />
                      ) : (
                        <motion.div
                          layout
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          key="empty"
                          className="flex items-center justify-center rounded-xl sm:rounded-2xl border-2 border-dashed border-border bg-background/50"
                          aria-label="Slot kosong puzzle"
                        />
                      )
                    ) : (
                      <motion.button
                        layout
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        key={`${puzzle.id}-${tile}`}
                        type="button"
                        disabled={isComplete}
                        onClick={() => handleTileClick(index)}
                        className={`bg-cover bg-no-repeat transition-all duration-1000 focus:outline-none ${isComplete ? 'rounded-none border-none ring-0 shadow-none cursor-default' : 'rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md hover:ring-2 hover:ring-primary focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.98] cursor-pointer ring-1 ring-black/10 inset-0'}`}
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

              {/* Game Controls */}
              {!isComplete && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={handleShuffle}
                    className="flex flex-1 h-14 items-center justify-center rounded-[10px] bg-primary px-8 text-sm font-bold tracking-widest uppercase text-white shadow-md transition-colors hover:bg-secondary active:scale-[0.98]"
                  >
                    Acak Gambar
                  </button>
                  <Link
                    href="/game/puzzle"
                    className="flex flex-1 h-14 items-center justify-center rounded-[10px] border border-primary bg-surface px-8 text-sm font-bold tracking-widest uppercase text-primary transition-colors hover:bg-primary/10 active:scale-[0.98]"
                  >
                    Gambar Lain
                  </Link>
                </div>
              )}
           </div>

           {/* Right Column: Reference & Tips */}
           <div className="w-full lg:w-[340px] shrink-0 flex flex-col gap-6">
              
              {/* Reference Image Card */}
              <div className="rounded-2xl bg-background p-5 ring-1 ring-border shadow-sm">
                 <div className="mb-4 flex items-center justify-between">
                   <span className="text-[11px] font-bold uppercase tracking-widest text-primary">Referensi</span>
                   <span className="rounded bg-border/60 px-2 py-0.5 text-[10px] font-bold text-ink">{gridSize}x{gridSize}</span>
                 </div>
                 <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl ring-1 ring-border shadow-inner">
                   <Image
                     src={puzzle.image.src}
                     alt={puzzle.image.alt}
                     fill
                     sizes="(min-width: 1024px) 340px, 100vw"
                     className="object-cover opacity-90 transition-opacity hover:opacity-100"
                     priority
                   />
                 </div>
                 <h4 className="mt-4 text-sm font-bold text-ink leading-snug">{puzzleName}</h4>
                 <p className="text-xs text-muted mt-1.5 font-medium">{region.name} — Tingkat {formatDifficulty(puzzle.difficulty)}</p>
              </div>

              {/* Tips Card */}
              <div className="rounded-2xl bg-surface p-6 ring-1 ring-border shadow-sm">
                 <span className="text-[11px] font-bold uppercase tracking-widest text-primary mb-5 block">Tips Bermain</span>
                 <div className="flex flex-col gap-4">
                   {[
                     "Selesaikan baris pertama lebih dulu agar pola gambar mulai terbaca.",
                     "Jaga slot kosong tetap dekat dengan tile yang ingin dipindahkan.",
                     "Bandingkan warna dan garis utama dengan gambar referensi di atas.",
                   ].map((tip, index) => (
                     <div key={tip} className="flex gap-4 items-start">
                       <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-primary/10 text-[10px] font-black text-primary">
                         {index + 1}
                       </span>
                       <p className="text-xs font-medium leading-relaxed text-ink/80">{tip}</p>
                     </div>
                   ))}
                 </div>
              </div>
           </div>

        </div>

        {/* Completion State */}
        {isComplete && (
          <div className="relative z-20 mt-12 flex flex-col items-center justify-center rounded-2xl bg-primary text-white p-10 shadow-xl animate-in slide-in-from-bottom-8 duration-700">
             <h3 className="text-3xl font-semibold tracking-tight mb-3">
                Gambar Kembali Utuh!
             </h3>
             <p className="text-base text-white/80 font-medium mb-10 text-center max-w-lg">
                Kamu berhasil menyelesaikan visual {puzzleName} dari {region.name} hanya dalam {moves} langkah. Sangat mengesankan!
             </p>
             <div className="flex w-full max-w-md flex-col sm:flex-row gap-4">
                <button onClick={handleShuffle} className="flex flex-1 items-center justify-center rounded-[10px] bg-white py-4 text-sm font-bold text-primary transition-all hover:scale-105 shadow-md">
                  Acak & Main Lagi
                </button>
                <Link href="/game/puzzle" className="flex flex-1 items-center justify-center rounded-[10px] border-2 border-white/30 bg-primary py-4 text-sm font-bold text-white transition-all hover:bg-white/10">
                  Pilih Puzzle Lain
                </Link>
             </div>
          </div>
        )}
      </div>
    </GamePlayBackground>
  );
}

export function PuzzlePlayClient({ puzzle, region }: PuzzlePlayClientProps) {
  if (!puzzle) {
    return (
      <GamePlayBackground>
        <div className="flex w-full max-w-md flex-col items-center rounded-[2rem] bg-surface p-12 text-center shadow-xl ring-1 ring-border">
          <h1 className="text-3xl font-semibold tracking-tight text-ink">Belum ada puzzle</h1>
          <p className="mt-4 text-base text-muted">Wilayah ini belum memiliki paket puzzle yang bisa dimainkan.</p>
          <Link href="/game/puzzle" className="mt-8 rounded-[10px] bg-primary px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-secondary">
            Pilih wilayah lain
          </Link>
        </div>
      </GamePlayBackground>
    );
  }

  return <PuzzleGameSurface puzzle={puzzle} region={region} />;
}
