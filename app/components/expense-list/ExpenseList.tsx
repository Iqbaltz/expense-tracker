import { ExpenseContext } from "@/src/context/ExpenseContext";
import { numberToRupiah } from "@/src/helper/numberToRupiah";
import { renderDateText } from "@/src/helper/renderDateText";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import React, { useContext, useState } from "react";

export default function ExpenseList() {
  const { filteredExpenses: expenses, removeExpense } =
    useContext(ExpenseContext);
  const [selectedExpenseId, setSelectedExpenseId] = useState<number | null>();

  const handleOpenModal = (expenseId: number) => {
    (document?.getElementById("my_modal_1") as any)?.showModal();
    setSelectedExpenseId(expenseId);
  };

  const handleDeleteExpense = () => {
    removeExpense(selectedExpenseId!);
    (document?.getElementById("my_modal_1") as any)?.close();
  };

  return (
    <div className="overflow-x-auto mt-4">
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
                <td className="text-right">{numberToRupiah(expense.amount)}</td>
                <td>
                  <div className="flex gap-1 justify-end">
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
              <td colSpan={5} className="text-center py-8 opacity-50">
                No expenses this week
              </td>
            </tr>
          )}
        </tbody>
      </table>

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
