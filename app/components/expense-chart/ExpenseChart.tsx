"use client";
import { ExpenseEntity } from "@/src/entity/ExpenseEntity";
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

const templateData = [
  {
    date: "Monday",
    amount: 0,
  },
  {
    date: "Tuesday",
    amount: 0,
  },
  {
    date: "Wednesday",
    amount: 0,
  },
  {
    date: "Thursday",
    amount: 0,
  },
  {
    date: "Friday",
    amount: 0,
  },
  {
    date: "Saturday",
    amount: 0,
  },
  {
    date: "Sunday",
    amount: 0,
  },
];

export default function ExpenseChart() {
  const [data, setdata] = useState([] as ExpenseEntity[]);

  useEffect(() => {
    const localData = localStorage?.getItem("expenses")
      ? JSON.parse(localStorage?.getItem("expenses")!)
      : null;

    if (localData) {
      setdata(localData);
    }
  }, []);

  const renderData = data.map((item) => {
    return {
      amount: item.amount,
      //get day name from date
      date: new Date(item.date).toLocaleDateString("en-US", {
        weekday: "long",
      }),
    };
  });

  // fill the templateData with the data
  renderData.forEach((item) => {
    const index = templateData.findIndex(
      (templateItem) => templateItem.date === item.date
    );
    if (index !== -1) {
      templateData[index].amount = item.amount;
    }
  });

  function aggregateExpensesByDate(
    expenses: ExpenseEntity[]
  ): { date: string; totalAmount: number }[] {
    const aggregatedExpenses: { [date: string]: number } = {};

    // Iterate through each expense
    for (const expense of expenses) {
      // Extract the date and amount from the current expense
      const { date, amount } = expense;

      // Convert the date to a string without time (YYYY-MM-DD format)
      const dateKey = date.slice(0, 10);

      // If the date already exists in the aggregatedExpenses object, add the amount to it
      if (aggregatedExpenses[dateKey]) {
        aggregatedExpenses[dateKey] += amount;
      } else {
        // If the date doesn't exist, create a new entry with the amount
        aggregatedExpenses[dateKey] = amount;
      }
    }

    // Convert the aggregatedExpenses object to an array of objects with date and totalAmount
    const result = Object.keys(aggregatedExpenses).map((date) => ({
      date,
      totalAmount: aggregatedExpenses[date],
    }));

    return result;
  }

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={templateData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="1 1" />
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
