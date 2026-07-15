"use client";

import { motion } from "framer-motion";
import { Eye, Edit2 } from "lucide-react";
import { STATUS_BADGE_MAP } from "@/features/manager/services/mock-data";
import { TableSkeleton } from "./TableSkeleton";
import { EmptyState } from "./EmptyState";

interface UIShipment {
  id: string;
  trackingId: string;
  driverName: string;
  status: string;
  priority: string;
  customerName: string;
  pickup: string;
  delivery: string;
  createdAt: string;
}

interface ShipmentsTableProps {
  shipments: UIShipment[];
  loading: boolean;
  onCreateClick: () => void;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onStatusUpdate: (id: string, newStatus: string) => void;
}

export function ShipmentsTable({ shipments, loading, onCreateClick, onView, onEdit, onStatusUpdate }: ShipmentsTableProps) {
  if (loading) return <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden"><TableSkeleton rows={6} columns={7} /></div>;
  if (shipments.length === 0) return <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden"><EmptyState title="No shipments found" message="Try adjusting your filters or create a new shipment." action={{ label: "Create Shipment", onClick: onCreateClick }} /></div>;

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tracking ID</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Driver</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Priority</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Route</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Customer</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Created</th>
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
                <td className={`px-4 py-3 ${shipment.driverName ? "text-slate-700" : "text-slate-400 italic"}`}>
                  {shipment.driverName || "Unassigned"}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${STATUS_BADGE_MAP[shipment.status] || "bg-slate-100 text-slate-500"}`}>
                    {shipment.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${STATUS_BADGE_MAP[shipment.priority] || "bg-slate-100 text-slate-500"}`}>
                    {shipment.priority}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-slate-600">
                  <span className="font-medium">{shipment.pickup}</span>
                  <span className="text-slate-300 mx-1">→</span>
                  <span className="font-medium">{shipment.delivery}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-semibold text-slate-700">{shipment.customerName}</span>
                </td>
                <td className="px-4 py-3 text-slate-500 text-xs">{shipment.createdAt}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button onClick={() => onView?.(shipment.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer" title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => onEdit?.(shipment.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-all cursor-pointer" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                      <select
                        value={shipment.status}
                        onChange={(e) => onStatusUpdate(shipment.id, e.target.value)}
                        className="text-[10px] border border-slate-200 rounded-lg px-1.5 py-1 text-slate-500 hover:text-slate-700 bg-transparent cursor-pointer"
                        title="Update Status"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Picked Up">Picked Up</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Delayed">Delayed</option>
                        <option value="Failed">Failed</option>
                      </select>
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
