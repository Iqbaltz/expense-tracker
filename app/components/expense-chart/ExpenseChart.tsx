"use client";
import { ExpenseContext } from "@/src/context/ExpenseContext";
import { filterdataBetweenDate } from "@/src/helper/filterdataBetweenDate";
import { numberToRupiah } from "@/src/helper/numberToRupiah";
import React, { useContext, useEffect, useState } from "react";
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

export default function ExpenseChart() {
  const { filteredExpenses: expenses } = useContext(ExpenseContext);
  const [aggregatedData, setAggregatedData] = useState([
    ...initialTemplateData,
  ]);

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

  const formatTick = (value: number) => {
    // if value is thousand then add k
    if (value >= 1000000) {
      return `${value / 1000000}M`;
    } else if (value >= 1000) {
      return `${value / 1000}k`;
    }
    return String(value);
  };

  const renderCustomTooltip = (props: any) => {
    const { active, payload } = props;

    if (active && payload && payload.length) {
      return (
        <div className="bg-white text-primary p-2 shadow-lg rounded-md">
          <p>{payload[0].payload.date}</p>
          <p>{numberToRupiah(payload[0].value)}</p>
        </div>
      );
    }

    return null;
  };

  const formatXAxis = (tickItem: string) => {
    return tickItem.slice(0, 3);
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={aggregatedData}>
          <XAxis dataKey="date" tickFormatter={formatXAxis} minTickGap={0} />
          <YAxis tickFormatter={formatTick} width={40} />
          <Tooltip content={renderCustomTooltip} />
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
