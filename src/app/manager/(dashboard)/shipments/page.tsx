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
import { fetchDriversApi } from "@/features/manager/services/drivers-api";
import { fetchVehiclesApi } from "@/features/manager/services/vehicles-api";
import { Pagination } from "@/shared/components/Pagination";

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

export default function ShipmentsPage() {
  const router = useRouter();
  const [shipments, setShipments] = useState<UIShipment[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
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

  const loadData = useCallback(async (page: number = currentPage) => {
    try {
      const [shipRes, driverRes, vehicleRes] = await Promise.all([
        fetchShipmentsApi({ page, limit: 3, status: statusFilter !== "ALL" ? toBackendStatus(statusFilter) : undefined }),
        fetchDriversApi({ page: 1, limit: 100 }),
        fetchVehiclesApi({ page: 1, limit: 100 }),
      ]);
      const driverList = driverRes.data || [];
      const vehicleList = vehicleRes.data || [];
      const driverMap = new Map(driverList.map((d: any) => [d._id, d.name]));
      setShipments(shipRes.data.map((s: any) => ({
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
      setTotalPages(shipRes.totalPages || 1);
      setTotalItems(shipRes.total || 0);
      setDrivers(driverList);
      setVehicles(vehicleList);
    } catch {}
  }, [currentPage, statusFilter]);

  useEffect(() => {
    let mounted = true;
    loadData(currentPage).finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [currentPage, statusFilter, loadData]);

  useEffect(() => {
    const handler = () => { loadData(currentPage); };
    socket.on("shipment:updated", handler);
    return () => { socket.off("shipment:updated", handler); };
  }, [currentPage, loadData]);

  const filtered = useMemo(() => {
    return shipments.filter((s) => {
      const matchesSearch =
        s.trackingId.toLowerCase().includes(search.toLowerCase()) ||
        s.customerName.toLowerCase().includes(search.toLowerCase()) ||
        s.driverName.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    });
  }, [shipments, search]);

  const handleStatusUpdate = useCallback(async (id: string, newStatus: string) => {
    const backendStatus = toBackendStatus(newStatus);
    try {
      await updateShipmentStatusApi(id, backendStatus);
      setShipments((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
      );
    } catch (err) {
      console.error("Status update failed", err);
    }
  }, []);

  const handleView = useCallback((id: string) => {
    router.push(`/manager/shipments/${id}`);
  }, [router]);

  const handleEdit = useCallback((id: string) => {
    const target = shipments.find((s) => s.id === id);
    if (target) {
      setEditingShipment({
        id: target.id,
        pickup: target.pickup,
        delivery: target.delivery,
        customerName: target.customerName,
        notes: target.notes,
      });
    }
  }, [shipments]);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm("Are you sure you want to delete this shipment?")) return;
    try {
      await deleteShipmentApi(id);
      loadData(currentPage);
    } catch (err) {
      console.error("Delete shipment failed", err);
    }
  }, [currentPage, loadData]);

  const handleEditSubmit = useCallback(async (id: string, data: { pickup: string; delivery: string; customerName: string; notes: string }) => {
    try {
      await updateShipmentApi(id, {
        pickupLocation: data.pickup,
        destination: data.delivery,
        customerName: data.customerName,
        notes: data.notes,
      });
      loadData(currentPage);
      setEditingShipment(null);
    } catch (err) {
      console.error("Update shipment failed", err);
    }
  }, [currentPage, loadData]);

  const handleCreateShipment = useCallback(async () => {
    try {
      await createShipmentApi({
        pickupLocation: form.pickup,
        destination: form.delivery,
        customerName: form.customerName,
        expectedDeliveryDate: new Date(Date.now() + 86400000 * 3).toISOString(),
        assignedDriverId: form.selectedDriverId || undefined,
        assignedVehicleId: form.selectedVehicleId || undefined,
        notes: form.notes,
      });
      setShowCreateModal(false);
      setForm({ trackingId: "", pickup: "", delivery: "", customerName: "", customerPhone: "", priority: "Medium", notes: "", assignShipment: false, selectedDriverId: "", selectedVehicleId: "" });
      loadData(1);
      setCurrentPage(1);
    } catch (err) {
      console.error("Create shipment failed", err);
    }
  }, [form, loadData]);

  const handleAssign = useCallback(async () => {
    if (!selectedShipment || !selectedDriver) return;
    try {
      await assignDriverApi(selectedShipment, selectedDriver, selectedVehicle || undefined);
      setShowAssignModal(false);
      setSelectedShipment("");
      setSelectedDriver("");
      setSelectedVehicle("");
      loadData(currentPage);
    } catch (err) {
      console.error("Assign driver failed", err);
    }
  }, [selectedShipment, selectedDriver, selectedVehicle, currentPage, loadData]);

  const unassignedShipments = shipments.filter((s) => s.status === "Pending" || s.status === "Dispatched");

  return (
    <div className="space-y-6">
      <ShipmentsHeader onAssignClick={() => setShowAssignModal(true)} onCreateClick={() => setShowCreateModal(true)} />
      <ShipmentsFilters search={search} onSearchChange={setSearch} statusFilter={statusFilter} onStatusFilterChange={(st) => { setStatusFilter(st); setCurrentPage(1); }} />
      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-2xs">
        <ShipmentsTable shipments={filtered} loading={loading} onCreateClick={() => setShowCreateModal(true)} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} onStatusUpdate={handleStatusUpdate} />
        <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={totalItems} limit={3} onPageChange={setCurrentPage} />
      </div>
      <CreateShipmentModal open={showCreateModal} form={form} onFormChange={setForm} onClose={() => setShowCreateModal(false)} onSubmit={handleCreateShipment} drivers={drivers} vehicles={vehicles} />
      <AssignShipmentModal open={showAssignModal} unassignedShipments={unassignedShipments} drivers={drivers} vehicles={vehicles} selectedShipment={selectedShipment} selectedDriver={selectedDriver} selectedVehicle={selectedVehicle} onShipmentChange={setSelectedShipment} onDriverChange={setSelectedDriver} onVehicleChange={setSelectedVehicle} onClose={() => { setShowAssignModal(false); setSelectedShipment(""); setSelectedDriver(""); setSelectedVehicle(""); }} onAssign={handleAssign} />
      <EditShipmentModal open={!!editingShipment} shipment={editingShipment} onClose={() => setEditingShipment(null)} onSubmit={handleEditSubmit} />
    </div>
  );
}
