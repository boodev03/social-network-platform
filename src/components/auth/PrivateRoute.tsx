import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { ROUTES } from "@/constants/routes";

export const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(ROUTES.AUTH.SIGN_IN);
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Show nothing while checking auth state
  if (isLoading) {
    return null;
  }

  // Only render when authenticated
  if (!isAuthenticated) {
    return null;
  }

  return <Outlet />;
};
