import api from "@/shared/lib/axios";

export interface ApiUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  organizationId?: string;
  isActive: boolean;
}

export async function fetchUsersApi(): Promise<ApiUser[]> {
  const res = await api.get("/api/users");
  return res.data.data;
}

export async function toggleActiveUserApi(
  id: string,
): Promise<{ isActive: boolean }> {
  const res = await api.patch(`/api/users/${id}/toggle-active`);
  return res.data.data;
}
