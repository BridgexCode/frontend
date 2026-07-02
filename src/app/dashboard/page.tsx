"use client";

import { useEffect, useState } from "react";
import {
  useDashboard,
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
  CreateShipmentModal,
  AddManagerModal,
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

  const {
    sidebarOpen, setSidebarOpen,
    timeRange, setTimeRange,
    notifications, setNotifications,
    searchQuery, setSearchQuery,
    isCreateModalOpen, setIsCreateModalOpen,
    isCreateManagerModalOpen, setIsCreateManagerModalOpen,
    form, setForm,
    filteredShipments,
    totalShipmentsCount, deliveredCount, transitCount, delayedCount,
    activities,
    activeChart,
    handleCreateShipmentSubmit,
  } = useDashboard();

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
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
                totalShipments={totalShipmentsCount}
                delivered={deliveredCount}
                inTransit={transitCount}
                delayed={delayedCount}
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
                  onCreateShipment={() => setIsCreateModalOpen(true)}
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

      <CreateShipmentModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        form={form}
        onFormChange={setForm}
        onSubmit={handleCreateShipmentSubmit}
      />

      <AddManagerModal
        open={isCreateManagerModalOpen}
        onClose={() => setIsCreateManagerModalOpen(false)}
      />

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
