import { addDoc, collection } from "firebase/firestore";

import { db } from "./firebase";
import type { Expense } from "../types/expense";

const expensesCollection = collection(db, "expenses");

export async function createExpense(expense: Expense) {
  const docRef = await addDoc(expensesCollection, {
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
    date: expense.date,
    description: expense.description ?? "",
  });

  return docRef.id;
}
