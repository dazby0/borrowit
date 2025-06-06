import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAuthToken,
  loginUser,
  logoutUser,
  registerUser,
} from "../../api/auth";
import type { LoginPayload, RegisterPayload } from "../../types/auth";

export const useLogin = () =>
  useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),
  });

export const useRegister = () =>
  useMutation({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),
  });

export const useLogout = () =>
  useMutation({
    mutationFn: logoutUser,
  });

export const useAuthToken = () =>
  useQuery({
    queryKey: ["auth-token"],
    queryFn: getAuthToken,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
