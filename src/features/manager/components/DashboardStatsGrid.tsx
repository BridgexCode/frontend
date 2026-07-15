"use client";

import { Users, Package, CheckCircle, AlertTriangle, Truck } from "lucide-react";
import { StatsCard } from "./StatsCard";
import { CardSkeleton } from "./TableSkeleton";

interface DashboardStatsGridProps {
  loading: boolean;
  stats: {
    totalWorkers: number;
    activeShipments: number;
    deliveredShipments: number;
    failedMessages: number;
  };
}

export function DashboardStatsGrid({ loading, stats }: DashboardStatsGridProps) {
  const statsData = [
    { title: "Total Workers", value: stats.totalWorkers, icon: Users, color: "text-blue-600", bgColor: "bg-blue-50" },
    { title: "Active Shipments", value: stats.activeShipments, icon: Truck, color: "text-indigo-600", bgColor: "bg-indigo-50" },
    { title: "Delivered", value: stats.deliveredShipments, icon: CheckCircle, color: "text-emerald-600", bgColor: "bg-emerald-50" },
    { title: "Failed Messages", value: stats.failedMessages, icon: AlertTriangle, color: "text-red-600", bgColor: "bg-red-50" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {loading
        ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
        : statsData.map((stat, i) => (
            <StatsCard key={i} {...stat} />
          ))}
    </div>
  );
}
