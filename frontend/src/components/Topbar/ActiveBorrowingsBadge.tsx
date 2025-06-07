import { Chip } from "@mui/material";
import { useActiveBorrowingsCount } from "../../api/mutations/useBorrowings";

const MAX_BORROWINGS = 3;

const ActiveBorrowingsBadge = () => {
  const { data: count, isLoading } = useActiveBorrowingsCount();

  if (isLoading || count === undefined) return null;

  return (
    <Chip
      label={`You have ${count} / ${MAX_BORROWINGS} active borrowings`}
      color={count >= MAX_BORROWINGS ? "warning" : "primary"}
      size="small"
      sx={{ p: 2 }}
    />
  );
};

export default ActiveBorrowingsBadge;
