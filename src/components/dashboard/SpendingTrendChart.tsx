import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Expense } from "../../types/expense";

interface SpendingTrendChartProps {
  expenses: Expense[];
}

const selectedYear = 2026;
const selectedMonth = 8;

const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();

function SpendingTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{
    value?: number;
  }>;
  label?: string;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  const amount = payload[0]?.value ?? 0;

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        px: 2,
        py: 1.5,
        boxShadow: 2,
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {label} Aug
      </Typography>

      <Typography>${amount.toFixed(2)}</Typography>
    </Box>
  );
}

function SpendingTrendChart({ expenses }: SpendingTrendChartProps) {
  const spendingByDate = expenses.reduce<Record<string, number>>(
    (totals, expense) => {
      totals[expense.date] = (totals[expense.date] ?? 0) + expense.amount;

      return totals;
    },
    {},
  );

  const spendingData = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;

    const date = `${selectedYear}-${String(selectedMonth).padStart(
      2,
      "0",
    )}-${String(day).padStart(2, "0")}`;

    return {
      day: String(day),
      amount: spendingByDate[date] ?? 0,
    };
  });

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
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="h6">Spending Trend</Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Your spending throughout the month
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary">
            August 2026
          </Typography>
        </Stack>

        <Box sx={{ width: "100%", height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={spendingData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E7EB"
              />

              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                interval={4}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />

              <Tooltip content={<SpendingTooltip />} />

              <Line
                type="monotone"
                dataKey="amount"
                stroke="#6C4DE6"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "#FFFFFF",
                  stroke: "#6C4DE6",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}

export default SpendingTrendChart;
