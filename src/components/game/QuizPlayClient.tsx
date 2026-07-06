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
      <main className="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-sand p-6">
        <div className="flex w-full max-w-md flex-col items-center rounded-[2rem] bg-surface p-12 text-center shadow-xl ring-1 ring-border">
          <h1 className="text-3xl font-semibold tracking-tight text-ink">Tidak ada soal</h1>
          <p className="mt-4 text-base text-muted">Belum ada paket soal untuk {region?.name || 'wilayah ini'}.</p>
          <Link href="/game/quiz" className="mt-8 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-secondary">
            Kembali ke Peta
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-sand p-4 sm:p-8 md:p-12 selection:bg-primary/20 selection:text-primary">
      {/* Top navigation overlay */}
      <div className="absolute top-0 left-0 w-full p-6 lg:p-8 z-10 flex justify-between items-center">
         <Link href="/game/quiz" className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-muted transition-colors hover:text-ink">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Kembali ke Peta
         </Link>
         <div className="text-sm font-semibold text-muted">
            VAST // {region?.name || 'Kuis Budaya'}
         </div>
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-surface shadow-2xl ring-1 ring-border lg:flex-row mt-12 lg:mt-0">
        {/* Left Side - Question */}
        <section className="flex w-full flex-col justify-between bg-surface p-8 lg:w-1/2 lg:p-12 xl:p-14 border-b lg:border-b-0 lg:border-r border-border">
          <div>
            {!isComplete ? (
              <div className="animate-in fade-in duration-500">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-muted">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {getQuestionCategory(activeQuestion.id)}
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl lg:text-4xl leading-[1.25]">
                  {activeQuestion.question}
                </h2>
              </div>
            ) : (
              <div className="animate-in fade-in duration-500">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-muted">
                  Kuis Selesai
                </div>
                <h2 className="text-4xl font-semibold tracking-tight text-ink md:text-5xl lg:text-5xl leading-[1.1]">
                  Pencapaian<br/>Luar Biasa
                </h2>
                <p className="mt-6 text-base text-muted max-w-sm font-medium">
                  Terima kasih telah mengeksplorasi dan memperdalam wawasan budaya Jawa Timur bersama VAST.
                </p>
              </div>
            )}
          </div>

          <div className="mt-16 flex items-center justify-between text-sm font-medium text-muted">
            <div>
              Soal <span className="text-ink font-semibold">{activeIndex + (isComplete ? 0 : 1)}</span> dari {questions.length}
            </div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-border"></span>
              Skor: <span className="text-ink font-semibold">{score}</span>
            </div>
          </div>
        </section>

        {/* Right Side - Options */}
        <section className="flex w-full flex-col justify-center bg-background p-8 lg:w-1/2 lg:p-12 xl:p-14">
          {isComplete ? (
            <div className="flex flex-col items-start justify-center animate-in fade-in zoom-in-95 duration-500">
               <h3 className="text-[80px] sm:text-[100px] font-semibold tracking-tighter text-primary leading-none">
                  {Math.round((correctCount/questions.length)*100)}<span className="text-4xl text-muted">%</span>
               </h3>
               <p className="mt-6 text-lg text-ink/80 leading-relaxed font-medium">
                  Kamu berhasil menjawab <span className="font-semibold text-primary">{correctCount}</span> dari {questions.length} soal dengan benar. Total poin akhirmu adalah <span className="font-semibold text-primary">{score}</span>.
               </p>
               <div className="mt-10 flex w-full flex-col gap-3">
                  <button onClick={handleRestart} className="flex w-full items-center justify-center rounded-xl bg-primary py-4 text-sm font-semibold text-white transition-all hover:bg-secondary shadow-md hover:shadow-lg">
                    Main Lagi
                  </button>
                  <Link href="/game/quiz" className="flex w-full items-center justify-center rounded-xl border border-primary bg-surface py-4 text-sm font-semibold text-primary transition-all hover:bg-primary/10">
                    Pilih Wilayah Lain
                  </Link>
               </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
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
                    className={`group flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all duration-200 ${
                      shouldReveal && isCorrect
                        ? "border-leaf bg-leaf/10 text-leaf ring-1 ring-leaf/20"
                        : shouldReveal && isSelected
                          ? "border-secondary bg-secondary/10 text-secondary ring-1 ring-secondary/20"
                          : "border-border bg-surface hover:border-primary/40 hover:bg-surface hover:shadow-sm"
                    } ${isAnswered ? "cursor-default" : "cursor-pointer"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                        shouldReveal && isCorrect
                          ? "bg-leaf text-white"
                          : shouldReveal && isSelected
                            ? "bg-secondary text-white"
                            : "bg-background text-muted group-hover:bg-primary group-hover:text-white"
                      }`}>
                        {optionLetters[index]}
                      </div>
                      <span className={`text-base font-medium ${shouldReveal && (isCorrect || isSelected) ? "" : "text-ink"}`}>
                        {option}
                      </span>
                    </div>

                    {shouldReveal && isCorrect && (
                      <div className="text-leaf animate-in zoom-in duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>
                      </div>
                    )}
                    
                    {shouldReveal && isSelected && !isCorrect && (
                      <div className="text-secondary animate-in zoom-in duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                      </div>
                    )}
                  </button>
                );
              })}

              {isAnswered && (
                <div className="mt-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
                   <div className="rounded-2xl bg-surface p-5 ring-1 ring-border">
                     <h3 className="text-[11px] font-bold uppercase tracking-widest text-primary mb-2">
                       Penjelasan Singkat
                     </h3>
                     <p className="text-sm font-medium leading-relaxed text-muted">
                       {activeQuestion.explanation}
                     </p>
                   </div>
                   <button
                     onClick={handleNextQuestion}
                     className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-semibold text-white transition-all hover:bg-secondary shadow-md hover:shadow-lg"
                   >
                     {isLastQuestion ? "Lihat Hasil Akhir" : "Lanjut ke Soal Berikutnya"}
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                   </button>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
