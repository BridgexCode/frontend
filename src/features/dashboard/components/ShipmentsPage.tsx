"use client";

import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import type { DashboardShipment } from "@/features/dashboard/services/mock-data";
import { MOCK_DASHBOARD_SHIPMENTS } from "@/features/dashboard/services/mock-data";
import { ShipmentsFilters } from "./ShipmentsFilters";
import { ShipmentsTable } from "./ShipmentsTable";
import { ViewShipmentModal } from "./ViewShipmentModal";
import { CreateShipmentModal } from "./CreateShipmentModal";

export function ShipmentsPage() {
  const [shipments, setShipments] = useState<DashboardShipment[]>(MOCK_DASHBOARD_SHIPMENTS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<DashboardShipment | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [form, setForm] = useState<{ origin: string; destination: string; driver: string; status: "DELIVERED" | "IN TRANSIT" | "DELAYED" }>({ origin: "", destination: "", driver: "", status: "IN TRANSIT" });

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
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/10 flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Create Shipment
        </button>
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
      <CreateShipmentModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        form={form}
        onFormChange={(f) => setForm(f)}
        onSubmit={(e) => {
          e.preventDefault();
          const newShipment: DashboardShipment = {
            id: `S${String(shipments.length + 1).padStart(3, "0")}`,
            trackingId: "NAX-" + Date.now().toString(36).toUpperCase(),
            origin: form.origin,
            destination: form.destination,
            route: `${form.origin} → ${form.destination}`,
            driver: form.driver,
            status: form.status,
            priority: "Medium",
            customer: "—",
            createdAt: new Date().toISOString().split("T")[0],
          };
          setShipments([newShipment, ...shipments]);
          setForm({ origin: "", destination: "", driver: "", status: "IN TRANSIT" });
          setIsCreateModalOpen(false);
        }}
      />
    </div>
  );
}
