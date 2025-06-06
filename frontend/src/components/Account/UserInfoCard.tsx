import { Card, CardContent, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const UserInfoCard = () => {
  const { user } = useAuth();

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6">Account Info</Typography>
        <Typography variant="body1" mt={2}>
          <strong>Username:</strong> {user?.username}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {user?.email}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserInfoCard;
