import { Typography, Box } from "@mui/material";

const Home = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight={600}>
        Welcome to BorrowIT!
      </Typography>
      <Typography variant="body1" color="text.secondary" mt={2}>
        This is your main dashboard. All your borrowed books and statistics will
        appear here soon.
      </Typography>
    </Box>
  );
};

export default Home;
