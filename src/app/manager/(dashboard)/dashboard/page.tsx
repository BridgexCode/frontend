"use client";

import { useState } from "react";
import { DashboardWelcome } from "@/features/manager/components/DashboardWelcome";
import { DashboardStatsGrid } from "@/features/manager/components/DashboardStatsGrid";
import { DashboardQuickActions } from "@/features/manager/components/DashboardQuickActions";
import { DashboardRecentActivity } from "@/features/manager/components/DashboardRecentActivity";

export default function ManagerDashboardPage() {
  const [loading] = useState(false);

  return (
    <div className="space-y-8">
      <DashboardWelcome />
      <DashboardStatsGrid loading={loading} />
      <DashboardQuickActions />
      <DashboardRecentActivity />
    </div>
  );
}
