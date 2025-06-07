import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { UserBorrowing } from "../../../types/borrowings";
import { useReturnBook } from "../../../api/mutations/useBorrowings";

export const useBorrowingListItem = (borrowing: UserBorrowing) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const queryClient = useQueryClient();
  const returnMutation = useReturnBook();

  const handleReturn = async () => {
    try {
      await returnMutation.mutateAsync(borrowing.id);

      queryClient.invalidateQueries({
        queryKey: ["active-borrowings-count"],
        refetchType: "active",
      });

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

  return {
    isReturned: !!borrowing.returnedAt,
    openConfirm,
    setOpenConfirm,
    snackbar,
    setSnackbar,
    returnMutation,
    handleReturn,
  };
};
