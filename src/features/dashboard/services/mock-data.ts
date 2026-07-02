import {
  LayoutDashboard, Truck, UserCheck, Navigation, User,
  Clock, BarChart3, AlertTriangle, ShieldCheck,
  Check, AlertTriangle as AlertTriangleIcon,
} from "lucide-react";

export interface SidebarItem {
  label: string;
  icon: typeof Truck;
  href: string;
  active?: boolean;
}

export interface ShipmentRow {
  id: string;
  route: string;
  driver: string;
  status: "DELIVERED" | "IN TRANSIT" | "DELAYED";
}

export interface ActivityItem {
  id: number;
  type: string;
  title: string;
  desc: string;
  time: string;
  icon: typeof Truck;
  color: string;
}

export interface ChartData {
  delivered: number[];
  inTransit: number[];
  delayed: number[];
  labels: string[];
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", active: true },
  { label: "Shipments", icon: Truck, href: "#shipments" },
  { label: "Drivers", icon: UserCheck, href: "#drivers" },
  { label: "Vehicles", icon: Navigation, href: "#vehicles" },
  { label: "Managers", icon: User, href: "#managers" },
  { label: "Timeline", icon: Clock, href: "#timeline" },
  { label: "Reports", icon: BarChart3, href: "#reports" },
  { label: "Alerts", icon: AlertTriangle, href: "#alerts" },
  { label: "Settings", icon: ShieldCheck, href: "#settings" },
];

export const INITIAL_SHIPMENTS: ShipmentRow[] = [
  { id: "#1001", route: "Kochi → Calicut", driver: "Rahul P", status: "DELIVERED" },
  { id: "#1002", route: "Kochi → Thrissur", driver: "Vishnu R", status: "IN TRANSIT" },
  { id: "#1003", route: "Kochi → Malappuram", driver: "Sajith K", status: "IN TRANSIT" },
  { id: "#1004", route: "Kochi → Kannur", driver: "Ajeesh M", status: "DELAYED" },
  { id: "#1005", route: "Kochi → Alappuzha", driver: "Nithin S", status: "DELIVERED" },
];

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  { id: 1, type: "delivered", title: "Shipment #1001 delivered", desc: "Kochi → Calicut", time: "10:30 AM", icon: Check, color: "bg-green-500 text-white" },
  { id: 2, type: "transit", title: "Shipment #1003 in transit", desc: "Kochi → Malappuram", time: "09:15 AM", icon: Truck, color: "bg-emerald-500 text-white" },
  { id: 3, type: "assigned", title: "Driver Rahul P assigned to Shipment #1002", desc: "Kochi → Thrissur", time: "Yesterday", icon: User, color: "bg-amber-500 text-white" },
  { id: 4, type: "vehicle", title: "Vehicle KL-07-AB-1234 added", desc: "Org Admin registration", time: "Yesterday", icon: Navigation, color: "bg-purple-500 text-white" },
  { id: 5, type: "delayed", title: "Shipment #1004 delayed", desc: "Reason: Traffic", time: "14 Oct, 08:45 PM", icon: AlertTriangleIcon, color: "bg-red-500 text-white" },
];

export const CHART_DATA: Record<string, ChartData> = {
  "This Week": {
    delivered: [80, 110, 95, 140, 135, 160, 190],
    inTransit: [40, 60, 50, 75, 70, 85, 115],
    delayed: [20, 25, 22, 35, 30, 28, 45],
    labels: ["10 Oct", "11 Oct", "12 Oct", "13 Oct", "14 Oct", "15 Oct", "16 Oct"],
  },
  "Last Week": {
    delivered: [65, 85, 120, 105, 115, 140, 155],
    inTransit: [30, 45, 55, 40, 60, 75, 80],
    delayed: [10, 15, 30, 18, 25, 20, 24],
    labels: ["03 Oct", "04 Oct", "05 Oct", "06 Oct", "07 Oct", "08 Oct", "09 Oct"],
  },
};

export interface Manager {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  createdAt: string;
}

