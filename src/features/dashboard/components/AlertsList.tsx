"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Info, XCircle, Clock, CheckCircle } from "lucide-react";
import type { Alert } from "@/features/dashboard/services/mock-data";
import { DASHBOARD_STATUS_BADGE } from "@/features/dashboard/services/mock-data";
import { EmptyState } from "@/features/manager/components/EmptyState";

const typeIcons: Record<string, typeof AlertTriangle> = {
  error: XCircle, warning: AlertTriangle, info: Info,
};

const typeColors: Record<string, string> = {
  error: "bg-red-50 text-red-600", warning: "bg-amber-50 text-amber-600", info: "bg-blue-50 text-blue-600",
};

interface AlertsListProps {
  alerts: Alert[];
  onResolve: (alert: Alert) => void;
}

export function AlertsList({ alerts, onResolve }: AlertsListProps) {
  if (alerts.length === 0) return <EmptyState title="No alerts" message="There are no alerts to display." />;

  return (
    <div className="space-y-3">
      {alerts.map((alert, i) => {
        const Icon = typeIcons[alert.type] || AlertTriangle;
        const color = typeColors[alert.type] || "bg-slate-50 text-slate-600";
        return (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white border border-slate-100 rounded-2xl p-4 md:p-5 hover:shadow-sm transition-all"
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-bold text-slate-900">{alert.title}</h3>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${DASHBOARD_STATUS_BADGE[alert.status]}`}>
                    {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-1">{alert.message}</p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>{alert.timestamp}</span>
                </div>
              </div>

              {alert.status === "active" && (
                <button
                  onClick={() => onResolve(alert)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  Resolve
                </button>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
