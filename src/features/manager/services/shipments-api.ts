import api from "@/shared/lib/axios";

export interface CreateShipmentPayload {
  pickupLocation: string;
  destination: string;
  customerName: string;
  expectedDeliveryDate: string;
  assignedDriverId?: string;
  assignedVehicleId?: string;
  notes?: string;
}

export interface ApiShipment {
  _id: string;
  shipmentId: string;
  orgId: string;
  pickupLocation: string;
  destination: string;
  customerName: string;
  assignedDriverId?: string;
  assignedVehicleId?: string;
  assignedOperationsManagerId?: string;
  expectedDeliveryDate: string;
  statusLifecycle: string;
  timeline?: unknown[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShipmentsListResponse {
  data: ApiShipment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const STATUS_MAP: Record<string, string> = {
  created: "Pending",
  assigned: "Dispatched",
  picked_up: "Picked Up",
  in_transit: "In Transit",
  delivered: "Delivered",
  cancelled: "Failed",
  delayed: "Delayed",
};

export const UI_TO_BACKEND_STATUS: Record<string, string> = {
  Pending: "created",
  Dispatched: "assigned",
  "Picked Up": "picked_up",
  "In Transit": "in_transit",
  Delivered: "delivered",
  Delayed: "delayed",
  Failed: "cancelled",
};

export function mapStatus(backendStatus: string): string {
  return STATUS_MAP[backendStatus] || backendStatus;
}

export function toBackendStatus(uiStatus: string): string {
  return UI_TO_BACKEND_STATUS[uiStatus] || uiStatus.toLowerCase();
}

export async function createShipmentApi(
  payload: CreateShipmentPayload,
): Promise<ApiShipment> {
  const res = await api.post("/api/shipments/create-shipment", payload);
  return res.data.data;
}

export async function fetchShipmentsApi(
  params?: { page?: number; limit?: number; status?: string },
): Promise<ShipmentsListResponse> {
  const res = await api.get("/api/shipments/get-shipments", { params: { limit: 10, ...params } });
  const total = res.data.total ?? res.data.data?.length ?? 0;
  const limit = res.data.limit ?? 10;
  return {
    data: res.data.data || [],
    total,
    page: res.data.page ?? 1,
    limit,
    totalPages: res.data.totalPages ?? (Math.ceil(total / limit) || 1),
  };
}

export async function fetchShipmentByIdApi(
  id: string,
): Promise<ApiShipment> {
  const res = await api.get(`/api/shipments/shipmentById/${id}`);
  return res.data.data;
}

export interface UpdateShipmentPayload {
  pickupLocation?: string;
  destination?: string;
  customerName?: string;
  expectedDeliveryDate?: string;
  notes?: string;
  assignedVehicleId?: string;
}

export async function updateShipmentApi(
  id: string,
  payload: UpdateShipmentPayload,
): Promise<ApiShipment> {
  const res = await api.put(`/api/shipments/${id}`, payload);
  return res.data.data;
}

export async function assignDriverApi(
  shipmentId: string,
  driverId: string,
  vehicleId?: string,
): Promise<ApiShipment> {
  const res = await api.put(`/api/shipments/${shipmentId}/assign-driver`, { driverId, vehicleId });
  return res.data.data;
}

export async function deleteShipmentApi(id: string): Promise<void> {
  await api.delete(`/api/shipments/${id}`);
}

export async function updateShipmentStatusApi(
  id: string,
  status: string,
): Promise<ApiShipment> {
  const res = await api.patch(`/api/shipments/${id}/status`, { status });
  return res.data.data;
}
