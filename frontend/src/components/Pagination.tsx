import { Box, Pagination as MuiPagination } from "@mui/material";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={(_, value) => onPageChange(value)}
        color="primary"
        shape="rounded"
        size="medium"
      />
    </Box>
  );
};

export default Pagination;
