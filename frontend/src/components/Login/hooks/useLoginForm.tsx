import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import {
  loginSchema,
  type LoginFormValues,
} from "../../../schemas/auth/loginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../../../api/mutations/useAuth";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { refetchUser } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLogin();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await loginMutation.mutateAsync(data);
      await queryClient.invalidateQueries({ queryKey: ["auth-token"] });
      await refetchUser();
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
