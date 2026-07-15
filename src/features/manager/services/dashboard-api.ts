import api from "@/shared/lib/axios";

export interface DashboardStats {
  totalShipments: number;
  deliveredShipments: number;
  inTransitShipments: number;
  delayedShipments: number;
  totalDrivers: number;
  activeDrivers: number;
  totalVehicles: number;
  activeVehicles: number;
}

export async function fetchDashboardStatsApi(): Promise<DashboardStats> {
  const res = await api.get("/api/userDashboard/stats");
  return res.data.data;
}
