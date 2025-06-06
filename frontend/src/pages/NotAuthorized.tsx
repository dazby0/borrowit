import { Box, Typography } from "@mui/material";

const NotAuthorized = () => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h4" color="error">
        403 – You are not authorized to view this page.
      </Typography>
    </Box>
  );
};

export default NotAuthorized;
