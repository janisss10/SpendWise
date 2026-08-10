import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import {
  AccountBalance,
  DirectionsCar,
  LocalDining,
  Movie,
  ShoppingBag,
} from "@mui/icons-material";
import type { Expense } from "../../types/expense";

interface RecentExpensesProps {
  expenses: Expense[];
}

function RecentExpenses({ expenses }: RecentExpensesProps) {
  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "100%",
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="h6">Recent Expenses</Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Your latest transactions
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{
              cursor: "pointer",
              fontWeight: 600,
              color: "primary.main",
              whiteSpace: "nowrap",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            View all expenses →
          </Typography>
        </Box>

        <Stack divider={<Divider />}>
          {expenses.map((expense) => (
            <Stack
              key={expense.id}
              direction="row"
              spacing={2}
              sx={{
                py: 2,
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  ...getCategoryStyles(expense.category),
                }}
              >
                {getCategoryIcon(expense.category)}
              </Box>

              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography noWrap>{expense.title}</Typography>

                <Typography variant="body2" color="text.secondary">
                  {expense.category}
                </Typography>
              </Box>

              <Box sx={{ textAlign: "right" }}>
                <Typography>${expense.amount.toFixed(2)}</Typography>

                <Typography variant="caption" color="text.secondary">
                  {formatExpenseDate(expense.date)}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

function getCategoryIcon(category: string) {
  switch (category) {
    case "Food":
      return <LocalDining fontSize="small" />;
    case "Transport":
      return <DirectionsCar fontSize="small" />;
    case "Shopping":
      return <ShoppingBag fontSize="small" />;
    case "Entertainment":
      return <Movie fontSize="small" />;
    default:
      return <AccountBalance fontSize="small" />;
  }
}

function getCategoryStyles(category: string) {
  switch (category) {
    case "Food":
      return {
        backgroundColor: "#FDECEF",
        color: "#E94D73",
      };
    case "Transport":
      return {
        backgroundColor: "#FFF3D9",
        color: "#E59A00",
      };
    case "Shopping":
      return {
        backgroundColor: "#E8F2FF",
        color: "#4285D4",
      };
    case "Entertainment":
      return {
        backgroundColor: "#F0EAFE",
        color: "#7950D8",
      };
    default:
      return {
        backgroundColor: "#F1F3F5",
        color: "#6B7280",
      };
  }
}

function formatExpenseDate(date: string) {
  return new Date(date).toLocaleDateString("en-SG", {
    day: "numeric",
    month: "short",
  });
}

export default RecentExpenses;
