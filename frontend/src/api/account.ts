import type { ChangePasswordValues } from "../schemas/user/changePasswordSchema";

const API_URL = "http://localhost:5127/api/users";

export const changePassword = async (
  data: ChangePasswordValues,
  userId: number
): Promise<void> => {
  const response = await fetch(`${API_URL}/${userId}/password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to change password");
  }
};
