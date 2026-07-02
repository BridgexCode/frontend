"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Pencil, X, Eye, EyeOff, Loader2 } from "lucide-react";
import type { Driver } from "@/features/dashboard/services/mock-data";

interface DriverFormData {
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  licenseNumber?: string;
  password?: string;
}

interface CreateDriverModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: DriverFormData) => Promise<void>;
  driver?: Driver | null;
}

export type { DriverFormData };

function getInitialForm(driver?: Driver | null): DriverFormData {
  if (driver) {
    return { name: driver.name, email: driver.email, phone: driver.phone, licenseNumber: driver.licenseNumber, password: "" };
  }
  return { name: "", email: "", phone: "", licenseNumber: "", password: "" };
}

export function CreateDriverModal({ open, onClose, onSubmit, driver }: CreateDriverModalProps) {
  const isEdit = !!driver;
  const [form, setForm] = useState<DriverFormData>(getInitialForm(driver));
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!isEdit) {
      if (!form.email.trim()) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email address";
      if (!form.password) newErrors.password = "Password is required";
      else if (form.password.length < 8) newErrors.password = "Min 8 characters";
    }
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!form.licenseNumber.trim()) newErrors.licenseNumber = "License number is required";
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
        setApiError(err instanceof Error ? err.message : (isEdit ? "Failed to update driver" : "Failed to create driver"));
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

  const updateField = (field: keyof DriverFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
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
                {isEdit ? <Pencil className="w-6 h-6" /> : <UserPlus className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{isEdit ? "Edit Driver" : "Add New Driver"}</h3>
                <p className="text-xs text-slate-400">{isEdit ? "Update driver details." : "Register a new driver to the fleet."}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Full Name <span className="text-red-500">*</span></label>
                <input type="text" placeholder="e.g. Rahul P" value={form.name} disabled={submitting} onChange={(e) => updateField("name", e.target.value)}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 font-medium disabled:bg-slate-50 ${errors.name ? "border-red-400" : "border-slate-200 focus:border-emerald-600"}`} />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              {!isEdit && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Email <span className="text-red-500">*</span></label>
                  <input type="email" placeholder="e.g. rahul@naxivo.com" value={form.email} disabled={submitting} onChange={(e) => updateField("email", e.target.value)}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 font-medium disabled:bg-slate-50 ${errors.email ? "border-red-400" : "border-slate-200 focus:border-emerald-600"}`} />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Phone <span className="text-red-500">*</span></label>
                <input type="tel" placeholder="e.g. 9876543210" value={form.phone} disabled={submitting} onChange={(e) => updateField("phone", e.target.value)}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 font-medium disabled:bg-slate-50 ${errors.phone ? "border-red-400" : "border-slate-200 focus:border-emerald-600"}`} />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">License Number <span className="text-red-500">*</span></label>
                <input type="text" placeholder="e.g. DL-07-2024-001" value={form.licenseNumber} disabled={submitting} onChange={(e) => updateField("licenseNumber", e.target.value)}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 font-medium disabled:bg-slate-50 ${errors.licenseNumber ? "border-red-400" : "border-slate-200 focus:border-emerald-600"}`} />
                {errors.licenseNumber && <p className="text-xs text-red-500 mt-1">{errors.licenseNumber}</p>}
              </div>

              {!isEdit && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Password <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} placeholder="Min 8 characters" value={form.password} disabled={submitting} onChange={(e) => updateField("password", e.target.value)}
                      className={`w-full border rounded-xl px-4 py-2.5 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 font-medium disabled:bg-slate-50 ${errors.password ? "border-red-400" : "border-slate-200 focus:border-emerald-600"}`} />
                    <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                </div>
              )}

              {apiError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-xs font-semibold text-red-600">{apiError}</p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={handleClose} disabled={submitting} className="flex-1 border border-slate-200 hover:bg-slate-50 font-bold text-xs py-3 rounded-xl cursor-pointer disabled:opacity-50">Cancel</button>
                <button type="submit" disabled={submitting} className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 font-bold text-xs py-3 rounded-xl shadow-md shadow-emerald-600/10 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2">
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {submitting ? (isEdit ? "Saving..." : "Creating...") : (isEdit ? "Save Changes" : "Add Driver")}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
