import { LucideIcon } from "lucide-react";

export interface DashboardCardProps {
  title: string;
  value: string | number;
  change?: string | number;
  changeType?: "increase" | "decrease" | "neutral";
  icon: LucideIcon;
  description?: string;
  className?: string;
}

export interface OperationalMetrics {
  totalShipments: number;
  activeShipments: number;
  deliveredToday: number;
  delayedCount: number;
  activeDrivers: number;
  fleetUtilizationRate: number;
}

export interface StatusTimelineFeed {
  id: string;
  timestamp: string;
  driverName: string;
  messageText: string;
  parsedIntent: string;
  erpStatus: "success" | "pending" | "failed";
  shipmentNumber: string;
}
