"use client";

import { create } from "zustand";
import axios from "axios";
import type { User, RegisterData } from "../types";
import api, { setStoredToken, removeStoredToken, getStoredToken } from "@/shared/lib/axios";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  fetchUser: async () => {
    const token = getStoredToken();
    if (!token) {
      set({ isLoading: false });
      return;
    }
    try {
      const res = await api.get("/api/auth/me");
      set({ user: res.data.user, isAuthenticated: true, isLoading: false });
    } catch {
      removeStoredToken();
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  login: async (email: string, password: string) => {
    set({ error: null, isLoading: true });
    try {
      const res = await api.post("/api/auth/login", { email, password });
      const { user, token } = res.data;
      setStoredToken(token);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.error || "Login failed"
        : "Login failed";
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  register: async (data: RegisterData) => {
    set({ error: null, isLoading: true });
    try {
      const res = await api.post("/api/auth/register-organization", data);
      const { user, token } = res.data;
      setStoredToken(token);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.error || "Registration failed"
        : "Registration failed";
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  logout: async () => {
    try {
      await api.post("/api/auth/logout");
    } catch {
      // proceed with local logout
    }
    removeStoredToken();
    set({ user: null, isAuthenticated: false, error: null });
  },

  clearError: () => set({ error: null }),
}));
