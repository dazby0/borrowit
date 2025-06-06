import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
}

const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  loading = false,
}: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          {cancelLabel}
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          disabled={loading}
          color="primary"
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
