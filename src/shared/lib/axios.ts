import axios from "axios";

export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("naxivo_token");
}

export function setStoredToken(token: string): void {
  localStorage.setItem("naxivo_token", token);
}

export function getStoredEmail(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("naxivo_email");
}

export function setStoredEmail(email: string): void {
  localStorage.setItem("naxivo_email", email);
}

export function removeStoredToken(): void {
  localStorage.removeItem("naxivo_token");
  localStorage.removeItem("naxivo_email");
}

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeStoredToken();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
