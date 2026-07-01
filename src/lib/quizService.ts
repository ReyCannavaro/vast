import { quizQuestions } from "@/data/quizQuestions";
import type { QuizDifficulty, QuizQuestion } from "@/types/region";

export type QuizQuestionCategory =
  | "culture"
  | "food"
  | "destination"
  | "batik"
  | "general";

export type QuizQuestionFilters = {
  regionSlug?: string;
  difficulty?: QuizDifficulty;
  category?: QuizQuestionCategory;
  keyword?: string;
};

export type QuizRoundOptions = QuizQuestionFilters & {
  limit?: number;
  seed?: string;
};

export type QuizAnswerInput = {
  questionId: string;
  answer: string;
};

export type QuizAnswerResult = {
  question: QuizQuestion;
  selectedAnswer: string | null;
  isAnswered: boolean;
  isCorrect: boolean;
  correctAnswer: string;
};

export type QuizScoreResult = {
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  unansweredQuestions: number;
  scorePercentage: number;
  results: QuizAnswerResult[];
};

function normalizeAnswer(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

function getStableHash(value: string) {
  return [...value].reduce((hash, character) => {
    return (hash * 31 + character.charCodeAt(0)) >>> 0;
  }, 0);
}

function deterministicShuffle(questions: QuizQuestion[], seed: string) {
  return [...questions].sort((firstQuestion, secondQuestion) => {
    const firstHash = getStableHash(`${seed}:${firstQuestion.id}`);
    const secondHash = getStableHash(`${seed}:${secondQuestion.id}`);

    return firstHash - secondHash;
  });
}

export function getQuizQuestionCategory(
  question: Pick<QuizQuestion, "id">,
): QuizQuestionCategory {
  if (question.id.startsWith("quiz-culture-")) {
    return "culture";
  }

  if (question.id.startsWith("quiz-food-")) {
    return "food";
  }

  if (question.id.startsWith("quiz-destination-")) {
    return "destination";
  }

  if (question.id.startsWith("quiz-batik-")) {
    return "batik";
  }

  return "general";
}

export function getQuizQuestions() {
  return quizQuestions;
}

export function getQuizQuestionById(questionId: string) {
  return quizQuestions.find((question) => question.id === questionId) ?? null;
}

export function getQuizQuestionsByRegion(regionSlug: string) {
  return quizQuestions.filter((question) => question.regionSlug === regionSlug);
}

export function getQuizQuestionsByDifficulty(difficulty: QuizDifficulty) {
  return quizQuestions.filter((question) => question.difficulty === difficulty);
}

export function getQuizQuestionsByCategory(category: QuizQuestionCategory) {
  return quizQuestions.filter((question) => getQuizQuestionCategory(question) === category);
}

export function filterQuizQuestions(filters: QuizQuestionFilters = {}) {
  const normalizedKeyword = filters.keyword?.trim().toLowerCase();

  return quizQuestions.filter((question) => {
    if (filters.regionSlug && question.regionSlug !== filters.regionSlug) {
      return false;
    }

    if (filters.difficulty && question.difficulty !== filters.difficulty) {
      return false;
    }

    if (filters.category && getQuizQuestionCategory(question) !== filters.category) {
      return false;
    }

    if (!normalizedKeyword) {
      return true;
    }

    const searchableText = [
      question.id,
      question.regionSlug,
      question.question,
      ...question.options,
      question.correctAnswer,
      question.explanation,
      question.difficulty,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedKeyword);
  });
}

export function getQuizQuestionsForRound(options: QuizRoundOptions = {}) {
  const filteredQuestions = filterQuizQuestions(options);
  const orderedQuestions = options.seed
    ? deterministicShuffle(filteredQuestions, options.seed)
    : filteredQuestions;

  if (!options.limit || options.limit <= 0) {
    return orderedQuestions;
  }

  return orderedQuestions.slice(0, options.limit);
}

export function isCorrectQuizAnswer(question: QuizQuestion, answer: string) {
  return normalizeAnswer(question.correctAnswer) === normalizeAnswer(answer);
}

export function calculateQuizScore(
  answers: QuizAnswerInput[],
  questions: QuizQuestion[] = quizQuestions,
): QuizScoreResult {
  const answerByQuestionId = new Map(
    answers.map((answer) => [answer.questionId, answer.answer]),
  );

  const results = questions.map((question): QuizAnswerResult => {
    const selectedAnswer = answerByQuestionId.get(question.id) ?? null;
    const isAnswered = selectedAnswer !== null && selectedAnswer.trim().length > 0;

    return {
      question,
      selectedAnswer,
      isAnswered,
      isCorrect: isAnswered ? isCorrectQuizAnswer(question, selectedAnswer) : false,
      correctAnswer: question.correctAnswer,
    };
  });

  const correctAnswers = results.filter((result) => result.isCorrect).length;
  const answeredQuestions = results.filter((result) => result.isAnswered).length;
  const totalQuestions = questions.length;

  return {
    totalQuestions,
    answeredQuestions,
    correctAnswers,
    wrongAnswers: answeredQuestions - correctAnswers,
    unansweredQuestions: totalQuestions - answeredQuestions,
    scorePercentage:
      totalQuestions === 0 ? 0 : Math.round((correctAnswers / totalQuestions) * 100),
    results,
  };
}
