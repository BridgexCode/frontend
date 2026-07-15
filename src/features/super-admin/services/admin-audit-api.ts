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

export async function fetchAuditLogsApi(
  params?: { search?: string; type?: string },
): Promise<AuditLog[]> {
  const res = await api.get("/api/superAdmin/audit-logs", { params });
  return res.data.data;
}
