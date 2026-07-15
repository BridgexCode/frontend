"use client";

import { motion } from "framer-motion";
import { Eye, Edit2, ToggleLeft, ToggleRight } from "lucide-react";
import { STATUS_BADGE_MAP } from "@/features/manager/services/mock-data";
import { TableSkeleton } from "./TableSkeleton";
import { EmptyState } from "./EmptyState";

interface UIWorker {
  id: string;
  name: string;
  email: string;
  phone: string;
  assignedShipments: number;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
}

interface WorkersTableProps {
  workers: UIWorker[];
  loading: boolean;
  onCreateClick: () => void;
  onToggleActive?: (worker: UIWorker) => void;
}

export function WorkersTable({ workers, loading, onCreateClick, onToggleActive }: WorkersTableProps) {
  if (loading) return <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden"><TableSkeleton rows={5} columns={6} /></div>;
  if (workers.length === 0) return <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden"><EmptyState title="No workers found" message="There are no workers matching your search." action={{ label: "Create Worker", onClick: onCreateClick }} /></div>;

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Name</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assigned</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker) => (
              <motion.tr
                key={worker.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-4 py-3 font-semibold text-slate-800">{worker.name}</td>
                <td className="px-4 py-3 text-slate-500">{worker.email}</td>
                <td className="px-4 py-3 text-slate-500">{worker.phone}</td>
                <td className="px-4 py-3">
                  <span className="font-bold text-slate-700">{worker.assignedShipments}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${STATUS_BADGE_MAP[worker.status]}`}>
                    {worker.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer" title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-all cursor-pointer" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    {onToggleActive && (
                      <button onClick={() => onToggleActive(worker)} className={`p-1.5 rounded-lg transition-all cursor-pointer ${worker.status === "ACTIVE" ? "text-slate-400 hover:text-red-600 hover:bg-red-50" : "text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"}`} title={worker.status === "ACTIVE" ? "Deactivate" : "Activate"}>
                        {worker.status === "ACTIVE" ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
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
