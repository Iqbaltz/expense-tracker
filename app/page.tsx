"use client";
import CategoryPercentage from "./components/category-percentage/CategoryPercentage";
import Link from "next/link";
import ExpenseChart from "./components/expense-chart/ExpenseChart";
import PaginationChart from "./components/pagination-chart/PaginationChart";
import ExpenseList from "./components/expense-list/ExpenseList";
import { MinusCircle, PlusCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col justify-between items-center p-4 md:p-24 min-h-screen">
      <div className="w-full max-w-5xl">
        <h1 className="mb-8 text-xl">Expense Tracker</h1>
        <ExpenseChart />
        <PaginationChart />
        <CategoryPercentage />
        <div className="flex justify-center gap-4 mt-4">
          <Link href={"/income"}>
            <button className="text-white btn btn-success">
              <PlusCircle />
              Pendapatan
            </button>
          </Link>
          <Link href={"/expense"}>
            <button className="text-white btn btn-error">
              <MinusCircle />
              Pengeluaran
            </button>
          </Link>
        </div>
        <ExpenseList />
      </div>
    </main>
  );
}
