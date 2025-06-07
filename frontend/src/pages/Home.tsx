import { Box, Typography, CircularProgress, Button } from "@mui/material";
import BookFilters from "../components/Books/BookFilters";
import BookCard from "../components/Books/BookCard";
import Pagination from "../components/Pagination";
import { useHomePageData } from "../hooks/useHomePageData";
import type { Book } from "../types/book";
import { useAuth } from "../context/AuthContext";
import { downloadCsv } from "../utils/downloadCsv";

const Home = () => {
  const { filters, setFilters, page, setPage, books, totalPages, isLoading } =
    useHomePageData();

  const { hasRole } = useAuth();

  return (
    <Box p={4}>
      {hasRole("Admin") && (
        <Button
          variant="outlined"
          onClick={() =>
            downloadCsv("http://localhost:5127/api/books/export", "books.csv")
          }
          sx={{ mb: 2 }}
        >
          Export to CSV
        </Button>
      )}

      <BookFilters
        defaultValues={filters}
        onChange={(values) => {
          setFilters(values);
          setPage(1);
        }}
      />

      {isLoading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : books.length === 0 ? (
        <Typography variant="body1">No books found.</Typography>
      ) : (
        <Box display="flex" flexWrap="wrap" gap={2} justifyContent="flex-start">
          {books.map((book: Book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </Box>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </Box>
  );
};

export default Home;
