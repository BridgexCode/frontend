"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Star } from "lucide-react";
import type { Driver } from "@/features/dashboard/services/mock-data";
import { DASHBOARD_STATUS_BADGE } from "@/features/dashboard/services/mock-data";

interface ViewDriverModalProps {
  driver: Driver | null;
  onClose: () => void;
}

export function ViewDriverModal({ driver, onClose }: ViewDriverModalProps) {
  return (
    <AnimatePresence>
      {driver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 15 }} className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md z-10 shadow-2xl relative">
            <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700"><X className="w-5 h-5" /></button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-emerald-600">{driver.name.charAt(0)}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{driver.name}</h3>
              <p className="text-xs text-slate-400">{driver.email}</p>
            </div>

            <div className="space-y-3">
              {[
                { label: "Phone", value: driver.phone },
                { label: "License", value: driver.licenseNumber },
                { label: "Vehicle", value: driver.assignedVehicle },
                { label: "Status", value: driver.status === "ON_LEAVE" ? "On Leave" : driver.status, badge: true },
                { label: "Assigned Shipments", value: String(driver.assignedShipments) },
                { label: "Rating", value: `${driver.rating} / 5.0`, star: true },
                { label: "Created", value: driver.createdAt },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-slate-50">
                  <span className="text-xs font-semibold text-slate-400">{item.label}</span>
                  {item.badge ? (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${DASHBOARD_STATUS_BADGE[driver.status]}`}>
                      {driver.status === "ON_LEAVE" ? "On Leave" : driver.status}
                    </span>
                  ) : item.star ? (
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-bold text-slate-800">{driver.rating}</span>
                    </div>
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
