export interface Worker {
  id: string;
  name: string;
  email: string;
  phone: string;
  assignedShipments: number;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
}

export interface ManagerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "WORKER" | "OPERATIONS_MANAGER";
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  createdAt: string;
}

export type ShipmentStatus = "Pending" | "Assigned" | "In Transit" | "Delivered" | "Failed";
export type ShipmentPriority = "Low" | "Medium" | "High" | "Urgent";

export interface Shipment {
  id: string;
  trackingId: string;
  worker: string;
  status: ShipmentStatus;
  priority: ShipmentPriority;
  pickup: string;
  delivery: string;
  customerName: string;
  customerPhone: string;
  notes: string;
  createdAt: string;
}

export interface TimelineEvent {
  id: string;
  type: "status" | "assignment" | "delivery" | "creation";
  title: string;
  description: string;
  shipmentId: string;
  timestamp: string;
  user: string;
}

export interface FailedMessage {
  id: string;
  shipmentId: string;
  recipient: string;
  error: string;
  timestamp: string;
  status: "failed" | "retrying" | "resolved";
}

export const MOCK_WORKERS: Worker[] = [
  { id: "W001", name: "Ravi Kumar", email: "ravi@example.com", phone: "9876543210", assignedShipments: 5, status: "ACTIVE", createdAt: "2026-01-15" },
  { id: "W002", name: "Priya Sharma", email: "priya@example.com", phone: "9876543211", assignedShipments: 3, status: "ACTIVE", createdAt: "2026-02-10" },
  { id: "W003", name: "Amit Singh", email: "amit@example.com", phone: "9876543212", assignedShipments: 0, status: "INACTIVE", createdAt: "2026-03-05" },
  { id: "W004", name: "Sneha Patel", email: "sneha@example.com", phone: "9876543213", assignedShipments: 7, status: "ACTIVE", createdAt: "2026-01-20" },
  { id: "W005", name: "Vikram Joshi", email: "vikram@example.com", phone: "9876543214", assignedShipments: 2, status: "ACTIVE", createdAt: "2026-04-01" },
  { id: "W006", name: "Neha Gupta", email: "neha@example.com", phone: "9876543215", assignedShipments: 4, status: "ACTIVE", createdAt: "2026-02-28" },
  { id: "W007", name: "Rajesh Verma", email: "rajesh@example.com", phone: "9876543216", assignedShipments: 0, status: "INACTIVE", createdAt: "2026-05-12" },
  { id: "W008", name: "Ananya Reddy", email: "ananya@example.com", phone: "9876543217", assignedShipments: 6, status: "ACTIVE", createdAt: "2026-03-18" },
];

export const MOCK_USERS: ManagerUser[] = [
  { id: "U001", name: "Arun Nair", email: "arun@example.com", phone: "9988776655", role: "WORKER", status: "ACTIVE", createdAt: "2026-01-10" },
  { id: "U002", name: "Divya Menon", email: "divya@example.com", phone: "9988776656", role: "OPERATIONS_MANAGER", status: "ACTIVE", createdAt: "2026-01-12" },
  { id: "U003", name: "Suresh Babu", email: "suresh@example.com", phone: "9988776657", role: "WORKER", status: "INACTIVE", createdAt: "2026-02-01" },
  { id: "U004", name: "Lakshmi Krishnan", email: "lakshmi@example.com", phone: "9988776658", role: "WORKER", status: "ACTIVE", createdAt: "2026-02-15" },
  { id: "U005", name: "Manoj Pillai", email: "manoj@example.com", phone: "9988776659", role: "OPERATIONS_MANAGER", status: "SUSPENDED", createdAt: "2026-03-01" },
  { id: "U006", name: "Gita Nambiar", email: "gita@example.com", phone: "9988776660", role: "WORKER", status: "ACTIVE", createdAt: "2026-03-20" },
  { id: "U007", name: "Karthik Iyer", email: "karthik@example.com", phone: "9988776661", role: "WORKER", status: "ACTIVE", createdAt: "2026-04-05" },
  { id: "U008", name: "Meera Das", email: "meera@example.com", phone: "9988776662", role: "WORKER", status: "INACTIVE", createdAt: "2026-04-18" },
];

export const MOCK_SHIPMENTS: Shipment[] = [
  { id: "S001", trackingId: "NAX-2026-001", worker: "Ravi Kumar", status: "Delivered", priority: "High", pickup: "Mumbai Warehouse", delivery: "Pune Hub", customerName: "ABC Corp", customerPhone: "9123456780", notes: "Handle with care", createdAt: "2026-05-01" },
  { id: "S002", trackingId: "NAX-2026-002", worker: "Priya Sharma", status: "In Transit", priority: "Urgent", pickup: "Delhi Hub", delivery: "Jaipur Center", customerName: "XYZ Ltd", customerPhone: "9123456781", notes: "Priority delivery", createdAt: "2026-05-05" },
  { id: "S003", trackingId: "NAX-2026-003", worker: "Sneha Patel", status: "Assigned", priority: "Medium", pickup: "Chennai Port", delivery: "Bangalore Hub", customerName: "PQR Industries", customerPhone: "9123456782", notes: "", createdAt: "2026-05-10" },
  { id: "S004", trackingId: "NAX-2026-004", worker: "Vikram Joshi", status: "Pending", priority: "Low", pickup: "Kochi Hub", delivery: "Trivandrum Center", customerName: "LMN Traders", customerPhone: "9123456783", notes: "Fragile items", createdAt: "2026-05-12" },
  { id: "S005", trackingId: "NAX-2026-005", worker: "Neha Gupta", status: "Failed", priority: "High", pickup: "Mumbai Warehouse", delivery: "Ahmedabad Hub", customerName: "DEF Enterprises", customerPhone: "9123456784", notes: "Address issue", createdAt: "2026-05-08" },
  { id: "S006", trackingId: "NAX-2026-006", worker: "Ananya Reddy", status: "Delivered", priority: "Medium", pickup: "Hyderabad Hub", delivery: "Visakhapatnam Center", customerName: "GHI Group", customerPhone: "9123456785", notes: "", createdAt: "2026-04-28" },
  { id: "S007", trackingId: "NAX-2026-007", worker: "Ravi Kumar", status: "In Transit", priority: "High", pickup: "Pune Hub", delivery: "Nagpur Center", customerName: "JKL Corp", customerPhone: "9123456786", notes: "Time-sensitive", createdAt: "2026-05-14" },
  { id: "S008", trackingId: "NAX-2026-008", worker: "", status: "Pending", priority: "Urgent", pickup: "Bangalore Hub", delivery: "Mysore Center", customerName: "MNO Ltd", customerPhone: "9123456787", notes: "", createdAt: "2026-05-15" },
];

