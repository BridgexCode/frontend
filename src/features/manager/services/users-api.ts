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

export interface UsersListResponse {
  data: ApiUser[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function fetchUsersApi(
  params?: { page?: number; limit?: number; role?: string; search?: string },
): Promise<UsersListResponse> {
  const res = await api.get("/api/users", { params: { limit: 10, ...params } });
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

export async function toggleActiveUserApi(
  id: string,
): Promise<{ isActive: boolean }> {
  const res = await api.patch(`/api/users/${id}/toggle-active`);
  return res.data.data;
}
