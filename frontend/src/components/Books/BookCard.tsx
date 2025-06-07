import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  CardActions,
} from "@mui/material";
import { format } from "date-fns";
import type { Book } from "../../types/book";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmationModal from "../ConfirmationModal";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteBook } from "../../api/mutations/useBooks";
import { useAuth } from "../../context/AuthContext";

interface Props {
  book: Book;
}

const BookCard = ({ book }: Props) => {
  const { hasRole } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [openConfirm, setOpenConfirm] = useState(false);
  const deleteMutation = useDeleteBook();

  const handleCardClick = () => {
    navigate(`/books/${book.id}`);
  };

  const handleDelete = () => {
    deleteMutation.mutate(book.id, {
      onSuccess: () => {
        setOpenConfirm(false);
        queryClient.invalidateQueries({ queryKey: ["books"] });
      },
    });
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          width: 275,
          cursor: "pointer",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: 3,
          },
        }}
        onClick={handleCardClick}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography variant="h6">{book.title}</Typography>
            <Chip
              label={book.isAvailable ? "Available" : "Borrowed"}
              color={book.isAvailable ? "success" : "warning"}
              size="small"
            />
          </Box>

          <Typography color="text.secondary">{book.author}</Typography>

          {!book.isAvailable && book.returnDueDate && (
            <Typography variant="body2" mt={1} color="error">
              Due: {format(new Date(book.returnDueDate), "dd.MM.yyyy")}
            </Typography>
          )}
        </CardContent>

        {hasRole("Admin") && (
          <CardActions onClick={(e) => e.stopPropagation()}>
            <Button
              size="small"
              color="primary"
              onClick={() => navigate(`/edit-book/${book.id}`)}
            >
              Edit
            </Button>
            <Button
              size="small"
              color="error"
              onClick={() => setOpenConfirm(true)}
            >
              Delete
            </Button>
          </CardActions>
        )}
      </Card>

      <ConfirmationModal
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Book"
        message={`Are you sure you want to delete "${book.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        loading={deleteMutation.isPending}
      />
    </>
  );
};

export default BookCard;
