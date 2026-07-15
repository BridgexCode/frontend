"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { WorkersHeader } from "@/features/manager/components/WorkersHeader";
import { WorkersTable } from "@/features/manager/components/WorkersTable";
import { CreateWorkerModal } from "@/features/manager/components/CreateWorkerModal";
import { fetchWorkersApi, createWorkerApi, toggleActiveWorkerApi } from "@/features/manager/services/workers-api";

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

export default function WorkersPage() {
  const [workers, setWorkers] = useState<UIWorker[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<NewWorkerForm>({ name: "", email: "", phone: "", password: "" });
  const [formErrors, setFormErrors] = useState<Partial<NewWorkerForm>>({});

  useEffect(() => {
    let mounted = true;
    fetchWorkersApi().then((data) => {
      if (!mounted) return;
      setWorkers(data.map((w: any) => ({
        id: w.id,
        name: w.name,
        email: w.email,
        phone: w.phone || "",
        assignedShipments: 0,
        status: w.isActive ? "ACTIVE" as const : "INACTIVE" as const,
        createdAt: "",
      })));
    }).catch(() => {}).finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    return workers.filter((w) =>
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.email.toLowerCase().includes(search.toLowerCase()) ||
      w.phone.includes(search)
    );
  }, [workers, search]);

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
      const created = await createWorkerApi({ name: form.name, phone: form.phone });
      const newWorker: UIWorker = {
        id: created.id,
        name: created.name,
        email: created.email,
        phone: created.phone || "",
        assignedShipments: 0,
        status: "ACTIVE",
        createdAt: new Date().toISOString().split("T")[0],
      };
      setWorkers([newWorker, ...workers]);
      setForm({ name: "", email: "", phone: "", password: "" });
      setFormErrors({});
      setShowCreateModal(false);
    } catch (err) {
      console.error("Create worker failed", err);
    }
  };

  const handleToggleActive = useCallback(async (worker: UIWorker) => {
    try {
      await toggleActiveWorkerApi(worker.id);
      setWorkers((prev) => prev.map((w) => w.id === worker.id ? { ...w, status: w.status === "ACTIVE" ? "INACTIVE" as const : "ACTIVE" as const } : w));
    } catch (err) {
      console.error("Toggle failed", err);
    }
  }, []);

  return (
    <div className="space-y-6">
      <WorkersHeader search={search} onSearchChange={setSearch} onCreateClick={() => setShowCreateModal(true)} />
      <WorkersTable workers={filtered} loading={loading} onCreateClick={() => setShowCreateModal(true)} onToggleActive={handleToggleActive} />
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
