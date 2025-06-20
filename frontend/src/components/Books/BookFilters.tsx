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
import { useBookFiltersForm } from "./hooks/useBookFiltersForm";
import type { BookFiltersValues } from "../../types/book";

interface Props {
  defaultValues?: BookFiltersValues;
  onChange: (values: BookFiltersValues) => void;
}

const BookFilters = ({ defaultValues, onChange }: Props) => {
  const { form, handleSubmit, handleReset } = useBookFiltersForm(
    defaultValues,
    onChange
  );

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Filter Books
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexWrap="wrap"
        gap={2}
        width="100%"
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <Controller
          name="title"
          control={form.control}
          render={({ field }) => (
            <TextField label="Title" {...field} size="small" sx={{ flex: 1 }} />
          )}
        />

        <Controller
          name="author"
          control={form.control}
          render={({ field }) => (
            <TextField
              label="Author"
              {...field}
              size="small"
              sx={{ flex: 1 }}
            />
          )}
        />

        <Controller
          name="isAvailable"
          control={form.control}
          render={({ field }) => (
            <TextField
              select
              label="Availability"
              {...field}
              size="small"
              sx={{ flex: 1 }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="true">Available</MenuItem>
              <MenuItem value="false">Borrowed</MenuItem>
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
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="author">Author</MenuItem>
              <MenuItem value="year">Year</MenuItem>
            </TextField>
          )}
        />

        <Controller
          name="sortDir"
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
            color="primary"
            type="submit"
            startIcon={<SearchIcon />}
            size="medium"
          >
            Search
          </Button>
          <Button
            variant="outlined"
            color="secondary"
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

export default BookFilters;
