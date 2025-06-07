import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { format } from "date-fns";
import { useBookBorrowings } from "../../api/mutations/useBooks";

interface Props {
  bookId: number;
}

const BookBorrowingsHistory = ({ bookId }: Props) => {
  const { data, isLoading, isError } = useBookBorrowings(bookId);

  if (isLoading) return <CircularProgress />;
  if (isError)
    return <Typography color="error">Failed to load borrowings.</Typography>;
  if (!data || data.length === 0)
    return <Typography>No borrowings found.</Typography>;

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Borrowed At</TableCell>
            <TableCell>Return Due</TableCell>
            <TableCell>Returned At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((b, i) => (
            <TableRow key={i}>
              <TableCell>{b.username}</TableCell>
              <TableCell>
                {format(new Date(b.borrowedAt), "dd.MM.yyyy")}
              </TableCell>
              <TableCell>
                {format(new Date(b.returnDueDate), "dd.MM.yyyy")}
              </TableCell>
              <TableCell>
                {b.returnedAt
                  ? format(new Date(b.returnedAt), "dd.MM.yyyy")
                  : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookBorrowingsHistory;
