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

export default function UsersPage() {
  const [users, setUsers] = useState<UIUser[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UIUser | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchUsersApi().then((data) => {
      if (!mounted) return;
      setUsers(data.map(toUiUser));
    }).catch(() => {}).finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.phone.includes(search);
      const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
      const matchesStatus = statusFilter === "ALL" || u.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const handleRefresh = useCallback(() => {
    setLoading(true);
    fetchUsersApi().then((data) => setUsers(data.map(toUiUser)))
      .catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleToggleActive = useCallback(async (user: UIUser) => {
    try {
      await toggleActiveUserApi(user.id);
      setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, status: u.status === "ACTIVE" ? "INACTIVE" as const : "ACTIVE" as const } : u));
    } catch (err) {
      console.error("Toggle active failed", err);
    }
  }, []);

  return (
    <div className="space-y-6">
      <UsersFilters
        search={search} onSearchChange={setSearch}
        roleFilter={roleFilter} onRoleFilterChange={setRoleFilter}
        statusFilter={statusFilter} onStatusFilterChange={setStatusFilter}
        loading={loading} onRefresh={handleRefresh}
        onCreateClick={() => {}}
      />
      <UsersTable users={filtered} loading={loading} onView={setSelectedUser} onToggleActive={handleToggleActive} />
      <ViewUserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
}
