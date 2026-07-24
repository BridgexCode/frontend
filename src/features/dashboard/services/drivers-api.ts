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
  let items: ApiDriver[] = [];
  let total = 0;
  let page = params?.page || 1;
  let limit = params?.limit || 10;
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

export async function createDriverApi(
  payload: CreateDriverPayload,
): Promise<ApiDriver> {
  const res = await api.post("/api/drivers/create-driver", payload);
  return res.data.data;
}

export async function deleteDriverApi(driverId: string): Promise<void> {
  await api.delete(`/api/drivers/delete-driver/${driverId}`);
}
