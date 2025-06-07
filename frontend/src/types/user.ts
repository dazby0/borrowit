export type UserRole = "User" | "Admin";

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
}

export interface UserQueryParams {
  username?: string;
  page?: number;
  pageSize?: number;
}
