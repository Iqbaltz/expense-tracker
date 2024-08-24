"use client";
import { ExpenseContext } from "@/src/context/ExpenseContext";
import { IncomeContext } from "@/src/context/IncomeContext";
import { ExpenseEntity } from "@/src/entity/ExpenseEntity";
import { useContext } from "react";

export default function CategoryPercentage() {
  const { filteredExpenses: data } = useContext(ExpenseContext);
  const { filteredIncomes: incomeData } = useContext(IncomeContext);

  // function to calculate the percentage of each category
  function calculateCategoryPercentage(
    expenses: ExpenseEntity[]
  ): { category: string; percentage: number }[] {
    const totalAmount = expenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );

    const categoryAmounts: { [category: string]: number } = {};

    expenses.forEach((expense) => {
      if (!categoryAmounts[expense.category]) {
        categoryAmounts[expense.category] = 0;
      }

      categoryAmounts[expense.category] += expense.amount;
    });

    return Object.keys(categoryAmounts).map((category) => ({
      category,
      percentage: parseFloat(
        ((categoryAmounts[category] / totalAmount) * 100).toFixed(1)
      ),
    }));
  }

  return (
    <div className="gap-2 lg:gap-8 grid lg:grid-cols-2 text-sm">
      <div className="flex gap-2 w-full">
        {calculateCategoryPercentage(incomeData).map((category) => (
          <div
            key={category.category}
            className={`bg-success p-2 rounded`}
            style={{
              width: `${category.percentage}%`,
              minWidth: "160px",
            }}
          >
            {category.category}: {category.percentage}%
          </div>
        ))}
      </div>
      <div className="flex gap-2 w-full">
        {calculateCategoryPercentage(data).map((category) => (
          <div
            key={category.category}
            className={`bg-primary p-2 rounded`}
            style={{
              width: `${category.percentage}%`,
              minWidth: "160px",
            }}
          >
            {category.category}: {category.percentage}%
          </div>
        ))}
      </div>
    </div>
  );
}
