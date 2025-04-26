import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { ROUTES } from "@/constants/routes";
import LoadingScreen from "../ui/LoadingScreen";

export const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(ROUTES.AUTH.SIGN_IN);
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Show loading screen while checking authentication
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Return null if not authenticated (redirect will happen in useEffect)
  if (!isAuthenticated) {
    return null;
  }

  return <Outlet />;
};
