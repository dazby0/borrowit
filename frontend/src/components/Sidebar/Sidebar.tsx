import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
} from "@mui/material";
import { Home, MenuBook, People, AccountCircle } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const drawerWidth = 240;

const Sidebar = () => {
  const { hasRole } = useAuth();

  const items = [
    { label: "Dashboard", icon: <Home />, to: "/" },
    { label: "Borrowings", icon: <MenuBook />, to: "/borrowings" },
    ...(hasRole("Admin")
      ? [{ label: "Admin Panel", icon: <People />, to: "/admin/users" }]
      : []),
    { label: "Profile", icon: <AccountCircle />, to: "/account" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "background.paper",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {items.map(({ label, icon, to }) => (
            <ListItemButton
              key={label}
              component={NavLink}
              to={to}
              sx={{
                "&.active": {
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  "& .MuiListItemIcon-root": { color: "primary.contrastText" },
                },
              }}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
