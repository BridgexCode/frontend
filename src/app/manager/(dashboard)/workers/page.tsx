"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { WorkersHeader } from "@/features/manager/components/WorkersHeader";
import { WorkersTable } from "@/features/manager/components/WorkersTable";
import { CreateWorkerModal } from "@/features/manager/components/CreateWorkerModal";
import { fetchWorkersApi, createWorkerApi, toggleActiveWorkerApi, deleteWorkerApi } from "@/features/manager/services/workers-api";

interface UIWorker {
  id: string;
  name: string;
  email: string;
  phone: string;
  assignedShipments: number;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
}

interface NewWorkerForm {
  name: string;
  email: string;
  phone: string;
  password: string;
}

import { Pagination } from "@/shared/components/Pagination";

export default function WorkersPage() {
  const [workers, setWorkers] = useState<UIWorker[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<NewWorkerForm>({ name: "", email: "", phone: "", password: "" });
  const [formErrors, setFormErrors] = useState<Partial<NewWorkerForm>>({});

  const loadWorkers = useCallback(async (page: number = currentPage, searchStr: string = search) => {
    try {
      const res = await fetchWorkersApi({ page, limit: 3, search: searchStr || undefined });
      setWorkers(res.data.map((w: any) => ({
        id: w.id,
        name: w.name,
        email: w.email,
        phone: w.phone || "",
        assignedShipments: 0,
        status: w.isActive ? "ACTIVE" as const : "INACTIVE" as const,
        createdAt: "",
      })));
      setTotalPages(res.totalPages || 1);
      setTotalItems(res.total || 0);
    } catch {}
  }, [currentPage, search]);

  useEffect(() => {
    let mounted = true;
    loadWorkers(currentPage, search).finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [currentPage, search, loadWorkers]);

  const validate = () => {
    const errors: Partial<NewWorkerForm> = {};
    if (!form.name.trim()) errors.name = "Name is required";
    if (!form.phone.trim()) errors.phone = "Phone is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await createWorkerApi({ name: form.name, phone: form.phone });
      setForm({ name: "", email: "", phone: "", password: "" });
      setFormErrors({});
      setShowCreateModal(false);
      setCurrentPage(1);
      loadWorkers(1, search);
    } catch (err: any) {
      const message = err?.response?.data?.error || err?.response?.data?.message || err.message || "Something went wrong";
      toast.error(message);
    }
  };

  const handleToggleActive = useCallback(async (worker: UIWorker) => {
    try {
      await toggleActiveWorkerApi(worker.id);
      loadWorkers(currentPage, search);
      toast.success("Worker status updated");
    } catch (err) {
      toast.error("Failed to toggle worker status");
    }
  }, [currentPage, search, loadWorkers]);

  const handleDelete = useCallback(async (worker: UIWorker) => {
    if (!window.confirm(`Delete worker "${worker.name}"?`)) return;
    try {
      await deleteWorkerApi(worker.id);
      loadWorkers(currentPage, search);
      toast.success("Worker deleted");
    } catch (err) {
      toast.error("Failed to delete worker");
    }
  }, [currentPage, search, loadWorkers]);

  return (
    <div className="space-y-6">
      <WorkersHeader search={search} onSearchChange={(s) => { setSearch(s); setCurrentPage(1); }} onCreateClick={() => setShowCreateModal(true)} />
      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-2xs">
        <WorkersTable workers={workers} loading={loading} onCreateClick={() => setShowCreateModal(true)} onToggleActive={handleToggleActive} onDelete={handleDelete} />
        <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={totalItems} limit={3} onPageChange={setCurrentPage} />
      </div>
      <CreateWorkerModal
        open={showCreateModal}
        form={form}
        formErrors={formErrors}
        showPassword={showPassword}
        onFormChange={setForm}
        onShowPasswordChange={setShowPassword}
        onClose={() => { setShowCreateModal(false); setFormErrors({}); }}
        onSubmit={handleCreate}
      />
    </div>
  );
}
