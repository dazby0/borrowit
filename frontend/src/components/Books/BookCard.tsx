import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { format } from "date-fns";
import type { Book } from "../../types/book";
import { useNavigate } from "react-router-dom";

interface Props {
  book: Book;
}

const BookCard = ({ book }: Props) => {
  const navigate = useNavigate();

  return (
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
      onClick={() => navigate(`/books/${book.id}`)}
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
    </Card>
  );
};

export default BookCard;
