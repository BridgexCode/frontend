"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { Search, RotateCw, Filter, ChevronDown, Plus, Eye, ToggleLeft, ToggleRight, Trash2, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Organization } from "../types";
import { STATUS_BADGE } from "../services/mock-data";
import { TableSkeleton } from "@/features/manager/components/TableSkeleton";
import {
  fetchOrganizationsApi,
  updateOrganizationStatusApi,
  deleteOrganizationApi,
  type OrganizationResponse
} from "../services/super-admin-api";

function mapBackendOrgToFrontend(org: OrganizationResponse): Organization {
  return {
    id: org._id,
    name: org.name,
    email: org.metadata?.email || `admin@${org.slug || org._id}.com`,
    phone: org.metadata?.phone || "N/A",
    plan: (org.metadata?.plan?.toUpperCase() as any) || "FREE",
    status: org.status === "active" ? "ACTIVE" : "SUSPENDED",
    totalUsers: org.metadata?.totalUsers || 0,
    totalShipments: org.metadata?.totalShipments || 0,
    createdAt: org.createdAt ? new Date(org.createdAt).toISOString().split("T")[0] : "N/A",
  };
}

export function OrganizationsPage() {
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

  const loadOrganizations = useCallback(() => {
    setLoading(true);
    fetchOrganizationsApi()
      .then((data) => {
        setOrgs(data.map(mapBackendOrgToFrontend));
        setError(null);
      })
      .catch(() => {
        setError("Failed to fetch organizations");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadOrganizations();
  }, [loadOrganizations]);

  const handleToggleActive = async (org: Organization) => {
    const newStatus = org.status === "ACTIVE" ? "inactive" : "active";
    try {
      setLoading(true);
      const updated = await updateOrganizationStatusApi(org.id, newStatus);
      setOrgs((prev) =>
        prev.map((o) => (o.id === org.id ? mapBackendOrgToFrontend(updated) : o))
      );
    } catch {
      alert("Failed to update organization status");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (org: Organization) => {
    if (!confirm(`Are you sure you want to delete organization ${org.name}?`)) {
      return;
    }
    try {
      setLoading(true);
      await deleteOrganizationApi(org.id);
      setOrgs((prev) => prev.filter((o) => o.id !== org.id));
    } catch {
      alert("Failed to delete organization");
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    return orgs.filter((o) => {
      const matchesSearch =
        o.name.toLowerCase().includes(search.toLowerCase()) ||
        o.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orgs, search, statusFilter]);

  const handleRefresh = () => {
    loadOrganizations();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Organizations</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage all organizations on the platform</p>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by organization name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 font-medium"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>
          <button
            onClick={handleRefresh}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
          >
            <RotateCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-wrap gap-3 overflow-hidden"
            >
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Status</label>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-purple-600 bg-white font-medium cursor-pointer">
                  <option value="ALL">All Statuses</option>
                  <option value="ACTIVE">Active</option>
                  <option value="SUSPENDED">Suspended</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center border border-red-100 font-semibold mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
          <TableSkeleton rows={6} columns={7} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800">No organizations found</h3>
          <p className="text-sm text-slate-400 mt-1">Try resetting filters or searching for something else.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Organization</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Plan</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Created</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((org) => (
                  <motion.tr
                    key={org.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className="font-semibold text-slate-800">{org.name}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{org.email}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${STATUS_BADGE[org.plan]}`}>
                        {org.plan}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${STATUS_BADGE[org.status]}`}>
                        {org.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{org.createdAt}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setSelectedOrg(org)} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleToggleActive(org)} className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-all cursor-pointer" title="Toggle Active">
                          {org.status === "ACTIVE" ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                        </button>
                        <button onClick={() => handleDelete(org)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AnimatePresence>
        {selectedOrg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrg(null)} className="absolute inset-0 bg-black" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 15 }} className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md z-10 shadow-2xl relative">
              <button onClick={() => setSelectedOrg(null)} className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center mx-auto mb-3">
                  <Building2 className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{selectedOrg.name}</h3>
                <p className="text-xs text-slate-400">{selectedOrg.email}</p>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Phone", value: selectedOrg.phone },
                  { label: "Plan", value: selectedOrg.plan },
                  { label: "Status", value: selectedOrg.status },
                  { label: "Created", value: selectedOrg.createdAt },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-slate-50">
                    <span className="text-xs font-semibold text-slate-400">{item.label}</span>
                    <span className="text-sm font-semibold text-slate-800">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
