import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
  Avatar,
  ListItemAvatar,
} from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import PeopleIcon from "@mui/icons-material/People";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { useStatistics } from "../../api/mutations/useBorrowings";

const StatisticsPanel = () => {
  const { data, isLoading, isError } = useStatistics();

  if (isLoading)
    return (
      <Typography
        variant="h6"
        align="center"
        sx={{ mt: 4, fontWeight: "bold", color: "text.secondary" }}
      >
        Loading statistics...
      </Typography>
    );
  if (isError)
    return (
      <Typography
        variant="h6"
        align="center"
        sx={{ mt: 4, fontWeight: "bold", color: "error.main" }}
      >
        Failed to load statistics.
      </Typography>
    );

  return (
    <Paper
      elevation={4}
      sx={{
        p: 4,
        maxWidth: 700,
        mx: "auto",
        borderRadius: 3,
        bgcolor: "background.paper",
      }}
    >
      <Typography
        variant="h4"
        mb={3}
        sx={{ fontWeight: "bold", color: "primary.main", textAlign: "center" }}
      >
        Library Statistics
      </Typography>

      <Box
        display="flex"
        justifyContent="space-around"
        mb={4}
        flexWrap="wrap"
        gap={3}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          sx={{
            bgcolor: "primary.light",
            color: "primary.contrastText",
            p: 2,
            borderRadius: 2,
            minWidth: 180,
            boxShadow: 2,
          }}
        >
          <LocalLibraryIcon fontSize="large" />
          <Box>
            <Typography
              variant="subtitle2"
              sx={{ opacity: 0.8, color: "text.primary" }}
            >
              Active Borrowings
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {data?.activeBorrowings}
            </Typography>
          </Box>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          gap={1}
          sx={{
            bgcolor: "secondary.light",
            color: "secondary.contrastText",
            p: 2,
            borderRadius: 2,
            minWidth: 180,
            boxShadow: 2,
          }}
        >
          <PeopleIcon fontSize="large" />
          <Box>
            <Typography
              variant="subtitle2"
              sx={{ opacity: 0.8, color: "divider" }}
            >
              Active Users
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {data?.activeUsers}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Typography
        variant="h6"
        mb={2}
        sx={{ fontWeight: "bold", color: "text.primary" }}
      >
        Top 5 Most Borrowed Books
      </Typography>
      <List>
        {data?.mostBorrowedBooks.map((book, i) => (
          <ListItem
            key={i}
            sx={{
              borderRadius: 2,
              mb: 1,
              boxShadow: 1,
              bgcolor: "background.default",
              transition: "background-color 0.2s",
              "&:hover": {
                bgcolor: "primary.light",
                color: "primary.contrastText",
                cursor: "pointer",
              },
            }}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "primary.main" }}>
                <BookIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={book.title}
              secondary={`${book.count} times borrowed`}
              primaryTypographyProps={{ fontWeight: "medium" }}
              secondaryTypographyProps={{ color: "text.secondary" }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default StatisticsPanel;
