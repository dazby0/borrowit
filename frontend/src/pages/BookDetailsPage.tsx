import {
  Box,
  Typography,
  Chip,
  Paper,
  CircularProgress,
  Button,
  Tooltip,
} from "@mui/material";
import CountdownTimer from "../components/Books/CountdownTimer";
import Snackbar from "../components/Snackbar";
import { BorrowModal } from "../components/Borrowings/BorrowModal";
import { useBookDetailsPage } from "../hooks/useBookDetailsPage";
import BookBorrowingsHistory from "../components/Books/BookBorrowingsHistory";

const BookDetailsPage = () => {
  const {
    book,
    isLoading,
    hasRole,
    isModalOpen,
    setModalOpen,
    snackbar,
    setSnackbar,
    isDisabled,
    handleBorrow,
  } = useBookDetailsPage();

  if (isLoading || !book) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">{book.title}</Typography>
        <Chip
          label={book.isAvailable ? "Available" : "Borrowed"}
          color={book.isAvailable ? "success" : "warning"}
        />
      </Box>

      <Typography variant="subtitle1" gutterBottom>
        {book.author} — {book.year}
      </Typography>

      {book.description && (
        <Typography variant="body1" paragraph>
          {book.description}
        </Typography>
      )}

      {!book.isAvailable && book.returnDueDate && (
        <CountdownTimer endDate={book.returnDueDate} />
      )}

      {hasRole("Admin") && <BookBorrowingsHistory bookId={book.id} />}

      {hasRole("User") && book.isAvailable && (
        <Box mt={4}>
          <Tooltip
            title={
              isDisabled
                ? "You cannot borrow more than 3 books at the same time"
                : ""
            }
          >
            <span>
              <Button
                variant="contained"
                onClick={() => setModalOpen(true)}
                disabled={isDisabled}
              >
                Borrow This Book
              </Button>
            </span>
          </Tooltip>
        </Box>
      )}

      <BorrowModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleBorrow}
      />

      <Snackbar
        open={snackbar.open}
        severity={snackbar.severity}
        message={snackbar.message}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </Paper>
  );
};

export default BookDetailsPage;
