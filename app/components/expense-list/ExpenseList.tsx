import { ExpenseEntity } from "@/src/entity/ExpenseEntity";
import { filterdataBetweenDate } from "@/src/helper/filterdataBetweenDate";
import { numberToRupiah } from "@/src/helper/numberToRupiah";
import { renderDateText } from "@/src/helper/renderDateText";
import React, { useEffect, useState } from "react";

type Props = {
  start: Date;
  end: Date;
};

export default function ExpenseList({ start, end }: Props) {
  const [expenses, setExpenses] = useState<ExpenseEntity[]>([]);

  useEffect(() => {
    const localData = localStorage.getItem("expenses")
      ? JSON.parse(localStorage.getItem("expenses")!)
      : [];

    const filteredExpenses = filterdataBetweenDate(localData, start, end);
    setExpenses(filteredExpenses);
  }, [start, end]);

  console.log("expenses", expenses);
  return (
    <div className="overflow-x-auto mt-4">
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Notes</th>
            <th className="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length ? (
            expenses.map((expense) => (
              <tr key={expense.id} className="hover">
                <td>{renderDateText(new Date(expense.date))}</td>
                <td>{expense.category}</td>
                <td>{expense.notes.length ? expense.notes : "-"}</td>
                <td className="text-right">{numberToRupiah(expense.amount)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-8 opacity-50">
                No expenses this week
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
