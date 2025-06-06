export type UserRole = "User" | "Admin";

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
}
