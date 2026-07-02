import type { Organization, AdminUser, SystemStats, AuditLog, AdminShipment } from "../types";

export const MOCK_ORGANIZATIONS: Organization[] = [
  { id: "ORG001", name: "SpeedX Logistics", email: "admin@speedx.com", phone: "9876543210", plan: "ENTERPRISE", status: "ACTIVE", totalUsers: 24, totalShipments: 128, createdAt: "2025-01-15" },
  { id: "ORG002", name: "FastTrack Couriers", email: "admin@fasttrack.com", phone: "9876543211", plan: "PRO", status: "ACTIVE", totalUsers: 15, totalShipments: 86, createdAt: "2025-03-10" },
  { id: "ORG003", name: "Global Parcel Services", email: "admin@globalparcel.com", phone: "9876543212", plan: "PRO", status: "ACTIVE", totalUsers: 31, totalShipments: 215, createdAt: "2025-02-01" },
  { id: "ORG004", name: "CityExpress", email: "admin@cityexpress.com", phone: "9876543213", plan: "FREE", status: "ACTIVE", totalUsers: 8, totalShipments: 42, createdAt: "2025-06-20" },
  { id: "ORG005", name: "TransIndia Logistics", email: "admin@transindia.com", phone: "9876543214", plan: "ENTERPRISE", status: "SUSPENDED", totalUsers: 0, totalShipments: 0, createdAt: "2025-04-05" },
  { id: "ORG006", name: "QuickDeliver", email: "admin@quickdeliver.com", phone: "9876543215", plan: "FREE", status: "ACTIVE", totalUsers: 6, totalShipments: 19, createdAt: "2025-08-12" },
];

export const MOCK_ADMIN_USERS: AdminUser[] = [
  { id: "AU001", name: "Arun Nair", email: "arun@speedx.com", role: "ORGANIZATION_OWNER", organizationId: "ORG001", organizationName: "SpeedX Logistics", status: "ACTIVE", createdAt: "2025-01-15" },
  { id: "AU002", name: "Divya Menon", email: "divya@speedx.com", role: "OPERATIONS_MANAGER", organizationId: "ORG001", organizationName: "SpeedX Logistics", status: "ACTIVE", createdAt: "2025-01-20" },
  { id: "AU003", name: "Ravi Kumar", email: "ravi@speedx.com", role: "WORKER", organizationId: "ORG001", organizationName: "SpeedX Logistics", status: "ACTIVE", createdAt: "2025-02-01" },
  { id: "AU004", name: "Sneha Kapoor", email: "sneha@fasttrack.com", role: "ORGANIZATION_OWNER", organizationId: "ORG002", organizationName: "FastTrack Couriers", status: "ACTIVE", createdAt: "2025-03-10" },
  { id: "AU005", name: "Manoj Pillai", email: "manoj@fasttrack.com", role: "OPERATIONS_MANAGER", organizationId: "ORG002", organizationName: "FastTrack Couriers", status: "INACTIVE", createdAt: "2025-03-15" },
  { id: "AU006", name: "Vikram Joshi", email: "vikram@globalparcel.com", role: "ORGANIZATION_OWNER", organizationId: "ORG003", organizationName: "Global Parcel Services", status: "ACTIVE", createdAt: "2025-02-01" },
  { id: "AU007", name: "Priya Sharma", email: "priya@globalparcel.com", role: "OPERATIONS_MANAGER", organizationId: "ORG003", organizationName: "Global Parcel Services", status: "ACTIVE", createdAt: "2025-02-10" },
  { id: "AU008", name: "Amit Singh", email: "amit@cityexpress.com", role: "ORGANIZATION_OWNER", organizationId: "ORG004", organizationName: "CityExpress", status: "ACTIVE", createdAt: "2025-06-20" },
  { id: "AU009", name: "Neha Gupta", email: "neha@quickdeliver.com", role: "ORGANIZATION_OWNER", organizationId: "ORG006", organizationName: "QuickDeliver", status: "ACTIVE", createdAt: "2025-08-12" },
  { id: "AU010", name: "Ananya Reddy", email: "ananya@speedx.com", role: "WORKER", organizationId: "ORG001", organizationName: "SpeedX Logistics", status: "ACTIVE", createdAt: "2025-04-18" },
  { id: "AU011", name: "Rajesh Verma", email: "rajesh@globalparcel.com", role: "WORKER", organizationId: "ORG003", organizationName: "Global Parcel Services", status: "INACTIVE", createdAt: "2025-05-12" },
  { id: "AU012", name: "System Admin", email: "admin@naxivo.com", role: "SUPER_ADMIN", organizationId: "ORG001", organizationName: "Naxivo", status: "ACTIVE", createdAt: "2024-12-01" },
];

