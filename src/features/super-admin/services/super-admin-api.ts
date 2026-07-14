import api from "@/shared/lib/axios";

export interface OrganizationResponse {
  _id: string;
  name: string;
  slug: string;
  status: "active" | "inactive";
  metadata?: {
    phone?: string;
    country?: string;
    timezone?: string;
    plan?: string;
    totalUsers?: number;
    totalShipments?: number;
    email?: string;
    [key: string]: any;
  };
  createdAt: string;
}

export interface DashboardResponse {
  totalOrganizations: number;
}

export async function fetchDashboardStatsApi(): Promise<DashboardResponse> {
  const res = await api.get("/api/superAdmin/dashboard");
  return res.data.data;
}

export async function fetchOrganizationsApi(): Promise<OrganizationResponse[]> {
  const res = await api.get("/api/superAdmin/organizations");
  return res.data.data;
}

export async function fetchOrganizationByIdApi(id: string): Promise<OrganizationResponse> {
  const res = await api.get(`/api/superAdmin/organizations/${id}`);
  return res.data.data;
}

export async function updateOrganizationStatusApi(
  id: string,
  status: "active" | "inactive",
): Promise<OrganizationResponse> {
  const res = await api.patch(`/api/superAdmin/organizations/${id}/status`, { status });
  return res.data.data;
}

export async function deleteOrganizationApi(id: string): Promise<{ success: boolean; message: string }> {
  const res = await api.delete(`/api/superAdmin/organizations/${id}`);
  return res.data;
}
