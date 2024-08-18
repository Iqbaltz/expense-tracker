"use client";
import React, { createContext, useEffect, useState } from "react";
import { ExpenseEntity } from "../entity/ExpenseEntity";
import { filterdataBetweenDate } from "../helper/filterdataBetweenDate";

interface ExpenseContextType {
  expenses: ExpenseEntity[];
  filteredExpenses: ExpenseEntity[];
  setExpenses: (expenses: ExpenseEntity[]) => void;
  addExpense: (newExpense: ExpenseEntity) => void;
  getExpensesById: (id: number) => ExpenseEntity | undefined;
  updateExpense: (updatedExpense: ExpenseEntity) => void;
  removeExpense: (id: number) => void;
  start: Date;
  end: Date;
  handlePrevious: () => void;
  handleNext: () => void;
}

export const ExpenseContext = createContext<ExpenseContextType>({
  expenses: [],
  filteredExpenses: [],
  setExpenses: () => {},
  addExpense: () => {},
  getExpensesById: () => undefined,
  updateExpense: () => {},
  removeExpense: () => {},
  start: new Date(),
  end: new Date(),
  handlePrevious: () => {},
  handleNext: () => {},
});

const getWeekRange = (current: Date) => {
  const start = new Date(current.setDate(current.getDate() - current.getDay()));
  const end = new Date(start.getTime());
  end.setDate(end.getDate() + 6);
  return { start, end };
};

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [expenses, setExpenses] = useState<ExpenseEntity[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filteredExpenses, setFilteredExpenses] = useState<ExpenseEntity[]>([]);
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  useEffect(() => {
    const { start, end } = getWeekRange(currentDate);
    setStart(start);
    setEnd(end);
    console.log("startt", start);
  }, [currentDate]);

  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    if (storedExpenses) {
      const parsedExpenses = JSON.parse(storedExpenses);
      setExpenses(parsedExpenses);
      setFilteredExpenses(filterdataBetweenDate(parsedExpenses, start, end));
    }
  }, []);

  useEffect(() => {
    setFilteredExpenses(filterdataBetweenDate(expenses, start, end));
  }, [start, end, expenses]);

  const addExpense = (newExpense: ExpenseEntity) => {
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    setFilteredExpenses(filterdataBetweenDate(updatedExpenses, start, end));
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

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
    setExpenses(updatedExpenses);
    setFilteredExpenses(filterdataBetweenDate(updatedExpenses, start, end));
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  const getExpensesById = (id: number) => {
    return expenses.find((expense) => expense.id === id);
  };

  const handlePrevious = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 7);
      console.log("newDtae", newDate);
      return newDate;
    });
    console.log("handle previous expense", currentDate);
  };

  const handleNext = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 7);
      return newDate;
    });
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
        getExpensesById,
        start,
        end,
        handlePrevious,
        handleNext,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
