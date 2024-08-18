import { CategoriesEntity } from "../constants/Categories";

export interface IncomeEntity {
  id: number;
  date: string;
  amount: number;
  category: CategoriesEntity;
  notes: string;
  sync: boolean;
}
