import { Box } from "@mui/material";
import UserInfoCard from "../../components/Account/UserInfoCard";
import ChangePasswordForm from "../../components/Account/ChangePassword";

const UserAccount = () => {
  return (
    <Box maxWidth={600}>
      <UserInfoCard />
      <ChangePasswordForm />
    </Box>
  );
};

export default UserAccount;
