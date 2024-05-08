"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";

type Props = {
  handlePrevious: () => void;
  handleNext: () => void;
  start: Date;
  end: Date;
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", { day: "2-digit", month: "short" });
};

export default function PaginationChart({
  handleNext,
  handlePrevious,
  start,
  end,
}: Props) {
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
