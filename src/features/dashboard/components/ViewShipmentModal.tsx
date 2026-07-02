"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Package } from "lucide-react";
import type { DashboardShipment } from "@/features/dashboard/services/mock-data";
import { DASHBOARD_STATUS_BADGE } from "@/features/dashboard/services/mock-data";

interface ViewShipmentModalProps {
  shipment: DashboardShipment | null;
  onClose: () => void;
}

export function ViewShipmentModal({ shipment, onClose }: ViewShipmentModalProps) {
  if (!shipment) return null;

  return (
    <AnimatePresence>
      {shipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md z-10 shadow-2xl relative"
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{shipment.trackingId}</h3>
                <p className="text-xs text-slate-400">{shipment.route}</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { label: "Status", value: shipment.status, badge: true },
                { label: "Priority", value: shipment.priority, badge: true },
                { label: "Driver", value: shipment.driver },
                { label: "Customer", value: shipment.customer },
                { label: "Origin", value: shipment.origin },
                { label: "Destination", value: shipment.destination },
                { label: "Created", value: shipment.createdAt },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-slate-50">
                  <span className="text-xs font-semibold text-slate-400">{item.label}</span>
                  {item.badge ? (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${DASHBOARD_STATUS_BADGE[item.value]}`}>
                      {item.value}
                    </span>
                  ) : (
                    <span className="text-sm font-semibold text-slate-800">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
