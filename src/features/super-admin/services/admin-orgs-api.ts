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

export async function fetchOrganizationsApi(): Promise<Organization[]> {
  const res = await api.get("/api/superAdmin/organizations");
  return res.data.data;
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
