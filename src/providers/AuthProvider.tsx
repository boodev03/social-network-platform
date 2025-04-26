/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import Cookies from "js-cookie";

// Cookie options
const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  secure: process.env.NODE_ENV === "production", // secure in production
  sameSite: "strict" as const,
};

// Cookie keys
const COOKIE_KEYS = {
  USER: "user_data",
  TOKEN: "auth_token",
};

interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User, token?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for user data in cookies on mount
    const checkAuth = async () => {
      setIsLoading(true);
      const userCookie = Cookies.get(COOKIE_KEYS.USER);
      const tokenCookie = Cookies.get(COOKIE_KEYS.TOKEN);

      if (userCookie && tokenCookie) {
        try {
          const userData = JSON.parse(userCookie);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error parsing stored user data:", error);
          Cookies.remove(COOKIE_KEYS.USER);
          Cookies.remove(COOKIE_KEYS.TOKEN);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData: User, token?: string) => {
    setUser(userData);
    setIsAuthenticated(true);

    // Save user data to cookie
    Cookies.set(COOKIE_KEYS.USER, JSON.stringify(userData), COOKIE_OPTIONS);

    // If token is provided, save it to cookie
    if (token) {
      Cookies.set(COOKIE_KEYS.TOKEN, token, COOKIE_OPTIONS);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);

    // Remove cookies
    Cookies.remove(COOKIE_KEYS.USER);
    Cookies.remove(COOKIE_KEYS.TOKEN);

    navigate(ROUTES.AUTH.SIGN_IN);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
