"use client";
import { ExpenseEntity } from "@/src/entity/ExpenseEntity";
import { useEffect, useState } from "react";

export default function CategoryPercentage() {
  const [data, setdata] = useState([] as ExpenseEntity[]);

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
      percentage: Math.round((categoryAmounts[category] / totalAmount) * 100),
    }));
  }

  useEffect(() => {
    const localData = localStorage?.getItem("expenses")
      ? JSON.parse(localStorage?.getItem("expenses")!)
      : null;

    if (localData) {
      setdata(localData);
    }
  }, []);

  return (
    <div className="flex gap-2">
      {calculateCategoryPercentage(data).map((category) => (
        <div
          key={category.category}
          className={`bg-primary p-2 rounded`}
          style={{
            width: `${category.percentage}`,
          }}
        >
          {category.category}: {category.percentage}%
        </div>
      ))}
    </div>
  );
}
