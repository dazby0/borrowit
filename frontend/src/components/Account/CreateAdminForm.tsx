import { Box, Button, Paper, Typography } from "@mui/material";
import { FormProvider } from "react-hook-form";
import FormInput from "../Form/FormInput";
import { useCreateAdminForm } from "./hooks/useCreateAdminForm";

const CreateAdminForm = () => {
  const { form, onSubmit, isPending } = useCreateAdminForm();

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Create New Admin
      </Typography>
      <FormProvider {...form}>
        <Box component="form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FormInput name="username" label="Username" />
          <FormInput name="email" label="Email" type="email" />
          <FormInput name="password" label="Password" type="password" />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
            disabled={isPending}
          >
            Create Admin
          </Button>
        </Box>
      </FormProvider>
    </Paper>
  );
};

export default CreateAdminForm;
