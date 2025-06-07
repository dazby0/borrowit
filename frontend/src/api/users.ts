import type { PagedResult } from "../types/book";
import type { User, UserQueryParams } from "../types/user";

const API_URL = "http://localhost:5127/api/users";

export const getAllUsers = async (
  params: UserQueryParams = {}
): Promise<PagedResult<User>> => {
  const query = new URLSearchParams();
  if (params.username) query.append("username", params.username);
  if (params.page) query.append("page", String(params.page));
  if (params.pageSize) query.append("pageSize", String(params.pageSize));

  const res = await fetch(`${API_URL}?${query.toString()}`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

export const deleteUser = async (id: number): Promise<void> => {
  const res = await fetch(`http://localhost:5127/api/users/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to delete user");
  }
};
