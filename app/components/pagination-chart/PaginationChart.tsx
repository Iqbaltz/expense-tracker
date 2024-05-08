"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";

type Props = {};
type DateRange = {
  start: string;
  end: string;
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", { day: "2-digit", month: "short" });
};

const getWeekRange = (current: Date): DateRange => {
  const start = new Date(current.setDate(current.getDate() - current.getDay()));
  const end = new Date(start.getTime());
  end.setDate(end.getDate() + 6);
  return { start: formatDate(start), end: formatDate(end) };
};

export default function PaginationChart({}: Props) {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const { start, end } = getWeekRange(currentDate);

  const handlePrevious = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
  };

  const handleNext = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
  };

  return (
    <div className="join flex justify-center mb-4">
      <button className="join-item btn" onClick={handlePrevious}>
        <ArrowLeft />
      </button>
      <button className="join-item btn">
        <span>
          {start} - {end}
        </span>
      </button>
      <button className="join-item btn" onClick={handleNext}>
        <ArrowRight />
      </button>
    </div>
  );
}
