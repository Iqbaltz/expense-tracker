import CategoryPercentage from "./components/category-percentage/CategoryPercentage";
import Link from "next/link";
import ExpenseChart from "./components/expense-chart/ExpenseChart";
import PaginationChart from "./components/pagination-chart/PaginationChart";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-5xl">
        <h1 className="text-xl mb-8">Expense Tracker</h1>

        <ExpenseChart />
        <PaginationChart />
        <CategoryPercentage />
        <div className="flex justify-center mt-4">
          <Link href={"/expense"}>
            <button className="btn">Add Expense</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
