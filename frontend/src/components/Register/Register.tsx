import { Box, Typography, Button, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import { FormProvider } from "react-hook-form";
import FormInput from "../Form/FormInput";
import { useRegisterForm } from "./hooks/useRegisterForm";
import FormSnackbarSuccess from "../Form/FormSnackbarSuccess";

const RegisterForm = () => {
  const { form, onSubmit, isLoading, isSuccess } = useRegisterForm();

  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        textAlign="center"
        color="text.primary"
      >
        Create a BorrowIT account
      </Typography>

      <FormProvider {...form}>
        <Box component="form" noValidate onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput name="username" label="Username" />
          <FormInput name="email" label="Email" type="email" />
          <Box
            display="flex"
            gap={2}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <FormInput name="password" label="Password" type="password" />
            <FormInput
              name="confirmPassword"
              label="Repeat Password"
              type="password"
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
            sx={{ mt: 2 }}
          >
            Sign up
          </Button>
        </Box>
      </FormProvider>

      <Typography
        variant="body2"
        color="text.secondary"
        mt={3}
        textAlign="center"
      >
        Already have an account?
        <br />
        <MuiLink
          component={Link}
          to="/login"
          color="primary"
          underline="hover"
          sx={{ fontWeight: 500 }}
        >
          Log in here
        </MuiLink>
      </Typography>

      <FormSnackbarSuccess
        open={isSuccess}
        message="Registration successful! You can now log in."
      />
    </>
  );
};

export default RegisterForm;
