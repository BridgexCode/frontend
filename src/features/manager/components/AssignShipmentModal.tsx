"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Truck } from "lucide-react";

interface UIShipment {
  id: string;
  trackingId: string;
  customerName: string;
  status: string;
}

interface UIDriver {
  _id: string;
  name: string;
  driverId?: string;
  vehicleNumber?: string;
}

interface UIVehicle {
  _id: string;
  vehicleNumber: string;
  vehicleModel: string;
  status: string;
}

interface AssignShipmentModalProps {
  open: boolean;
  unassignedShipments: UIShipment[];
  drivers: UIDriver[];
  vehicles: UIVehicle[];
  selectedShipment: string;
  selectedDriver: string;
  selectedVehicle: string;
  onShipmentChange: (value: string) => void;
  onDriverChange: (value: string) => void;
  onVehicleChange: (value: string) => void;
  onClose: () => void;
  onAssign: () => void;
}

export function AssignShipmentModal({
  open, unassignedShipments, drivers, vehicles,
  selectedShipment, selectedDriver, selectedVehicle,
  onShipmentChange, onDriverChange, onVehicleChange,
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
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Assign Shipment</h3>
                <p className="text-xs text-slate-400">Assign a shipment to a driver and vehicle.</p>
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
                <label className="text-xs font-bold text-slate-700">Select Driver</label>
                <select
                  value={selectedDriver}
                  onChange={(e) => onDriverChange(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 bg-white font-medium cursor-pointer"
                >
                  <option value="">Choose a driver...</option>
                  {drivers.map((d) => (
                    <option key={d._id} value={d._id}>
                      {d.name} ({d.driverId || d._id})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Select Vehicle</label>
                <select
                  value={selectedVehicle}
                  onChange={(e) => onVehicleChange(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 bg-white font-medium cursor-pointer"
                >
                  <option value="">Choose a vehicle...</option>
                  {vehicles.map((v) => (
                    <option key={v._id} value={v._id}>
                      {v.vehicleNumber} - {v.vehicleModel} ({v.status})
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
                  disabled={!selectedShipment || !selectedDriver}
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
