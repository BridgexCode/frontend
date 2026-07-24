import api from "@/shared/lib/axios";

export interface AuditLog {
  id: string;
  event: string;
  description: string;
  user: string;
  userEmail: string;
  ip: string;
  timestamp: string;
  type: "info" | "warning" | "error";
}

export interface AuditLogsListResponse {
  data: AuditLog[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function fetchAuditLogsApi(
  params?: { page?: number; limit?: number; search?: string; type?: string },
): Promise<AuditLogsListResponse> {
  const res = await api.get("/api/superAdmin/audit-logs", { params: { limit: 10, ...params } });
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
