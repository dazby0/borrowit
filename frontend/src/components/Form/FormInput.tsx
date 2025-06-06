import { TextField, type TextFieldProps } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

interface FormInputProps extends Omit<TextFieldProps, "name"> {
  name: string;
}

const FormInput = ({ name, ...props }: FormInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          {...props}
          fullWidth
          error={!!fieldError}
          helperText={fieldError?.message?.toString()}
          margin="normal"
        />
      )}
    />
  );
};

export default FormInput;
