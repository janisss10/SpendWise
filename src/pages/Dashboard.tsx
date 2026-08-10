import {
  Box,
  Button,
  Grid,
  LinearProgress,
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
} from "@mui/icons-material";
import SummaryCard from "../components/dashboard/SummaryCard";
import RecentExpenses from "../components/dashboard/RecentExpenses";
import { mockExpenses } from "../data/mockExpenses";
import SpendingTrendChart from "../components/dashboard/SpendingTrendChart";

function Dashboard() {
  const totalSpent = mockExpenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );
  const previousMonthTotal = 250;
  const spendingChange =
    ((totalSpent - previousMonthTotal) / previousMonthTotal) * 100;
  const spendingIncreased = spendingChange > 0;

  const monthlyBudget = 2000;
  const budgetUsedPercentage = (totalSpent / monthlyBudget) * 100;

  const remaining = monthlyBudget - totalSpent;
  const remainingPercentage = 100 - budgetUsedPercentage;

  return (
    <Stack
      spacing={3}
      sx={{
        maxWidth: 1400,
        mx: "auto",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <Typography variant="h4">Good morning</Typography>

          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Here's your spending overview.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          endIcon={<KeyboardArrowDown />}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            minWidth: 160,
          }}
        >
          August 2026
        </Button>
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
                  {budgetUsedPercentage.toFixed(1)}% used
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  ${remaining.toFixed(2)} left
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
                {remainingPercentage.toFixed(1)}% of budget remaining
              </Typography>

              <Stack
                direction="row"
                spacing={0.5}
                sx={{
                  alignItems: "center",
                }}
              >
                <CheckCircle
                  sx={{
                    fontSize: 16,
                    color: "success.main",
                  }}
                />

                <Typography variant="body2" color="success.main">
                  You're on track
                </Typography>
              </Stack>
            </Stack>
          </SummaryCard>
        </Grid>
      </Grid>

      <SpendingTrendChart expenses={mockExpenses} />

      <RecentExpenses expenses={mockExpenses} />
    </Stack>
  );
}

export default Dashboard;
