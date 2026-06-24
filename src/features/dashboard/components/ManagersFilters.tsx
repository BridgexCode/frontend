"use client";

import { Search, RotateCw, Filter, ChevronDown, Plus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ManagersFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  loading: boolean;
  onRefresh: () => void;
  onCreateClick: () => void;
}

export function ManagersFilters({
  search, onSearchChange, statusFilter, onStatusFilterChange,
  loading, onRefresh, onCreateClick,
}: ManagersFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Managers Management</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage all operations managers in your organization</p>
        </div>
        <button onClick={onCreateClick} className="px-5 py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-200 flex items-center gap-2 cursor-pointer">
          <Plus className="w-4 h-4" />
          Create Manager
        </button>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>
          <button
            onClick={onRefresh}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
          >
            <RotateCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-wrap gap-3 overflow-hidden"
            >
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Status</label>
                <select value={statusFilter} onChange={(e) => onStatusFilterChange(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-600 bg-white font-medium cursor-pointer">
                  <option value="ALL">All Statuses</option>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                  <option value="SUSPENDED">Suspended</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
