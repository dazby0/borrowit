import { Snackbar as MuiSnackbar, Alert, type AlertColor } from "@mui/material";

interface Props {
  open: boolean;
  message: string;
  severity?: AlertColor;
  duration?: number;
  onClose?: () => void;
}

const Snackbar = ({
  open,
  message,
  severity = "success",
  duration = 3000,
  onClose,
}: Props) => (
  <MuiSnackbar open={open} autoHideDuration={duration} onClose={onClose}>
    <Alert severity={severity} variant="filled" onClose={onClose}>
      {message}
    </Alert>
  </MuiSnackbar>
);

export default Snackbar;
