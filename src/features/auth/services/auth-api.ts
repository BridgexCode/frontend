import type { User, RegisterData } from "../types";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("naxivo_token");
}

export function setStoredToken(token: string): void {
  localStorage.setItem("naxivo_token", token);
}

export function removeStoredToken(): void {
  localStorage.removeItem("naxivo_token");
}

export async function fetchCurrentUser(): Promise<User> {
  const token = getStoredToken();
  if (!token) throw new Error("No token");

  const res = await fetch("/api/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();

  if (!res.ok) {
    removeStoredToken();
    throw new Error(data.error || "Failed to fetch user");
  }

  return data.user;
}

export async function loginUser(
  email: string,
  password: string
): Promise<{ user: User; token: string }> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Login failed");
  }

  return { user: data.user, token: data.token };
}

export async function registerUser(
  data: RegisterData
): Promise<{ user: User; token: string }> {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.error || "Registration failed");
  }

  return { user: responseData.user, token: responseData.token };
}
