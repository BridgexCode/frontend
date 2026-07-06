import api from "@/shared/lib/axios";

export interface CreateDriverPayload {
  name: string;
  phone: string;
  licenseNumber: string;
  vehicleNumber: string;
}

export interface ApiDriver {
  _id: string;
  orgId: string;
  name: string;
  phone: string;
  licenseNumber: string;
  vehicleNumber: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export async function fetchDriversApi(): Promise<ApiDriver[]> {
  const res = await api.get("/api/drivers/get-drivers");
  return res.data.data;
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
