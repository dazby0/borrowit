import { AppBar, Toolbar } from "@mui/material";
import UserMenu from "./UserMenu";
import ActiveBorrowingsBadge from "./ActiveBorrowingsBadge";
import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
  const { hasRole } = useAuth();
  return (
    <AppBar
      position="static"
      elevation={0}
      color="transparent"
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        px: 3,
      }}
    >
      <Toolbar sx={{ justifyContent: "end", gap: 2 }}>
        {hasRole("User") && <ActiveBorrowingsBadge />}
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
