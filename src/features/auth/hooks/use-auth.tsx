"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { User, RegisterData } from "../types";
import * as authApi from "../services/auth-api";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface StoredUserShape {
  id: string;
  name: string;
  email: string;
  role: string;
  phoneNumber?: string;
  organizationId?: string;
  createdAt: string;
}

function mapStoredUserToUser(stored: StoredUserShape): User {
  return {
    id: stored.id,
    name: stored.name,
    email: stored.email,
    role: stored.role as User["role"],
    phoneNumber: stored.phoneNumber,
    organizationId: stored.organizationId ?? stored.id,
    createdAt: stored.createdAt,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = authApi.getStoredToken();
    if (!token) {
      queueMicrotask(() => setIsLoading(false));
      return;
    }

    authApi
      .fetchCurrentUser()
      .then((userData) => setUser(mapStoredUserToUser(userData)))
      .catch(() => authApi.removeStoredToken())
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);

    try {
      const { user: userData, token } = await authApi.loginUser(email, password);
      authApi.setStoredToken(token);
      setUser(mapStoredUserToUser(userData));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setError(null);
    setIsLoading(true);

    try {
      const { user: userData, token } = await authApi.registerUser(data);
      authApi.setStoredToken(token);
      setUser(mapStoredUserToUser(userData));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authApi.removeStoredToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
