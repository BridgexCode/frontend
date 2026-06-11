"use client";

import { Plus, UserCheck } from "lucide-react";

interface ShipmentsHeaderProps {
  onAssignClick: () => void;
  onCreateClick: () => void;
}

export function ShipmentsHeader({ onAssignClick, onCreateClick }: ShipmentsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Shipments</h1>
        <p className="text-sm text-slate-400 mt-0.5">Manage and track all shipments</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onAssignClick}
          className="px-4 py-2.5 border border-slate-200 text-sm font-bold rounded-xl hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
        >
          <UserCheck className="w-4 h-4" />
          Assign
        </button>
        <button
          onClick={onCreateClick}
          className="px-5 py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-200 flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Create Shipment
        </button>
      </div>
    </div>
  );
}
