"use client";

import { useState } from "react";
import { Clock, ChevronDown } from "lucide-react";
import { MOCK_SHIPMENTS } from "@/features/manager/services/mock-data";

interface TimelineFilterProps {
  shipmentFilter: string;
  onShipmentFilterChange: (value: string) => void;
}

export function TimelineFilter({ shipmentFilter, onShipmentFilterChange }: TimelineFilterProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-4">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 text-sm font-semibold text-slate-600 cursor-pointer"
      >
        <Clock className="w-4 h-4" />
        Filter by Shipment
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showFilters ? "rotate-180" : ""}`} />
      </button>
      {showFilters && (
        <select
          value={shipmentFilter}
          onChange={(e) => onShipmentFilterChange(e.target.value)}
          className="mt-3 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-600 bg-white font-medium cursor-pointer"
        >
          <option value="ALL">All Shipments</option>
          {MOCK_SHIPMENTS.map((s) => (
            <option key={s.id} value={s.id}>{s.trackingId}</option>
          ))}
        </select>
      )}
    </div>
  );
}
