import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createAdminSchema,
  type CreateAdminFormValues,
} from "../../../schemas/user/createAdminSchema";
import { useCreateAdmin } from "../../../api/mutations/useAdmin";

export const useCreateAdminForm = () => {
  const form = useForm<CreateAdminFormValues>({
    resolver: zodResolver(createAdminSchema),
  });

  const mutation = useCreateAdmin();

  const onSubmit = (data: CreateAdminFormValues) => {
    mutation.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return {
    form,
    onSubmit,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
