"use client";

import { useState, useMemo } from "react";
import { MOCK_USERS, type ManagerUser } from "@/features/manager/services/mock-data";
import { UsersFilters } from "@/features/manager/components/UsersFilters";
import { UsersTable } from "@/features/manager/components/UsersTable";
import { ViewUserModal } from "@/features/manager/components/ViewUserModal";

export default function UsersPage() {
  const [users] = useState<ManagerUser[]>(MOCK_USERS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<ManagerUser | null>(null);

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

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <div className="space-y-6">
      <UsersFilters
        search={search} onSearchChange={setSearch}
        roleFilter={roleFilter} onRoleFilterChange={setRoleFilter}
        statusFilter={statusFilter} onStatusFilterChange={setStatusFilter}
        loading={loading} onRefresh={handleRefresh}
        onCreateClick={() => {}}
      />
      <UsersTable users={filtered} loading={loading} onView={setSelectedUser} />
      <ViewUserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
}
