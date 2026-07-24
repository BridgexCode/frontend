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

export async function createVehicleApi(
  payload: CreateVehiclePayload,
): Promise<ApiVehicle> {
  const res = await api.post("/api/vehicles/create-vehicle", payload);
  return res.data.data;
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
  const res = await api.get("/api/vehicles/get-vehicles", { params: { limit: 3, ...params } });
  let items: ApiVehicle[] = [];
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

export async function fetchVehicleByIdApi(
  id: string,
): Promise<ApiVehicle> {
  const res = await api.get(`/api/vehicles/vehicleById/${id}`);
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
