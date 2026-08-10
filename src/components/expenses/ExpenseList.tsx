import { Card, CardContent, Stack, Typography } from "@mui/material";

import type { Expense } from "../../types/expense";
import ExpenseItem from "./ExpenseItem";

interface ExpenseListProps {
  expenses: Expense[];
}

function ExpenseList({ expenses }: ExpenseListProps) {
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h6">All Expenses</Typography>

          {expenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ExpenseList;
