"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Package } from "lucide-react";

interface NewShipmentForm {
  trackingId: string;
  pickup: string;
  delivery: string;
  customerName: string;
  customerPhone: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  notes: string;
}

interface CreateShipmentModalProps {
  open: boolean;
  form: NewShipmentForm;
  onFormChange: (form: NewShipmentForm) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function CreateShipmentModal({ open, form, onFormChange, onClose, onSubmit }: CreateShipmentModalProps) {
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
            <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Create Shipment</h3>
                <p className="text-xs text-slate-400">Add a new shipment to the system.</p>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Tracking Number *</label>
                <input type="text" placeholder="e.g. NAX-2026-009" value={form.trackingId} onChange={(e) => onFormChange({ ...form, trackingId: e.target.value })} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Pickup Location *</label>
                  <input type="text" placeholder="e.g. Mumbai" value={form.pickup} onChange={(e) => onFormChange({ ...form, pickup: e.target.value })} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Delivery Location *</label>
                  <input type="text" placeholder="e.g. Pune" value={form.delivery} onChange={(e) => onFormChange({ ...form, delivery: e.target.value })} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Customer Name *</label>
                  <input type="text" placeholder="e.g. ABC Corp" value={form.customerName} onChange={(e) => onFormChange({ ...form, customerName: e.target.value })} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Customer Phone</label>
                  <input type="tel" placeholder="e.g. 9123456789" value={form.customerPhone} onChange={(e) => onFormChange({ ...form, customerPhone: e.target.value })} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Priority</label>
                <select value={form.priority} onChange={(e) => onFormChange({ ...form, priority: e.target.value as NewShipmentForm["priority"] })} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 bg-white font-medium cursor-pointer">
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Notes</label>
                <textarea placeholder="Optional notes..." value={form.notes} onChange={(e) => onFormChange({ ...form, notes: e.target.value })} rows={2} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium resize-none" />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 border border-slate-200 hover:bg-slate-50 font-bold text-xs py-3 rounded-xl transition-all cursor-pointer">Cancel</button>
                <button type="submit" className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 font-bold text-xs py-3 rounded-xl transition-all shadow-md shadow-emerald-600/10 cursor-pointer">Create Shipment</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
