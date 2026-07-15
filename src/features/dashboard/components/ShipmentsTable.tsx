"use client";

import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import type { ApiShipment } from "@/features/dashboard/services/shipments-api";
import { TableSkeleton } from "@/features/manager/components/TableSkeleton";
import { EmptyState } from "@/features/manager/components/EmptyState";

interface ShipmentsTableProps {
  shipments: ApiShipment[];
  loading: boolean;
  onView: (shipment: ApiShipment) => void;
}

function statusBadge(status: string): string {
  switch (status) {
    case "delivered": return "bg-green-50 text-green-600";
    case "in_transit": return "bg-sky-50 text-sky-600";
    case "cancelled": return "bg-red-50 text-red-600";
    case "delayed": return "bg-orange-50 text-orange-600";
    case "created":
    case "assigned":
    case "picked_up": return "bg-amber-50 text-amber-600";
    default: return "bg-slate-100 text-slate-600";
  }
}

function statusLabel(status: string): string {
  switch (status) {
    case "delivered": return "DELIVERED";
    case "in_transit": return "IN TRANSIT";
    case "cancelled": return "CANCELLED";
    case "delayed": return "DELAYED";
    case "created": return "CREATED";
    case "assigned": return "ASSIGNED";
    case "picked_up": return "PICKED UP";
    default: return status.toUpperCase();
  }
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
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Customer</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Created</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((shipment) => (
              <motion.tr
                key={shipment._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-4 py-3 font-semibold text-slate-800 font-mono text-xs">{shipment.shipmentId}</td>
                <td className="px-4 py-3 text-slate-700">
                  {shipment.pickupLocation} → {shipment.destination}
                </td>
                <td className="px-4 py-3 text-slate-500">{shipment.customerName}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${statusBadge(shipment.statusLifecycle)}`}>
                    {statusLabel(shipment.statusLifecycle)}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500 text-xs">
                  {new Date(shipment.createdAt).toLocaleDateString()}
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
