import { Box, Paper } from "@mui/material";
import logo from "../assets/logo.png";
import SloganRotator from "../components/SloganRotator";
import { registerSlogans } from "../constants/slogans";
import RegisterForm from "../components/Register/Register";

const Register = () => {
  return (
    <Box
      minHeight="100vh"
      minWidth="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="background.default"
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 450,
          width: "100%",
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Box display="flex" justifyContent="center" mb={2}>
          <Box
            component="img"
            src={logo}
            alt="BorrowIT Logo"
            sx={{ height: 40 }}
          />
        </Box>

        <SloganRotator slogans={registerSlogans} />
        <RegisterForm />
      </Paper>
    </Box>
  );
};

export default Register;
