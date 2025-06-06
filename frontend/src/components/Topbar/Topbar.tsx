import { AppBar, Toolbar, Typography } from "@mui/material";
import UserMenu from "./UserMenu";

const Topbar = () => {
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
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight={600} color="text.primary">
          BorrowIT
        </Typography>
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
