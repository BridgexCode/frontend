"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Search, RotateCw, Filter, ChevronDown, Eye, ToggleLeft, ToggleRight, Trash2, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchOrganizationsApi, toggleOrganizationStatusApi, deleteOrganizationApi, Organization } from "../services/admin-orgs-api";
import { STATUS_BADGE } from "../services/mock-data";
import { TableSkeleton } from "@/features/manager/components/TableSkeleton";
import { Mail } from "lucide-react";
import { getStoredEmail } from "@/shared/lib/axios";

export function OrganizationsPage() {
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [adminEmail, setAdminEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setAdminEmail(getStoredEmail() || "admin@naxivo.com");
  }, []);

  const loadOrgs = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchOrganizationsApi();
      setOrgs(data);
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { loadOrgs(); }, [loadOrgs]);

  const filtered = useMemo(() => {
    return orgs.filter((o) => {
      const matchesSearch =
        o.name.toLowerCase().includes(search.toLowerCase()) ||
        o.email.toLowerCase().includes(search.toLowerCase());
      const status = o.status === "active" ? "ACTIVE" : "SUSPENDED";
      const matchesStatus = statusFilter === "ALL" || status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orgs, search, statusFilter]);

  const handleToggle = async (org: Organization) => {
    const newStatus = org.status === "active" ? "inactive" : "active";
    try {
      const updated = await toggleOrganizationStatusApi(org._id, newStatus);
      setOrgs((prev) =>
        prev.map((o) => (o._id === org._id ? { ...o, status: updated.status } : o)),
      );
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to toggle status");
    }
  };

  const handleDelete = async (org: Organization) => {
    if (!confirm(`Are you sure you want to delete "${org.name}"?`)) return;
    try {
      await deleteOrganizationApi(org._id);
      setOrgs((prev) => prev.filter((o) => o._id !== org._id));
    } catch {}
  };

  const uiStatus = (status: string) => status === "active" ? "ACTIVE" : "SUSPENDED";
  const uiPlan = (plan: string) => plan || "FREE";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Organizations</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage all organizations on the platform</p>
          <p className="text-sm text-slate-600 mt-2 flex items-center gap-1.5"><Mail className="w-4 h-4 text-emerald-500" />{adminEmail || "admin@naxivo.com"}</p>
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
            onClick={loadOrgs}
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

        {error && (
          <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
        )}
      </div>

      {loading ? (
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
          <TableSkeleton rows={6} columns={7} />
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
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Users</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Shipments</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Created</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((org) => (
                  <motion.tr
                    key={org._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className="font-semibold text-slate-800">{org.name}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{org.email}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${STATUS_BADGE[uiPlan(org.plan)] || "bg-slate-100 text-slate-600"}`}>
                        {uiPlan(org.plan)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${STATUS_BADGE[uiStatus(org.status)]}`}>
                        {uiStatus(org.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{org.totalUsers}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{org.totalShipments}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{new Date(org.createdAt).toISOString().split("T")[0]}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setSelectedOrg(org)} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleToggle(org)} className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-all cursor-pointer" title="Toggle Active">
                          {org.status === "active" ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
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
                  { label: "Phone", value: selectedOrg.phone || "N/A" },
                  { label: "Plan", value: uiPlan(selectedOrg.plan) },
                  { label: "Status", value: uiStatus(selectedOrg.status) },
                  { label: "Users", value: selectedOrg.totalUsers },
                  { label: "Shipments", value: selectedOrg.totalShipments },
                  { label: "Created", value: new Date(selectedOrg.createdAt).toISOString().split("T")[0] },
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
