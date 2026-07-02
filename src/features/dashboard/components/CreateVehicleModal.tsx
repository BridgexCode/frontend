"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, Pencil, X, Loader2 } from "lucide-react";
import type { Vehicle } from "@/features/dashboard/services/mock-data";

interface VehicleFormData {
  plateNumber: string;
  model: string;
  type: "Truck" | "Van" | "Container";
  capacity: string;
}

interface FormErrors {
  plateNumber?: string;
  model?: string;
  capacity?: string;
}

interface CreateVehicleModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: VehicleFormData) => Promise<void>;
  vehicle?: Vehicle | null;
}

export type { VehicleFormData };

function getInitialForm(vehicle?: Vehicle | null): VehicleFormData {
  if (vehicle) {
    return { plateNumber: vehicle.plateNumber, model: vehicle.model, type: vehicle.type, capacity: vehicle.capacity };
  }
  return { plateNumber: "", model: "", type: "Truck", capacity: "" };
}

export function CreateVehicleModal({ open, onClose, onSubmit, vehicle }: CreateVehicleModalProps) {
  const isEdit = !!vehicle;
  const [form, setForm] = useState<VehicleFormData>(getInitialForm(vehicle));
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.plateNumber.trim()) newErrors.plateNumber = "Plate number is required";
    if (!form.model.trim()) newErrors.model = "Model is required";
    if (!form.capacity.trim()) newErrors.capacity = "Capacity is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setApiError(null);
    if (onSubmit) {
      setSubmitting(true);
      try {
        await onSubmit(form);
        setForm(getInitialForm());
        setErrors({});
        onClose();
      } catch (err: unknown) {
        setApiError(err instanceof Error ? err.message : (isEdit ? "Failed to update vehicle" : "Failed to add vehicle"));
      } finally {
        setSubmitting(false);
      }
    } else {
      setForm(getInitialForm());
      setErrors({});
      onClose();
    }
  };

  const handleClose = () => {
    if (submitting) return;
    setForm(getInitialForm());
    setErrors({});
    setApiError(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} onClick={handleClose} className="absolute inset-0 bg-black" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 15 }} className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-lg z-10 shadow-2xl relative">
            <button onClick={handleClose} className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700"><X className="w-5 h-5" /></button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                {isEdit ? <Pencil className="w-6 h-6" /> : <PlusCircle className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{isEdit ? "Edit Vehicle" : "Add New Vehicle"}</h3>
                <p className="text-xs text-slate-400">{isEdit ? "Update vehicle details." : "Register a new vehicle to the fleet."}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Plate Number <span className="text-red-500">*</span></label>
                <input type="text" placeholder="e.g. KL-07-AB-1234" value={form.plateNumber} disabled={submitting} onChange={(e) => setForm((prev) => ({ ...prev, plateNumber: e.target.value }))}
                  onFocus={() => setErrors((prev) => ({ ...prev, plateNumber: undefined }))}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 font-medium disabled:bg-slate-50 ${errors.plateNumber ? "border-red-400" : "border-slate-200 focus:border-emerald-600"}`} />
                {errors.plateNumber && <p className="text-xs text-red-500 mt-1">{errors.plateNumber}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Model <span className="text-red-500">*</span></label>
                <input type="text" placeholder="e.g. Ashok Leyland Boss" value={form.model} disabled={submitting} onChange={(e) => setForm((prev) => ({ ...prev, model: e.target.value }))}
                  onFocus={() => setErrors((prev) => ({ ...prev, model: undefined }))}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 font-medium disabled:bg-slate-50 ${errors.model ? "border-red-400" : "border-slate-200 focus:border-emerald-600"}`} />
                {errors.model && <p className="text-xs text-red-500 mt-1">{errors.model}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Type <span className="text-red-500">*</span></label>
                <select value={form.type} disabled={submitting} onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value as VehicleFormData["type"] }))}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 bg-white font-medium cursor-pointer disabled:bg-slate-50">
                  <option value="Truck">Truck</option>
                  <option value="Van">Van</option>
                  <option value="Container">Container</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Capacity <span className="text-red-500">*</span></label>
                <input type="text" placeholder="e.g. 16 Tons" value={form.capacity} disabled={submitting} onChange={(e) => setForm((prev) => ({ ...prev, capacity: e.target.value }))}
                  onFocus={() => setErrors((prev) => ({ ...prev, capacity: undefined }))}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 font-medium disabled:bg-slate-50 ${errors.capacity ? "border-red-400" : "border-slate-200 focus:border-emerald-600"}`} />
                {errors.capacity && <p className="text-xs text-red-500 mt-1">{errors.capacity}</p>}
              </div>

              {apiError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-xs font-semibold text-red-600">{apiError}</p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={handleClose} disabled={submitting} className="flex-1 border border-slate-200 hover:bg-slate-50 font-bold text-xs py-3 rounded-xl cursor-pointer disabled:opacity-50">Cancel</button>
                <button type="submit" disabled={submitting} className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 font-bold text-xs py-3 rounded-xl shadow-md shadow-emerald-600/10 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2">
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {submitting ? (isEdit ? "Saving..." : "Adding...") : (isEdit ? "Save Changes" : "Add Vehicle")}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
