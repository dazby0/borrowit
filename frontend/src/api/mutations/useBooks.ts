import { useQuery } from "@tanstack/react-query";
import type { GetBooksParams } from "../../types/book";
import { getBooks } from "../books";

export const useBooks = (params: GetBooksParams) => {
  return useQuery({
    queryKey: ["books", params],
    queryFn: () => getBooks(params),
    placeholderData: (prev) => prev,
  });
};
