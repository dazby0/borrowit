import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  bookSchema,
  type BookFormData,
} from "../../../schemas/book/bookSchema";

export const useBookForm = () => {
  return useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      year: new Date().getFullYear(),
      description: "",
    },
  });
};
