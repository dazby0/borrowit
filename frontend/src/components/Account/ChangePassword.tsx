import { Box, Button, Paper, Typography } from "@mui/material";
import { FormProvider } from "react-hook-form";
import FormInput from "../Form/FormInput";
import { useChangePasswordForm } from "./hooks/useChangePassword";
import Snackbar from "../Snackbar";
import { useSnackbarFeedback } from "../../hooks/useSnackbarFeedback";

const ChangePasswordForm = () => {
  const {
    form,
    onSubmit,
    isPending: isLoading,
    isSuccess,
    error,
  } = useChangePasswordForm();

  const { showSuccess, setShowSuccess, showError, setShowError } =
    useSnackbarFeedback(isSuccess, error);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Change Password
      </Typography>
      <FormProvider {...form}>
        <Box component="form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FormInput
            name="currentPassword"
            label="Current Password"
            type="password"
          />
          <FormInput name="newPassword" label="New Password" type="password" />
          <FormInput
            name="confirmNewPassword"
            label="Repeat New Password"
            type="password"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={isLoading}
          >
            Update Password
          </Button>
        </Box>
      </FormProvider>

      <Snackbar
        open={showSuccess}
        severity="success"
        message="Password updated successfully"
        onClose={() => setShowSuccess(false)}
      />
      <Snackbar
        open={showError}
        severity="error"
        message={
          typeof error === "string"
            ? error
            : "Something went wrong while updating password"
        }
        onClose={() => setShowError(false)}
      />
    </Paper>
  );
};

export default ChangePasswordForm;
