import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

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

export async function getExpenses(): Promise<Expense[]> {
  const snapshot = await getDocs(expensesCollection);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    amount: doc.data().amount,
    category: doc.data().category,
    date: doc.data().date,
    description: doc.data().description ?? "",
  }));
}

export async function updateExpense(expense: Expense) {
  const expenseRef = doc(db, "expenses", expense.id);

  await updateDoc(expenseRef, {
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
    date: expense.date,
    description: expense.description ?? "",
  });
}

export async function deleteExpense(expenseId: string) {
  const expenseRef = doc(db, "expenses", expenseId);

  await deleteDoc(expenseRef);
}
