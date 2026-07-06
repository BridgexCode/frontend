"use client";

import { Search } from "lucide-react";
import type { ApiShipment } from "../services/shipments-api";

interface RecentShipmentsTableProps {
  shipments: ApiShipment[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

function mapStatus(status: string): { label: string; color: string } {
  switch (status) {
    case "delivered":
      return { label: "DELIVERED", color: "bg-green-50 text-green-600" };
    case "in_transit":
      return { label: "IN TRANSIT", color: "bg-sky-50 text-sky-600" };
    case "cancelled":
      return { label: "DELAYED", color: "bg-red-50 text-red-600" };
    default:
      return { label: status.replace(/_/g, " ").toUpperCase(), color: "bg-amber-50 text-amber-600" };
  }
}

export function RecentShipmentsTable({
  shipments,
  searchQuery,
  onSearchChange,
}: RecentShipmentsTableProps) {
  return (
    <div className="lg:col-span-8 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Recent Shipments</h3>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
              Latest deliveries and status details
            </p>
          </div>
          <a href="#shipments" className="text-xs font-bold text-emerald-600 hover:underline">
            View All
          </a>
        </div>

        <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2 mb-4 bg-slate-50 focus-within:bg-white focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100 transition-all max-w-sm">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search shipments, routes, or drivers..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-800 focus:outline-none font-medium"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pr-4">Shipment ID</th>
                <th className="pb-3 pr-4">Route</th>
                <th className="pb-3 pr-4">Customer</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-xs font-semibold text-slate-700 divide-y divide-slate-50">
              {shipments.map((shipment) => {
                const { label, color } = mapStatus(shipment.statusLifecycle);
                return (
                  <tr key={shipment._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 text-emerald-600 font-bold pr-4">{shipment.shipmentId}</td>
                    <td className="py-3.5 pr-4 text-slate-800">
                      {shipment.pickupLocation} → {shipment.destination}
                    </td>
                    <td className="py-3.5 pr-4 text-slate-500">{shipment.customerName}</td>
                    <td className="py-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide ${color}`}>
                        {label}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {shipments.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-400 font-medium">
                    No shipments found matching &quot;{searchQuery}&quot;
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
