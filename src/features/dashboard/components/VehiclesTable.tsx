"use client";

import { motion } from "framer-motion";
import { Eye, Edit2, Trash2 } from "lucide-react";
import type { Vehicle } from "@/features/dashboard/services/mock-data";
import { DASHBOARD_STATUS_BADGE } from "@/features/dashboard/services/mock-data";
import { TableSkeleton } from "@/features/manager/components/TableSkeleton";
import { EmptyState } from "@/features/manager/components/EmptyState";

interface VehiclesTableProps {
  vehicles: Vehicle[];
  loading: boolean;
  onView: (vehicle: Vehicle) => void;
  onEdit: (vehicle: Vehicle) => void;
  onCreateClick: () => void;
  onDelete?: (vehicle: Vehicle) => void;
}

export function VehiclesTable({ vehicles, loading, onView, onEdit, onCreateClick, onDelete }: VehiclesTableProps) {
  if (loading) return <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden"><TableSkeleton rows={5} columns={7} /></div>;
  if (vehicles.length === 0) return <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden"><EmptyState title="No vehicles found" message="Try adjusting your search or filters." action={{ label: "Add Vehicle", onClick: onCreateClick }} /></div>;

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Plate Number</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Model</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Driver</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Last Service</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <motion.tr
                key={vehicle.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-4 py-3 font-semibold text-slate-800 font-mono text-xs">{vehicle.plateNumber}</td>
                <td className="px-4 py-3 text-slate-700">{vehicle.model}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${DASHBOARD_STATUS_BADGE[vehicle.type]}`}>
                    {vehicle.type}
                  </span>
                </td>
                <td className={`px-4 py-3 ${vehicle.driver === "Unassigned" ? "text-slate-400 italic" : "text-slate-700"}`}>
                  {vehicle.driver}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${DASHBOARD_STATUS_BADGE[vehicle.status]}`}>
                    {vehicle.status === "IN_MAINTENANCE" ? "In Maintenance" : vehicle.status === "OUT_OF_SERVICE" ? "Out of Service" : vehicle.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500 text-xs">{vehicle.lastService}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button onClick={() => onView(vehicle)} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer" title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => onEdit(vehicle)} className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-all cursor-pointer" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    {onDelete && (
                      <button onClick={() => onDelete(vehicle)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer" title="Delete">
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
