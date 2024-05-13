"use client";
import { ExpenseContext } from "@/src/context/ExpenseContext";
import { formatDate } from "@/src/helper/formatDate";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useContext } from "react";

export default function PaginationChart() {
  const { start, end, handleNext, handlePrevious } = useContext(ExpenseContext);

  return (
    <div className="join flex justify-center mb-4">
      <button className="join-item btn" onClick={handlePrevious}>
        <ArrowLeft />
      </button>
      <button className="join-item btn">
        <span>
          {formatDate(start)} - {formatDate(end)}
        </span>
      </button>
      <button className="join-item btn" onClick={handleNext}>
        <ArrowRight />
      </button>
    </div>
  );
}
