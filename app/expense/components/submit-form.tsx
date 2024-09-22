"use client";
import { Categories, CategoriesEntity } from "@/src/constants/Categories";
import { ExpenseContext } from "@/src/context/ExpenseContext";
import { ExpenseEntity } from "@/src/entity/ExpenseEntity";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

type Props = {};

export default function SubmitForm({}: Props) {
  const { addExpense, expenses } = useContext(ExpenseContext);
  const router = useRouter();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const amount = formData.get("amount") as string;
    const category = formData.get("category") as CategoriesEntity;
    const notes = formData.get("notes") as string;
    const date = formData.get("date") as string;

    const newExpense: ExpenseEntity = {
      id: expenses.length ? expenses[expenses.length - 1].id + 1 : 1,
      date,
      amount: parseInt(amount),
      category,
      notes,
      sync: false,
    };

    addExpense(newExpense);
    form.reset();
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit} className="w-[90%] lg:w-[400px] card-body">
      <h1 className="card-title">Isi Pengeluaran</h1>
      <div className="form-control">
        <label className="label" htmlFor="amount">
          Jumlah
        </label>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          className="bg-accent-content/5 input"
          required
        />
      </div>
      <div className="form-control">
        <label className="label" htmlFor="category">
          Kategori
        </label>
        <select className="bg-accent-content/5 select" name="category" required>
          <option disabled selected value="">
            Pilih Kategori
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
          Catatan
        </label>
        <input
          type="text"
          className="bg-accent-content/5 input"
          placeholder="Notes"
          name="notes"
        />
      </div>
      <div className="form-control">
        <label className="label" htmlFor="date">
          Tanggal
        </label>
        <input
          type="date"
          name="date"
          id="date"
          required
          className="bg-accent-content/5 input"
          placeholder="Date"
        />
      </div>
      <button className="mt-4 text-white btn btn-error">Tambah</button>
    </form>
  );
}
