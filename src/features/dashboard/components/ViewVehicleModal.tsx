"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Truck } from "lucide-react";
import type { Vehicle } from "@/features/dashboard/services/mock-data";
import { DASHBOARD_STATUS_BADGE } from "@/features/dashboard/services/mock-data";

interface ViewVehicleModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
}

export function ViewVehicleModal({ vehicle, onClose }: ViewVehicleModalProps) {
  if (!vehicle) return null;

  return (
    <AnimatePresence>
      {vehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 15 }} className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md z-10 shadow-2xl relative">
            <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700"><X className="w-5 h-5" /></button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-3">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{vehicle.plateNumber}</h3>
              <p className="text-xs text-slate-400">{vehicle.model}</p>
            </div>

            <div className="space-y-3">
              {[
                { label: "Type", value: vehicle.type, badge: true },
                { label: "Driver", value: vehicle.driver },
                { label: "Capacity", value: vehicle.capacity },
                { label: "Status", value: vehicle.status === "IN_MAINTENANCE" ? "In Maintenance" : vehicle.status === "OUT_OF_SERVICE" ? "Out of Service" : vehicle.status, badge: true },
                { label: "Last Service", value: vehicle.lastService },
                { label: "Created", value: vehicle.createdAt },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-slate-50">
                  <span className="text-xs font-semibold text-slate-400">{item.label}</span>
                  {item.badge ? (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${DASHBOARD_STATUS_BADGE[vehicle.type] || DASHBOARD_STATUS_BADGE[vehicle.status]}`}>
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
