"use client";
import CategoryPercentage from "./components/category-percentage/CategoryPercentage";
import Link from "next/link";
import ExpenseChart from "./components/expense-chart/ExpenseChart";
import PaginationChart from "./components/pagination-chart/PaginationChart";
import { useState } from "react";
import ExpenseList from "./components/expense-list/ExpenseList";

type DateRange = {
  start: Date;
  end: Date;
};

const getWeekRange = (current: Date): DateRange => {
  const start = new Date(current.setDate(current.getDate() - current.getDay()));
  const end = new Date(start.getTime());
  end.setDate(end.getDate() + 6);
  return { start, end };
};

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { start, end } = getWeekRange(currentDate);

  const handlePrevious = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
  };

  const handleNext = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-5xl">
        <h1 className="text-xl mb-8">Expense Tracker</h1>
        <ExpenseChart start={start} end={end} />
        <PaginationChart
          start={start}
          end={end}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />
        <CategoryPercentage />
        <div className="flex justify-center mt-4">
          <Link href={"/expense"}>
            <button className="btn">Add Expense</button>
          </Link>
        </div>
        <ExpenseList start={start} end={end} />
      </div>
    </main>
  );
}
