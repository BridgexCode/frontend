"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Package } from "lucide-react";

interface EditShipmentForm {
  pickup: string;
  delivery: string;
  customerName: string;
  notes: string;
}

interface EditShipmentModalProps {
  open: boolean;
  shipment: {
    id: string;
    pickup?: string;
    delivery?: string;
    customerName?: string;
    notes?: string;
  } | null;
  onClose: () => void;
  onSubmit: (id: string, data: EditShipmentForm) => Promise<void>;
}

export function EditShipmentModal({ open, shipment, onClose, onSubmit }: EditShipmentModalProps) {
  return (
    <AnimatePresence>
      {open && shipment && (
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
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Edit Shipment</h3>
                <p className="text-xs text-slate-400">Update shipment details.</p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const fd = new FormData(form);
                onSubmit(shipment.id, {
                  pickup: fd.get("pickup") as string,
                  delivery: fd.get("delivery") as string,
                  customerName: fd.get("customerName") as string,
                  notes: (fd.get("notes") as string) || "",
                });
              }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Pickup Location *</label>
                <input name="pickup" defaultValue={shipment.pickup || ""} placeholder="e.g. Mumbai" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium" required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Delivery Location *</label>
                <input name="delivery" defaultValue={shipment.delivery || ""} placeholder="e.g. Pune" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium" required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Customer Name *</label>
                <input name="customerName" defaultValue={shipment.customerName || ""} placeholder="e.g. ABC Corp" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium" required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Notes</label>
                <textarea name="notes" defaultValue={shipment.notes || ""} placeholder="Optional notes..." rows={2} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium resize-none" />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 border border-slate-200 hover:bg-slate-50 font-bold text-xs py-3 rounded-xl transition-all cursor-pointer">Cancel</button>
                <button type="submit" className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 font-bold text-xs py-3 rounded-xl transition-all shadow-md shadow-emerald-600/10 cursor-pointer">Save Changes</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
