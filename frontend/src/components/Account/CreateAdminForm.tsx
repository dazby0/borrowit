import { Box, Button, Paper, Typography } from "@mui/material";
import { FormProvider } from "react-hook-form";
import FormInput from "../Form/FormInput";
import { useCreateAdminForm } from "./hooks/useCreateAdminForm";
import Snackbar from "../Snackbar";
import { useSnackbarFeedback } from "../../hooks/useSnackbarFeedback";

const CreateAdminForm = () => {
  const { form, onSubmit, isPending, isSuccess, error } = useCreateAdminForm();

  const { showSuccess, setShowSuccess, showError, setShowError } =
    useSnackbarFeedback(isSuccess, error);

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

      <Snackbar
        open={showSuccess}
        message="Admin created successfully"
        severity="success"
        onClose={() => setShowSuccess(false)}
      />
      <Snackbar
        open={showError}
        message="Failed to create admin"
        severity="error"
        onClose={() => setShowError(false)}
      />
    </Paper>
  );
};

export default CreateAdminForm;
