"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { UsersFilters } from "@/features/manager/components/UsersFilters";
import { UsersTable } from "@/features/manager/components/UsersTable";
import { ViewUserModal } from "@/features/manager/components/ViewUserModal";
import { fetchUsersApi, toggleActiveUserApi } from "@/features/manager/services/users-api";

interface UIUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  createdAt: string;
}

function toUiUser(apiUser: any): UIUser {
  return {
    id: apiUser.id,
    name: apiUser.name,
    email: apiUser.email,
    phone: apiUser.phone || "",
    role: apiUser.role === "WORKER" ? "WORKER" : "OPERATIONS_MANAGER",
    status: apiUser.isActive ? "ACTIVE" : "INACTIVE",
    createdAt: "",
  };
}

import { Pagination } from "@/shared/components/Pagination";

export default function UsersPage() {
  const [users, setUsers] = useState<UIUser[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UIUser | null>(null);

  const loadUsers = useCallback(async (page: number = currentPage, role: string = roleFilter, searchStr: string = search) => {
    try {
      const res = await fetchUsersApi({
        page,
        limit: 3,
        role: role !== "ALL" ? role : undefined,
        search: searchStr || undefined,
      });
      setUsers(res.data.map(toUiUser));
      setTotalPages(res.totalPages || 1);
      setTotalItems(res.total || 0);
    } catch {}
  }, [currentPage, roleFilter, search]);

  useEffect(() => {
    let mounted = true;
    loadUsers(currentPage, roleFilter, search).finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [currentPage, roleFilter, search, loadUsers]);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchesStatus = statusFilter === "ALL" || u.status === statusFilter;
      return matchesStatus;
    });
  }, [users, statusFilter]);

  const handleRefresh = useCallback(() => {
    setLoading(true);
    loadUsers(currentPage, roleFilter, search).finally(() => setLoading(false));
  }, [currentPage, roleFilter, search, loadUsers]);

  const handleToggleActive = useCallback(async (user: UIUser) => {
    try {
      await toggleActiveUserApi(user.id);
      loadUsers(currentPage, roleFilter, search);
    } catch (err) {
      console.error("Toggle active failed", err);
    }
  }, [currentPage, roleFilter, search, loadUsers]);

  return (
    <div className="space-y-6">
      <UsersFilters
        search={search} onSearchChange={(s) => { setSearch(s); setCurrentPage(1); }}
        roleFilter={roleFilter} onRoleFilterChange={(r) => { setRoleFilter(r); setCurrentPage(1); }}
        statusFilter={statusFilter} onStatusFilterChange={setStatusFilter}
        loading={loading} onRefresh={handleRefresh}
        onCreateClick={() => {}}
      />
      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-2xs">
        <UsersTable users={filtered} loading={loading} onView={setSelectedUser} onToggleActive={handleToggleActive} />
        <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={totalItems} limit={3} onPageChange={setCurrentPage} />
      </div>
      <ViewUserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
}
