"use client";
import { useUserMe } from "@/service/query/useUsers";
import { User } from "@/types/api-user-type";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading, isError } = useUserMe();
  const queryClient = useQueryClient();
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      setAuthenticatedUser(user);
    }
    if (isError) {
      setAuthenticatedUser(null);
    }
  }, [user, isError]);

  const logout = () => {
    localStorage.removeItem("authtoken");
    setAuthenticatedUser(null);
    queryClient.invalidateQueries({ queryKey: ["user", "me"] });
  };

  return (
    <AuthContext.Provider
      value={{ user: authenticatedUser, isLoading, logout }}
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
