import api from "@/shared/lib/axios";

export interface CreateShipmentPayload {
  pickupLocation: string;
  destination: string;
  customerName: string;
  expectedDeliveryDate: string;
  assignedDriverId?: string;
}

export interface ApiShipment {
  _id: string;
  shipmentId: string;
  orgId: string;
  pickupLocation: string;
  destination: string;
  customerName: string;
  assignedDriverId?: string;
  assignedOperationsManagerId?: string;
  expectedDeliveryDate: string;
  statusLifecycle: string;
  timeline?: unknown[];
  createdAt: string;
  updatedAt: string;
}

export interface ShipmentsListResponse {
  data: ApiShipment[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiTimelineEvent {
  id: string;
  shipmentId: string;
  trackingId: string;
  type: "creation" | "assignment" | "status" | "delivery" | "failed";
  title: string;
  description: string;
  timestamp: string;
  user: string;
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
  const res = await api.get("/api/shipments/get-shipments", { params });
  return res.data;
}

export async function fetchShipmentByIdApi(
  id: string,
): Promise<ApiShipment> {
  const res = await api.get(`/api/shipments/shipmentById/${id}`);
  return res.data.data;
}

export async function fetchTimelineApi(): Promise<ApiTimelineEvent[]> {
  const res = await api.get("/api/shipments/timeline");
  return res.data.data;
}
