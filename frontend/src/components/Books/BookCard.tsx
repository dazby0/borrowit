import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { format } from "date-fns";
import type { Book } from "../../types/book";

interface Props {
  book: Book;
}

const BookCard = ({ book }: Props) => {
  return (
    <Card variant="outlined" sx={{ width: 300 }}>
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
        <Typography variant="body2" mt={1}>
          Year: {book.year}
        </Typography>

        {book.description && (
          <Typography variant="body2" mt={1}>
            {book.description}
          </Typography>
        )}

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
