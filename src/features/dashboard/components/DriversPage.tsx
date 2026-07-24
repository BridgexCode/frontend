"use client";

import { useState, useEffect, useMemo } from "react";
import { fetchDriversApi, createDriverApi, deleteDriverApi } from "@/features/dashboard/services/drivers-api";
import { Search, Plus, Trash2, Loader2 } from "lucide-react";

import { Pagination } from "@/shared/components/Pagination";

interface UIDriver {
  _id: string;
  driverId?: string;
  name: string;
  phone: string;
  licenseNumber: string;
  telegramId?: string;
  status: string;
}

export function DriversPage() {
  const [drivers, setDrivers] = useState<UIDriver[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", licenseNumber: "" });
  const [creating, setCreating] = useState(false);

  const loadDrivers = async (page: number = currentPage, searchQuery: string = search) => {
    try {
      const res = await fetchDriversApi({ page, limit: 3, search: searchQuery || undefined });
      const list = Array.isArray(res) ? res : (res.data || []);
      setDrivers(list);
      setTotalPages(res.totalPages || Math.ceil((res.total || list.length) / 3) || 1);
      setTotalItems(res.total ?? list.length);
    } catch {}
  };

  useEffect(() => {
    let mounted = true;
    loadDrivers(currentPage, search).finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [currentPage, search]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.licenseNumber) return;
    setCreating(true);
    try {
      await createDriverApi(form);
      setForm({ name: "", phone: "", licenseNumber: "" });
      setShowCreate(false);
      setCurrentPage(1);
      loadDrivers(1, search);
    } catch (err) {
      console.error("Create driver failed", err);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDriverApi(id);
      loadDrivers(currentPage, search);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-emerald-600" /></div>;

  return (
    <div className="space-y-6 py-6 md:py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Drivers</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage delivery drivers and their Telegram linking</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all cursor-pointer shadow-md shadow-emerald-200">
          <Plus className="w-4 h-4" /> Add Driver
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text" placeholder="Search drivers..." value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 font-medium"
        />
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">ID</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Name</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">License</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Telegram</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr key={driver._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">{driver.driverId || "—"}</span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-800">{driver.name}</td>
                  <td className="px-4 py-3 text-slate-500">{driver.phone}</td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-xs">{driver.licenseNumber}</td>
                  <td className="px-4 py-3">
                    {driver.telegramId ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">✅ Linked</span>
                    ) : (
                      <span className="text-[10px] text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(driver._id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {drivers.length === 0 && (
                <tr><td colSpan={6} className="text-center py-10 text-sm text-slate-400">No drivers found</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={totalItems} limit={3} onPageChange={setCurrentPage} />
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setShowCreate(false)} className="absolute inset-0 bg-black opacity-50" />
          <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-lg z-10 shadow-2xl relative">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Add New Driver</h3>
            <p className="text-xs text-slate-400 mb-6">Register a new driver to the fleet.</p>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Full Name *</label>
                <input type="text" placeholder="e.g. Rahul P" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 font-medium" required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Phone *</label>
                <input type="tel" placeholder="e.g. 9876543210" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 font-medium" required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">License Number *</label>
                <input type="text" placeholder="e.g. DL-07-2024-001" value={form.licenseNumber} onChange={(e) => setForm({ ...form, licenseNumber: e.target.value })} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 font-medium" required />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowCreate(false)} className="flex-1 border border-slate-200 hover:bg-slate-50 font-bold text-xs py-3 rounded-xl cursor-pointer">Cancel</button>
                <button type="submit" disabled={creating} className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 font-bold text-xs py-3 rounded-xl cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2">
                  {creating && <Loader2 className="w-4 h-4 animate-spin" />}
                  {creating ? "Creating..." : "Add Driver"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
