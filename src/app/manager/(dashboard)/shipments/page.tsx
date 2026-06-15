"use client";

import { useState, useMemo } from "react";
import { MOCK_SHIPMENTS, MOCK_WORKERS, type Shipment } from "@/features/manager/services/mock-data";
import { ShipmentsHeader } from "@/features/manager/components/ShipmentsHeader";
import { ShipmentsFilters } from "@/features/manager/components/ShipmentsFilters";
import { ShipmentsTable } from "@/features/manager/components/ShipmentsTable";
import { CreateShipmentModal } from "@/features/manager/components/CreateShipmentModal";
import { AssignShipmentModal } from "@/features/manager/components/AssignShipmentModal";

interface NewShipmentForm {
  trackingId: string;
  pickup: string;
  delivery: string;
  customerName: string;
  customerPhone: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  notes: string;
}

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>(MOCK_SHIPMENTS);
  const [workers] = useState(MOCK_WORKERS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<string>("");
  const [selectedWorker, setSelectedWorker] = useState<string>("");

  const [form, setForm] = useState<NewShipmentForm>({
    trackingId: "", pickup: "", delivery: "", customerName: "", customerPhone: "", priority: "Medium", notes: "",
  });

  const filtered = useMemo(() => {
    return shipments.filter((s) => {
      const matchesSearch =
        s.trackingId.toLowerCase().includes(search.toLowerCase()) ||
        s.customerName.toLowerCase().includes(search.toLowerCase()) ||
        s.worker.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || s.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [shipments, search, statusFilter]);

  const handleCreateShipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.trackingId || !form.pickup || !form.delivery || !form.customerName) return;

    const newShipment: Shipment = {
      id: `S00${shipments.length + 1}`,
      trackingId: form.trackingId,
      worker: "",
      status: "Pending",
      priority: form.priority,
      pickup: form.pickup,
      delivery: form.delivery,
      customerName: form.customerName,
      customerPhone: form.customerPhone,
      notes: form.notes,
      createdAt: new Date().toISOString().split("T")[0],
    };

    console.log("Create Shipment Payload:", newShipment);
    setShipments([newShipment, ...shipments]);
    setForm({ trackingId: "", pickup: "", delivery: "", customerName: "", customerPhone: "", priority: "Medium", notes: "" });
    setShowCreateModal(false);
  };

  const handleAssign = () => {
    if (!selectedShipment || !selectedWorker) return;
    setShipments((prev) =>
      prev.map((s) =>
        s.id === selectedShipment
          ? { ...s, worker: workers.find((w) => w.id === selectedWorker)?.name || "", status: "Assigned" as const }
          : s
      )
    );
    setShowAssignModal(false);
    setSelectedShipment("");
    setSelectedWorker("");
  };

  const handleStatusUpdate = (id: string, newStatus: Shipment["status"]) => {
    setShipments((prev) => prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s)));
  };

  const unassignedShipments = shipments.filter((s) => s.status === "Pending" || s.status === "Assigned");
  const activeWorkers = workers.filter((w) => w.status === "ACTIVE");

  return (
    <div className="space-y-6">
      <ShipmentsHeader onAssignClick={() => setShowAssignModal(true)} onCreateClick={() => setShowCreateModal(true)} />
      <ShipmentsFilters search={search} onSearchChange={setSearch} statusFilter={statusFilter} onStatusFilterChange={setStatusFilter} />
      <ShipmentsTable shipments={filtered} loading={loading} onCreateClick={() => setShowCreateModal(true)} onStatusUpdate={handleStatusUpdate} />
      <CreateShipmentModal open={showCreateModal} form={form} onFormChange={setForm} onClose={() => setShowCreateModal(false)} onSubmit={handleCreateShipment} />
      <AssignShipmentModal open={showAssignModal} unassignedShipments={unassignedShipments} activeWorkers={activeWorkers} selectedShipment={selectedShipment} selectedWorker={selectedWorker} onShipmentChange={setSelectedShipment} onWorkerChange={setSelectedWorker} onClose={() => { setShowAssignModal(false); setSelectedShipment(""); setSelectedWorker(""); }} onAssign={handleAssign} />
    </div>
  );
}
