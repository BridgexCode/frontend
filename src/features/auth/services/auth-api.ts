import api from "@/shared/lib/axios";
import type { User, RegisterData } from "../types";

export async function fetchCurrentUser(): Promise<User> {
  const res = await api.get("/api/auth/me");
  return res.data.user;
}

export async function loginUser(
  email: string,
  password: string,
): Promise<{ user: User; token: string }> {
  const res = await api.post("/api/auth/login", { email, password });
  return { user: res.data.user, token: res.data.token };
}

export async function registerUser(
  data: RegisterData,
): Promise<{ user: User; token: string }> {
  const res = await api.post("/api/auth/register-organization", data);
  return { user: res.data.user, token: res.data.token };
}

export async function requestPasswordReset(email: string, redirectTo: string): Promise<void> {
  await api.post("/api/auth/request-password-reset", { email, redirectTo });
}

export async function resetPassword(token: string, newPassword: string): Promise<void> {
  await api.post("/api/auth/reset-password", { token, newPassword });
}

export async function logoutUser(token: string): Promise<void> {
  await api.post("/api/auth/logout", null, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
