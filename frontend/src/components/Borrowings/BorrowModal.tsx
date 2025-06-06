import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { formatISO } from "date-fns";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (returnDueDate: string) => void;
}

export const BorrowModal = ({ open, onClose, onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<{ returnDueDate: string }>({
    defaultValues: {
      returnDueDate: formatISO(new Date(Date.now() + 24 * 60 * 60 * 1000), {
        representation: "date",
      }),
    },
  });

  const minDate = formatISO(new Date(Date.now() + 24 * 60 * 60 * 1000), {
    representation: "date",
  });

  const maxDate = formatISO(new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), {
    representation: "date",
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Borrow Book</DialogTitle>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data.returnDueDate);
        })}
      >
        <DialogContent>
          <Controller
            name="returnDueDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Return Due Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  min: minDate,
                  max: maxDate,
                }}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
