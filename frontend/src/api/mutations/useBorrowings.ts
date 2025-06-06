import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { BorrowRequest } from "../../types/borrowings";
import { borrowBook, getUserBorrowings, returnBook } from "../borrowings";

export const useBorrowBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BorrowRequest) => borrowBook(data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["book", variables.bookId] });
    },
  });
};

export const useUserBorrowings = () => {
  return useQuery({
    queryKey: ["user-borrowings"],
    queryFn: getUserBorrowings,
  });
};

export const useReturnBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (borrowingId: number) => returnBook(borrowingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-borrowings"] });
    },
  });
};
