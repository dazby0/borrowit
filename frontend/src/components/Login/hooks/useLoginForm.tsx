import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  loginSchema,
  type LoginFormValues,
} from "../../../schemas/auth/loginSchema";
import { useLogin } from "../../../api/mutations/useAuth";
import { getAuthToken } from "../../../api/auth";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLogin();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await loginMutation.mutateAsync(data);
      await queryClient.invalidateQueries({ queryKey: ["auth-token"] });
      await getAuthToken();
      navigate("/");
    } catch {
      alert("Login failed. Please check your credentials.");
    }
  };

  return {
    form,
    onSubmit,
    isLoading: loginMutation.isPending,
  };
};
