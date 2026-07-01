export type RegionCategory =
  | "pesisir"
  | "pegunungan"
  | "budaya"
  | "kuliner"
  | "batik"
  | "destinasi"
  | "showcase";

export type RegionType = "kota" | "kabupaten";

export type ContentSource = {
  label: string;
  url?: string;
  note?: string;
};

export type ImageAsset = {
  src: string;
  alt: string;
  caption?: string;
  source?: ContentSource;
};

export type Region = {
  id: string;
  name: string;
  slug: string;
  type: RegionType;
  categories: RegionCategory[];
  tagline: string;
  summary: string;
  nickname?: string;
  dialect?: string;
  population?: string;
  area?: string;
  heroImage?: ImageAsset;
  thumbnailImage?: ImageAsset;
  cultureHighlights: string[];
  foods: string[];
  destinations: string[];
  uniqueFacts: string[];
  foodIds: string[];
  destinationIds: string[];
  batikPatternIds: string[];
  heritageItemIds: string[];
  isFeatured: boolean;
  sourceNotes: ContentSource[];
};

export type HeritageCategory =
  | "seni"
  | "tradisi"
  | "bahasa"
  | "ikon"
  | "sejarah"
  | "batik"
  | "festival"
  | "lainnya";

export type HeritageItem = {
  id: string;
  regionSlug: string;
  name: string;
  category: HeritageCategory;
  description: string;
  image?: ImageAsset;
  source?: ContentSource;
};

export type FoodItem = {
  id: string;
  regionSlug: string;
  name: string;
  description: string;
  image?: ImageAsset;
  tags: string[];
  source?: ContentSource;
};

export type DestinationType =
  | "alam"
  | "sejarah"
  | "budaya"
  | "religi"
  | "kota"
  | "lainnya";

export type DestinationItem = {
  id: string;
  regionSlug: string;
  name: string;
  type: DestinationType;
  description: string;
  image?: ImageAsset;
  source?: ContentSource;
};

export type BatikPattern = {
  id: string;
  regionSlug: string;
  name: string;
  description: string;
  inspiration?: string;
  colors: string[];
  image?: ImageAsset;
  source?: ContentSource;
};

export type QuizDifficulty = "easy" | "medium" | "hard";

export type QuizQuestion = {
  id: string;
  regionSlug?: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: QuizDifficulty;
};

export type MatchingCategory = "food" | "batik" | "destination" | "culture";

export type MatchingGameItem = {
  id: string;
  regionSlug: string;
  leftLabel: string;
  rightLabel: string;
  category: MatchingCategory;
  explanation?: string;
};

export type PuzzleDifficulty = "easy" | "medium" | "hard";

export type PuzzleItem = {
  id: string;
  regionSlug: string;
  title: string;
  image: ImageAsset;
  gridSize: number;
  difficulty: PuzzleDifficulty;
};
