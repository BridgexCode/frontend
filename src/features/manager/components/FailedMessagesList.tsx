"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, CheckCircle, XCircle, Clock } from "lucide-react";
import { MOCK_FAILED_MESSAGES, STATUS_BADGE_MAP, type FailedMessage } from "@/features/manager/services/mock-data";
import { EmptyState } from "./EmptyState";

import { Pagination } from "@/shared/components/Pagination";

const statusIcons: Record<string, typeof AlertTriangle> = {
  failed: XCircle, retrying: RefreshCw, resolved: CheckCircle,
};

export function FailedMessagesList() {
  const [messages, setMessages] = useState(MOCK_FAILED_MESSAGES);
  const [retryingId, setRetryingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 3;
  const totalItems = messages.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;

  const handleRetry = (id: string) => {
    setRetryingId(id);
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: "retrying" as const } : m))
      );
      setRetryingId(null);
    }, 1500);
  };

  if (messages.length === 0) return <EmptyState title="No failed messages" message="All messages are being delivered successfully." />;

  const paginated = messages.slice((currentPage - 1) * limit, currentPage * limit);

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-2xs">
      <div className="space-y-3 p-4">
        {paginated.map((msg, i) => {
          const StatusIcon = statusIcons[msg.status] || AlertTriangle;
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4 md:p-5 hover:shadow-xs transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${msg.status === "resolved" ? "bg-emerald-50" : msg.status === "retrying" ? "bg-amber-50" : "bg-red-50"}`}>
                  <StatusIcon className={`w-5 h-5 ${msg.status === "resolved" ? "text-emerald-600" : msg.status === "retrying" ? "text-amber-600" : "text-red-600"} ${msg.status === "retrying" && retryingId === msg.id ? "animate-spin" : ""}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-slate-800">{msg.shipmentId}</span>
                    <span className="text-[10px] text-slate-300">·</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${STATUS_BADGE_MAP[msg.status]}`}>
                      {msg.status.charAt(0).toUpperCase() + msg.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-1">
                    <span className="font-medium">Error:</span> {msg.error}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{msg.timestamp}</span>
                    <span>·</span>
                    <span>Recipient: {msg.recipient}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleRetry(msg.id)}
                  disabled={msg.status === "resolved" || retryingId === msg.id}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${msg.status === "resolved" ? "bg-emerald-50 text-emerald-500" : "bg-amber-50 text-amber-600 hover:bg-amber-100 disabled:opacity-50"}`}
                >
                  {retryingId === msg.id ? (
                    <span className="flex items-center gap-1.5"><RefreshCw className="w-3 h-3 animate-spin" />Retrying...</span>
                  ) : msg.status === "resolved" ? (
                    "Resolved"
                  ) : (
                    <span className="flex items-center gap-1.5"><RefreshCw className="w-3 h-3" />Retry</span>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={totalItems} limit={3} onPageChange={setCurrentPage} />
    </div>
  );
}
