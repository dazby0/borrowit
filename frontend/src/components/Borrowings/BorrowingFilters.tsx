import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  useBorrowingFiltersForm,
  type BorrowingFiltersValues,
} from "./hooks/useBorrowingFiltersForm";

interface Props {
  defaultValues?: BorrowingFiltersValues;
  onChange: (values: BorrowingFiltersValues) => void;
}

const BorrowingFilters = ({ defaultValues, onChange }: Props) => {
  const { form, handleSubmit, handleReset } = useBorrowingFiltersForm(
    defaultValues,
    onChange
  );

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Filter Borrowings
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        gap={2}
        alignItems="flex-end"
        justifyContent="flex-start"
        width="100%"
      >
        <Controller
          name="status"
          control={form.control}
          render={({ field }) => (
            <TextField
              select
              label="Status"
              {...field}
              size="small"
              sx={{ flex: 1 }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="returned">Returned</MenuItem>
            </TextField>
          )}
        />

        <Controller
          name="sortBy"
          control={form.control}
          render={({ field }) => (
            <TextField
              select
              label="Sort By"
              {...field}
              size="small"
              sx={{ flex: 1 }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="BorrowedAt">Borrowed Date</MenuItem>
              <MenuItem value="ReturnedAt">Returned Date</MenuItem>
            </TextField>
          )}
        />

        <Controller
          name="sortOrder"
          control={form.control}
          render={({ field }) => (
            <TextField
              select
              label="Direction"
              {...field}
              size="small"
              sx={{ flex: 1 }}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </TextField>
          )}
        />

        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            type="submit"
            startIcon={<SearchIcon />}
            size="medium"
          >
            Search
          </Button>
          <Button
            variant="outlined"
            onClick={handleReset}
            startIcon={<RestartAltIcon />}
            size="medium"
          >
            Reset
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default BorrowingFilters;
