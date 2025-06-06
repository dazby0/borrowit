import { Box, Button, Paper, Typography } from "@mui/material";
import { FormProvider } from "react-hook-form";
import FormInput from "../Form/FormInput";
import { useChangePasswordForm } from "./hooks/useChangePassword";

const ChangePasswordForm = () => {
  const { form, onSubmit, isPending: isLoading } = useChangePasswordForm();

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
    </Paper>
  );
};

export default ChangePasswordForm;
