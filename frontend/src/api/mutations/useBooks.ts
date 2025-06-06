import { useQuery } from "@tanstack/react-query";
import type { GetBooksParams } from "../../types/book";
import { getBookById, getBooks } from "../books";

export const useBooks = (params: GetBooksParams) => {
  return useQuery({
    queryKey: ["books", params],
    queryFn: () => getBooks(params),
    placeholderData: (prev) => prev,
  });
};

export const useBookDetails = (id: number) => {
  return useQuery({
    queryKey: ["book", id],
    queryFn: () => getBookById(id),
  });
};
