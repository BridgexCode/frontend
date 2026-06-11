"use client";

import { motion } from "framer-motion";
import type { ComponentType, SVGProps } from "react";
import { Clock, Package, UserCheck, CheckCircle, AlertTriangle } from "lucide-react";
import { MOCK_SHIPMENTS, type TimelineEvent } from "@/features/manager/services/mock-data";
import { EmptyState } from "./EmptyState";

const typeIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  creation: Package, assignment: UserCheck, status: Clock, delivery: CheckCircle, failed: AlertTriangle,
};

const typeColors: Record<string, string> = {
  creation: "bg-blue-500", assignment: "bg-emerald-500", status: "bg-indigo-500", delivery: "bg-green-500", failed: "bg-red-500",
};

interface TimelineListProps {
  events: TimelineEvent[];
}

export function TimelineList({ events }: TimelineListProps) {
  if (events.length === 0) return <EmptyState title="No timeline events" message="No events match your current filter." />;

  return (
    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-100" />
      <div className="space-y-6">
        {events.map((event, i) => {
          const Icon = typeIcons[event.type] || Clock;
          const color = typeColors[event.type] || "bg-slate-500";
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative pl-14"
            >
              <div className={`absolute left-4 top-0 w-5 h-5 rounded-full ${color} flex items-center justify-center ring-4 ring-white`}>
                <Icon className="w-2.5 h-2.5 text-white" />
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-4 hover:shadow-sm transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{event.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{event.description}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap shrink-0">{event.timestamp}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] text-slate-400">by {event.user}</span>
                  <span className="text-[10px] text-slate-300">·</span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {MOCK_SHIPMENTS.find((s) => s.id === event.shipmentId)?.trackingId || event.shipmentId}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
