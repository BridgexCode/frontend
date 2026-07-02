"use client";

import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import type { DashboardShipment } from "@/features/dashboard/services/mock-data";
import { DASHBOARD_STATUS_BADGE } from "@/features/dashboard/services/mock-data";
import { TableSkeleton } from "@/features/manager/components/TableSkeleton";
import { EmptyState } from "@/features/manager/components/EmptyState";

interface ShipmentsTableProps {
  shipments: DashboardShipment[];
  loading: boolean;
  onView: (shipment: DashboardShipment) => void;
}

export function ShipmentsTable({ shipments, loading, onView }: ShipmentsTableProps) {
  if (loading) return <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden"><TableSkeleton rows={6} columns={7} /></div>;
  if (shipments.length === 0) return <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden"><EmptyState title="No shipments found" message="Try adjusting your search or filters." /></div>;

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tracking ID</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Route</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Driver</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Customer</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Priority</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((shipment) => (
              <motion.tr
                key={shipment.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-4 py-3 font-semibold text-slate-800 font-mono text-xs">{shipment.trackingId}</td>
                <td className="px-4 py-3 text-slate-700">{shipment.route}</td>
                <td className="px-4 py-3">
                  <span className={shipment.driver === "Unassigned" ? "text-slate-400 italic" : "text-slate-700"}>
                    {shipment.driver}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${DASHBOARD_STATUS_BADGE[shipment.status]}`}>
                    {shipment.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500">{shipment.customer}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${DASHBOARD_STATUS_BADGE[shipment.priority]}`}>
                    {shipment.priority}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => onView(shipment)} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer" title="View">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
