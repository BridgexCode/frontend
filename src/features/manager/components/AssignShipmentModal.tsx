"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, UserCheck } from "lucide-react";
import type { Shipment, Worker } from "@/features/manager/services/mock-data";

interface AssignShipmentModalProps {
  open: boolean;
  unassignedShipments: Shipment[];
  activeWorkers: Worker[];
  selectedShipment: string;
  selectedWorker: string;
  onShipmentChange: (value: string) => void;
  onWorkerChange: (value: string) => void;
  onClose: () => void;
  onAssign: () => void;
}

export function AssignShipmentModal({
  open, unassignedShipments, activeWorkers,
  selectedShipment, selectedWorker,
  onShipmentChange, onWorkerChange,
  onClose, onAssign,
}: AssignShipmentModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => { onClose(); }}
            className="absolute inset-0 bg-black"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md z-10 shadow-2xl relative"
          >
            <button
              onClick={() => { onClose(); }}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Assign Shipment</h3>
                <p className="text-xs text-slate-400">Assign a shipment to a worker.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Select Shipment</label>
                <select
                  value={selectedShipment}
                  onChange={(e) => onShipmentChange(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 bg-white font-medium cursor-pointer"
                >
                  <option value="">Choose a shipment...</option>
                  {unassignedShipments.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.trackingId} - {s.customerName} ({s.status})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Select Worker</label>
                <select
                  value={selectedWorker}
                  onChange={(e) => onWorkerChange(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 bg-white font-medium cursor-pointer"
                >
                  <option value="">Choose a worker...</option>
                  {activeWorkers.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name} ({w.assignedShipments} active)
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { onClose(); }}
                  className="flex-1 border border-slate-200 hover:bg-slate-50 font-bold text-xs py-3 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={onAssign}
                  disabled={!selectedShipment || !selectedWorker}
                  className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 font-bold text-xs py-3 rounded-xl transition-all shadow-md shadow-emerald-600/10 disabled:opacity-50 cursor-pointer"
                >
                  Assign
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
