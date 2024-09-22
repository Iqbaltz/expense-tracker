"use client";
import { ExpenseContext } from "@/src/context/ExpenseContext";
import { IncomeContext } from "@/src/context/IncomeContext";
import { IncomeEntity } from "@/src/entity/IncomeEntity";
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
  { date: "Sunday", income: 0, expense: 0 },
  { date: "Monday", income: 0, expense: 0 },
  { date: "Tuesday", income: 0, expense: 0 },
  { date: "Wednesday", income: 0, expense: 0 },
  { date: "Thursday", income: 0, expense: 0 },
  { date: "Friday", income: 0, expense: 0 },
  { date: "Saturday", income: 0, expense: 0 },
];

type ExpenseEntity = {
  date: string;
  amount: number;
};

export default function ExpenseChart() {
  const { filteredExpenses: expenses } = useContext(ExpenseContext);
  const { filteredIncomes: incomes } = useContext(IncomeContext);
  const [aggregatedData, setAggregatedData] = useState<any>([
    ...initialTemplateData,
  ]);

  console.log("filteredIncomes", incomes);

  useEffect(() => {
    const aggregateExpensesByDate = (
      expenses: ExpenseEntity[],
      incomes: IncomeEntity[]
    ) => {
      const aggregatedExpenses: { [key: string]: number } = {};
      const aggregatedIncomes: { [key: string]: number } = {};

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

      for (const income of incomes) {
        const dateKey = new Date(income.date).toLocaleDateString("en-US", {
          weekday: "long",
        });

        if (aggregatedIncomes[dateKey]) {
          aggregatedIncomes[dateKey] += income.amount;
        } else {
          aggregatedIncomes[dateKey] = income.amount;
        }
      }

      const newAggregatedData = initialTemplateData.map((day) => ({
        ...day,
        expense: aggregatedExpenses[day?.date!] || 0,
        income: aggregatedIncomes[day?.date!] || 0,
      }));

      return newAggregatedData;
    };

    const newData = aggregateExpensesByDate(expenses, incomes);
    setAggregatedData(newData);
  }, [expenses, incomes]);

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
        <div className="bg-white shadow-lg p-2 rounded-md text-primary">
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={formatXAxis} minTickGap={0} />
          <YAxis tickFormatter={formatTick} width={40} />
          <Tooltip content={renderCustomTooltip} />
          <Bar
            dataKey="income"
            fill="#82ca9d"
            activeBar={<Rectangle fill="green" stroke="yellow" />}
          />
          <Bar
            dataKey="expense"
            fill="#FB8181"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
