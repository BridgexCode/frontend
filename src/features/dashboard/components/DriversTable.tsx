"use client";

import { motion } from "framer-motion";
import { Eye, Edit2, ToggleLeft, ToggleRight, Trash2, Star } from "lucide-react";
import type { Driver } from "@/features/dashboard/services/mock-data";
import { DASHBOARD_STATUS_BADGE } from "@/features/dashboard/services/mock-data";
import { TableSkeleton } from "@/features/manager/components/TableSkeleton";
import { EmptyState } from "@/features/manager/components/EmptyState";

interface DriversTableProps {
  drivers: Driver[];
  loading: boolean;
  onView: (driver: Driver) => void;
  onEdit: (driver: Driver) => void;
  onCreateClick: () => void;
  onToggleActive?: (driver: Driver) => void;
  onDelete?: (driver: Driver) => void;
}

export function DriversTable({ drivers, loading, onView, onEdit, onCreateClick, onToggleActive, onDelete }: DriversTableProps) {
  if (loading) return <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden"><TableSkeleton rows={5} columns={8} /></div>;
  if (drivers.length === 0) return <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden"><EmptyState title="No drivers found" message="Try adjusting your search or filters." action={{ label: "Add Driver", onClick: onCreateClick }} /></div>;

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Name</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">ID</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">License</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Vehicle</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assigned</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rating</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <motion.tr
                key={driver.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <span className="font-semibold text-slate-800">{driver.name}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">{driver.driverId || "—"}</span>
                </td>
                <td className="px-4 py-3 text-slate-500 font-mono text-xs">{driver.licenseNumber}</td>
                <td className="px-4 py-3 text-slate-500">{driver.assignedVehicle}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${DASHBOARD_STATUS_BADGE[driver.status]}`}>
                    {driver.status === "ON_LEAVE" ? "On Leave" : driver.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-bold text-slate-700">{driver.assignedShipments}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-bold text-slate-700">{driver.rating}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button onClick={() => onView(driver)} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer" title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => onEdit(driver)} className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-all cursor-pointer" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    {onToggleActive && (
                      <button onClick={() => onToggleActive(driver)} className={`p-1.5 rounded-lg transition-all cursor-pointer ${driver.status === "ACTIVE" ? "text-slate-400 hover:text-red-600 hover:bg-red-50" : "text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"}`} title={driver.status === "ACTIVE" ? "Deactivate" : "Activate"}>
                        {driver.status === "ACTIVE" ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                      </button>
                    )}
                    {onDelete && (
                      <button onClick={() => onDelete(driver)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
