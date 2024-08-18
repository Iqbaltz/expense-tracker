"use client";
import { ExpenseContext } from "@/src/context/ExpenseContext";
import { IncomeContext } from "@/src/context/IncomeContext";
import { formatDate } from "@/src/helper/formatDate";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useContext } from "react";

export default function PaginationChart() {
  const {
    start,
    end,
    handlePrevious: handlePreviousExpense,
    handleNext: handleNextExpense,
  } = useContext(ExpenseContext);
  const { handleNext: handleNextIncome, handlePrevious: handlePreviousIncome } =
    useContext(IncomeContext);

  const onClickNext = () => {
    handleNextIncome();
    handleNextExpense();
  };

  const onClickPrev = () => {
    handlePreviousIncome();
    handlePreviousExpense();
  };

  return (
    <div className="flex justify-center mb-4 join">
      <button className="btn join-item" onClick={onClickPrev}>
        <ArrowLeft />
      </button>
      <button className="btn join-item">
        <span>
          {formatDate(start)} - {formatDate(end)}
        </span>
      </button>
      <button className="btn join-item" onClick={onClickNext}>
        <ArrowRight />
      </button>
    </div>
  );
}
