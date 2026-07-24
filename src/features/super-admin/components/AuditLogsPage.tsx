"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Search, RotateCw, Filter, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchAuditLogsApi, AuditLog } from "../services/admin-audit-api";
import { STATUS_BADGE } from "../services/mock-data";
import { TableSkeleton } from "@/features/manager/components/TableSkeleton";

import { Pagination } from "@/shared/components/Pagination";

const EVENT_ICONS: Record<string, string> = {
  "Organization Created": "🏢",
  "User Role Changed": "🔄",
  "Organization Suspended": "❌",
  "Organization Activated": "✅",
  "Shipment Delivered": "📦",
  "User Login Failed": "🔑",
  "System Backup Completed": "⚙️",
  "New Plan Upgraded": "⭐",
  "API Rate Limit Exceeded": "⚠️",
  "System Settings Updated": "⚙️",
};

export function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const loadLogs = useCallback(async (page: number = currentPage, type: string = typeFilter, searchStr: string = search) => {
    setLoading(true);
    try {
      const res = await fetchAuditLogsApi({
        page,
        limit: 3,
        search: searchStr || undefined,
        type: type === "ALL" ? undefined : type,
      });
      setLogs(res.data);
      setTotalPages(res.totalPages || 1);
      setTotalItems(res.total || 0);
    } catch {}
    setLoading(false);
  }, [currentPage, typeFilter, search]);

  useEffect(() => { loadLogs(currentPage, typeFilter, search); }, [currentPage, typeFilter, search, loadLogs]);

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
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
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
            onClick={() => loadLogs(currentPage, typeFilter, search)}
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
                <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }} className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-purple-600 bg-white font-medium cursor-pointer">
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
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-2xs">
          <div className="space-y-2 p-4">
            {logs.map((log, idx) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="bg-slate-50/50 border border-slate-100 rounded-xl p-4 flex items-start gap-4 hover:border-purple-200 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-lg flex-shrink-0 shadow-2xs">
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
            {logs.length === 0 && (
              <div className="text-center py-10 text-slate-400 text-sm">No audit logs found.</div>
            )}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={totalItems} limit={3} onPageChange={setCurrentPage} />
        </div>
      )}
    </div>
  );
}
