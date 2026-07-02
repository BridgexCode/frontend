"use client";

import { useState, useMemo, useCallback } from "react";
import type { Driver } from "@/features/dashboard/services/mock-data";
import { MOCK_DRIVERS } from "@/features/dashboard/services/mock-data";
import type { DriverFormData } from "./CreateDriverModal";
import { DriversFilters } from "./DriversFilters";
import { DriversTable } from "./DriversTable";
import { CreateDriverModal } from "./CreateDriverModal";
import { ViewDriverModal } from "./ViewDriverModal";

export function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>(MOCK_DRIVERS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filtered = useMemo(() => {
    return drivers.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.email.toLowerCase().includes(search.toLowerCase()) ||
        d.phone.includes(search) ||
        d.licenseNumber.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || d.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [drivers, search, statusFilter]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  const handleCreateDriver = useCallback(async (data: DriverFormData) => {
    const newDriver: Driver = {
      id: `D${String(drivers.length + 1).padStart(3, "0")}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      licenseNumber: data.licenseNumber,
      assignedVehicle: "Unassigned",
      status: "ACTIVE",
      assignedShipments: 0,
      rating: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setDrivers((prev) => [newDriver, ...prev]);
  }, [drivers.length]);

  const handleEdit = useCallback(async (data: DriverFormData) => {
    if (!editingDriver) return;
    setDrivers((prev) =>
      prev.map((d) => d.id === editingDriver.id ? { ...d, name: data.name, phone: data.phone, licenseNumber: data.licenseNumber } : d)
    );
    setEditingDriver(null);
  }, [editingDriver]);

  const handleToggleActive = useCallback((driver: Driver) => {
    setDrivers((prev) =>
      prev.map((d) => d.id === driver.id ? { ...d, status: d.status === "ACTIVE" ? "INACTIVE" as const : "ACTIVE" as const } : d)
    );
  }, []);

  const handleDelete = useCallback((driver: Driver) => {
    setDrivers((prev) => prev.filter((d) => d.id !== driver.id));
  }, []);

  return (
    <div className="space-y-6 py-6 md:py-10">
      <DriversFilters
        search={search} onSearchChange={setSearch}
        statusFilter={statusFilter} onStatusFilterChange={setStatusFilter}
        loading={loading} onRefresh={handleRefresh}
        onCreateClick={() => setIsCreateModalOpen(true)}
      />
      <DriversTable
        drivers={filtered}
        loading={loading}
        onView={setSelectedDriver}
        onEdit={setEditingDriver}
        onCreateClick={() => setIsCreateModalOpen(true)}
        onToggleActive={handleToggleActive}
        onDelete={handleDelete}
      />
      <ViewDriverModal driver={selectedDriver} onClose={() => setSelectedDriver(null)} />
      <CreateDriverModal
        key="create-driver"
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateDriver}
      />
      <CreateDriverModal
        key={editingDriver?.id || "edit-none"}
        open={!!editingDriver}
        onClose={() => setEditingDriver(null)}
        onSubmit={handleEdit}
        driver={editingDriver}
      />
    </div>
  );
}
