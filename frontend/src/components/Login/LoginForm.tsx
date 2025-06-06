import { Box, Typography, Button, Paper, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import { FormProvider } from "react-hook-form";
import FormInput from "../Form/FormInput";
import { useLoginForm } from "./hooks/useLoginForm";

const LoginForm = () => {
  const { form, onSubmit, isLoading } = useLoginForm();

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        maxWidth: 400,
        width: "100%",
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        textAlign="center"
        color="text.primary"
      >
        Log in to BorrowIT
      </Typography>

      <FormProvider {...form}>
        <Box component="form" noValidate onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput name="email" label="Email" type="email" />
          <FormInput name="password" label="Password" type="password" />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
            sx={{ mt: 2 }}
          >
            Log in
          </Button>
        </Box>
      </FormProvider>

      <Typography
        variant="body2"
        color="text.secondary"
        mt={3}
        textAlign="center"
      >
        Don't have an account?{" "}
        <MuiLink
          component={Link}
          to="/register"
          color="primary"
          underline="hover"
          sx={{ fontWeight: 500 }}
        >
          Sign up now
        </MuiLink>
      </Typography>
    </Paper>
  );
};

export default LoginForm;
