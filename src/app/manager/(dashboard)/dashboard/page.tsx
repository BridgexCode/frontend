"use client";

import { useState, useEffect } from "react";
import { DashboardWelcome } from "@/features/manager/components/DashboardWelcome";
import { DashboardStatsGrid } from "@/features/manager/components/DashboardStatsGrid";
import { DashboardQuickActions } from "@/features/manager/components/DashboardQuickActions";
import { DashboardRecentActivity } from "@/features/manager/components/DashboardRecentActivity";
import { fetchDashboardStatsApi } from "@/features/manager/services/dashboard-api";
import { fetchTimelineApi } from "@/features/manager/services/timeline-api";

export default function ManagerDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalWorkers: 0, activeShipments: 0, deliveredShipments: 0, failedMessages: 0 });
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      fetchDashboardStatsApi(),
      fetchTimelineApi(),
    ]).then(([statsData, timelineData]) => {
      if (!mounted) return;
      setStats({
        totalWorkers: statsData.totalDrivers,
        activeShipments: statsData.inTransitShipments,
        deliveredShipments: statsData.deliveredShipments,
        failedMessages: statsData.delayedShipments,
      });
      setActivities(timelineData.slice(0, 5).map((e: any) => ({
        title: e.title,
        time: e.timestamp,
        type: e.type === "creation" ? "creation" : e.type === "assignment" ? "assignment" : e.type === "delivery" ? "delivery" : "failed",
      })));
    }).catch(() => {}).finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  return (
    <div className="space-y-8">
      <DashboardWelcome activeShipments={stats.activeShipments} />
      <DashboardStatsGrid loading={loading} stats={stats} />
      <DashboardQuickActions />
      <DashboardRecentActivity activities={activities} />
    </div>
  );
}
