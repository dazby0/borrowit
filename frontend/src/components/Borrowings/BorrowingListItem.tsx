import { Box, Typography, Paper, Chip, Button } from "@mui/material";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import type { UserBorrowing } from "../../types/borrowings";
import ConfirmationModal from "../ConfirmationModal";
import Snackbar from "../Snackbar";
import { useBorrowingListItem } from "./hooks/useBorrowingListItem";

interface Props {
  borrowing: UserBorrowing;
}

const BorrowingListItem = ({ borrowing }: Props) => {
  const {
    isReturned,
    openConfirm,
    setOpenConfirm,
    snackbar,
    setSnackbar,
    returnMutation,
    handleReturn,
  } = useBorrowingListItem(borrowing);

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography
              variant="h6"
              component={Link}
              to={`/books/${borrowing.bookId}`}
              sx={{
                textDecoration: "none",
                color: "primary.main",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {borrowing.bookTitle}
            </Typography>

            <Typography variant="body2">
              Borrowed: {format(new Date(borrowing.borrowedAt), "dd.MM.yyyy")}
            </Typography>
            <Typography variant="body2">
              Due: {format(new Date(borrowing.returnDueDate), "dd.MM.yyyy")}
            </Typography>
            {isReturned && (
              <Typography variant="body2">
                Returned:{" "}
                {format(new Date(borrowing.returnedAt!), "dd.MM.yyyy")}
              </Typography>
            )}
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <Chip
              label={isReturned ? "Returned" : "Active"}
              color={isReturned ? "default" : "success"}
            />
            {!isReturned && (
              <>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setOpenConfirm(true)}
                  disabled={returnMutation.isPending}
                >
                  Return Book
                </Button>

                <ConfirmationModal
                  open={openConfirm}
                  onClose={() => setOpenConfirm(false)}
                  onConfirm={handleReturn}
                  title="Confirm Return"
                  message={`Are you sure you want to return "${borrowing.bookTitle}"?`}
                  confirmLabel="Return"
                  cancelLabel="Cancel"
                  loading={returnMutation.isPending}
                />
              </>
            )}
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        severity={snackbar.severity}
        message={snackbar.message}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
};

export default BorrowingListItem;
