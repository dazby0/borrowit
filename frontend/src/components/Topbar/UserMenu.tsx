import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { Settings, Logout } from "@mui/icons-material";
import { getInitials } from "../../utils/getInitials";
import { useUserMenu } from "./hooks/useUserMenu";

const UserMenu = () => {
  const {
    user,
    anchorEl,
    open,
    handleOpen,
    handleClose,
    handleLogout,
    handleAccount,
  } = useUserMenu();

  return (
    <>
      <IconButton onClick={handleOpen} sx={{ p: 0 }}>
        <Avatar
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            width: 40,
            height: 40,
            fontWeight: 600,
          }}
        >
          {getInitials(user?.username)}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            elevation: 3,
            sx: {
              mt: 1,
              borderRadius: 2,
              minWidth: 180,
              backgroundColor: "background.paper",
            },
          },
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ px: 2, pt: 1, color: "text.primary" }}
        >
          {user?.username}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <MenuItem onClick={handleAccount}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Manage account
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Log out
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
