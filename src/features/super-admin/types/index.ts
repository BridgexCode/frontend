export type OrgPlan = "FREE" | "PRO" | "ENTERPRISE";
export type OrgStatus = "ACTIVE" | "SUSPENDED";
export type AdminUserRole = "SUPER_ADMIN" | "ORGANIZATION_OWNER" | "OPERATIONS_MANAGER" | "WORKER";
export type AdminUserStatus = "ACTIVE" | "INACTIVE";
export type AuditEventType = "info" | "warning" | "error";

export interface Organization {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: OrgPlan;
  status: OrgStatus;
  totalUsers: number;
  totalShipments: number;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminUserRole;
  organizationId: string;
  organizationName: string;
  status: AdminUserStatus;
  createdAt: string;
}

export interface SystemStats {
  totalOrganizations: number;
  totalUsers: number;
  totalShipments: number;
  activeOrganizations: number;
  shipmentsToday: number;
  activeUsers: number;
  systemUptime: string;
}

export interface AuditLog {
  id: string;
  event: string;
  description: string;
  user: string;
  userEmail: string;
  ip: string;
  timestamp: string;
  type: AuditEventType;
}

export interface AdminShipment {
  id: string;
  trackingId: string;
  organizationId: string;
  organizationName: string;
  route: string;
  driver: string;
  status: "DELIVERED" | "IN TRANSIT" | "DELAYED" | "PENDING";
  priority: "Low" | "Medium" | "High" | "Urgent";
  customer: string;
  createdAt: string;
}
