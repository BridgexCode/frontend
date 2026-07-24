"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import type { Manager } from "@/features/dashboard/services/mock-data";
import { fetchManagersApi, createManagerApi, updateManagerApi, toggleActiveManagerApi, softDeleteManagerApi, type CreateManagerPayload } from "@/features/dashboard/services/manager-api";
import { ManagersFilters } from "./ManagersFilters";
import { ManagersTable } from "./ManagersTable";
import { ViewManagerModal } from "./ViewManagerModal";
import { AddManagerModal } from "./AddManagerModal";

import { Pagination } from "@/shared/components/Pagination";

function toManagerStatus(apiManager: { isActive: boolean; isDeleted?: boolean }): Manager["status"] {
  if (apiManager.isDeleted) return "SUSPENDED";
  return apiManager.isActive ? "ACTIVE" : "INACTIVE";
}

export function ManagersPage() {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedManager, setSelectedManager] = useState<Manager | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingManager, setEditingManager] = useState<Manager | null>(null);

  const loadManagers = useCallback((page: number = currentPage) => {
    let mounted = true;
    setLoading(true);
    fetchManagersApi({ page, limit: 3, search: search || undefined })
      .then((res) => {
        if (!mounted) return;
        const list = Array.isArray(res) ? res : (res.data || []);
        const mapped: Manager[] = list.map((m: any) => ({
          id: m._id || m.id,
          name: m.name,
          email: m.email,
          phone: m.phone || "",
          status: m.isActive ? "ACTIVE" : "INACTIVE",
          createdAt: "",
        }));
        setManagers(mapped);
        setTotalPages(res.totalPages || Math.ceil((res.total || list.length) / 3) || 1);
        setTotalItems(res.total ?? list.length);
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, [currentPage, search]);

  useEffect(() => {
    return loadManagers(currentPage);
  }, [currentPage, search, loadManagers]);

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
      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-2xs">
        <ManagersTable
          managers={filtered}
          loading={loading}
          onView={setSelectedManager}
          onEdit={setEditingManager}
          onCreateClick={() => setIsCreateModalOpen(true)}
          onToggleActive={handleToggleActive}
          onDelete={handleDelete}
        />
        <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={totalItems} limit={3} onPageChange={setCurrentPage} />
      </div>
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
