"use client";

import { useState, useMemo } from "react";
import type { DashboardShipment } from "@/features/dashboard/services/mock-data";
import { MOCK_DASHBOARD_SHIPMENTS } from "@/features/dashboard/services/mock-data";
import { ShipmentsFilters } from "./ShipmentsFilters";
import { ShipmentsTable } from "./ShipmentsTable";
import { ViewShipmentModal } from "./ViewShipmentModal";

export function ShipmentsPage() {
  const [shipments] = useState<DashboardShipment[]>(MOCK_DASHBOARD_SHIPMENTS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<DashboardShipment | null>(null);

  const filtered = useMemo(() => {
    return shipments.filter((s) => {
      const matchesSearch =
        s.trackingId.toLowerCase().includes(search.toLowerCase()) ||
        s.route.toLowerCase().includes(search.toLowerCase()) ||
        s.driver.toLowerCase().includes(search.toLowerCase()) ||
        s.customer.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || s.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [shipments, search, statusFilter]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <div className="space-y-6 py-6 md:py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Shipments</h1>
          <p className="text-sm text-slate-400 mt-0.5">Track and manage all operational shipments</p>
        </div>
      </div>

      <ShipmentsFilters
        search={search} onSearchChange={setSearch}
        statusFilter={statusFilter} onStatusFilterChange={setStatusFilter}
        loading={loading} onRefresh={handleRefresh}
      />
      <ShipmentsTable
        shipments={filtered}
        loading={loading}
        onView={setSelectedShipment}
      />
      <ViewShipmentModal shipment={selectedShipment} onClose={() => setSelectedShipment(null)} />
    </div>
  );
}
