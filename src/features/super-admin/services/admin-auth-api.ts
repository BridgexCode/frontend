import api, { setStoredToken, setStoredEmail, removeStoredToken } from "@/shared/lib/axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    organizationId?: string;
    phoneNumber: string;
    createdAt: string;
  };
}

export async function loginApi(payload: LoginPayload): Promise<LoginResponse> {
  const res = await api.post("/api/auth/login", payload);
  const data = res.data;
  setStoredToken(data.token);
  setStoredEmail(data.user.email);
  return data;
}

export async function logoutApi(): Promise<void> {
  try {
    await api.post("/api/auth/logout");
  } finally {
    removeStoredToken();
  }
}

export async function getMeApi(): Promise<LoginResponse["user"]> {
  const res = await api.get("/api/auth/me");
  return res.data.user;
}