export const MOCK_TIMELINE: TimelineEvent[] = [
  { id: "T001", type: "creation", title: "Shipment Created", description: "NAX-2026-002 was created", shipmentId: "S002", timestamp: "2026-05-05 09:00 AM", user: "Arun Nair" },
  { id: "T002", type: "assignment", title: "Shipment Assigned", description: "NAX-2026-002 assigned to Priya Sharma", shipmentId: "S002", timestamp: "2026-05-05 10:30 AM", user: "Divya Menon" },
  { id: "T003", type: "status", title: "Status Updated", description: "NAX-2026-002 is now In Transit", shipmentId: "S002", timestamp: "2026-05-06 08:15 AM", user: "Priya Sharma" },
  { id: "T004", type: "delivery", title: "Shipment Delivered", description: "NAX-2026-001 delivered successfully", shipmentId: "S001", timestamp: "2026-05-04 04:45 PM", user: "Ravi Kumar" },
  { id: "T005", type: "status", title: "Status Updated", description: "NAX-2026-005 marked as Failed", shipmentId: "S005", timestamp: "2026-05-09 11:20 AM", user: "Neha Gupta" },
  { id: "T006", type: "creation", title: "Shipment Created", description: "NAX-2026-007 was created", shipmentId: "S007", timestamp: "2026-05-14 02:00 PM", user: "Arun Nair" },
  { id: "T007", type: "delivery", title: "Shipment Delivered", description: "NAX-2026-006 delivered successfully", shipmentId: "S006", timestamp: "2026-05-02 10:00 AM", user: "Ananya Reddy" },
  { id: "T008", type: "assignment", title: "Shipment Assigned", description: "NAX-2026-003 assigned to Sneha Patel", shipmentId: "S003", timestamp: "2026-05-10 03:00 PM", user: "Divya Menon" },
];

export const MOCK_FAILED_MESSAGES: FailedMessage[] = [
  { id: "FM001", shipmentId: "S005", recipient: "+919123456784", error: "Recipient number not reachable", timestamp: "2026-05-09 11:20 AM", status: "failed" },
  { id: "FM002", shipmentId: "S002", recipient: "+919123456781", error: "Message delivery timeout", timestamp: "2026-05-06 08:30 AM", status: "retrying" },
  { id: "FM003", shipmentId: "S001", recipient: "+919123456780", error: "Invalid template format", timestamp: "2026-05-01 10:00 AM", status: "resolved" },
  { id: "FM004", shipmentId: "S007", recipient: "+919123456786", error: "Recipient opted out", timestamp: "2026-05-14 02:30 PM", status: "failed" },
  { id: "FM005", shipmentId: "S004", recipient: "+919123456783", error: "Network error", timestamp: "2026-05-12 09:15 AM", status: "retrying" },
];

export const DASHBOARD_STATS = {
  totalWorkers: 8,
  activeWorkers: 5,
  activeShipments: 4,
  deliveredShipments: 2,
  failedMessages: 2,
};

export const SIDEBAR_ITEMS = [
  { label: "Dashboard", icon: "LayoutDashboard", href: "/manager/dashboard" },
  { label: "Users", icon: "Users", href: "/manager/users" },
  { label: "Workers", icon: "UserCheck", href: "/manager/workers" },
  { label: "Shipments", icon: "Package", href: "/manager/shipments" },
  { label: "Timeline", icon: "Clock", href: "/manager/timeline" },
  { label: "Failed Messages", icon: "AlertTriangle", href: "/manager/failed-messages" },
  { label: "Reports", icon: "BarChart3", href: "/manager/reports" },
  { label: "Settings", icon: "Settings", href: "/manager/settings" },
];

export const STATUS_BADGE_MAP: Record<string, string> = {
  ACTIVE: "bg-emerald-100 text-emerald-700",
  INACTIVE: "bg-slate-100 text-slate-500",
  SUSPENDED: "bg-red-100 text-red-700",
  Pending: "bg-amber-100 text-amber-700",
  Assigned: "bg-blue-100 text-blue-700",
  "In Transit": "bg-indigo-100 text-indigo-700",
  Delivered: "bg-emerald-100 text-emerald-700",
  Failed: "bg-red-100 text-red-700",
  Low: "bg-slate-100 text-slate-600",
  Medium: "bg-blue-100 text-blue-700",
  High: "bg-amber-100 text-amber-700",
  Urgent: "bg-red-100 text-red-700",
  failed: "bg-red-100 text-red-700",
  retrying: "bg-amber-100 text-amber-700",
  resolved: "bg-emerald-100 text-emerald-700",
  WORKER: "bg-blue-100 text-blue-700",
  OPERATIONS_MANAGER: "bg-purple-100 text-purple-700",
};
