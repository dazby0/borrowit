import { useParams } from "react-router-dom";
import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { useBookDetails } from "../api/mutations/useBooks";
import {
  useActiveBorrowingsCount,
  useBorrowBook,
} from "../api/mutations/useBorrowings";

export const useBookDetailsPage = () => {
  const { id } = useParams();
  const bookId = parseInt(id || "0", 10);

  const { hasRole } = useAuth();
  const { data: book, isLoading } = useBookDetails(bookId);
  const borrowMutation = useBorrowBook();
  const queryClient = useQueryClient();

  const [isModalOpen, setModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const { data: activeCount, isLoading: isLoadingCount } =
    useActiveBorrowingsCount();
  const MAX_BORROWINGS = 3;
  const isDisabled =
    !isLoadingCount &&
    activeCount !== undefined &&
    activeCount >= MAX_BORROWINGS;

  const handleBorrow = async (returnDueDate: string) => {
    try {
      await borrowMutation.mutateAsync({ bookId, returnDueDate });

      queryClient.invalidateQueries({ queryKey: ["active-borrowings-count"] });

      setSnackbar({
        open: true,
        message: "Book borrowed successfully",
        severity: "success",
      });

      setModalOpen(false);
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to borrow book",
        severity: "error",
      });
    }
  };

  return {
    book,
    isLoading,
    hasRole,
    isModalOpen,
    setModalOpen,
    snackbar,
    setSnackbar,
    isDisabled,
    handleBorrow,
  };
};
