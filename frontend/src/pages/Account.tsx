import { Box } from "@mui/material";
import UserInfoCard from "../components/Account/UserInfoCard";
import ChangePasswordForm from "../components/Account/ChangePassword";
import { useAuth } from "../context/AuthContext";
import CreateAdminForm from "../components/Account/CreateAdminForm";

const Account = () => {
  const { hasRole } = useAuth();
  return (
    <Box>
      <UserInfoCard />
      <Box display="flex" gap={4}>
        <ChangePasswordForm />
        {hasRole("Admin") && <CreateAdminForm />}
      </Box>
    </Box>
  );
};

export default Account;
