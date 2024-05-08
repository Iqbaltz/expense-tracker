import { CategoriesEntity } from "../constants/Categories";

export interface ExpenseEntity {
  id: number;
  date: string;
  amount: number;
  category: CategoriesEntity;
  notes: string;
  sync: boolean;
}
