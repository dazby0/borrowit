import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Chip,
  Paper,
  CircularProgress,
  Button,
} from "@mui/material";
import CountdownTimer from "../../components/Books/CountdownTimer";
import { useBookDetails } from "../../api/mutations/useBooks";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useBorrowBook } from "../../api/mutations/useBorrowings";
import { BorrowModal } from "../../components/Borrowings/BorrowModal";

const BookDetailsPage = () => {
  const { id } = useParams();
  const bookId = parseInt(id || "0", 10);
  const { user } = useAuth();

  console.log("Role: ", user?.role);

  const { data: book, isLoading } = useBookDetails(bookId);
  const [isModalOpen, setModalOpen] = useState(false);
  const borrowMutation = useBorrowBook();

  const handleBorrow = async (returnDueDate: string) => {
    try {
      await borrowMutation.mutateAsync({
        bookId,
        returnDueDate,
      });
      setModalOpen(false);
    } catch (err) {
      alert("Failed to borrow book");
    }
  };

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

      {user?.role === "User" && book.isAvailable && (
        <Box mt={4}>
          <Button variant="contained" onClick={() => setModalOpen(true)}>
            Borrow This Book
          </Button>
        </Box>
      )}

      <BorrowModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleBorrow}
      />
    </Paper>
  );
};

export default BookDetailsPage;
