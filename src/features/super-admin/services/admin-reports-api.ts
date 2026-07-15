import api from "@/shared/lib/axios";

export interface MonthlyShipment {
  month: string;
  shipments: number;
}

export interface PlanDistribution {
  label: string;
  value: number;
  color: string;
  total: number;
}

export interface OrganizationGrowth {
  month: string;
  orgs: number;
}

export async function fetchMonthlyShipmentsApi(): Promise<MonthlyShipment[]> {
  const res = await api.get("/api/superAdmin/reports/monthly-shipments");
  return res.data.data;
}

export async function fetchPlanDistributionApi(): Promise<PlanDistribution[]> {
  const res = await api.get("/api/superAdmin/reports/plan-distribution");
  return res.data.data;
}

export async function fetchOrganizationGrowthApi(): Promise<OrganizationGrowth[]> {
  const res = await api.get("/api/superAdmin/reports/organization-growth");
  return res.data.data;
}
