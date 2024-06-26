"use client";
import { Categories, CategoriesEntity } from "@/src/constants/Categories";
import { ExpenseContext } from "@/src/context/ExpenseContext";
import { ExpenseEntity } from "@/src/entity/ExpenseEntity";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

type Props = {};

export default function EditForm({}: Props) {
  const [expense, setExpense] = useState<ExpenseEntity | void>();
  const { updateExpense, getExpensesById } = useContext(ExpenseContext);
  const router = useRouter();
  const param = useParams();
  const id = param.id as string;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const amount = formData.get("amount") as string;
    const category = formData.get("category") as CategoriesEntity;
    const notes = formData.get("notes") as string;
    const date = formData.get("date") as string;

    const newExpense: ExpenseEntity = {
      id: parseInt(id),
      date,
      amount: parseInt(amount),
      category,
      notes,
      sync: false,
    };

    updateExpense(newExpense);
    form.reset();
    router.push("/");
  }

  useEffect(() => {
    const expense = getExpensesById(parseInt(id));
    setExpense(expense);
  }, [id]);

  return (
    <form onSubmit={handleSubmit} className="card-body">
      <h1 className="card-title">Edit Expense Page</h1>
      <div className="form-control">
        <label className="label" htmlFor="amount">
          Amount
        </label>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          className="input"
          required
          defaultValue={expense?.amount}
        />
      </div>
      <div className="form-control">
        <label className="label" htmlFor="category">
          Category
        </label>
        <select className="select" name="category" required>
          <option disabled value="">
            Select Category
          </option>

          {Categories.map((category) => {
            return (
              <option
                key={category}
                selected={expense?.category == category}
                value={category}
              >
                {category}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-control">
        <label className="label" htmlFor="notes">
          Notes
        </label>
        <input
          type="text"
          className="input"
          placeholder="Notes"
          name="notes"
          defaultValue={expense?.notes}
        />
      </div>
      <div className="form-control">
        <label className="label" htmlFor="date">
          Date
        </label>
        <input
          type="date"
          name="date"
          id="date"
          required
          className="input"
          placeholder="Date"
          defaultValue={expense?.date}
        />
      </div>
      <button className="btn mt-3">Edit</button>
    </form>
  );
}
