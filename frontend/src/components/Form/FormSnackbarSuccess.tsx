import { Snackbar, Alert } from "@mui/material";

interface Props {
  open: boolean;
  message: string;
}

const FormSnackbarSuccess = ({ open, message }: Props) => (
  <Snackbar open={open} autoHideDuration={3000}>
    <Alert severity="success" variant="filled">
      {message}
    </Alert>
  </Snackbar>
);

export default FormSnackbarSuccess;
