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

export async function fetchVehiclesApi(): Promise<ApiVehicle[]> {
  const res = await api.get("/api/vehicles/get-vehicles");
  return res.data.data;
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
