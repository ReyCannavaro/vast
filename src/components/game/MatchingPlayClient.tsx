"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { GamePlayBackground } from "@/components/game/GamePlayBackground";
import type { MatchingGameCard, MatchingRound } from "@/lib/matchingService";
import type { Region } from "@/types/region";

type MatchingPlayClientProps = {
  round: MatchingRound;
  region: Region;
};

type PairFeedback = {
  leftCardId: string;
  rightCardId: string;
  isCorrect: boolean;
};

function getCardStatus({
  card,
  selectedCardId,
  matchedItemIds,
  feedback,
}: {
  card: MatchingGameCard;
  selectedCardId: string | null;
  matchedItemIds: Set<string>;
  feedback: PairFeedback | null;
}) {
  if (matchedItemIds.has(card.itemId)) {
    return "correct";
  }

  if (
    feedback &&
    !feedback.isCorrect &&
    (feedback.leftCardId === card.id || feedback.rightCardId === card.id)
  ) {
    return "wrong";
  }

  if (selectedCardId === card.id) {
    return "selected";
  }

  return "idle";
}

function MatchingCard({
  card,
  status,
  onSelect,
  setRef
}: {
  card: MatchingGameCard;
  status: "idle" | "selected" | "correct" | "wrong";
  onSelect: () => void;
  setRef?: (el: HTMLButtonElement | null) => void;
}) {
  const isLocked = status === "correct";

  return (
    <button
      ref={setRef}
      type="button"
      disabled={isLocked}
      onClick={onSelect}
      className={`group relative flex min-h-[88px] w-full items-center justify-between rounded-2xl border-2 text-left transition-all duration-200 overflow-hidden ${
        status === "correct"
          ? "border-leaf border-b-2 bg-leaf text-white shadow-none translate-y-[4px]"
          : status === "wrong"
            ? "border-red-500 border-b-2 bg-red-500 text-white shadow-none translate-y-[4px]"
            : status === "selected"
              ? "border-secondary border-b-2 bg-secondary text-white shadow-none translate-y-[4px]"
              : "border-border border-b-[6px] bg-surface hover:border-primary/50 hover:-translate-y-1 hover:shadow-lg active:translate-y-[4px] active:border-b-2 active:shadow-none"
      } ${isLocked ? "cursor-default" : "cursor-pointer"} p-4 sm:p-5`}
    >
      <div className="flex items-center gap-4">
        <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
           status === "idle" ? "border-border bg-background group-hover:border-primary/50" : "border-transparent bg-white/20"
        }`}>
          {status === "correct" && (
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-white animate-in zoom-in duration-300"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
          )}
          {status === "wrong" && (
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-white animate-in zoom-in duration-300"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          )}
        </div>
        <span className={`text-sm font-bold leading-relaxed tracking-tight sm:text-[15px] ${status !== "idle" ? "" : "text-ink"}`}>
          {card.label}
        </span>
      </div>
    </button>
  );
}

export function MatchingPlayClient({ round, region }: MatchingPlayClientProps) {
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [selectedRightId, setSelectedRightId] = useState<string | null>(null);
  const [matchedItemIds, setMatchedItemIds] = useState<string[]>([]);
  const [attemptCount, setAttemptCount] = useState(0);
  const [feedback, setFeedback] = useState<PairFeedback | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const leftRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const rightRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [lines, setLines] = useState<{ id: string; x1: number; y1: number; x2: number; y2: number }[]>([]);

  useEffect(() => {
    const updateLines = () => {
      if (!containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const newLines = [];

      for (const itemId of matchedItemIds) {
        const leftCard = round.leftCards.find(c => c.itemId === itemId);
        const rightCard = round.rightCards.find(c => c.itemId === itemId);
        if (!leftCard || !rightCard) continue;

        const leftEl = leftRefs.current.get(leftCard.id);
        const rightEl = rightRefs.current.get(rightCard.id);
        if (!leftEl || !rightEl) continue;

        const leftRect = leftEl.getBoundingClientRect();
        const rightRect = rightEl.getBoundingClientRect();

        newLines.push({
          id: itemId,
          x1: leftRect.right - containerRect.left,
          y1: leftRect.top + leftRect.height / 2 - containerRect.top,
          x2: rightRect.left - containerRect.left,
          y2: rightRect.top + rightRect.height / 2 - containerRect.top,
        });
      }
      setLines(newLines);
    };

    updateLines();
    window.addEventListener("resize", updateLines);
    return () => window.removeEventListener("resize", updateLines);
  }, [matchedItemIds, round]);

  const matchedSet = useMemo(() => new Set(matchedItemIds), [matchedItemIds]);
  const totalPairs = round.items.length;
  const matchedPairs = matchedItemIds.length;
  const isComplete = totalPairs > 0 && matchedPairs === totalPairs;
  const score = matchedPairs * 75;
  const latestMatchedItem = [...round.items]
    .reverse()
    .find((item) => matchedSet.has(item.id));
  const factItem = latestMatchedItem ?? round.items[0];

  const findLeftCard = (cardId: string | null) =>
    cardId ? (round.leftCards.find((card) => card.id === cardId) ?? null) : null;
  const findRightCard = (cardId: string | null) =>
    cardId ? (round.rightCards.find((card) => card.id === cardId) ?? null) : null;

  const evaluatePair = (leftCard: MatchingGameCard, rightCard: MatchingGameCard) => {
    const isCorrect = leftCard.itemId === rightCard.itemId;

    setAttemptCount((current) => current + 1);
    setFeedback({
      leftCardId: leftCard.id,
      rightCardId: rightCard.id,
      isCorrect,
    });

    if (isCorrect) {
      setMatchedItemIds((current) =>
        current.includes(leftCard.itemId) ? current : [...current, leftCard.itemId],
      );
    }

    setSelectedLeftId(null);
    setSelectedRightId(null);
  };

  const handleLeftSelect = (card: MatchingGameCard) => {
    if (matchedSet.has(card.itemId)) {
      return;
    }

    setFeedback(null);
    setSelectedLeftId(card.id);

    const rightCard = findRightCard(selectedRightId);

    if (rightCard) {
      evaluatePair(card, rightCard);
    }
  };

  const handleRightSelect = (card: MatchingGameCard) => {
    if (matchedSet.has(card.itemId)) {
      return;
    }

    setFeedback(null);
    setSelectedRightId(card.id);

    const leftCard = findLeftCard(selectedLeftId);

    if (leftCard) {
      evaluatePair(leftCard, card);
    }
  };

  const handleRestart = () => {
    setSelectedLeftId(null);
    setSelectedRightId(null);
    setMatchedItemIds([]);
    setAttemptCount(0);
    setFeedback(null);
  };

  if (totalPairs === 0) {
    return (
      <GamePlayBackground>
        <div className="flex w-full max-w-md flex-col items-center rounded-[2rem] bg-surface p-12 text-center shadow-xl ring-1 ring-border">
          <h1 className="text-3xl font-semibold tracking-tight text-ink">Belum ada pasangan</h1>
          <p className="mt-4 text-base text-muted">Wilayah ini belum memiliki paket matching yang bisa dimainkan.</p>
          <Link href="/game/matching" className="mt-8 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-secondary">
            Pilih wilayah lain
          </Link>
        </div>
      </GamePlayBackground>
    );
  }

  return (
    <GamePlayBackground>
      {/* Top navigation overlay */}
      <div className="absolute top-0 left-0 w-full p-6 lg:p-8 z-10 flex justify-between items-center">
         <Link href="/game/matching" className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-white/72 transition-colors hover:text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Kembali ke Peta
         </Link>
         <div className="text-sm font-semibold text-white/64">
            VAST // {region?.name || 'Matching'}
         </div>
      </div>

      <div className="relative mx-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-surface shadow-2xl ring-1 ring-border mt-16 lg:mt-16 p-6 sm:p-10 lg:p-12">

        {/* Header - Unified Stats Dashboard */}
        <div className="relative z-10 flex flex-col xl:flex-row xl:items-end justify-between gap-8 border-b border-border pb-8">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-muted">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              Menjodohkan
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl lg:text-4xl leading-[1.25]">
              Cocokkan Simbol Budaya
            </h1>
          </div>
          
          {/* Neat Stats Dashboard */}
          <div className="flex items-center gap-4 sm:gap-8 rounded-2xl bg-background px-6 py-4 ring-1 ring-border shadow-sm">
             <div className="flex flex-col items-center">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Progress</span>
                 <span className="text-lg font-bold text-ink">{matchedPairs} <span className="text-sm text-muted">/ {totalPairs}</span></span>
             </div>
             <div className="h-8 w-px bg-border"></div>
             <div className="flex flex-col items-center">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Percobaan</span>
                 <span className="text-lg font-bold text-ink">{attemptCount}</span>
             </div>
             <div className="h-8 w-px bg-border"></div>
             <div className="flex flex-col items-center">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Skor</span>
                 <span className="text-lg font-bold text-primary">{score}</span>
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
               &quot;{factItem?.explanation ?? `${region.name} memiliki ragam simbol budaya yang bisa dipasangkan.`}&quot;
             </p>
          </div>
        </div>

        {/* Game Board Area */}
        <div className="relative z-10 mt-12 rounded-[2rem] bg-background p-6 sm:p-10 ring-1 ring-border shadow-inner">
          <div ref={containerRef} className="grid w-full gap-8 md:grid-cols-2 lg:gap-16 relative">
            
            {/* SVG Connecting Lines Overlay */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full z-0 overflow-visible md:block hidden">
              {lines.map((line) => (
                <path
                  key={line.id}
                  d={`M ${line.x1} ${line.y1} C ${line.x1 + 60} ${line.y1}, ${line.x2 - 60} ${line.y2}, ${line.x2} ${line.y2}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-leaf animate-in fade-in duration-700"
                  strokeDasharray="6 6"
                />
              ))}
            </svg>
            {/* Connecting Line (Decorative) */}
            <div className="absolute left-1/2 top-4 hidden h-[calc(100%-2rem)] w-[2px] -translate-x-1/2 rounded-full bg-border/60 md:block" />

            {/* Left Column (Wilayah) */}
            <div className="relative z-10">
              <div className="mb-6 flex items-center justify-center">
                <span className="rounded-full bg-surface px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-primary ring-1 ring-border shadow-sm">
                  Kategori A
                </span>
              </div>
              <div className="flex flex-col gap-4">
                {round.leftCards.map((card) => (
                  <MatchingCard
                    key={card.id}
                    card={card}
                    setRef={(el) => {
                      if (el) leftRefs.current.set(card.id, el);
                      else leftRefs.current.delete(card.id);
                    }}
                    status={getCardStatus({
                      card,
                      selectedCardId: selectedLeftId,
                      matchedItemIds: matchedSet,
                      feedback,
                    })}
                    onSelect={() => handleLeftSelect(card)}
                  />
                ))}
              </div>
            </div>

            {/* Right Column (Simbol Budaya) */}
            <div className="relative z-10">
              <div className="mb-6 flex items-center justify-center">
                <span className="rounded-full bg-surface px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-primary ring-1 ring-border shadow-sm">
                  Kategori B
                </span>
              </div>
              <div className="flex flex-col gap-4">
                {round.rightCards.map((card) => (
                  <MatchingCard
                    key={card.id}
                    card={card}
                    setRef={(el) => {
                      if (el) rightRefs.current.set(card.id, el);
                      else rightRefs.current.delete(card.id);
                    }}
                    status={getCardStatus({
                      card,
                      selectedCardId: selectedRightId,
                      matchedItemIds: matchedSet,
                      feedback,
                    })}
                    onSelect={() => handleRightSelect(card)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer / Completion State */}
        {isComplete && (
          <div className="relative z-20 mt-12 flex flex-col items-center justify-center rounded-2xl bg-primary text-white p-10 shadow-xl animate-in slide-in-from-bottom-8 duration-700">
             <h3 className="text-3xl font-semibold tracking-tight mb-3">
                Pencapaian Luar Biasa!
             </h3>
             <p className="text-base text-white/80 font-medium mb-10 text-center">
                Kamu menyelesaikan {totalPairs} pasangan dengan {attemptCount} percobaan.
             </p>
             <div className="flex w-full max-w-md flex-col sm:flex-row gap-4">
                <button onClick={handleRestart} className="flex flex-1 items-center justify-center rounded-xl bg-white py-4 text-sm font-bold text-primary transition-all hover:scale-105 shadow-md">
                  Main Lagi
                </button>
                <Link href="/game/matching" className="flex flex-1 items-center justify-center rounded-xl border-2 border-white/30 bg-primary py-4 text-sm font-bold text-white transition-all hover:bg-white/10">
                  Pilih Wilayah Lain
                </Link>
             </div>
          </div>
        )}
      </div>
    </GamePlayBackground>
  );
}
