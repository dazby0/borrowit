import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useAuth } from "../../context/AuthContext";
import type { UserRole } from "../../types/user";

interface Props {
  children: JSX.Element;
  allowedRoles: UserRole[];
}

const RoleProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { isLoading, isAuthenticated, hasRole } = useAuth();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!hasRole(allowedRoles)) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};

export default RoleProtectedRoute;
