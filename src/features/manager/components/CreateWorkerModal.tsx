"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, UserPlus, EyeOff, Eye as EyeIcon } from "lucide-react";

interface NewWorkerForm {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface CreateWorkerModalProps {
  open: boolean;
  form: NewWorkerForm;
  formErrors: Partial<NewWorkerForm>;
  apiError?: string;
  showPassword: boolean;
  onFormChange: (form: NewWorkerForm) => void;
  onShowPasswordChange: (value: boolean) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function CreateWorkerModal({
  open, form, formErrors, apiError, showPassword,
  onFormChange, onShowPasswordChange, onClose, onSubmit,
}: CreateWorkerModalProps) {
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
            className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-lg z-10 shadow-2xl relative"
          >
            <button onClick={() => { onClose(); }} className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <UserPlus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Create Worker</h3>
                <p className="text-xs text-slate-400">Add a new delivery worker to the system.</p>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Name <span className="text-red-500">*</span></label>
                <input type="text" placeholder="e.g. Ravi Kumar" value={form.name} onChange={(e) => onFormChange({ ...form, name: e.target.value })} className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 font-medium ${formErrors.name ? "border-red-400" : "border-slate-200 focus:border-emerald-600"}`} />
                {formErrors.name && <p className="text-xs text-red-500">{formErrors.name}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Email <span className="text-red-500">*</span></label>
                <input type="email" placeholder="e.g. ravi@example.com" value={form.email} onChange={(e) => onFormChange({ ...form, email: e.target.value })} className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 font-medium ${formErrors.email ? "border-red-400" : "border-slate-200 focus:border-emerald-600"}`} />
                {formErrors.email && <p className="text-xs text-red-500">{formErrors.email}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Phone <span className="text-red-500">*</span></label>
                <input type="tel" placeholder="e.g. 9876543210" value={form.phone} onChange={(e) => onFormChange({ ...form, phone: e.target.value })} className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 font-medium ${formErrors.phone ? "border-red-400" : "border-slate-200 focus:border-emerald-600"}`} />
                {formErrors.phone && <p className="text-xs text-red-500">{formErrors.phone}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Password <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} placeholder="Minimum 8 characters" value={form.password} onChange={(e) => onFormChange({ ...form, password: e.target.value })} className={`w-full border rounded-xl px-4 py-2.5 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 font-medium ${formErrors.password ? "border-red-400" : "border-slate-200 focus:border-emerald-600"}`} />
                  <button type="button" onClick={() => onShowPasswordChange(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                  </button>
                </div>
                {formErrors.password && <p className="text-xs text-red-500">{formErrors.password}</p>}
              </div>

              {apiError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-medium px-4 py-2.5 rounded-xl">{apiError}</div>
              )}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => { onClose(); }} className="flex-1 border border-slate-200 hover:bg-slate-50 font-bold text-xs py-3 rounded-xl transition-all cursor-pointer">Cancel</button>
                <button type="submit" className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 font-bold text-xs py-3 rounded-xl transition-all shadow-md shadow-emerald-600/10 cursor-pointer">Create Worker</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
