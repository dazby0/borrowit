import { Paper, Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import ConfirmationModal from "../ConfirmationModal";
import { useDeleteUser } from "../../api/mutations/useUsers";
import type { User } from "../../types/user";

interface Props {
  user: User;
}

const UserCard = ({ user }: Props) => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const deleteMutation = useDeleteUser();

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(user.id);
    } catch (error) {
    } finally {
      setOpenConfirm(false);
    }
  };

  return (
    <>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="subtitle1">{user.username}</Typography>
          <Typography variant="body2">{user.email}</Typography>
          <Typography variant="caption" color="text.secondary">
            Role: {user.role}
          </Typography>
        </Box>

        <Button
          variant="outlined"
          color="error"
          onClick={() => setOpenConfirm(true)}
          disabled={deleteMutation.isPending}
        >
          Delete
        </Button>
      </Paper>

      <ConfirmationModal
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete "${user.username}"?`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        loading={deleteMutation.isPending}
      />
    </>
  );
};

export default UserCard;
