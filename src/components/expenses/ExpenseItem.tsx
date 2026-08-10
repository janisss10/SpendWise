import { Box, Chip, IconButton, Stack, Typography } from "@mui/material";

import { DeleteOutlined, EditOutlined } from "@mui/icons-material";

import type { Expense } from "../../types/expense";

interface ExpenseItemProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
}

function ExpenseItem({ expense, onEdit }: ExpenseItemProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        py: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack spacing={0.5}>
        <Typography>{expense.title}</Typography>

        <Typography variant="body2" color="text.secondary">
          {expense.description}
        </Typography>
      </Stack>

      <Stack direction="row" sx={{ alignItems: "center" }} spacing={3}>
        <Chip label={expense.category} size="small" />

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ minWidth: 90 }}
        >
          {expense.date}
        </Typography>

        <Typography sx={{ minWidth: 80, textAlign: "right" }}>
          ${expense.amount.toFixed(2)}
        </Typography>

        <IconButton size="small" onClick={() => onEdit(expense)}>
          <EditOutlined fontSize="small" />
        </IconButton>

        <IconButton size="small">
          <DeleteOutlined fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  );
}

export default ExpenseItem;
