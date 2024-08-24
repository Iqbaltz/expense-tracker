"use client";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { IncomeEntity } from "../entity/IncomeEntity";
import { filterdataBetweenDate } from "../helper/filterdataBetweenDate";

interface IncomeContextType {
  incomes: IncomeEntity[];
  filteredIncomes: IncomeEntity[];
  setIncomes: (incomes: IncomeEntity[]) => void;
  addIncome: (newIncome: IncomeEntity) => void;
  getIncomeById: (id: number) => IncomeEntity | undefined;
  updateIncome: (updatedIncome: IncomeEntity) => void;
  removeIncome: (id: number) => void;
  start: Date;
  end: Date;
  handlePrevious: () => void;
  handleNext: () => void;
}

export const IncomeContext = createContext<IncomeContextType>({
  incomes: [],
  filteredIncomes: [],
  setIncomes: () => {},
  addIncome: () => {},
  getIncomeById: () => undefined,
  updateIncome: () => {},
  removeIncome: () => {},
  start: new Date(),
  end: new Date(),
  handlePrevious: () => {},
  handleNext: () => {},
});

const getWeekRange = (current: Date) => {
  const start = new Date(current.setDate(current.getDate() - current.getDay()));
  start.setHours(0, 0, 0, 0); // Set start time to 00:00:00

  const end = new Date(start.getTime());
  end.setDate(end.getDate() + 6);
  end.setHours(0, 0, 0, 0); // Set end time to 00:00:00

  return { start, end };
};

export const IncomeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [incomes, setIncomes] = useState<IncomeEntity[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filteredIncomes, setFilteredIncomes] = useState<IncomeEntity[]>([]);

  const { start, end } = useMemo(
    () => getWeekRange(currentDate),
    [currentDate]
  );

  useEffect(() => {
    const storedIncomes = localStorage.getItem("incomes");
    if (storedIncomes) {
      const parsedIncomes = JSON.parse(storedIncomes);
      setIncomes(parsedIncomes);
      console.log("incomes", parsedIncomes);
      setFilteredIncomes(filterdataBetweenDate(parsedIncomes, start, end));
      console.log("start", start);
      console.log("end", end);
    }
  }, []);

  useEffect(() => {
    setFilteredIncomes(filterdataBetweenDate(incomes, start, end));
  }, [start, end, incomes]);

  const addIncome = (newIncome: IncomeEntity) => {
    const updatedIncomes = [...incomes, newIncome];
    setIncomes(updatedIncomes);
    setFilteredIncomes(filterdataBetweenDate(updatedIncomes, start, end));
    localStorage.setItem("incomes", JSON.stringify(updatedIncomes));
  };

  const updateIncome = (updatedIncome: IncomeEntity) => {
    const updatedIncomes = incomes.map((income) =>
      income.id === updatedIncome.id ? updatedIncome : income
    );
    setIncomes(updatedIncomes);
    setFilteredIncomes(filterdataBetweenDate(updatedIncomes, start, end));
    localStorage.setItem("incomes", JSON.stringify(updatedIncomes));
  };

  const removeIncome = (id: number) => {
    const updatedIncomes = incomes.filter((income) => income.id !== id);
    setIncomes(updatedIncomes);
    setFilteredIncomes(filterdataBetweenDate(updatedIncomes, start, end));
    localStorage.setItem("incomes", JSON.stringify(updatedIncomes));
  };

  const getIncomeById = (id: number) => {
    return incomes.find((income) => income.id === id);
  };

  const handlePrevious = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 7);
      return newDate;
    });
  };

  const handleNext = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 7);
      return newDate;
    });
  };

  return (
    <IncomeContext.Provider
      value={{
        incomes,
        filteredIncomes,
        setIncomes,
        addIncome,
        updateIncome,
        removeIncome,
        getIncomeById,
        start,
        end,
        handlePrevious,
        handleNext,
      }}
    >
      {children}
    </IncomeContext.Provider>
  );
};
