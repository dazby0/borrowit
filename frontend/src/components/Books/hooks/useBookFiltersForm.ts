import { useForm } from "react-hook-form";
import type { BookFiltersValues } from "../BookFilters";

export const useBookFiltersForm = (
  defaultValues?: BookFiltersValues,
  onChange?: (values: BookFiltersValues) => void
) => {
  const form = useForm<BookFiltersValues>({
    defaultValues: defaultValues || {
      title: "",
      author: "",
      isAvailable: "",
      sortBy: "",
      sortDir: "asc",
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    onChange?.(data);
  });

  const handleReset = () => {
    const emptyValues: BookFiltersValues = {
      title: "",
      author: "",
      isAvailable: "",
      sortBy: "",
      sortDir: "asc",
    };

    form.reset(emptyValues);
    onChange?.({});
  };

  return {
    form,
    handleSubmit,
    handleReset,
  };
};
