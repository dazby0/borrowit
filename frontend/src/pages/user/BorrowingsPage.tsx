import { Box, Typography, CircularProgress, Stack } from "@mui/material";
import BorrowingListItem from "../../components/Borrowings/BorrowingListItem";
import { useUserBorrowings } from "../../api/mutations/useBorrowings";
import { useState } from "react";
import type { BorrowingFiltersValues } from "../../components/Borrowings/hooks/useBorrowingFiltersForm";
import BorrowingFilters from "../../components/Borrowings/BorrowingFilters";

const BorrowingsPage = () => {
  const [filters, setFilters] = useState<BorrowingFiltersValues>({});
  const { data: borrowings, isLoading } = useUserBorrowings();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!borrowings || borrowings.length === 0) {
    return (
      <Typography variant="body1" textAlign="center" mt={4}>
        You haven't borrowed any books yet.
      </Typography>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Your Borrowings
      </Typography>

      <BorrowingFilters onChange={setFilters} defaultValues={filters} />

      <Stack spacing={2}>
        {borrowings.map((b) => (
          <BorrowingListItem key={b.id} borrowing={b} />
        ))}
      </Stack>
    </Box>
  );
};

export default BorrowingsPage;
