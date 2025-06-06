import type { LoginPayload, RegisterPayload } from "../types/auth";
import type { User } from "../types/user";

const API_URL = "http://localhost:5127/api/auth";

export const loginUser = async (data: LoginPayload): Promise<void> => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Invalid login credentials");
  }
};

export const getAuthToken = async (): Promise<User> => {
  const response = await fetch("http://localhost:5127/api/users/me", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
};

export const logoutUser = async (): Promise<void> => {
  await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
};

export const registerUser = async (data: RegisterPayload): Promise<void> => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }
};
