import { ExpenseEntity } from "../entity/ExpenseEntity";

export function filterdataBetweenDate(
  data: ExpenseEntity[],
  start: Date,
  end: Date
) {
  return data.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= start && itemDate <= end;
  });
}
