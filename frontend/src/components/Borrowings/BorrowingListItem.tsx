import { Box, Typography, Paper, Chip, Button } from "@mui/material";
import { format } from "date-fns";
import type { UserBorrowing } from "../../types/borrowings";
import { useReturnBook } from "../../api/mutations/useBorrowings";
import ConfirmationModal from "../ConfirmationModal";
import Snackbar from "../Snackbar";
import { useState } from "react";

interface Props {
  borrowing: UserBorrowing;
}

const BorrowingListItem = ({ borrowing }: Props) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const isReturned = !!borrowing.returnedAt;
  const returnMutation = useReturnBook();

  const handleReturn = async () => {
    try {
      await returnMutation.mutateAsync(borrowing.id);
      setSnackbar({
        open: true,
        message: `"${borrowing.bookTitle}" returned successfully`,
        severity: "success",
      });
    } catch {
      setSnackbar({
        open: true,
        message: `Failed to return "${borrowing.bookTitle}"`,
        severity: "error",
      });
    }
    setOpenConfirm(false);
  };

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6">{borrowing.bookTitle}</Typography>
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
