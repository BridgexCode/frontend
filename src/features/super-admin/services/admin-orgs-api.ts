import api from "@/shared/lib/axios";

export interface Organization {
  _id: string;
  name: string;
  slug: string;
  email: string;
  phone: string;
  plan: string;
  status: "active" | "inactive";
  totalUsers: number;
  totalShipments: number;
  createdAt: string;
  updatedAt?: string;
}

export interface OrganizationsListResponse {
  data: Organization[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function fetchOrganizationsApi(
  params?: { page?: number; limit?: number; search?: string; status?: string },
): Promise<OrganizationsListResponse> {
  const res = await api.get("/api/superAdmin/organizations", { params: { limit: 10, ...params } });
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

export async function fetchOrganizationByIdApi(id: string): Promise<Organization> {
  const res = await api.get(`/api/superAdmin/organizations/${id}`);
  return res.data.data;
}

export async function toggleOrganizationStatusApi(
  id: string,
  status: "active" | "inactive",
): Promise<Organization> {
  const res = await api.patch(`/api/superAdmin/organizations/${id}/status`, { status });
  return res.data.data;
}

export async function deleteOrganizationApi(id: string): Promise<void> {
  await api.delete(`/api/superAdmin/organizations/${id}`);
}
