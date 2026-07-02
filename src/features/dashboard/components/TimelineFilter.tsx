"use client";

import { Filter, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_DASHBOARD_SHIPMENTS } from "@/features/dashboard/services/mock-data";

interface TimelineFilterProps {
  shipmentFilter: string;
  onShipmentFilterChange: (value: string) => void;
}

export function TimelineFilter({ shipmentFilter, onShipmentFilterChange }: TimelineFilterProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
        >
          <Filter className="w-4 h-4" />
          Filters
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showFilters ? "rotate-180" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-wrap gap-3 overflow-hidden pt-3"
          >
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Shipment</label>
              <select value={shipmentFilter} onChange={(e) => onShipmentFilterChange(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-600 bg-white font-medium cursor-pointer">
                <option value="ALL">All Shipments</option>
                {MOCK_DASHBOARD_SHIPMENTS.map((s) => (
                  <option key={s.id} value={s.id}>{s.trackingId} - {s.route}</option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