export const MOCK_MANAGERS: Manager[] = [
  { id: "M001", name: "Divya Menon", email: "divya@naxivo.com", phone: "9988776655", status: "ACTIVE", createdAt: "2026-01-12" },
  { id: "M002", name: "Manoj Pillai", email: "manoj@naxivo.com", phone: "9988776666", status: "SUSPENDED", createdAt: "2026-03-01" },
  { id: "M003", name: "Sneha Kapoor", email: "sneha@naxivo.com", phone: "9988776667", status: "ACTIVE", createdAt: "2026-02-15" },
  { id: "M004", name: "Rohit Verma", email: "rohit@naxivo.com", phone: "9988776668", status: "ACTIVE", createdAt: "2026-04-10" },
  { id: "M005", name: "Priya Sharma", email: "priya@naxivo.com", phone: "9988776669", status: "INACTIVE", createdAt: "2026-05-22" },
  { id: "M006", name: "Arun Nair", email: "arun@naxivo.com", phone: "9988776670", status: "ACTIVE", createdAt: "2026-06-01" },
];

export type TimeRange = "This Week" | "Last Week";

// ── Shipments (Org Admin) ──

export interface DashboardShipment {
  id: string;
  trackingId: string;
  route: string;
  driver: string;
  status: "DELIVERED" | "IN TRANSIT" | "DELAYED" | "PENDING";
  customer: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  origin: string;
  destination: string;
  createdAt: string;
}

export const MOCK_DASHBOARD_SHIPMENTS: DashboardShipment[] = [
  { id: "S001", trackingId: "NAX-2026-101", route: "Kochi → Calicut", driver: "Rahul P", status: "DELIVERED", customer: "ABC Corp", priority: "High", origin: "Kochi", destination: "Calicut", createdAt: "2026-06-01" },
  { id: "S002", trackingId: "NAX-2026-102", route: "Kochi → Thrissur", driver: "Vishnu R", status: "IN TRANSIT", customer: "XYZ Ltd", priority: "Urgent", origin: "Kochi", destination: "Thrissur", createdAt: "2026-06-05" },
  { id: "S003", trackingId: "NAX-2026-103", route: "Kochi → Malappuram", driver: "Sajith K", status: "IN TRANSIT", customer: "PQR Industries", priority: "Medium", origin: "Kochi", destination: "Malappuram", createdAt: "2026-06-08" },
  { id: "S004", trackingId: "NAX-2026-104", route: "Kochi → Kannur", driver: "Ajeesh M", status: "DELAYED", customer: "LMN Traders", priority: "High", origin: "Kochi", destination: "Kannur", createdAt: "2026-06-10" },
  { id: "S005", trackingId: "NAX-2026-105", route: "Kochi → Alappuzha", driver: "Nithin S", status: "DELIVERED", customer: "DEF Enterprises", priority: "Low", origin: "Kochi", destination: "Alappuzha", createdAt: "2026-05-28" },
  { id: "S006", trackingId: "NAX-2026-106", route: "Kochi → Kottayam", driver: "Unassigned", status: "PENDING", customer: "GHI Group", priority: "Medium", origin: "Kochi", destination: "Kottayam", createdAt: "2026-06-12" },
  { id: "S007", trackingId: "NAX-2026-107", route: "Kochi → Palakkad", driver: "Rahul P", status: "DELIVERED", customer: "JKL Corp", priority: "Urgent", origin: "Kochi", destination: "Palakkad", createdAt: "2026-06-02" },
  { id: "S008", trackingId: "NAX-2026-108", route: "Kochi → Idukki", driver: "Vishnu R", status: "DELAYED", customer: "MNO Ltd", priority: "High", origin: "Kochi", destination: "Idukki", createdAt: "2026-06-11" },
];

// ── Drivers ──

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  assignedVehicle: string;
  status: "ACTIVE" | "INACTIVE" | "ON_LEAVE";
  assignedShipments: number;
  rating: number;
  createdAt: string;
}

