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

export interface ManagersListResponse {
  data: ApiManagerResponse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function fetchManagersApi(
  params?: { page?: number; limit?: number; search?: string; role?: string },
): Promise<ManagersListResponse> {
  const res = await api.get("/api/users", { params: { limit: 3, ...params } });
  let items: ApiManagerResponse[] = [];
  let total = 0;
  let page = params?.page || 1;
  let limit = params?.limit || 3;
  let totalPages = 1;

  if (Array.isArray(res.data)) {
    items = res.data;
    total = items.length;
  } else if (res.data && Array.isArray(res.data.data)) {
    items = res.data.data;
    total = res.data.total ?? items.length;
    page = res.data.page ?? page;
    limit = res.data.limit ?? limit;
    totalPages = res.data.totalPages ?? (Math.ceil(total / limit) || 1);
  }

  return { data: items, total, page, limit, totalPages };
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
