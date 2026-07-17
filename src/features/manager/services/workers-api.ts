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

export async function fetchWorkersApi(): Promise<ApiWorker[]> {
  const res = await api.get("/api/users", { params: { role: "WORKER" } });
  return res.data.data;
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
