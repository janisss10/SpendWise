import { Box, Button, Stack, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import ExpenseList from "../components/expenses/ExpenseList";
import { mockExpenses } from "../data/mockExpenses";
import { useMemo, useState } from "react";
import ExpenseToolbar from "../components/expenses/ExpenseToolbar";

function Expenses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");

  const filteredExpenses = useMemo(() => {
    const filtered = mockExpenses.filter((expense) => {
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
  }, [searchQuery, category, sortBy]);

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

      <ExpenseList expenses={filteredExpenses} />
    </Stack>
  );
}

export default Expenses;
