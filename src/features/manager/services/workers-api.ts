import api from "@/shared/lib/axios";

export interface CreateWorkerPayload {
  name: string;
  phone: string;
}

export interface ApiWorker {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  organizationId?: string;
  isActive: boolean;
}

export interface WorkersListResponse {
  data: ApiWorker[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function fetchWorkersApi(
  params?: { page?: number; limit?: number; search?: string },
): Promise<WorkersListResponse> {
  const res = await api.get("/api/users", {
    params: { role: "WORKER", limit: 10, ...params },
  });
  if (Array.isArray(res.data)) {
    return { data: res.data, total: res.data.length, page: 1, limit: 10, totalPages: 1 };
  }
  if (Array.isArray(res.data.data) && res.data.total === undefined) {
    return { data: res.data.data, total: res.data.data.length, page: 1, limit: 10, totalPages: 1 };
  }
  return {
    data: res.data.data || [],
    total: res.data.total ?? 0,
    page: res.data.page ?? 1,
    limit: res.data.limit ?? 10,
    totalPages: res.data.totalPages ?? 1,
  };
}

export async function createWorkerApi(
  payload: CreateWorkerPayload,
): Promise<ApiWorker> {
  const res = await api.post("/api/users", {
    ...payload,
    role: "WORKER",
  });
  return res.data.user;
}

export async function toggleActiveWorkerApi(
  id: string,
): Promise<{ isActive: boolean }> {
  const res = await api.patch(`/api/users/${id}/toggle-active`);
  return res.data.data;
}

export async function deleteWorkerApi(id: string): Promise<void> {
  await api.patch(`/api/users/${id}/soft-delete`);
}
