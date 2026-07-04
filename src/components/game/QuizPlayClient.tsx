"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { QuizQuestion, Region } from "@/types/region";

type QuizPlayClientProps = {
  questions: QuizQuestion[];
  region: Region;
};

const optionLetters = ["A", "B", "C", "D"];

function getQuestionCategory(questionId: string) {
  if (questionId.startsWith("quiz-food-")) {
    return "Kuliner";
  }

  if (questionId.startsWith("quiz-destination-")) {
    return "Destinasi";
  }

  if (questionId.startsWith("quiz-batik-")) {
    return "Batik";
  }

  if (questionId.startsWith("quiz-culture-")) {
    return "Budaya";
  }

  return "Wawasan";
}

function normalizeAnswer(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

export function QuizPlayClient({ questions, region }: QuizPlayClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const activeQuestion = questions[activeIndex];
  const selectedAnswer = activeQuestion ? answers[activeQuestion.id] : undefined;
  const isAnswered = Boolean(selectedAnswer);
  const isLastQuestion = activeIndex === questions.length - 1;
  const correctCount = useMemo(
    () =>
      questions.filter((question) => {
        const answer = answers[question.id];

        return answer && normalizeAnswer(answer) === normalizeAnswer(question.correctAnswer);
      }).length,
    [answers, questions],
  );
  const score = correctCount * 50;

  const handleSelectAnswer = (answer: string) => {
    if (!activeQuestion || selectedAnswer) {
      return;
    }

    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [activeQuestion.id]: answer,
    }));
  };

  const handleNextQuestion = () => {
    if (!isAnswered) {
      return;
    }

    if (isLastQuestion) {
      setIsComplete(true);
      return;
    }

    setActiveIndex((currentIndex) => currentIndex + 1);
  };

  const handleRestart = () => {
    setActiveIndex(0);
    setAnswers({});
    setIsComplete(false);
  };

  if (!activeQuestion) {
    return (
      <main className="flex min-h-[100dvh] items-center justify-center bg-[#b5afad] px-6 text-center">
        <div className="max-w-lg rounded-[28px] bg-[#f6f1ec] px-8 py-10">
          <h1 className="text-3xl font-bold text-primary">Belum ada soal</h1>
          <p className="mt-4 text-[#6f625a]">
            Wilayah ini belum memiliki paket quiz yang bisa dimainkan.
          </p>
          <Link
            href="/game/quiz"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-[10px] bg-primary px-6 font-bold text-white"
          >
            Pilih wilayah lain
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[100dvh] bg-[#b8b2b0] px-6 pb-10 pt-10 text-[#201c19]">
      <section className="mx-auto flex min-h-[calc(100dvh-2.5rem)] max-w-7xl flex-col">
        <h1 className="text-center text-5xl font-bold leading-none tracking-[-0.04em] text-primary md:text-7xl">
          Quiz
        </h1>

        <div className="mt-16 grid items-center gap-5 md:grid-cols-3">
          <Link
            href="/game/quiz"
            className="justify-self-start text-sm font-bold text-primary transition hover:text-secondary"
          >
            <span aria-hidden="true">&lt;-</span> Kembali ke Pilih Wilayah
          </Link>
          <div className="justify-self-center rounded-full bg-[#f5f2ed] px-5 py-2 text-sm font-bold text-[#5d5650]">
            Soal {activeIndex + 1} dari {questions.length}
          </div>
          <div className="justify-self-start text-sm font-bold text-primary md:justify-self-end">
            <span aria-hidden="true">◎</span> {score} Poin
          </div>
        </div>

        <div className="mx-auto mt-10 w-full max-w-[670px] rounded-[28px] bg-[#f7f2ed] px-7 py-10 shadow-[0_18px_70px_rgb(70_55_47/0.10)] md:px-12 md:py-12">
          {isComplete ? (
            <div className="py-10 text-center">
              <p className="mx-auto inline-flex rounded-full bg-[#f0e3d8] px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                Selesai
              </p>
              <h2 className="mt-8 text-4xl font-bold tracking-[-0.03em] md:text-5xl">
                {correctCount} dari {questions.length} benar
              </h2>
              <p className="mx-auto mt-5 max-w-md text-base leading-7 text-[#655b54]">
                Kamu menyelesaikan quiz {region.name} dengan {score} poin. Coba wilayah
                lain untuk membuka wawasan budaya Jawa Timur yang berbeda.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="inline-flex h-[52px] items-center justify-center rounded-[10px] bg-primary px-7 font-bold text-white transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-secondary active:scale-[0.98]"
                >
                  Main Lagi
                </button>
                <Link
                  href="/game/quiz"
                  className="inline-flex h-[52px] items-center justify-center rounded-[10px] border border-[#d7c8bd] px-7 font-bold text-[#5f5048] transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-primary hover:text-primary active:scale-[0.98]"
                >
                  Pilih Wilayah
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center">
                <p className="mx-auto inline-flex rounded-full bg-[#f0e3d8] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                  {getQuestionCategory(activeQuestion.id)}
                </p>
                <h2 className="mx-auto mt-7 max-w-[540px] text-[24px] font-bold leading-[1.22] tracking-[-0.02em] md:text-[28px]">
                  {activeQuestion.question}
                </h2>
              </div>

              <div className="mt-10 grid gap-4">
                {activeQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect =
                    normalizeAnswer(option) === normalizeAnswer(activeQuestion.correctAnswer);
                  const shouldReveal = isAnswered && (isSelected || isCorrect);

                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleSelectAnswer(option)}
                      className={`grid min-h-[74px] grid-cols-[40px_1fr_32px] items-center gap-4 rounded-[11px] border px-5 text-left transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                        shouldReveal && isCorrect
                          ? "border-[#556d4d] bg-[#efefe9] text-[#1e211b]"
                          : shouldReveal && isSelected
                            ? "border-[#a65939] bg-[#f5e7df] text-[#1e211b]"
                            : "border-[#ede7e1] bg-white/52 text-[#968d86] hover:border-[#d8c9bf] hover:bg-white/78"
                      } ${isAnswered ? "cursor-default" : "active:scale-[0.992]"}`}
                    >
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                          shouldReveal && isCorrect
                            ? "bg-[#556d4d] text-white"
                            : "bg-[#f3efe9] text-[#9b9189]"
                        }`}
                      >
                        {optionLetters[index]}
                      </span>
                      <span className="font-bold">{option}</span>
                      {shouldReveal && isCorrect ? (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#556d4d] text-[#556d4d]">
                          V
                        </span>
                      ) : shouldReveal && isSelected ? (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#a65939] text-[#a65939]">
                          X
                        </span>
                      ) : (
                        <span aria-hidden="true" />
                      )}
                    </button>
                  );
                })}
              </div>

              {isAnswered ? (
                <div className="mt-8 rounded-[11px] border border-[#ede7e1] bg-white/56 px-6 py-5">
                  <p className="text-sm leading-7 text-[#5f554e]">
                    <span className="mr-3 text-xl text-primary" aria-hidden="true">
                      *
                    </span>
                    {activeQuestion.explanation}
                  </p>
                </div>
              ) : null}

              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  disabled={!isAnswered}
                  onClick={handleNextQuestion}
                  className="inline-flex h-14 min-w-[214px] items-center justify-center rounded-[10px] bg-primary px-7 font-bold text-white transition duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-secondary disabled:cursor-not-allowed disabled:bg-[#c8bcb2] active:scale-[0.98]"
                >
                  {isLastQuestion ? "Lihat Hasil" : "Soal Berikutnya"}
                  <span className="ml-4 text-xl leading-none" aria-hidden="true">
                    -&gt;
                  </span>
                </button>
              </div>
            </>
          )}
        </div>

        <footer className="mt-auto grid gap-5 border-t border-[#d7d0ca] py-7 text-sm text-[#756c66] md:grid-cols-[1fr_auto_auto] md:items-center">
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
