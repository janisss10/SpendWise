import { useState } from "react";

import { Button, MenuItem, Stack, TextField } from "@mui/material";

import type { Expense } from "../../types/expense";

interface ExpenseFormProps {
  onSubmit: (expense: Expense) => void;
  onCancel: () => void;
}

function ExpenseForm({ onSubmit, onCancel }: ExpenseFormProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{
    title?: string;
    amount?: string;
    date?: string;
  }>({});

  const handleSubmit = () => {
    const newErrors: {
      title?: string;
      amount?: string;
      date?: string;
    } = {};

    if (!title.trim()) {
      newErrors.title = "Please enter an expense name.";
    }

    if (!amount) {
      newErrors.amount = "Please enter an amount.";
    } else if (Number(amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0.";
    }

    if (!date) {
      newErrors.date = "Please select a date.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newExpense: Expense = {
      id: crypto.randomUUID(),
      title: title.trim(),
      amount: Number(amount),
      category,
      date,
      description: description.trim(),
    };

    onSubmit(newExpense);
  };

  return (
    <Stack spacing={2}>
      <TextField
        label="Expense name"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);

          if (errors.title) {
            setErrors((current) => ({
              ...current,
              title: undefined,
            }));
          }
        }}
        error={Boolean(errors.title)}
        helperText={errors.title}
        fullWidth
      />

      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(event) => {
          const value = event.target.value;
          if (Number(value) < 0) {
            return;
          }
          setAmount(value);
          if (errors.amount) {
            setErrors((current) => ({
              ...current,
              amount: undefined,
            }));
          }
        }}
        error={Boolean(errors.amount)}
        helperText={errors.amount}
        slotProps={{
          htmlInput: {
            min: 0,
            step: 0.01,
          },
        }}
        fullWidth
      />

      <TextField
        select
        label="Category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        fullWidth
      >
        <MenuItem value="Food">Food</MenuItem>

        <MenuItem value="Transport">Transport</MenuItem>

        <MenuItem value="Shopping">Shopping</MenuItem>

        <MenuItem value="Entertainment">Entertainment</MenuItem>
      </TextField>

      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(event) => {
          setDate(event.target.value);

          if (errors.date) {
            setErrors((current) => ({
              ...current,
              date: undefined,
            }));
          }
        }}
        error={Boolean(errors.date)}
        helperText={errors.date}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        fullWidth
      />

      <TextField
        label="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        multiline
        rows={3}
        fullWidth
      />

      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "flex-end",
        }}
      >
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>

        <Button variant="contained" onClick={handleSubmit}>
          Add expense
        </Button>
      </Stack>
    </Stack>
  );
}

export default ExpenseForm;
