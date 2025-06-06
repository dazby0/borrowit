import { Box } from "@mui/material";
import Topbar from "../Topbar/Topbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const SidebarLayout = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Topbar />
        <Box sx={{ flexGrow: 1, p: 3, overflow: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarLayout;
