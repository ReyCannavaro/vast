export type RegionCategory =
  | "pesisir"
  | "pegunungan"
  | "budaya"
  | "kuliner"
  | "batik"
  | "destinasi"
  | "showcase";

export type Region = {
  id: string;
  name: string;
  slug: string;
  type: "kota" | "kabupaten";
  categories: RegionCategory[];
  tagline: string;
  summary: string;
  nickname?: string;
  dialect?: string;
  cultureHighlights: string[];
  foods: string[];
  destinations: string[];
  uniqueFacts: string[];
  isFeatured: boolean;
};
