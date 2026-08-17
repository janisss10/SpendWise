import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

import {
  AccountBalanceWallet,
  CheckCircle,
  KeyboardArrowDown,
  Savings,
  TrackChanges,
  TrendingDown,
  TrendingUp,
  Warning,
} from "@mui/icons-material";
import SummaryCard from "../components/dashboard/SummaryCard";
import RecentExpenses from "../components/dashboard/RecentExpenses";
import SpendingTrendChart from "../components/dashboard/SpendingTrendChart";
import { getExpenses } from "../services/expenseService";
import type { Expense } from "../types/expense";

function Dashboard() {
  const now = new Date();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`,
  );

  const [monthMenuAnchor, setMonthMenuAnchor] = useState<null | HTMLElement>(
    null,
  );

  const selectedDate = new Date(`${selectedMonth}-01T00:00:00`);

  const previousDate = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() - 1,
    1,
  );

  const previousMonth = `${previousDate.getFullYear()}-${String(
    previousDate.getMonth() + 1,
  ).padStart(2, "0")}`;

  const selectedMonthExpenses = expenses.filter((expense) =>
    expense.date.startsWith(selectedMonth),
  );

  const previousMonthExpenses = expenses.filter((expense) =>
    expense.date.startsWith(previousMonth),
  );

  const totalSpent = selectedMonthExpenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );

  const previousMonthTotal = previousMonthExpenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );

  const spendingChange =
    previousMonthTotal === 0
      ? 0
      : ((totalSpent - previousMonthTotal) / previousMonthTotal) * 100;

  const spendingIncreased = spendingChange > 0;

  const monthlyBudget: number = 2000;

  const budgetUsedPercentage =
    monthlyBudget === 0 ? 0 : (totalSpent / monthlyBudget) * 100;

  const remaining = monthlyBudget - totalSpent;

  const remainingPercentage =
    monthlyBudget === 0 ? 0 : (remaining / monthlyBudget) * 100;

  const displayedRemainingPercentage = Math.max(remainingPercentage, 0);

  useEffect(() => {
    async function loadExpenses() {
      try {
        const firestoreExpenses = await getExpenses();
        setExpenses(firestoreExpenses);
      } catch (error) {
        console.error("Failed to load dashboard expenses:", error);
      }
    }

    loadExpenses();
  }, []);

  let budgetStatus = "You're on track";
  let budgetStatusColor = "success.main";

  if (budgetUsedPercentage > 100) {
    budgetStatus = "You've exceeded your budget";
    budgetStatusColor = "error.main";
  } else if (budgetUsedPercentage > 80) {
    budgetStatus = "You're close to your budget";
    budgetStatusColor = "warning.main";
  }

  const availableMonths = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - index, 1);

    return {
      value: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0",
      )}`,
      label: date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
    };
  });

  const selectedMonthLabel =
    availableMonths.find((month) => month.value === selectedMonth)?.label ?? "";

  return (
    <Stack
      spacing={3}
      sx={{
        maxWidth: 1400,
        mx: "auto",
        width: "100%",
      }}
    >
      <Box>
        <Button
          variant="outlined"
          endIcon={<KeyboardArrowDown />}
          onClick={(event) => setMonthMenuAnchor(event.currentTarget)}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            minWidth: 160,
          }}
        >
          {selectedMonthLabel}
        </Button>

        <Menu
          anchorEl={monthMenuAnchor}
          open={Boolean(monthMenuAnchor)}
          onClose={() => setMonthMenuAnchor(null)}
        >
          {availableMonths.map((month) => (
            <MenuItem
              key={month.value}
              selected={month.value === selectedMonth}
              onClick={() => {
                setSelectedMonth(month.value);
                setMonthMenuAnchor(null);
              }}
            >
              {month.label}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <Grid container spacing={3}>
        {/* Total Spent */}
        <Grid size={{ xs: 12, md: 4 }}>
          <SummaryCard
            title="Total Spent"
            value={`$${totalSpent.toFixed(2)}`}
            icon={<AccountBalanceWallet />}
            iconBackground="#EEE8FF"
            iconColor="#6C4DE6"
          >
            <Stack
              direction="row"
              spacing={0.5}
              sx={{
                alignItems: "center",
              }}
            >
              {spendingIncreased ? (
                <TrendingUp
                  sx={{
                    fontSize: 18,
                    color: "error.main",
                  }}
                />
              ) : (
                <TrendingDown
                  sx={{
                    fontSize: 18,
                    color: "success.main",
                  }}
                />
              )}

              <Typography
                variant="body2"
                color={spendingIncreased ? "error.main" : "success.main"}
              >
                {Math.abs(spendingChange).toFixed(1)}%
              </Typography>

              <Typography variant="body2" color="text.secondary">
                vs last month
              </Typography>
            </Stack>
          </SummaryCard>
        </Grid>

        {/* Monthly Budget */}
        <Grid size={{ xs: 12, md: 4 }}>
          <SummaryCard
            title="Monthly Budget"
            value={`$${monthlyBudget.toFixed(2)}`}
            icon={<TrackChanges />}
            iconBackground="#E3F8EF"
            iconColor="#16A66A"
          >
            <Stack spacing={1}>
              <LinearProgress
                variant="determinate"
                value={Math.min(budgetUsedPercentage, 100)}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#E8F5EF",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 4,
                    backgroundColor: "#16A66A",
                  },
                }}
              />

              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  {Math.min(budgetUsedPercentage, 100).toFixed(1)}% used
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  ${Math.max(remaining, 0).toFixed(2)} left
                </Typography>
              </Stack>
            </Stack>
          </SummaryCard>
        </Grid>

        {/* Remaining */}
        <Grid size={{ xs: 12, md: 4 }}>
          <SummaryCard
            title="Remaining"
            value={`$${remaining.toFixed(2)}`}
            icon={<Savings />}
            iconBackground="#FFF1DA"
            iconColor="#F59E0B"
          >
            <Stack spacing={0.5}>
              <Typography variant="body2" color="text.secondary">
                {budgetUsedPercentage > 100
                  ? `${budgetUsedPercentage.toFixed(1)}% of budget used`
                  : `${displayedRemainingPercentage.toFixed(1)}% of budget remaining`}
              </Typography>

              <Stack
                direction="row"
                spacing={0.5}
                sx={{
                  alignItems: "center",
                }}
              >
                {budgetUsedPercentage > 100 ? (
                  <Warning
                    sx={{
                      fontSize: 16,
                      color: budgetStatusColor,
                    }}
                  />
                ) : (
                  <CheckCircle
                    sx={{
                      fontSize: 16,
                      color: budgetStatusColor,
                    }}
                  />
                )}

                <Typography variant="body2" color={budgetStatusColor}>
                  {budgetStatus}
                </Typography>
              </Stack>
            </Stack>
          </SummaryCard>
        </Grid>
      </Grid>

      <SpendingTrendChart expenses={selectedMonthExpenses} />

      <RecentExpenses expenses={selectedMonthExpenses} />
    </Stack>
  );
}

export default Dashboard;
