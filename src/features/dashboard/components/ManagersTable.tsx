"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Eye, Edit2, ToggleLeft, ToggleRight, Trash2, Loader2 } from "lucide-react";
import type { Manager } from "@/features/dashboard/services/mock-data";
import { TableSkeleton } from "@/features/manager/components/TableSkeleton";
import { EmptyState } from "@/features/manager/components/EmptyState";

const STATUS_BADGE: Record<string, string> = {
  ACTIVE: "bg-emerald-100 text-emerald-700",
  INACTIVE: "bg-slate-100 text-slate-500",
  SUSPENDED: "bg-red-100 text-red-700",
};

interface ManagersTableProps {
  managers: Manager[];
  loading: boolean;
  onView: (manager: Manager) => void;
  onEdit: (manager: Manager) => void;
  onCreateClick: () => void;
  onToggleActive?: (manager: Manager) => Promise<void>;
  onDelete?: (manager: Manager) => Promise<void>;
}

export function ManagersTable({ managers, loading, onView, onEdit, onCreateClick, onToggleActive, onDelete }: ManagersTableProps) {
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  if (loading) return <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden"><TableSkeleton rows={5} columns={6} /></div>;
  if (managers.length === 0) return <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden"><EmptyState title="No managers found" message="Try adjusting your search or filters to find what you're looking for." action={{ label: "Create Manager", onClick: onCreateClick }} /></div>;

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Name</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Created</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((manager) => (
              <motion.tr
                key={manager.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <span className="font-semibold text-slate-800">{manager.name}</span>
                </td>
                <td className="px-4 py-3 text-slate-500">{manager.email}</td>
                <td className="px-4 py-3 text-slate-500">{manager.phone}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${STATUS_BADGE[manager.status]}`}>
                    {manager.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500 text-xs">{manager.createdAt}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button onClick={() => onView(manager)} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer" title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => onEdit(manager)} className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-all cursor-pointer" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      disabled={actionLoading === manager.id}
                      onClick={async () => {
                        if (!onToggleActive) return;
                        setActionLoading(manager.id);
                        try { await onToggleActive(manager); } finally { setActionLoading(null); }
                      }}
                      className={`p-1.5 rounded-lg transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${manager.status === "ACTIVE" ? "text-slate-400 hover:text-red-600 hover:bg-red-50" : "text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"}`}
                      title={manager.status === "ACTIVE" ? "Deactivate" : "Activate"}
                    >
                      {actionLoading === manager.id ? <Loader2 className="w-4 h-4 animate-spin" /> : manager.status === "ACTIVE" ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                    </button>
                    <button
                      disabled={actionLoading === manager.id}
                      onClick={async () => {
                        if (!onDelete) return;
                        setActionLoading(manager.id);
                        try { await onDelete(manager); } finally { setActionLoading(null); }
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      title="Delete"
                    >
                      {actionLoading === manager.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
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
