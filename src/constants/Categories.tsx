export const Categories = [
  "Food",
  "Transport",
  "Entertainment",
  "Health",
  "Shopping",
  "Education",
  "Other",
] as const;

export type CategoriesEntity =
  | "Food"
  | "Transport"
  | "Entertainment"
  | "Health"
  | "Shopping"
  | "Education"
  | "Other";
