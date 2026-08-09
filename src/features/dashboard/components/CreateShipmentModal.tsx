"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, X } from "lucide-react";

interface NewShipmentForm {
  pickupLocation: string;
  destination: string;
  customerName: string;
  expectedDeliveryDate: string;
}

interface CreateShipmentModalProps {
  open: boolean;
  onClose: () => void;
  form: NewShipmentForm;
  onFormChange: (form: NewShipmentForm) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function CreateShipmentModal({
  open,
  onClose,
  form,
  onFormChange,
  onSubmit,
}: CreateShipmentModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-lg z-10 shadow-2xl relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <PlusCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Create New Shipment</h3>
                <p className="text-xs text-slate-400">
                  Add a new operational shipment dispatch to Logiflow
                </p>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Pickup Location *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kochi"
                  value={form.pickupLocation}
                  onChange={(e) => onFormChange({ ...form, pickupLocation: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Destination *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Calicut"
                  value={form.destination}
                  onChange={(e) => onFormChange({ ...form, destination: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Customer Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ABC Corp"
                  value={form.customerName}
                  onChange={(e) => onFormChange({ ...form, customerName: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Expected Delivery Date *</label>
                <input
                  type="date"
                  required
                  value={form.expectedDeliveryDate}
                  onChange={(e) => onFormChange({ ...form, expectedDeliveryDate: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 border border-slate-200 hover:bg-slate-50 font-bold text-xs py-3 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 font-bold text-xs py-3 rounded-xl transition-all shadow-md shadow-emerald-600/10"
                >
                  Create Dispatch
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
