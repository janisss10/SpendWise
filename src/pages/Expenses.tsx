import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import ExpenseList from "../components/expenses/ExpenseList";
import { mockExpenses } from "../data/mockExpenses";
import { useMemo, useState } from "react";
import ExpenseToolbar from "../components/expenses/ExpenseToolbar";
import ExpenseForm from "../components/expenses/ExpenseForm";
import type { Expense } from "../types/expense";
import { createExpense } from "../services/expenseService";

function Expenses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [expenses, setExpenses] = useState(mockExpenses);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [deletingExpense, setDeletingExpense] = useState<Expense | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const filteredExpenses = useMemo(() => {
    const filtered = expenses.filter((expense) => {
      const matchesSearch =
        expense.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expense.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        category === "all" || expense.category === category;

      return matchesSearch && matchesCategory;
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "date-asc":
          return a.date.localeCompare(b.date);

        case "amount-desc":
          return b.amount - a.amount;

        case "amount-asc":
          return a.amount - b.amount;

        case "date-desc":
        default:
          return b.date.localeCompare(a.date);
      }
    });
  }, [expenses, searchQuery, category, sortBy]);

  return (
    <Stack spacing={3}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h4">Expenses</Typography>

          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Manage and track your spending.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setIsFormOpen(true)}
          sx={{
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Add expense
        </Button>
      </Box>

      <ExpenseToolbar
        searchQuery={searchQuery}
        category={category}
        sortBy={sortBy}
        onSearchChange={setSearchQuery}
        onCategoryChange={setCategory}
        onSortChange={setSortBy}
      />

      <ExpenseList
        expenses={filteredExpenses}
        onEdit={(expense) => {
          setEditingExpense(expense);
        }}
        onDelete={(expense) => {
          setDeletingExpense(expense);
        }}
      />

      <Dialog
        open={isFormOpen || editingExpense !== null}
        onClose={() => {
          setIsFormOpen(false);
          setEditingExpense(null);
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editingExpense ? "Edit Expense" : "Add Expense"}
        </DialogTitle>

        <DialogContent>
          <ExpenseForm
            expense={editingExpense ?? undefined}
            onSubmit={async (updatedExpense) => {
              if (editingExpense) {
                setExpenses((currentExpenses) =>
                  currentExpenses.map((expense) =>
                    expense.id === updatedExpense.id ? updatedExpense : expense,
                  ),
                );

                setEditingExpense(null);

                setSnackbar({
                  open: true,
                  message: "Expense updated successfully",
                });
              } else {
                try {
                  const firestoreId = await createExpense(updatedExpense);

                  const expenseWithId = {
                    ...updatedExpense,
                    id: firestoreId,
                  };

                  setExpenses((currentExpenses) => [
                    expenseWithId,
                    ...currentExpenses,
                  ]);

                  setIsFormOpen(false);

                  setSnackbar({
                    open: true,
                    message: "Expense added successfully",
                  });
                } catch (error) {
                  console.error("Failed to add expense:", error);

                  setSnackbar({
                    open: true,
                    message: "Failed to add expense",
                  });
                }
              }
            }}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingExpense(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={deletingExpense !== null}
        onClose={() => setDeletingExpense(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete expense?</DialogTitle>

        <DialogContent>
          <Stack spacing={2}>
            <Typography color="text.secondary">
              Are you sure you want to delete{" "}
              <strong>{deletingExpense?.title}</strong>? This action cannot be
              undone.
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              sx={{
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="outlined"
                onClick={() => setDeletingExpense(null)}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  if (!deletingExpense) {
                    return;
                  }

                  setExpenses((currentExpenses) =>
                    currentExpenses.filter(
                      (expense) => expense.id !== deletingExpense.id,
                    ),
                  );

                  setDeletingExpense(null);

                  setSnackbar({
                    open: true,
                    message: "Expense deleted successfully",
                  });
                }}
              >
                Delete
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar((current) => ({
            ...current,
            open: false,
          }))
        }
        message={snackbar.message}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      />
    </Stack>
  );
}

export default Expenses;
