"use client";

import { useState, useMemo } from "react";
import { MOCK_WORKERS, type Worker } from "@/features/manager/services/mock-data";
import { WorkersHeader } from "@/features/manager/components/WorkersHeader";
import { WorkersTable } from "@/features/manager/components/WorkersTable";
import { CreateWorkerModal } from "@/features/manager/components/CreateWorkerModal";

interface NewWorkerForm {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export default function WorkersPage() {
  const [workers, setWorkers] = useState<Worker[]>(MOCK_WORKERS);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<NewWorkerForm>({ name: "", email: "", phone: "", password: "" });
  const [formErrors, setFormErrors] = useState<Partial<NewWorkerForm>>({});

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
    if (!form.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Invalid email";
    if (!form.phone.trim()) errors.phone = "Phone is required";
    if (!form.password) errors.password = "Password is required";
    else if (form.password.length < 8) errors.password = "Min 8 characters";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newWorker: Worker = {
      id: `W00${workers.length + 1}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      assignedShipments: 0,
      status: "ACTIVE",
      createdAt: new Date().toISOString().split("T")[0],
    };

    console.log("Create Worker Payload:", { ...form, role: "WORKER" });

    setWorkers([newWorker, ...workers]);
    setForm({ name: "", email: "", phone: "", password: "" });
    setFormErrors({});
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6">
      <WorkersHeader search={search} onSearchChange={setSearch} onCreateClick={() => setShowCreateModal(true)} />
      <WorkersTable workers={filtered} loading={loading} onCreateClick={() => setShowCreateModal(true)} />
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