export const MOCK_DRIVERS: Driver[] = [
  { id: "D001", name: "Rahul P", email: "rahul@naxivo.com", phone: "9876543210", licenseNumber: "DL-07-2024-001", assignedVehicle: "KL-07-AB-1234", status: "ACTIVE", assignedShipments: 5, rating: 4.8, createdAt: "2026-01-15" },
  { id: "D002", name: "Vishnu R", email: "vishnu@naxivo.com", phone: "9876543211", licenseNumber: "DL-07-2024-002", assignedVehicle: "KL-07-CD-5678", status: "ACTIVE", assignedShipments: 3, rating: 4.5, createdAt: "2026-02-10" },
  { id: "D003", name: "Sajith K", email: "sajith@naxivo.com", phone: "9876543212", licenseNumber: "DL-07-2024-003", assignedVehicle: "KL-07-EF-9012", status: "ON_LEAVE", assignedShipments: 0, rating: 4.2, createdAt: "2026-03-05" },
  { id: "D004", name: "Ajeesh M", email: "ajeesh@naxivo.com", phone: "9876543213", licenseNumber: "DL-07-2024-004", assignedVehicle: "KL-07-GH-3456", status: "ACTIVE", assignedShipments: 7, rating: 4.9, createdAt: "2026-01-20" },
  { id: "D005", name: "Nithin S", email: "nithin@naxivo.com", phone: "9876543214", licenseNumber: "DL-07-2024-005", assignedVehicle: "KL-07-IJ-7890", status: "ACTIVE", assignedShipments: 2, rating: 4.1, createdAt: "2026-04-01" },
  { id: "D006", name: "Sreelakshmi K", email: "sreelakshmi@naxivo.com", phone: "9876543215", licenseNumber: "DL-07-2024-006", assignedVehicle: "KL-07-KL-1111", status: "INACTIVE", assignedShipments: 0, rating: 4.6, createdAt: "2026-05-12" },
];

// ── Vehicles ──

export interface Vehicle {
  id: string;
  plateNumber: string;
  model: string;
  driver: string;
  status: "ACTIVE" | "IN_MAINTENANCE" | "OUT_OF_SERVICE";
  type: "Truck" | "Van" | "Container";
  capacity: string;
  lastService: string;
  createdAt: string;
}

export const MOCK_VEHICLES: Vehicle[] = [
  { id: "V001", plateNumber: "KL-07-AB-1234", model: "Ashok Leyland Boss", driver: "Rahul P", status: "ACTIVE", type: "Truck", capacity: "16 Tons", lastService: "2026-05-20", createdAt: "2026-01-10" },
  { id: "V002", plateNumber: "KL-07-CD-5678", model: "Tata Ultra 1518", driver: "Vishnu R", status: "ACTIVE", type: "Truck", capacity: "15 Tons", lastService: "2026-06-01", createdAt: "2026-02-15" },
  { id: "V003", plateNumber: "KL-07-EF-9012", model: "Mahindra Furio", driver: "Sajith K", status: "IN_MAINTENANCE", type: "Truck", capacity: "12 Tons", lastService: "2026-06-10", createdAt: "2026-03-01" },
  { id: "V004", plateNumber: "KL-07-GH-3456", model: "Eicher Pro 3015", driver: "Ajeesh M", status: "ACTIVE", type: "Container", capacity: "20 Tons", lastService: "2026-05-15", createdAt: "2026-01-20" },
  { id: "V005", plateNumber: "KL-07-IJ-7890", model: "Force Traveller", driver: "Nithin S", status: "ACTIVE", type: "Van", capacity: "3 Tons", lastService: "2026-05-28", createdAt: "2026-04-05" },
  { id: "V006", plateNumber: "KL-07-KL-1111", model: "Tata LPK 2518", driver: "Unassigned", status: "OUT_OF_SERVICE", type: "Container", capacity: "25 Tons", lastService: "2026-04-20", createdAt: "2026-01-05" },
];

// ── Timeline (Org Admin) ──

export interface DashboardTimelineEvent {
  id: string;
  type: "creation" | "assignment" | "status" | "delivery" | "failed";
  title: string;
  description: string;
  shipmentId: string;
  trackingId: string;
  timestamp: string;
  user: string;
}

