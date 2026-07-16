"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/shared/lib/socket";
import { ShipmentsHeader } from "@/features/manager/components/ShipmentsHeader";
import { ShipmentsFilters } from "@/features/manager/components/ShipmentsFilters";
import { ShipmentsTable } from "@/features/manager/components/ShipmentsTable";
import { CreateShipmentModal } from "@/features/manager/components/CreateShipmentModal";
import { AssignShipmentModal } from "@/features/manager/components/AssignShipmentModal";
import { EditShipmentModal } from "@/features/manager/components/EditShipmentModal";
import { fetchShipmentsApi, createShipmentApi, assignDriverApi, updateShipmentApi, deleteShipmentApi, updateShipmentStatusApi, mapStatus, toBackendStatus } from "@/features/manager/services/shipments-api";
import { fetchDriversApi } from "@/features/dashboard/services/drivers-api";
import { fetchVehiclesApi } from "@/features/dashboard/services/vehicles-api";

interface UIShipment {
  id: string;
  trackingId: string;
  driverName: string;
  status: string;
  priority: string;
  pickup: string;
  delivery: string;
  customerName: string;
  customerPhone: string;
  notes: string;
  createdAt: string;
}

interface NewShipmentForm {
  trackingId: string;
  pickup: string;
  delivery: string;
  customerName: string;
  customerPhone: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  notes: string;
  assignShipment: boolean;
  selectedDriverId: string;
  selectedVehicleId: string;
}

