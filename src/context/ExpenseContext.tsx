"use client";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { ExpenseEntity } from "../entity/ExpenseEntity";
import { filterdataBetweenDate } from "../helper/filterdataBetweenDate";

// Define the context shape to include expenses array and methods for updating it
interface ExpenseContextType {
  expenses: ExpenseEntity[];
  filteredExpenses: ExpenseEntity[];
  setExpenses: (expenses: ExpenseEntity[]) => void;
  addExpense: (newExpense: ExpenseEntity) => void;
  updateExpense: (updatedExpense: ExpenseEntity) => void;
  removeExpense: (id: number) => void;
  handlePrevious: () => void;
  handleNext: () => void;
  start: Date;
  end: Date;
}

// Create the ExpenseContext with initial default values
export const ExpenseContext = createContext<ExpenseContextType>({
  expenses: [],
  filteredExpenses: [],
  setExpenses: () => {},
  addExpense: () => {},
  updateExpense: () => {},
  removeExpense: () => {},
  handlePrevious: () => {},
  handleNext: () => {},
  start: new Date(),
  end: new Date(),
});

type DateRange = {
  start: Date;
  end: Date;
};

const getWeekRange = (current: Date): DateRange => {
  const start = new Date(current.setDate(current.getDate() - current.getDay()));
  const end = new Date(start.getTime());
  end.setDate(end.getDate() + 6);
  return { start, end };
};

// Create the ExpenseProvider component
export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [expenses, setExpenses] = useState<ExpenseEntity[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filteredExpenses, setFilteredExpenses] = useState<ExpenseEntity[]>([]);

  const { start, end } = useMemo(
    () => getWeekRange(currentDate),
    [currentDate]
  );

  const handlePrevious = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
  };

  const handleNext = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
  };

  // Fetch expenses data from localStorage on component mount
  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
      setFilteredExpenses(
        filterdataBetweenDate(JSON.parse(storedExpenses), start, end)
      );
    }
  }, []);

  // Filter expenses data based on the current week
  useEffect(() => {
    setFilteredExpenses(filterdataBetweenDate(expenses, start, end));
  }, [start, end, expenses]);

  const addExpense = (newExpense: ExpenseEntity) => {
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    setFilteredExpenses(filterdataBetweenDate(updatedExpenses, start, end));
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  // Helper function to update an individual expense
  const updateExpense = (updatedExpense: ExpenseEntity) => {
    const updatedExpenses = expenses.map((expense) =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    setExpenses(updatedExpenses);
    setFilteredExpenses(filterdataBetweenDate(updatedExpenses, start, end));
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  const removeExpense = (id: number) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    setExpenses(updatedExpenses);
    setFilteredExpenses(filterdataBetweenDate(updatedExpenses, start, end));
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        filteredExpenses,
        setExpenses,
        addExpense,
        updateExpense,
        removeExpense,
        handlePrevious,
        handleNext,
        start,
        end,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
