"use client";

import { useState, useEffect, useMemo } from "react";
import { fetchVehiclesApi, createVehicleApi, deleteVehicleApi } from "@/features/manager/services/vehicles-api";
import { Search, Plus, Trash2, Loader2 } from "lucide-react";

interface UIVehicle {
  _id: string;
  vehicleNumber: string;
  vehicleModel: string;
  type: string;
  status: string;
}

const STATUS_BADGE: Record<string, string> = {
  available: "bg-emerald-100 text-emerald-700",
  assigned: "bg-blue-100 text-blue-700",
  maintenance: "bg-amber-100 text-amber-700",
  inactive: "bg-slate-100 text-slate-500",
};

export default function ManagerVehiclesPage() {
  const [vehicles, setVehicles] = useState<UIVehicle[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ vehicleNumber: "", vehicleModel: "", type: "truck" as string });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchVehiclesApi().then((data) => {
      if (!mounted) return;
      setVehicles(data);
    }).catch(() => {}).finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    return vehicles.filter((v) =>
      v.vehicleNumber.toLowerCase().includes(search.toLowerCase()) ||
      v.vehicleModel.toLowerCase().includes(search.toLowerCase())
    );
  }, [vehicles, search]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.vehicleNumber || !form.vehicleModel) return;
    setCreating(true);
    try {
      const created = await createVehicleApi(form as any);
      setVehicles([created, ...vehicles]);
      setForm({ vehicleNumber: "", vehicleModel: "", type: "truck" });
      setShowCreate(false);
    } catch (err) {
      console.error("Create vehicle failed", err);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteVehicleApi(id);
      setVehicles((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-emerald-600" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Vehicles</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage fleet vehicles and their assignments</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all cursor-pointer shadow-md shadow-emerald-200">
          <Plus className="w-4 h-4" /> Add Vehicle
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input type="text" placeholder="Search vehicles..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 font-medium" />
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Number</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Model</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Type</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((vehicle) => (
                <tr key={vehicle._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-800 font-mono text-xs">{vehicle.vehicleNumber}</td>
                  <td className="px-4 py-3 text-slate-500">{vehicle.vehicleModel}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs capitalize text-slate-600">{vehicle.type}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${STATUS_BADGE[vehicle.status] || "bg-slate-100 text-slate-500"}`}>
                      {vehicle.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(vehicle._id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="text-center py-10 text-sm text-slate-400">No vehicles found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setShowCreate(false)} className="absolute inset-0 bg-black opacity-50" />
          <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-lg z-10 shadow-2xl relative">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Add New Vehicle</h3>
            <p className="text-xs text-slate-400 mb-6">Register a new vehicle to the fleet.</p>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Vehicle Number *</label>
                <input type="text" placeholder="e.g. KL-07-AB-1234" value={form.vehicleNumber} onChange={(e) => setForm({ ...form, vehicleNumber: e.target.value })} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 font-medium" required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Model *</label>
                <input type="text" placeholder="e.g. Ashok Leyland Boss" value={form.vehicleModel} onChange={(e) => setForm({ ...form, vehicleModel: e.target.value })} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 font-medium" required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Type</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 bg-white font-medium cursor-pointer">
                  <option value="truck">Truck</option>
                  <option value="van">Van</option>
                  <option value="pickup">Pickup</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowCreate(false)} className="flex-1 border border-slate-200 hover:bg-slate-50 font-bold text-xs py-3 rounded-xl cursor-pointer">Cancel</button>
                <button type="submit" disabled={creating} className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 font-bold text-xs py-3 rounded-xl cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2">
                  {creating && <Loader2 className="w-4 h-4 animate-spin" />}
                  {creating ? "Adding..." : "Add Vehicle"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
