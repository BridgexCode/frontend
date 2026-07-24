import api from "@/shared/lib/axios";

export interface CreateVehiclePayload {
  vehicleNumber: string;
  vehicleModel: string;
  type: "truck" | "van" | "pickup" | "bike" | "other";
  driverId?: string;
}

export interface UpdateVehiclePayload {
  vehicleNumber?: string;
  vehicleModel?: string;
  type?: "truck" | "van" | "pickup" | "bike" | "other";
  driverId?: string;
  status?: "available" | "assigned" | "maintenance" | "inactive";
}

export interface ApiVehicle {
  _id: string;
  orgId: string;
  vehicleNumber: string;
  vehicleModel: string;
  type: string;
  driverId?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface VehiclesListResponse {
  data: ApiVehicle[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function fetchVehiclesApi(
  params?: { page?: number; limit?: number; search?: string; status?: string },
): Promise<VehiclesListResponse> {
  const res = await api.get("/api/vehicles/get-vehicles", { params: { limit: 10, ...params } });
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

export async function createVehicleApi(
  payload: CreateVehiclePayload,
): Promise<ApiVehicle> {
  const res = await api.post("/api/vehicles/create-vehicle", payload);
  return res.data.data;
}

export async function updateVehicleApi(
  id: string,
  payload: UpdateVehiclePayload,
): Promise<ApiVehicle> {
  const res = await api.put(`/api/vehicles/update-vehicle/${id}`, payload);
  return res.data.data;
}

export async function deleteVehicleApi(id: string): Promise<void> {
  await api.delete(`/api/vehicles/delete-vehicle/${id}`);
}
