"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

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
}: {
  card: MatchingGameCard;
  status: "idle" | "selected" | "correct" | "wrong";
  onSelect: () => void;
}) {
  const isLocked = status === "correct";

  return (
    <button
      type="button"
      disabled={isLocked}
      onClick={onSelect}
      className={`grid min-h-[50px] grid-cols-[1fr_28px] items-center gap-3 rounded-[8px] border px-4 text-left text-[15px] font-medium transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        status === "correct"
          ? "border-[#62da91] bg-[#dcf8e8] text-[#203a2a] shadow-[0_10px_24px_rgb(75_146_93/0.12)]"
          : status === "wrong"
            ? "border-[#ff7b79] bg-[#ffe1e1] text-[#3c2525] shadow-[0_10px_24px_rgb(196_71_66/0.12)]"
            : status === "selected"
              ? "border-primary bg-[#f8eadc] text-[#2b2119] shadow-[0_10px_24px_rgb(132_78_27/0.14)]"
              : "border-[#e6e1dd] bg-white text-[#2b2926] shadow-[0_4px_13px_rgb(51_45_39/0.08)] hover:border-primary/50 hover:bg-[#fffaf5]"
      } ${isLocked ? "cursor-default" : "active:scale-[0.992]"}`}
    >
      <span>{card.label}</span>
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
          status === "correct"
            ? "bg-[#20a45f] text-white"
            : status === "wrong"
              ? "bg-[#f25454] text-white"
              : status === "selected"
                ? "bg-primary text-white"
                : "bg-[#d2d2d0] text-transparent"
        }`}
        aria-hidden="true"
      >
        {status === "correct" ? "V" : status === "wrong" ? "X" : "."}
      </span>
    </button>
  );
}

export function MatchingPlayClient({ round, region }: MatchingPlayClientProps) {
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [selectedRightId, setSelectedRightId] = useState<string | null>(null);
  const [matchedItemIds, setMatchedItemIds] = useState<string[]>([]);
  const [attemptCount, setAttemptCount] = useState(0);
  const [feedback, setFeedback] = useState<PairFeedback | null>(null);

  const matchedSet = useMemo(() => new Set(matchedItemIds), [matchedItemIds]);
  const totalPairs = round.items.length;
  const matchedPairs = matchedItemIds.length;
  const isComplete = totalPairs > 0 && matchedPairs === totalPairs;
  const score = matchedPairs * 75;
  const progress = totalPairs === 0 ? 0 : Math.round((matchedPairs / totalPairs) * 100);
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
      <main className="flex min-h-[100dvh] items-center justify-center bg-[#aaa7a5] px-6 text-center">
        <div className="max-w-lg rounded-[24px] bg-[#f8f4ef] px-8 py-10">
          <h1 className="text-3xl font-bold text-primary">Belum ada pasangan</h1>
          <p className="mt-4 text-[#675f59]">
            Wilayah ini belum memiliki paket matching yang bisa dimainkan.
          </p>
          <Link
            href="/game/matching"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-[10px] bg-primary px-6 font-bold text-white"
          >
            Pilih wilayah lain
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[100dvh] bg-[#a9a7a5] px-6 pb-8 pt-10 text-[#201c19]">
      <section className="mx-auto flex min-h-[calc(100dvh-2rem)] max-w-7xl flex-col">
        <h1 className="text-center text-5xl font-bold leading-none tracking-[-0.04em] text-primary md:text-7xl">
          Menjodohkan
        </h1>

        <div className="mx-auto mt-20 max-w-[620px] text-center">
          <div className="mx-auto w-[172px] overflow-hidden rounded-[7px] border border-[#7a7571] bg-[#e8d5ac] shadow-[0_5px_10px_rgb(41_35_30/0.18)]">
            <div className="bg-[#aaa6a2] px-4 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#4d4742]">
              Tahukah Anda?
            </div>
            <div className="px-4 py-6" />
          </div>
          <p className="-mt-14 text-sm leading-6 text-[#3f3a36]">
            &quot;{factItem?.explanation ?? `${region.name} memiliki ragam simbol budaya yang bisa dipasangkan.`}&quot;
          </p>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold tracking-[-0.03em] text-primary md:text-4xl">
            Cocokkan Wilayah dengan Simbol Budayanya
          </h2>
          <p className="mt-6 text-sm font-semibold text-[#6a625d]">
            {matchedPairs} dari {totalPairs} pasangan
          </p>
          <div className="mx-auto mt-3 h-3 max-w-[448px] overflow-hidden rounded-full bg-[#d1d1cf]">
            <div
              className="h-full rounded-full bg-[#b2793a] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.34em] text-[#7a736e]">
            Level: East Java Cultural Icons
          </p>
        </div>

        <div className="mx-auto mt-8 grid w-full max-w-[865px] gap-6 md:grid-cols-2">
          <div>
            <div className="rounded-t-[5px] bg-[#c09a62] py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-white">
              Wilayah
            </div>
            <div className="mt-3 grid gap-3">
              {round.leftCards.map((card) => (
                <MatchingCard
                  key={card.id}
                  card={card}
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

          <div>
            <div className="rounded-t-[5px] bg-[#c09a62] py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-white">
              Simbol Budaya
            </div>
            <div className="mt-3 grid gap-3">
              {round.rightCards.map((card) => (
                <MatchingCard
                  key={card.id}
                  card={card}
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

        <div className="mx-auto mt-16 grid w-full max-w-[885px] gap-4 sm:grid-cols-3 sm:items-center">
          <Link
            href="/game/matching"
            className="inline-flex h-[50px] items-center justify-center rounded-[16px] bg-primary px-7 text-xl font-medium text-white transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-secondary active:scale-[0.98] sm:justify-self-start"
          >
            Kembali
          </Link>
          <div className="text-center text-sm font-semibold text-[#5f5751]">
            {attemptCount} percobaan, {score} poin
          </div>
          {isComplete ? (
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex h-[50px] items-center justify-center rounded-[16px] bg-primary px-7 text-xl font-medium text-white transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-secondary active:scale-[0.98] sm:justify-self-end"
            >
              Ulangi
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex h-[50px] items-center justify-center rounded-[16px] bg-primary/80 px-7 text-xl font-medium text-white sm:justify-self-end"
            >
              Lanjut
            </button>
          )}
        </div>

        <footer className="mt-auto grid gap-5 border-t border-[#d3cdc7] py-7 text-sm text-[#625b55] md:grid-cols-[1fr_auto_auto] md:items-center">
          <div>
            <p className="font-bold text-[#74481f]">VAST</p>
            <p className="mt-1">
              &copy; 2026 VAST, Java East Cultural Explorer. Celebrating the Culture of East
              Java, One Region at a Time.
            </p>
          </div>
          <Link href="/privacy" className="font-bold hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="/terms" className="font-bold hover:text-primary">
            Terms of Service
          </Link>
        </footer>
      </section>
    </main>
  );
}
