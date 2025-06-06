import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../account";
import type { ChangePasswordValues } from "../../schemas/user/changePasswordSchema";

export const useChangePassword = () =>
  useMutation({
    mutationFn: (payload: ChangePasswordValues & { userId: number }) =>
      changePassword(payload, payload.userId),
  });
