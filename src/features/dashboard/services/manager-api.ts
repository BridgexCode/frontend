import api from "@/shared/lib/axios";

export interface CreateManagerPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface UpdateManagerPayload {
  name?: string;
  phone?: string;
  isActive?: boolean;
}

export interface ApiManagerResponse {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  organizationId?: string;
  isActive: boolean;
  isDeleted?: boolean;
}

export async function fetchManagersApi(): Promise<ApiManagerResponse[]> {
  const res = await api.get("/api/users");
  return res.data.data;
}

export async function createManagerApi(
  data: CreateManagerPayload,
): Promise<ApiManagerResponse> {
  const res = await api.post("/api/users", { ...data, role: "OPERATIONS_MANAGER" });
  return res.data.user;
}

export async function updateManagerApi(
  id: string,
  data: UpdateManagerPayload,
): Promise<ApiManagerResponse> {
  const res = await api.patch(`/api/users/${id}/update-user`, data);
  return res.data.data;
}

export async function toggleActiveManagerApi(
  id: string,
): Promise<{ isActive: boolean }> {
  const res = await api.patch(`/api/users/${id}/toggle-active`);
  return res.data.data;
}

export async function softDeleteManagerApi(id: string): Promise<void> {
  await api.patch(`/api/users/${id}/soft-delete`);
}
