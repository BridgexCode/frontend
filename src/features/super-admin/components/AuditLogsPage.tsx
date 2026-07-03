"use client";

import { useState, useMemo } from "react";
import { Search, RotateCw, Filter, ChevronDown, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_AUDIT_LOGS, STATUS_BADGE } from "../services/mock-data";
import type { AuditLog } from "../types";
import { TableSkeleton } from "@/features/manager/components/TableSkeleton";

const EVENT_ICONS: Record<string, string> = {
  "Organization Created": "🏢",
  "User Role Changed": "🔄",
  "Organization Suspended": "❌",
  "Shipment Delivered": "📦",
  "User Login Failed": "🔑",
  "System Backup Completed": "⚙️",
  "New Plan Upgraded": "⭐",
  "API Rate Limit Exceeded": "⚠️",
};

export function AuditLogsPage() {
  const [logs] = useState<AuditLog[]>(MOCK_AUDIT_LOGS);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch =
        log.event.toLowerCase().includes(search.toLowerCase()) ||
        log.user.toLowerCase().includes(search.toLowerCase()) ||
        log.description.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === "ALL" || log.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [logs, search, typeFilter]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Audit Logs</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Track all administrative actions across the platform
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by action, admin, or details..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 font-medium"
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
            onClick={handleRefresh}
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
                <label className="text-[10px] font-bold text-slate-400 uppercase">Severity</label>
                <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-purple-600 bg-white font-medium cursor-pointer">
                  <option value="ALL">All Severities</option>
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {loading ? (
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
          <TableSkeleton rows={8} columns={5} />
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((log, idx) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="bg-white border border-slate-100 rounded-xl p-4 flex items-start gap-4 hover:border-purple-200 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-lg flex-shrink-0">
                {EVENT_ICONS[log.event] || "📋"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm text-slate-800">{log.event}</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${STATUS_BADGE[log.type] || "bg-slate-100 text-slate-600"}`}>
                    {log.type}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{log.description}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-[11px] font-medium text-slate-400">{log.user}</span>
                  <span className="text-slate-200">|</span>
                  <span className="text-[11px] text-slate-400">{log.timestamp}</span>
                </div>
              </div>
              {log.type === "error" && (
                <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mt-2.5" />
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
