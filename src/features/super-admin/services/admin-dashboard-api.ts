import api from "@/shared/lib/axios";

export interface DashboardStats {
  totalOrganizations: number;
  activeOrganizations: number;
  totalUsers: number;
  totalShipments: number;
  recentActivity: {
    event: string;
    description: string;
    time: string;
    type: "info" | "error";
  }[];
}

export async function fetchDashboardStatsApi(): Promise<DashboardStats> {
  const res = await api.get("/api/superAdmin/dashboard");
  return res.data.data;
}
