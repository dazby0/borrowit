import { Box, Button, TextField, Typography } from "@mui/material";
import { FormProvider, Controller } from "react-hook-form";
import { useBookForm } from "./hooks/useBookForm";
import type { Book } from "../../types/book";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddBook, useUpdateBook } from "../../api/mutations/useBooks";

type Props = {
  initialData?: Book;
};

const BookForm = ({ initialData }: Props) => {
  const isEditMode = !!initialData;
  const navigate = useNavigate();

  const form = useBookForm();

  const addBook = useAddBook();
  const updateBook = useUpdateBook(initialData?.id!);

  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title,
        author: initialData.author,
        year: initialData.year,
        description: initialData.description ?? "",
      });
    }
  }, [initialData, form]);

  const onSubmit = form.handleSubmit((data) => {
    const mutation = isEditMode ? updateBook : addBook;
    mutation.mutate(data, {
      onSuccess: () => navigate("/books"),
    });
  });

  return (
    <FormProvider {...form}>
      <Box
        component="form"
        onSubmit={onSubmit}
        noValidate
        sx={{ maxWidth: 600, mx: "auto", mt: 4 }}
      >
        <Typography variant="h5" mb={2}>
          {isEditMode ? "Edit Book" : "Add New Book"}
        </Typography>

        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Title"
              fullWidth
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="author"
          control={form.control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Author"
              fullWidth
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="year"
          control={form.control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Year"
              type="number"
              fullWidth
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Description"
              multiline
              rows={3}
              fullWidth
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          {isEditMode ? "Update Book" : "Add Book"}
        </Button>
      </Box>
    </FormProvider>
  );
};

export default BookForm;