export const MOCK_SYSTEM_STATS: SystemStats = {
  totalOrganizations: 6,
  totalUsers: 84,
  totalShipments: 490,
  activeOrganizations: 5,
  shipmentsToday: 28,
  activeUsers: 62,
  systemUptime: "99.98%",
};

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  { id: "AL001", event: "Organization Created", description: "QuickDeliver was registered by Amit Singh", user: "Amit Singh", userEmail: "amit@quickdeliver.com", ip: "192.168.1.45", timestamp: "2026-07-02 10:30 AM", type: "info" },
  { id: "AL002", event: "User Role Changed", description: "Manoj Pillai role changed to OPERATIONS_MANAGER", user: "Divya Menon", userEmail: "divya@speedx.com", ip: "192.168.1.22", timestamp: "2026-07-02 09:15 AM", type: "warning" },
  { id: "AL003", event: "Organization Suspended", description: "TransIndia Logistics suspended due to payment failure", user: "System Admin", userEmail: "admin@naxivo.com", ip: "10.0.0.1", timestamp: "2026-07-01 04:00 PM", type: "error" },
  { id: "AL004", event: "Shipment Delivered", description: "NAX-2026-101 delivered for SpeedX Logistics", user: "Ravi Kumar", userEmail: "ravi@speedx.com", ip: "192.168.1.78", timestamp: "2026-07-01 02:45 PM", type: "info" },
  { id: "AL005", event: "User Login Failed", description: "Multiple failed login attempts for sneha@fasttrack.com", user: "Sneha Kapoor", userEmail: "sneha@fasttrack.com", ip: "203.0.113.42", timestamp: "2026-07-01 11:20 AM", type: "warning" },
  { id: "AL006", event: "System Backup Completed", description: "Daily backup completed successfully (1.2 GB)", user: "System", userEmail: "system@naxivo.com", ip: "10.0.0.1", timestamp: "2026-07-01 03:00 AM", type: "info" },
  { id: "AL007", event: "New Plan Upgraded", description: "CityExpress upgraded from FREE to PRO", user: "Amit Singh", userEmail: "amit@cityexpress.com", ip: "192.168.1.33", timestamp: "2026-06-30 05:30 PM", type: "info" },
  { id: "AL008", event: "API Rate Limit Exceeded", description: "Global Parcel Services exceeded API rate limit (10k req/hr)", user: "Vikram Joshi", userEmail: "vikram@globalparcel.com", ip: "198.51.100.17", timestamp: "2026-06-30 02:10 PM", type: "error" },
];

export const MOCK_ADMIN_SHIPMENTS: AdminShipment[] = [
  { id: "S001", trackingId: "NAX-2026-101", organizationId: "ORG001", organizationName: "SpeedX Logistics", route: "Kochi → Calicut", driver: "Rahul P", status: "DELIVERED", priority: "High", customer: "ABC Corp", createdAt: "2026-06-01" },
  { id: "S002", trackingId: "NAX-2026-102", organizationId: "ORG001", organizationName: "SpeedX Logistics", route: "Kochi → Thrissur", driver: "Vishnu R", status: "IN TRANSIT", priority: "Urgent", customer: "XYZ Ltd", createdAt: "2026-06-05" },
  { id: "S003", trackingId: "NAX-2026-201", organizationId: "ORG002", organizationName: "FastTrack Couriers", route: "Mumbai → Pune", driver: "Suresh B", status: "IN TRANSIT", priority: "Medium", customer: "PQR Industries", createdAt: "2026-06-07" },
  { id: "S004", trackingId: "NAX-2026-301", organizationId: "ORG003", organizationName: "Global Parcel Services", route: "Delhi → Jaipur", driver: "Ajeesh M", status: "DELAYED", priority: "High", customer: "LMN Traders", createdAt: "2026-06-10" },
  { id: "S005", trackingId: "NAX-2026-103", organizationId: "ORG001", organizationName: "SpeedX Logistics", route: "Kochi → Alappuzha", driver: "Nithin S", status: "DELIVERED", priority: "Low", customer: "DEF Enterprises", createdAt: "2026-05-28" },
  { id: "S006", trackingId: "NAX-2026-202", organizationId: "ORG002", organizationName: "FastTrack Couriers", route: "Mumbai → Nashik", driver: "Unassigned", status: "PENDING", priority: "Medium", customer: "GHI Group", createdAt: "2026-06-12" },
  { id: "S007", trackingId: "NAX-2026-302", organizationId: "ORG003", organizationName: "Global Parcel Services", route: "Delhi → Agra", driver: "Deepak K", status: "DELIVERED", priority: "Urgent", customer: "JKL Corp", createdAt: "2026-06-02" },
  { id: "S008", trackingId: "NAX-2026-401", organizationId: "ORG004", organizationName: "CityExpress", route: "Bangalore → Mysore", driver: "Karthik I", status: "IN TRANSIT", priority: "High", customer: "MNO Ltd", createdAt: "2026-06-11" },
];

export const STATUS_BADGE: Record<string, string> = {
  ACTIVE: "bg-emerald-100 text-emerald-700",
  INACTIVE: "bg-slate-100 text-slate-500",
  SUSPENDED: "bg-red-100 text-red-700",
  FREE: "bg-slate-100 text-slate-600",
  PRO: "bg-blue-100 text-blue-700",
  ENTERPRISE: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-emerald-100 text-emerald-700",
  "IN TRANSIT": "bg-indigo-100 text-indigo-700",
  DELAYED: "bg-red-100 text-red-700",
  PENDING: "bg-amber-100 text-amber-700",
  SUPER_ADMIN: "bg-purple-100 text-purple-700",
  ORGANIZATION_OWNER: "bg-blue-100 text-blue-700",
  OPERATIONS_MANAGER: "bg-amber-100 text-amber-700",
  WORKER: "bg-slate-100 text-slate-600",
  Low: "bg-slate-100 text-slate-600",
  Medium: "bg-blue-100 text-blue-700",
  High: "bg-amber-100 text-amber-700",
  Urgent: "bg-red-100 text-red-700",
  info: "bg-blue-100 text-blue-700",
  warning: "bg-amber-100 text-amber-700",
  error: "bg-red-100 text-red-700",
};
