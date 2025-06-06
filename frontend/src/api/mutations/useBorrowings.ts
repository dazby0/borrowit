import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { BorrowRequest } from "../../types/borrowings";
import { borrowBook } from "../borrowings";

export const useBorrowBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BorrowRequest) => borrowBook(data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["book", variables.bookId] });
    },
  });
};
