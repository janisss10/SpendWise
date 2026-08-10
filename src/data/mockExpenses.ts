import type { Expense } from "../types/expense";

export const mockExpenses: Expense[] = [
  {
    id: "1",
    title: "Dinner",
    amount: 24.5,
    category: "Food",
    date: "2026-08-09",
  },
  {
    id: "2",
    title: "Grab",
    amount: 12,
    category: "Transport",
    date: "2026-08-08",
  },
  {
    id: "3",
    title: "Uniqlo",
    amount: 89.9,
    category: "Shopping",
    date: "2026-08-07",
  },
  {
    id: "4",
    title: "Netflix",
    amount: 17.98,
    category: "Entertainment",
    date: "2026-08-05",
  },
  {
    id: "5",
    title: "Grocery shopping",
    amount: 75.2,
    category: "Food",
    date: "2026-08-04",
  },
];
