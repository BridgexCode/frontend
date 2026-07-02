"use client";

import { useState, useMemo, useCallback } from "react";
import type { Vehicle } from "@/features/dashboard/services/mock-data";
import { MOCK_VEHICLES } from "@/features/dashboard/services/mock-data";
import { VehiclesFilters } from "./VehiclesFilters";
import { VehiclesTable } from "./VehiclesTable";
import type { VehicleFormData } from "./CreateVehicleModal";
import { CreateVehicleModal } from "./CreateVehicleModal";
import { ViewVehicleModal } from "./ViewVehicleModal";

export function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(MOCK_VEHICLES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filtered = useMemo(() => {
    return vehicles.filter((v) => {
      const matchesSearch =
        v.plateNumber.toLowerCase().includes(search.toLowerCase()) ||
        v.model.toLowerCase().includes(search.toLowerCase()) ||
        v.driver.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || v.status === statusFilter;
      const matchesType = typeFilter === "ALL" || v.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [vehicles, search, statusFilter, typeFilter]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  const handleCreateVehicle = useCallback(async (data: VehicleFormData) => {
    const newVehicle: Vehicle = {
      id: `V${String(vehicles.length + 1).padStart(3, "0")}`,
      plateNumber: data.plateNumber,
      model: data.model,
      type: data.type,
      driver: "Unassigned",
      status: "ACTIVE",
      capacity: data.capacity,
      lastService: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString().split("T")[0],
    };
    setVehicles((prev) => [newVehicle, ...prev]);
  }, [vehicles.length]);

  const handleEdit = useCallback(async (data: VehicleFormData) => {
    if (!editingVehicle) return;
    setVehicles((prev) =>
      prev.map((v) => v.id === editingVehicle.id ? { ...v, plateNumber: data.plateNumber, model: data.model, type: data.type, capacity: data.capacity } : v)
    );
    setEditingVehicle(null);
  }, [editingVehicle]);

  const handleDelete = useCallback((vehicle: Vehicle) => {
    setVehicles((prev) => prev.filter((v) => v.id !== vehicle.id));
  }, []);

  return (
    <div className="space-y-6 py-6 md:py-10">
      <VehiclesFilters
        search={search} onSearchChange={setSearch}
        statusFilter={statusFilter} onStatusFilterChange={setStatusFilter}
        typeFilter={typeFilter} onTypeFilterChange={setTypeFilter}
        loading={loading} onRefresh={handleRefresh}
        onCreateClick={() => setIsCreateModalOpen(true)}
      />
      <VehiclesTable
        vehicles={filtered}
        loading={loading}
        onView={setSelectedVehicle}
        onEdit={setEditingVehicle}
        onCreateClick={() => setIsCreateModalOpen(true)}
        onDelete={handleDelete}
      />
      <ViewVehicleModal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />
      <CreateVehicleModal
        key="create-vehicle"
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateVehicle}
      />
      <CreateVehicleModal
        key={editingVehicle?.id || "edit-none"}
        open={!!editingVehicle}
        onClose={() => setEditingVehicle(null)}
        onSubmit={handleEdit}
        vehicle={editingVehicle}
      />
    </div>
  );
}