export function ShipmentsPage() {
  const router = useRouter();
  const [shipments, setShipments] = useState<UIShipment[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<string>("");
  const [selectedDriver, setSelectedDriver] = useState<string>("");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [editingShipment, setEditingShipment] = useState<{ id: string; pickup: string; delivery: string; customerName: string; notes: string } | null>(null);

  const [form, setForm] = useState<NewShipmentForm>({
    trackingId: "", pickup: "", delivery: "", customerName: "", customerPhone: "", priority: "Medium", notes: "", assignShipment: false, selectedDriverId: "", selectedVehicleId: "",
  });

  const loadData = useCallback(async () => {
    try {
      const [shipData, driverData, vehicleData] = await Promise.all([
        fetchShipmentsApi(),
        fetchDriversApi(),
        fetchVehiclesApi(),
      ]);
      const driverMap = new Map(driverData.map((d: any) => [d._id, d.name]));
      setShipments(shipData.data.map((s: any) => ({
        id: s._id,
        trackingId: s.shipmentId,
        driverName: s.assignedDriverId ? driverMap.get(s.assignedDriverId) || "" : "",
        status: mapStatus(s.statusLifecycle),
        priority: "Medium",
        pickup: s.pickupLocation,
        delivery: s.destination,
        customerName: s.customerName,
        customerPhone: "",
        notes: s.notes || "",
        createdAt: new Date(s.createdAt).toISOString().split("T")[0],
      })));
      setDrivers(driverData);
      setVehicles(vehicleData);
    } catch {}
  }, []);

  useEffect(() => {
    let mounted = true;
    loadData().finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [loadData]);

  useEffect(() => {
    const handler = () => { loadData(); };
    socket.on("shipment:updated", handler);
    return () => { socket.off("shipment:updated", handler); };
  }, [loadData]);

  const filtered = useMemo(() => {
    return shipments.filter((s) => {
      const matchesSearch =
        s.trackingId.toLowerCase().includes(search.toLowerCase()) ||
        s.customerName.toLowerCase().includes(search.toLowerCase()) ||
        s.driverName.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || s.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [shipments, search, statusFilter]);

  const handleCreateShipment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.pickup || !form.delivery || !form.customerName) return;

    try {
      const payload: any = {
        pickupLocation: form.pickup,
        destination: form.delivery,
        customerName: form.customerName,
        expectedDeliveryDate: new Date().toISOString(),
      };
      if (form.assignShipment && form.selectedDriverId) {
        payload.assignedDriverId = form.selectedDriverId;
        if (form.selectedVehicleId) payload.assignedVehicleId = form.selectedVehicleId;
      }
      const apiShipment = await createShipmentApi(payload);
      const driver = form.assignShipment && form.selectedDriverId
        ? drivers.find((d: any) => d._id === form.selectedDriverId)
        : null;
      const newShipment: UIShipment = {
        id: apiShipment._id,
        trackingId: apiShipment.shipmentId,
        driverName: driver?.name || "",
        status: form.assignShipment ? "Dispatched" : "Pending",
        priority: form.priority,
        pickup: form.pickup,
        delivery: form.delivery,
        customerName: form.customerName,
        customerPhone: form.customerPhone,
        notes: form.notes,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setShipments([newShipment, ...shipments]);
      setForm({ trackingId: "", pickup: "", delivery: "", customerName: "", customerPhone: "", priority: "Medium", notes: "", assignShipment: false, selectedDriverId: "", selectedVehicleId: "" });
      setShowCreateModal(false);
    } catch (err) {
      console.error("Create shipment failed", err);
    }
  };

  const handleAssign = async () => {
    if (!selectedShipment || !selectedDriver) return;
    const driver = drivers.find((d: any) => d._id === selectedDriver);
    try {
      await assignDriverApi(selectedShipment, selectedDriver, selectedVehicle || undefined);
      setShipments((prev) =>
        prev.map((s) =>
          s.id === selectedShipment
            ? { ...s, driverName: driver?.name || "", status: "Dispatched" }
            : s
        )
      );
    } catch (err) {
      console.error("Assign driver failed", err);
    }
    setShowAssignModal(false);
    setSelectedShipment("");
    setSelectedDriver("");
    setSelectedVehicle("");
  };

  const handleStatusUpdate = useCallback(async (id: string, newStatus: string) => {
    const backendStatus = toBackendStatus(newStatus);
    try {
      await updateShipmentStatusApi(id, backendStatus);
      setShipments((prev) => prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s)));
    } catch (err) {
      console.error("Status update failed", err);
    }
  }, []);

  const handleView = useCallback((id: string) => {
    router.push(`/manager/shipments/${id}`);
  }, [router]);

  const handleEdit = useCallback((id: string) => {
    const s = shipments.find((s) => s.id === id);
    if (s) {
      setEditingShipment({ id: s.id, pickup: s.pickup, delivery: s.delivery, customerName: s.customerName, notes: s.notes });
    }
  }, [shipments]);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm("Are you sure you want to delete this shipment?")) return;
    try {
      await deleteShipmentApi(id);
      setShipments((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Delete shipment failed", err);
    }
  }, []);

  const handleEditSubmit = useCallback(async (id: string, data: { pickup: string; delivery: string; customerName: string; notes: string }) => {
    try {
      await updateShipmentApi(id, {
        pickupLocation: data.pickup,
        destination: data.delivery,
        customerName: data.customerName,
        notes: data.notes,
      });
      setShipments((prev) =>
        prev.map((s) => (s.id === id ? { ...s, pickup: data.pickup, delivery: data.delivery, customerName: data.customerName, notes: data.notes } : s))
      );
      setEditingShipment(null);
    } catch (err) {
      console.error("Update shipment failed", err);
    }
  }, []);

  const unassignedShipments = shipments.filter((s) => s.status === "Pending" || s.status === "Dispatched");

  return (
    <div className="space-y-6 py-6 md:py-10">
      <ShipmentsHeader onAssignClick={() => setShowAssignModal(true)} onCreateClick={() => setShowCreateModal(true)} />
      <ShipmentsFilters search={search} onSearchChange={setSearch} statusFilter={statusFilter} onStatusFilterChange={setStatusFilter} />
      <ShipmentsTable shipments={filtered} loading={loading} onCreateClick={() => setShowCreateModal(true)} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} onStatusUpdate={handleStatusUpdate} />
      <CreateShipmentModal open={showCreateModal} form={form} onFormChange={setForm} onClose={() => setShowCreateModal(false)} onSubmit={handleCreateShipment} drivers={drivers} vehicles={vehicles} />
      <AssignShipmentModal open={showAssignModal} unassignedShipments={unassignedShipments} drivers={drivers} vehicles={vehicles} selectedShipment={selectedShipment} selectedDriver={selectedDriver} selectedVehicle={selectedVehicle} onShipmentChange={setSelectedShipment} onDriverChange={setSelectedDriver} onVehicleChange={setSelectedVehicle} onClose={() => { setShowAssignModal(false); setSelectedShipment(""); setSelectedDriver(""); setSelectedVehicle(""); }} onAssign={handleAssign} />
      <EditShipmentModal open={!!editingShipment} shipment={editingShipment} onClose={() => setEditingShipment(null)} onSubmit={handleEditSubmit} />
    </div>
  );
}
