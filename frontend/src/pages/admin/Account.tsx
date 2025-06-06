import { Box } from "@mui/material";
import UserInfoCard from "../../components/Account/UserInfoCard";
import CreateAdminForm from "../../components/Account/CreateAdminForm";
import ChangePasswordForm from "../../components/Account/ChangePassword";

const AdminAccount = () => {
  return (
    <Box maxWidth={600}>
      <UserInfoCard />
      <ChangePasswordForm />
      <CreateAdminForm />
    </Box>
  );
};

export default AdminAccount;
