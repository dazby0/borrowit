import { useMutation } from "@tanstack/react-query";
import { createAdmin } from "../admin";
import type { CreateAdminFormValues } from "../../schemas/user/createAdminSchema";

export const useCreateAdmin = () =>
  useMutation({
    mutationFn: (payload: CreateAdminFormValues) => createAdmin(payload),
  });
