import {
  Box,
  Typography,
  CircularProgress,
  Stack,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../../components/Pagination";
import { getAllUsers } from "../../api/users";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import UserCard from "../../components/users/UserCard";
import { downloadCsv } from "../../utils/downloadCsv";
import ExportCsvButton from "../../components/ExportCsvButton";

const UsersPage = () => {
  const { hasRole } = useAuth();

  if (!hasRole("Admin")) return <Navigate to="/" replace />;

  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ["users", page],
    queryFn: () => getAllUsers({ page }),
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" gutterBottom>
          All Users
        </Typography>
        <ExportCsvButton apiUrl="users" fileName="users.csv" />
      </Box>

      <Stack spacing={2}>
        {data?.items.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </Stack>

      <Pagination
        currentPage={page}
        totalPages={Math.ceil((data?.totalCount ?? 0) / 10)}
        onPageChange={setPage}
      />
    </Box>
  );
};

export default UsersPage;
