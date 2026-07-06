"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import type { ApiShipment } from "@/features/dashboard/services/shipments-api";
import { fetchShipmentsApi, createShipmentApi } from "@/features/dashboard/services/shipments-api";
import { ShipmentsFilters } from "./ShipmentsFilters";
import { ShipmentsTable } from "./ShipmentsTable";
import { ViewShipmentModal } from "./ViewShipmentModal";
import { CreateShipmentModal } from "./CreateShipmentModal";

export function ShipmentsPage() {
  const [shipments, setShipments] = useState<ApiShipment[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [selectedShipment, setSelectedShipment] = useState<ApiShipment | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [form, setForm] = useState<{
    pickupLocation: string;
    destination: string;
    customerName: string;
    expectedDeliveryDate: string;
  }>({ pickupLocation: "", destination: "", customerName: "", expectedDeliveryDate: "" });

  useEffect(() => {
    let mounted = true;
    fetchShipmentsApi({ page: 1, limit: 50 })
      .then((res) => { if (mounted) setShipments(res.data); })
      .catch(() => {})
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    return shipments.filter((s) => {
      const route = `${s.pickupLocation} → ${s.destination}`;
      const matchesSearch =
        s.shipmentId.toLowerCase().includes(search.toLowerCase()) ||
        route.toLowerCase().includes(search.toLowerCase()) ||
        s.customerName.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || s.statusLifecycle === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [shipments, search, statusFilter]);

  const handleRefresh = () => {
    setLoading(true);
    fetchShipmentsApi({ page: 1, limit: 50 })
      .then((res) => setShipments(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleCreate = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.pickupLocation || !form.destination || !form.customerName || !form.expectedDeliveryDate) return;
    try {
      const newShipment = await createShipmentApi({
        pickupLocation: form.pickupLocation,
        destination: form.destination,
        customerName: form.customerName,
        expectedDeliveryDate: form.expectedDeliveryDate,
      });
      setShipments((prev) => [newShipment, ...prev]);
      setForm({ pickupLocation: "", destination: "", customerName: "", expectedDeliveryDate: "" });
      setIsCreateModalOpen(false);
    } catch {
      // handle error
    }
  }, [form]);

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
        onSubmit={handleCreate}
      />
    </div>
  );
}
