"use client";

import { useState, useMemo, useCallback } from "react";
import { Filter, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Alert } from "@/features/dashboard/services/mock-data";
import { MOCK_ALERTS } from "@/features/dashboard/services/mock-data";
import { AlertsList } from "./AlertsList";

export function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    if (typeFilter === "ALL") return alerts;
    return alerts.filter((a) => a.type === typeFilter);
  }, [alerts, typeFilter]);

  const handleResolve = useCallback((alert: Alert) => {
    setAlerts((prev) =>
      prev.map((a) => a.id === alert.id ? { ...a, status: "resolved" as const } : a)
    );
  }, []);

  return (
    <div className="space-y-6 py-6 md:py-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Alerts</h1>
        <p className="text-sm text-slate-400 mt-0.5">System notifications and alerts requiring attention</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
        >
          <Filter className="w-4 h-4" />
          Filters
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showFilters ? "rotate-180" : ""}`} />
        </button>
        <span className="text-xs text-slate-400">
          {alerts.filter((a) => a.status === "active").length} active alerts
        </span>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white border border-slate-100 rounded-2xl p-4 -mt-3"
          >
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Type</label>
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-600 bg-white font-medium cursor-pointer">
                <option value="ALL">All Types</option>
                <option value="error">Error</option>
                <option value="warning">Warning</option>
                <option value="info">Info</option>
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AlertsList alerts={filtered} onResolve={handleResolve} />
    </div>
  );
}
