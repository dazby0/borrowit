import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { BorrowingFilters, BorrowRequest } from "../../types/borrowings";
import {
  borrowBook,
  getActiveBorrowingsCount,
  getUserBorrowings,
  returnBook,
} from "../borrowings";

export const useBorrowBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BorrowRequest) => borrowBook(data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["book", variables.bookId] });
    },
  });
};

export const useUserBorrowings = (filters?: BorrowingFilters) => {
  return useQuery({
    queryKey: ["user-borrowings", filters],
    queryFn: () => getUserBorrowings(filters),
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

export const useActiveBorrowingsCount = () => {
  return useQuery({
    queryKey: ["active-borrowings-count"],
    queryFn: getActiveBorrowingsCount,
    staleTime: 1000 * 60 * 1,
  });
};
