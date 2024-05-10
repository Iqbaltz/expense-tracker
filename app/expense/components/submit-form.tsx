"use client";
import { Categories, CategoriesEntity } from "@/src/constants/Categories";
import { ExpenseEntity } from "@/src/entity/ExpenseEntity";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

export default function SubmitForm({}: Props) {
  const router = useRouter();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const amount = formData.get("amount") as string;
    const category = formData.get("category") as CategoriesEntity;
    const notes = formData.get("notes") as string;
    const date = formData.get("date") as string;

    const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");

    const newExpense: ExpenseEntity = {
      id: expenses.length + 1,
      date,
      amount: parseInt(amount),
      category,
      notes,
      sync: false,
    };

    expenses.push(newExpense);
    window?.localStorage?.setItem("expenses", JSON.stringify(expenses));
    form.reset();

    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit} className="card-body">
      <h1 className="card-title">Expense Page</h1>
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
        />
      </div>
      <div className="form-control">
        <label className="label" htmlFor="category">
          Category
        </label>
        <select className="select" name="category" required>
          <option disabled selected value="">
            Select Category
          </option>

          {Categories.map((category) => {
            return (
              <option key={category} value={category}>
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
        <input type="text" className="input" placeholder="Notes" name="notes" />
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
        />
      </div>
      <button className="btn mt-3">Add</button>
    </form>
  );
}
