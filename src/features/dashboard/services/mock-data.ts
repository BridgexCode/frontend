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
