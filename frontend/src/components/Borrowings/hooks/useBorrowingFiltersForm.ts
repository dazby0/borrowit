import { useForm } from "react-hook-form";

export interface BorrowingFiltersValues {
  status?: "active" | "returned";
  sortBy?: "BorrowedAt" | "ReturnedAt";
  sortOrder?: "asc" | "desc";
}

export const useBorrowingFiltersForm = (
  defaultValues: BorrowingFiltersValues = {},
  onChange: (values: BorrowingFiltersValues) => void
) => {
  const form = useForm<BorrowingFiltersValues>({ defaultValues });

  const handleSubmit = form.handleSubmit((data) => {
    onChange(data);
  });

  const handleReset = () => {
    form.reset();
    onChange({});
  };

  return { form, handleSubmit, handleReset };
};
