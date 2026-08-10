import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import { Search } from "@mui/icons-material";

interface ExpenseToolbarProps {
  searchQuery: string;
  category: string;
  sortBy: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

function ExpenseToolbar({
  searchQuery,
  category,
  sortBy,
  onSearchChange,
  onCategoryChange,
  onSortChange,
}: ExpenseToolbarProps) {
  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
      <TextField
        fullWidth
        placeholder="Search expenses..."
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          },
        }}
      />

      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel>Category</InputLabel>

        <Select
          value={category}
          label="Category"
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <MenuItem value="all">All categories</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Transport">Transport</MenuItem>
          <MenuItem value="Shopping">Shopping</MenuItem>
          <MenuItem value="Entertainment">Entertainment</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel>Sort by</InputLabel>

        <Select
          value={sortBy}
          label="Sort by"
          onChange={(event) => onSortChange(event.target.value)}
        >
          <MenuItem value="date-desc">Date: Newest</MenuItem>
          <MenuItem value="date-asc">Date: Oldest</MenuItem>
          <MenuItem value="amount-desc">Amount: High to Low</MenuItem>
          <MenuItem value="amount-asc">Amount: Low to High</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}

export default ExpenseToolbar;
