"use client";
import { filterdataBetweenDate } from "@/src/helper/filterdataBetweenDate";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const initialTemplateData = [
  { date: "Sunday", amount: 0 },
  { date: "Monday", amount: 0 },
  { date: "Tuesday", amount: 0 },
  { date: "Wednesday", amount: 0 },
  { date: "Thursday", amount: 0 },
  { date: "Friday", amount: 0 },
  { date: "Saturday", amount: 0 },
];

type ExpenseEntity = {
  date: string;
  amount: number;
};

type Props = {
  start: Date;
  end: Date;
};

export default function ExpenseChart({ start, end }: Props) {
  const [expenses, setExpenses] = useState<ExpenseEntity[]>([]);
  const [aggregatedData, setAggregatedData] = useState([
    ...initialTemplateData,
  ]);

  useEffect(() => {
    const localData = localStorage.getItem("expenses")
      ? JSON.parse(localStorage.getItem("expenses")!)
      : [];

    const filteredExpenses = filterdataBetweenDate(localData, start, end);
    setExpenses(filteredExpenses);
  }, [start, end]);

  useEffect(() => {
    const aggregateExpensesByDate = (expenses: ExpenseEntity[]) => {
      const aggregatedExpenses: { [key: string]: number } = {};

      for (const expense of expenses) {
        const dateKey = new Date(expense.date).toLocaleDateString("en-US", {
          weekday: "long",
        });

        if (aggregatedExpenses[dateKey]) {
          aggregatedExpenses[dateKey] += expense.amount;
        } else {
          aggregatedExpenses[dateKey] = expense.amount;
        }
      }

      const newAggregatedData = initialTemplateData.map((day) => ({
        ...day,
        amount: aggregatedExpenses[day.date] || 0,
      }));

      return newAggregatedData;
    };

    const newData = aggregateExpensesByDate(expenses);
    setAggregatedData(newData);
  }, [expenses]);

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={aggregatedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="amount"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
