import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  registerSchema,
  type RegisterFormValues,
} from "../../../schemas/auth/registerSchema";
import { registerUser } from "../../../api/auth";
import { useState } from "react";

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: RegisterFormValues) =>
      registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    onSuccess: () => {
      navigate("/login");
    },
    onError: () => {
      setShowError(true);
    },
  });

  const onSubmit = (values: RegisterFormValues) => {
    mutation.mutate(values);
  };

  return {
    form,
    onSubmit,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    showError,
    setShowError,
  };
};