export const MOCK_DASHBOARD_TIMELINE: DashboardTimelineEvent[] = [
  { id: "DT001", type: "delivery", title: "Shipment Delivered", description: "NAX-2026-101 delivered successfully to ABC Corp", shipmentId: "S001", trackingId: "NAX-2026-101", timestamp: "2026-06-02 04:45 PM", user: "Rahul P" },
  { id: "DT002", type: "status", title: "Status Updated", description: "NAX-2026-102 is now In Transit", shipmentId: "S002", trackingId: "NAX-2026-102", timestamp: "2026-06-05 10:30 AM", user: "Vishnu R" },
  { id: "DT003", type: "creation", title: "Shipment Created", description: "NAX-2026-106 was created for GHI Group", shipmentId: "S006", trackingId: "NAX-2026-106", timestamp: "2026-06-12 09:00 AM", user: "System" },
  { id: "DT004", type: "failed", title: "Delivery Delayed", description: "NAX-2026-104 delayed due to traffic on NH-66", shipmentId: "S004", trackingId: "NAX-2026-104", timestamp: "2026-06-10 02:15 PM", user: "Ajeesh M" },
  { id: "DT005", type: "assignment", title: "Driver Assigned", description: "Rahul P assigned to NAX-2026-107", shipmentId: "S007", trackingId: "NAX-2026-107", timestamp: "2026-06-01 11:00 AM", user: "Admin" },
  { id: "DT006", type: "delivery", title: "Shipment Delivered", description: "NAX-2026-107 delivered to JKL Corp", shipmentId: "S007", trackingId: "NAX-2026-107", timestamp: "2026-06-03 03:30 PM", user: "Rahul P" },
  { id: "DT007", type: "status", title: "Status Updated", description: "NAX-2026-108 marked as Delayed", shipmentId: "S008", trackingId: "NAX-2026-108", timestamp: "2026-06-11 08:45 AM", user: "Vishnu R" },
  { id: "DT008", type: "creation", title: "Shipment Created", description: "NAX-2026-105 was created for DEF Enterprises", shipmentId: "S005", trackingId: "NAX-2026-105", timestamp: "2026-05-28 01:00 PM", user: "System" },
];

// ── Alerts ──

export interface Alert {
  id: string;
  type: "warning" | "error" | "info";
  title: string;
  message: string;
  timestamp: string;
  status: "active" | "resolved";
}

export const MOCK_ALERTS: Alert[] = [
  { id: "A001", type: "error", title: "Delivery Failed", message: "Shipment NAX-2026-104 delivery failed due to traffic on NH-66", timestamp: "2026-06-10 02:30 PM", status: "active" },
  { id: "A002", type: "warning", title: "Vehicle Maintenance Due", message: "Vehicle KL-07-AB-1234 is due for service in 3 days", timestamp: "2026-06-12 08:00 AM", status: "active" },
  { id: "A003", type: "info", title: "New Driver Onboarded", message: "Driver Sreelakshmi K has been added to the fleet", timestamp: "2026-06-11 10:00 AM", status: "active" },
  { id: "A004", type: "error", title: "Shipment Delayed", message: "NAX-2026-108 from Kochi to Idukki is delayed by 2 hours", timestamp: "2026-06-11 09:00 AM", status: "active" },
  { id: "A005", type: "warning", title: "Low Fuel Alert", message: "Vehicle KL-07-GH-3456 has below 10% fuel", timestamp: "2026-06-10 04:15 PM", status: "resolved" },
  { id: "A006", type: "info", title: "Monthly Report Ready", message: "May 2026 operational report is now available for download", timestamp: "2026-06-01 12:00 AM", status: "resolved" },
];

// ── Reports Stats ──

export const DASHBOARD_REPORT_STATS = {
  totalShipments: 128,
  activeShipments: 42,
  deliveredThisMonth: 86,
  delayedCount: 12,
  totalDrivers: 16,
  activeDrivers: 12,
  totalVehicles: 14,
  availableVehicles: 8,
  failedRate: "3.2%",
  onTimeRate: "91.5%",
};

// ── Status badge maps for dashboard sections ──

export const DASHBOARD_STATUS_BADGE: Record<string, string> = {
  DELIVERED: "bg-emerald-100 text-emerald-700",
  "IN TRANSIT": "bg-indigo-100 text-indigo-700",
  DELAYED: "bg-red-100 text-red-700",
  PENDING: "bg-amber-100 text-amber-700",
  ACTIVE: "bg-emerald-100 text-emerald-700",
  INACTIVE: "bg-slate-100 text-slate-500",
  ON_LEAVE: "bg-amber-100 text-amber-700",
  IN_MAINTENANCE: "bg-amber-100 text-amber-700",
  OUT_OF_SERVICE: "bg-red-100 text-red-700",
  Low: "bg-slate-100 text-slate-600",
  Medium: "bg-blue-100 text-blue-700",
  High: "bg-amber-100 text-amber-700",
  Urgent: "bg-red-100 text-red-700",
  active: "bg-red-100 text-red-700",
  resolved: "bg-emerald-100 text-emerald-700",
  error: "bg-red-100 text-red-700",
  warning: "bg-amber-100 text-amber-700",
  info: "bg-blue-100 text-blue-700",
  Truck: "bg-blue-100 text-blue-700",
  Van: "bg-indigo-100 text-indigo-700",
  Container: "bg-purple-100 text-purple-700",
};
