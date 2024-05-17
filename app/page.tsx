"use client";
import CategoryPercentage from "./components/category-percentage/CategoryPercentage";
import Link from "next/link";
import ExpenseChart from "./components/expense-chart/ExpenseChart";
import PaginationChart from "./components/pagination-chart/PaginationChart";
import ExpenseList from "./components/expense-list/ExpenseList";
import { PlusCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="w-full max-w-5xl">
        <h1 className="text-xl mb-8">Expense Tracker</h1>
        <ExpenseChart />
        <PaginationChart />
        <CategoryPercentage />
        <div className="flex justify-center mt-4">
          <Link href={"/expense"}>
            <button className="btn btn-success text-white">
              <PlusCircle />
              Add Expense
            </button>
          </Link>
        </div>
        <ExpenseList />
      </div>
    </main>
  );
}
