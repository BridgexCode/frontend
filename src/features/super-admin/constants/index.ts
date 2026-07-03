import {
  LayoutDashboard,
  Building2,
  BarChart3,
  ClipboardList,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface SidebarItem {
  label: string;
  icon: LucideIcon;
  href: string;
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { label: "Organizations", icon: Building2, href: "/admin/organizations" },
  { label: "Reports", icon: BarChart3, href: "/admin/reports" },
  { label: "Audit Logs", icon: ClipboardList, href: "/admin/audit-logs" },
  { label: "Settings", icon: Settings, href: "/admin/settings" },
];
