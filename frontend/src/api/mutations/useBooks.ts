import { useMutation, useQuery } from "@tanstack/react-query";
import type { GetBooksParams } from "../../types/book";
import {
  addBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
} from "../books";
import type { BookFormData } from "../../schemas/book/bookSchema";

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

export const useAddBook = () =>
  useMutation({
    mutationFn: (payload: BookFormData) => addBook(payload),
  });

export const useDeleteBook = () =>
  useMutation({
    mutationFn: (id: number) => deleteBook(id),
  });

export const useUpdateBook = (id: number) =>
  useMutation({
    mutationFn: (payload: BookFormData) => updateBook(id, payload),
  });
