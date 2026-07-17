"use client";

import { useEffect, useState, useMemo } from "react";
import { useDashboardStore, getActiveChartData } from "@/features/dashboard/store/dashboard-store";
import {
  DashboardSidebar,
  DashboardHeader,
  MetricsCards,
  ShipmentsOverviewChart,
  ShipmentsStatusDonut,
  RecentShipmentsTable,
  ActivitiesFeed,
  DriversStatusDonut,
  QuickActions,
  ShipmentsMap,
  ManagersPage,
  ShipmentsPage,
  DriversPage,
  VehiclesPage,
  TimelinePage,
  ReportsPage,
  AlertsPage,
  SettingsPage,
} from "@/features/dashboard";

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    const updateHash = () => {
      const hash = window.location.hash.replace("#", "") || "dashboard";
      setActiveSection(hash);
    };
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  const sidebarOpen = useDashboardStore((s) => s.sidebarOpen);
  const setSidebarOpen = useDashboardStore((s) => s.setSidebarOpen);
  const timeRange = useDashboardStore((s) => s.timeRange);
  const setTimeRange = useDashboardStore((s) => s.setTimeRange);
  const notifications = useDashboardStore((s) => s.notifications);
  const setNotifications = useDashboardStore((s) => s.setNotifications);
  const searchQuery = useDashboardStore((s) => s.searchQuery);
  const setSearchQuery = useDashboardStore((s) => s.setSearchQuery);
  const activities = useDashboardStore((s) => s.activities);
  const recentShipments = useDashboardStore((s) => s.recentShipments);
  const fetchStats = useDashboardStore((s) => s.fetchStats);
  const fetchRecentShipments = useDashboardStore((s) => s.fetchRecentShipments);
  const fetchTimeline = useDashboardStore((s) => s.fetchTimeline);

  const stats = useDashboardStore((s) => s.stats);

  useEffect(() => {
    fetchStats();
    fetchRecentShipments();
    fetchTimeline();
  }, [fetchStats, fetchRecentShipments, fetchTimeline]);

  const metrics = useMemo(() => ({
    totalShipments: stats?.totalShipments ?? 0,
    delivered: stats?.deliveredShipments ?? 0,
    inTransit: stats?.inTransitShipments ?? 0,
    delayed: stats?.delayedShipments ?? 0,
    totalDrivers: stats?.totalDrivers ?? 0,
    activeDrivers: stats?.activeDrivers ?? 0,
    totalVehicles: stats?.totalVehicles ?? 0,
    activeVehicles: stats?.activeVehicles ?? 0,
  }), [stats]);

  const activeChart = getActiveChartData(timeRange);

  const filteredShipments = recentShipments.filter(
    (item) =>
      (item.pickupLocation + " → " + item.destination).toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shipmentId.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="h-screen bg-slate-50 flex font-sans text-slate-800 overflow-hidden">
      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeSection={activeSection} />

      <div className="flex-1 flex flex-col overflow-x-hidden">
        <DashboardHeader
          onMenuClick={() => setSidebarOpen(true)}
          notifications={notifications}
          onNotificationsClick={() => setNotifications(0)}
        />

        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          {activeSection === "managers" ? (
            <ManagersPage />
          ) : activeSection === "shipments" ? (
            <ShipmentsPage />
          ) : activeSection === "drivers" ? (
            <DriversPage />
          ) : activeSection === "vehicles" ? (
            <VehiclesPage />
          ) : activeSection === "timeline" ? (
            <TimelinePage />
          ) : activeSection === "reports" ? (
            <ReportsPage />
          ) : activeSection === "alerts" ? (
            <AlertsPage />
          ) : activeSection === "settings" ? (
            <SettingsPage />
          ) : (
            <div className="space-y-8">
              <MetricsCards
                totalShipments={metrics.totalShipments}
                delivered={metrics.delivered}
                inTransit={metrics.inTransit}
                delayed={metrics.delayed}
                totalDrivers={metrics.totalDrivers}
                activeDrivers={metrics.activeDrivers}
                totalVehicles={metrics.totalVehicles}
                activeVehicles={metrics.activeVehicles}
              />

              <div className="grid lg:grid-cols-12 gap-8">
                <ShipmentsOverviewChart
                  data={activeChart}
                  timeRange={timeRange}
                  onTimeRangeChange={setTimeRange}
                />
                <ShipmentsStatusDonut />
              </div>

              <div className="grid lg:grid-cols-12 gap-8">
                <RecentShipmentsTable
                  shipments={filteredShipments}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
                <ActivitiesFeed activities={activities} />
              </div>

              <div className="grid lg:grid-cols-12 gap-8">
                <DriversStatusDonut />
                <QuickActions
                  onCreateShipment={() => {}}
                  onCreateManager={() => {
                    window.location.hash = "managers";
                  }}
                />
              </div>

              <ShipmentsMap />
            </div>
          )}
        </main>
      </div>

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}
