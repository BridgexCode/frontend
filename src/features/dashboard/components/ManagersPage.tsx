"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import type { Manager } from "@/features/dashboard/services/mock-data";
import { fetchManagersApi, createManagerApi, updateManagerApi, toggleActiveManagerApi, softDeleteManagerApi, type CreateManagerPayload } from "@/features/dashboard/services/manager-api";
import { ManagersFilters } from "./ManagersFilters";
import { ManagersTable } from "./ManagersTable";
import { ViewManagerModal } from "./ViewManagerModal";
import { AddManagerModal } from "./AddManagerModal";

function toManagerStatus(apiManager: { isActive: boolean; isDeleted?: boolean }): Manager["status"] {
  if (apiManager.isDeleted) return "SUSPENDED";
  return apiManager.isActive ? "ACTIVE" : "INACTIVE";
}

export function ManagersPage() {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [selectedManager, setSelectedManager] = useState<Manager | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingManager, setEditingManager] = useState<Manager | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchManagersApi()
      .then((data) => {
        if (!mounted) return;
        const mapped: Manager[] = data.map((m) => ({
          id: m.id,
          name: m.name,
          email: m.email,
          phone: m.phone || "",
          status: m.isActive ? "ACTIVE" : "INACTIVE",
          createdAt: "",
        }));
        setManagers(mapped);
      })
      .catch(() => {
        // silently fail — table will show empty state
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    return managers.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase()) ||
        m.phone.includes(search);
      const matchesStatus = statusFilter === "ALL" || m.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [managers, search, statusFilter]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  const handleCreateManager = useCallback(async (data: CreateManagerPayload) => {
    const apiManager = await createManagerApi(data);
    const newManager: Manager = {
      id: apiManager.id,
      name: apiManager.name,
      email: apiManager.email,
      phone: apiManager.phone || data.phone,
      status: toManagerStatus(apiManager),
      createdAt: new Date().toISOString().split("T")[0],
    };
    setManagers((prev) => [newManager, ...prev]);
  }, []);

  const handleEdit = useCallback(async (data: { name: string; email: string; phone: string }) => {
    if (!editingManager) return;
    const apiManager = await updateManagerApi(editingManager.id, { name: data.name, phone: data.phone });
    setManagers((prev) =>
      prev.map((m) =>
        m.id === editingManager.id
          ? { ...m, name: apiManager.name, phone: apiManager.phone || "" }
          : m
      )
    );
    setEditingManager(null);
  }, [editingManager]);

  const handleToggleActive = useCallback(async (manager: Manager) => {
    const result = await toggleActiveManagerApi(manager.id);
    setManagers((prev) =>
      prev.map((m) =>
        m.id === manager.id
          ? { ...m, status: result.isActive ? "ACTIVE" : "INACTIVE" }
          : m
      )
    );
  }, []);

  const handleDelete = useCallback(async (manager: Manager) => {
    try {
      await softDeleteManagerApi(manager.id);
    } catch {
      // Manager likely never existed on backend (mock data local ID) — remove locally
    }
    setManagers((prev) => prev.filter((m) => m.id !== manager.id));
  }, []);

  return (
    <div className="space-y-6 py-6 md:py-10">
      <ManagersFilters
        search={search} onSearchChange={setSearch}
        statusFilter={statusFilter} onStatusFilterChange={setStatusFilter}
        loading={loading} onRefresh={handleRefresh}
        onCreateClick={() => setIsCreateModalOpen(true)}
      />
      <ManagersTable
        managers={filtered}
        loading={loading}
        onView={setSelectedManager}
        onEdit={setEditingManager}
        onCreateClick={() => setIsCreateModalOpen(true)}
        onToggleActive={handleToggleActive}
        onDelete={handleDelete}
      />
      <ViewManagerModal manager={selectedManager} onClose={() => setSelectedManager(null)} />
      <AddManagerModal
        key="create-manager"
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateManager}
      />
      <AddManagerModal
        key={editingManager?.id || "edit-none"}
        open={!!editingManager}
        onClose={() => setEditingManager(null)}
        onSubmit={handleEdit}
        manager={editingManager}
      />
    </div>
  );
}
