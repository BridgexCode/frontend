"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import type { Driver } from "@/features/dashboard/services/mock-data";
import { fetchDriversApi, createDriverApi, deleteDriverApi } from "@/features/dashboard/services/drivers-api";
import type { DriverFormData } from "./CreateDriverModal";
import { DriversFilters } from "./DriversFilters";
import { DriversTable } from "./DriversTable";
import { CreateDriverModal } from "./CreateDriverModal";
import { ViewDriverModal } from "./ViewDriverModal";

function toUiStatus(status: string): Driver["status"] {
  switch (status) {
    case "available":
    case "on_trip":
      return "ACTIVE";
    default:
      return "INACTIVE";
  }
}

export function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchDriversApi()
      .then((data) => {
        if (!mounted) return;
        const mapped: Driver[] = data.map((d) => ({
          id: d._id,
          name: d.name,
          email: "",
          phone: d.phone,
          licenseNumber: d.licenseNumber,
          assignedVehicle: d.vehicleNumber,
          status: toUiStatus(d.status),
          assignedShipments: 0,
          rating: 0,
          createdAt: new Date(d.createdAt).toISOString().split("T")[0],
        }));
        setDrivers(mapped);
      })
      .catch(() => {})
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    return drivers.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.phone.includes(search) ||
        d.licenseNumber.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || d.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [drivers, search, statusFilter]);

  const handleRefresh = () => {
    setLoading(true);
    fetchDriversApi()
      .then((data) => {
        const mapped: Driver[] = data.map((d) => ({
          id: d._id,
          name: d.name,
          email: "",
          phone: d.phone,
          licenseNumber: d.licenseNumber,
          assignedVehicle: d.vehicleNumber,
          status: toUiStatus(d.status),
          assignedShipments: 0,
          rating: 0,
          createdAt: new Date(d.createdAt).toISOString().split("T")[0],
        }));
        setDrivers(mapped);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleCreateDriver = useCallback(async (data: DriverFormData) => {
    try {
      const apiDriver = await createDriverApi({
        name: data.name,
        phone: data.phone,
        licenseNumber: data.licenseNumber,
        vehicleNumber: "",
      });
      const newDriver: Driver = {
        id: apiDriver._id,
        name: apiDriver.name,
        email: "",
        phone: apiDriver.phone,
        licenseNumber: apiDriver.licenseNumber,
        assignedVehicle: apiDriver.vehicleNumber,
        status: toUiStatus(apiDriver.status),
        assignedShipments: 0,
        rating: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setDrivers((prev) => [newDriver, ...prev]);
    } catch {
      // ignore
    }
  }, []);

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

  const handleDelete = useCallback(async (driver: Driver) => {
    try {
      await deleteDriverApi(driver.id);
      setDrivers((prev) => prev.filter((d) => d.id !== driver.id));
    } catch (err) {
      console.error("deleteDriver error:", err);
    }
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
