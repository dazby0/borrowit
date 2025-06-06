import type { CreateAdminFormValues } from "../schemas/user/createAdminSchema";

const API_URL = "http://localhost:5127/api/users";

export const createAdmin = async (
  data: CreateAdminFormValues
): Promise<void> => {
  const response = await fetch(`${API_URL}/admin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to create admin");
  }
};
