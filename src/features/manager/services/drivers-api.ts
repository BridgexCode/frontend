import api from "@/shared/lib/axios";

export interface CreateDriverPayload {
  name: string;
  phone: string;
  licenseNumber: string;
  vehicleNumber?: string;
}

export interface ApiDriver {
  _id: string;
  driverId?: string;
  orgId: string;
  name: string;
  phone: string;
  licenseNumber: string;
  vehicleNumber: string;
  telegramId?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface DriversListResponse {
  data: ApiDriver[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function fetchDriversApi(
  params?: { page?: number; limit?: number; search?: string; status?: string },
): Promise<DriversListResponse> {
  const res = await api.get("/api/drivers/get-drivers", { params: { limit: 10, ...params } });
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

export async function createDriverApi(
  payload: CreateDriverPayload,
): Promise<ApiDriver> {
  const res = await api.post("/api/drivers/create-driver", payload);
  return res.data.data;
}

export async function deleteDriverApi(driverId: string): Promise<void> {
  await api.delete(`/api/drivers/delete-driver/${driverId}`);
}
