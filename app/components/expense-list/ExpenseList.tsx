import { ExpenseContext } from "@/src/context/ExpenseContext";
import { IncomeContext } from "@/src/context/IncomeContext";
import { numberToRupiah } from "@/src/helper/numberToRupiah";
import { renderDateText } from "@/src/helper/renderDateText";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import React, { useContext, useState } from "react";

export default function ExpenseList() {
  const { filteredExpenses: expenses, removeExpense } =
    useContext(ExpenseContext);
  const { filteredIncomes: incomes, removeIncome } = useContext(IncomeContext);

  const [selectedExpenseId, setSelectedExpenseId] = useState<number | null>();
  const [isExpense, setIsExpense] = useState<boolean>(true);

  const handleOpenModal = (expenseId: number, isExpense: boolean = true) => {
    (document?.getElementById("my_modal_1") as any)?.showModal();
    setIsExpense(isExpense);
    setSelectedExpenseId(expenseId);
  };

  const handleDeleteExpense = () => {
    if (isExpense) {
      removeExpense(selectedExpenseId!);
    } else {
      removeIncome(selectedExpenseId!);
    }
    (document?.getElementById("my_modal_1") as any)?.close();
  };

  return (
    <div className="mt-4 overflow-x-auto">
      <div className="gap-4 grid grid-cols-2">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Notes</th>
              <th className="text-right">Amount</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {incomes.length ? (
              incomes.map((income) => (
                <tr key={income.id} className="hover">
                  <td>{renderDateText(new Date(income.date))}</td>
                  <td>{income.category}</td>
                  <td>{income.notes.length ? income.notes : "-"}</td>
                  <td className="text-right">
                    {numberToRupiah(income.amount)}
                  </td>
                  <td>
                    <div className="flex justify-end gap-1">
                      <Link href={`/income/${income.id}`}>
                        <Edit className="text-warning" />
                      </Link>
                      <Trash
                        onClick={() => handleOpenModal(income.id, false)}
                        className="text-error cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="opacity-50 py-8 text-center">
                  No incomes this week
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Notes</th>
              <th className="text-right">Amount</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length ? (
              expenses.map((expense) => (
                <tr key={expense.id} className="hover">
                  <td>{renderDateText(new Date(expense.date))}</td>
                  <td>{expense.category}</td>
                  <td>{expense.notes.length ? expense.notes : "-"}</td>
                  <td className="text-right">
                    {numberToRupiah(expense.amount)}
                  </td>
                  <td>
                    <div className="flex justify-end gap-1">
                      <Link href={`/expense/${expense.id}`}>
                        <Edit className="text-warning" />
                      </Link>
                      <Trash
                        onClick={() => handleOpenModal(expense.id)}
                        className="text-error cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="opacity-50 py-8 text-center">
                  No expenses this week
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Remove Item</h3>
          <p className="py-4">Are you sure you want to remove this item?</p>
          <div className="modal-action">
            <button className="btn btn-error" onClick={handleDeleteExpense}>
              Delete
            </button>
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
