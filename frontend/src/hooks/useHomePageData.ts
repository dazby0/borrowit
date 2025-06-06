import { useState } from "react";
import { useBooks } from "../api/mutations/useBooks";
import type { BookFiltersValues } from "../components/Books/BookFilters";
import type { Book } from "../types/book";

const PAGE_SIZE = 8;

export const useHomePageData = () => {
  const [filters, setFilters] = useState<BookFiltersValues>({
    isAvailable: "true",
  });
  const [page, setPage] = useState(1);

  const { data, isLoading } = useBooks({
    ...filters,
    isAvailable:
      filters.isAvailable === "true"
        ? true
        : filters.isAvailable === "false"
        ? false
        : undefined,
    page,
    pageSize: PAGE_SIZE,
  });

  const books: Book[] = data?.items || [];
  const totalPages = Math.ceil((data?.totalCount || 0) / PAGE_SIZE);

  return {
    filters,
    setFilters,
    page,
    setPage,
    books,
    totalPages,
    isLoading,
  };
};
