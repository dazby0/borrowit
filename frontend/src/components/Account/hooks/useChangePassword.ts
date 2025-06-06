import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../../context/AuthContext";
import {
  changePasswordSchema,
  type ChangePasswordValues,
} from "../../../schemas/user/changePasswordSchema";
import { useChangePassword } from "../../../api/mutations/useAccount";

export const useChangePasswordForm = () => {
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const mutation = useChangePassword();

  const onSubmit = (data: ChangePasswordValues) => {
    setError(null);
    if (!user) return;

    mutation.mutate(
      { ...data, userId: user.id },
      {
        onSuccess: () => {
          form.reset({
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          });
          form.clearErrors();
        },
        onError: () => setError("Invalid current password or request failed"),
      }
    );
  };

  return {
    form,
    onSubmit,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error,
  };
};
