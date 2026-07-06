"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import type { ApiVehicle } from "@/features/dashboard/services/vehicles-api";
import { fetchVehiclesApi, createVehicleApi, updateVehicleApi, deleteVehicleApi } from "@/features/dashboard/services/vehicles-api";
import type { VehicleFormData } from "./CreateVehicleModal";
import { VehiclesFilters } from "./VehiclesFilters";
import { VehiclesTable } from "./VehiclesTable";
import { CreateVehicleModal } from "./CreateVehicleModal";
import { ViewVehicleModal } from "./ViewVehicleModal";

interface UiVehicle {
  id: string;
  plateNumber: string;
  model: string;
  driver: string;
  status: "ACTIVE" | "IN_MAINTENANCE" | "OUT_OF_SERVICE";
  type: "Truck" | "Van" | "Container";
  capacity: string;
  lastService: string;
  createdAt: string;
}

function toUiStatus(status: string): UiVehicle["status"] {
  switch (status) {
    case "available":
    case "assigned":
      return "ACTIVE";
    case "maintenance":
      return "IN_MAINTENANCE";
    default:
      return "OUT_OF_SERVICE";
  }
}

function toUiType(type: string): UiVehicle["type"] {
  switch (type) {
    case "truck": return "Truck";
    case "van": return "Van";
    default: return "Container";
  }
}

function toApiType(type: string): "truck" | "van" | "pickup" | "bike" | "other" {
  switch (type) {
    case "Truck": return "truck";
    case "Van": return "van";
    case "Container": return "other";
    default: return "other";
  }
}

function mapToUi(api: ApiVehicle): UiVehicle {
  return {
    id: api._id,
    plateNumber: api.vehicleNumber,
    model: api.vehicleModel,
    driver: "",
    status: toUiStatus(api.status),
    type: toUiType(api.type),
    capacity: "",
    lastService: "",
    createdAt: api.createdAt,
  };
}

export function VehiclesPage() {
  const [vehicles, setVehicles] = useState<ApiVehicle[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<UiVehicle | null>(null);
  const [editingVehicle, setEditingVehicle] = useState<ApiVehicle | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchVehiclesApi()
      .then((data) => { if (mounted) setVehicles(data); })
      .catch(() => {})
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const uiVehicles = useMemo(() => vehicles.map(mapToUi), [vehicles]);

  const filtered = useMemo(() => {
    return uiVehicles.filter((v) => {
      const matchesSearch =
        v.plateNumber.toLowerCase().includes(search.toLowerCase()) ||
        v.model.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || v.status === statusFilter;
      const matchesType = typeFilter === "ALL" || v.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [uiVehicles, search, statusFilter, typeFilter]);

  const handleRefresh = () => {
    setLoading(true);
    fetchVehiclesApi()
      .then((data) => setVehicles(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleCreateVehicle = useCallback(async (data: VehicleFormData) => {
    try {
      const newVehicle = await createVehicleApi({
        vehicleNumber: data.plateNumber,
        vehicleModel: data.model,
        type: toApiType(data.type),
      });
      setVehicles((prev) => [newVehicle, ...prev]);
    } catch {
      // ignore
    }
  }, []);

  const handleEdit = useCallback(async (data: VehicleFormData) => {
    if (!editingVehicle) return;
    try {
      const updated = await updateVehicleApi(editingVehicle._id, {
        vehicleNumber: data.plateNumber,
        vehicleModel: data.model,
        type: toApiType(data.type),
      });
      setVehicles((prev) => prev.map((v) => v._id === editingVehicle._id ? updated : v));
      setEditingVehicle(null);
    } catch {
      // ignore
    }
  }, [editingVehicle]);

  const handleDelete = useCallback(async (vehicle: UiVehicle) => {
    try {
      await deleteVehicleApi(vehicle.id);
      setVehicles((prev) => prev.filter((v) => v._id !== vehicle.id));
    } catch {
      // ignore
    }
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
        onEdit={(v) => {
          const found = vehicles.find((ve) => ve._id === v.id);
          if (found) setEditingVehicle(found);
        }}
        onCreateClick={() => setIsCreateModalOpen(true)}
        onDelete={handleDelete}
      />
      <ViewVehicleModal
        vehicle={selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
      />
      <CreateVehicleModal
        key="create-vehicle"
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateVehicle}
      />
      <CreateVehicleModal
        key={editingVehicle?._id || "edit-none"}
        open={!!editingVehicle}
        onClose={() => setEditingVehicle(null)}
        onSubmit={handleEdit}
        vehicle={editingVehicle ? {
          id: editingVehicle._id,
          plateNumber: editingVehicle.vehicleNumber,
          model: editingVehicle.vehicleModel,
          type: toUiType(editingVehicle.type),
          driver: "",
          status: toUiStatus(editingVehicle.status),
          capacity: "",
          lastService: "",
          createdAt: editingVehicle.createdAt,
        } : null}
      />
    </div>
  );
}
