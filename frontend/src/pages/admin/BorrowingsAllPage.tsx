import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import BorrowingListItem from "../../components/Borrowings/BorrowingListItem";
import type { BorrowingFiltersValues } from "../../components/Borrowings/hooks/useBorrowingFiltersForm";
import { useAllBorrowings } from "../../api/mutations/useBorrowings";
import { downloadCsv } from "../../utils/downloadCsv";
import ExportCsvButton from "../../components/ExportCsvButton";

const BorrowingsAllPage = () => {
  const { hasRole } = useAuth();

  if (!hasRole("Admin")) return <Navigate to="/" replace />;

  const [filters, setFilters] = useState<BorrowingFiltersValues>({});
  const { data, isLoading } = useAllBorrowings(filters);

  return (
    <Box p={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4" gutterBottom>
          All Borrowings
        </Typography>

        <ExportCsvButton apiUrl="borrowings" fileName="borrowings.csv" />
      </Box>

      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" gap={2}>
          {data?.map((b) => (
            <BorrowingListItem key={b.id} borrowing={b} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default BorrowingsAllPage;
