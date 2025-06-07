import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
} from "@mui/material";
import {
  Home,
  MenuBook,
  People,
  AccountCircle,
  LibraryBooks,
  Assessment,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";

const drawerWidth = 240;

const Sidebar = () => {
  const { hasRole } = useAuth();

  const items = [
    { label: "Main Page", icon: <Home />, to: "/" },

    ...(!hasRole("Admin")
      ? [{ label: "Borrowed Books", icon: <MenuBook />, to: "/borrowings/me" }]
      : []),

    ...(hasRole("Admin")
      ? [
          {
            label: "All Borrowings",
            icon: <LibraryBooks />,
            to: "/borrowings/all",
          },
          { label: "Users", icon: <People />, to: "/users" },
          {
            label: "Add Book",
            icon: <MenuBook />,
            to: "/add-book",
          },
          {
            label: "Dashboard",
            icon: <Assessment />,
            to: "/dashboard",
          },
        ]
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
      <Box component="img" src={logo} alt="BorrowIT Logo" sx={{ p: 2 }} />
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
