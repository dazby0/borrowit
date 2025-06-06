import { Box } from "@mui/material";
import { loginSlogans } from "../constants/slogans";
import logo from "../assets/logo.png";
import SloganRotator from "../components/SloganRotator";
import LoginForm from "../components/Login/LoginForm";

const Login = () => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="background.default"
    >
      <Box>
        <Box display="flex" justifyContent="center" mb={2}>
          <Box
            component="img"
            src={logo}
            alt="BorrowIT Logo"
            sx={{ height: 40 }}
          />
        </Box>
        <SloganRotator slogans={loginSlogans} />
        <LoginForm />
      </Box>
    </Box>
  );
};

export default Login;
