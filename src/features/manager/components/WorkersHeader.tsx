"use client";

import { Search } from "lucide-react";
import { Plus } from "lucide-react";

interface WorkersHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  onCreateClick: () => void;
}

export function WorkersHeader({ search, onSearchChange, onCreateClick }: WorkersHeaderProps) {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Workers</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage delivery workers in your organization</p>
        </div>
        <button onClick={onCreateClick} className="px-5 py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-200 flex items-center gap-2 cursor-pointer">
          <Plus className="w-4 h-4" />
          Create Worker
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search workers..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium"
        />
      </div>
    </>
  );
}
