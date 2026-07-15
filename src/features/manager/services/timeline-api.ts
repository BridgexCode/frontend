import api from "@/shared/lib/axios";

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

export async function fetchTimelineApi(): Promise<ApiTimelineEvent[]> {
  const res = await api.get("/api/shipments/timeline");
  return res.data.data;
}
