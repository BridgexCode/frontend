"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface UIUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  createdAt: string;
}

interface ViewUserModalProps {
  user: UIUser | null;
  onClose: () => void;
}

export function ViewUserModal({ user, onClose }: ViewUserModalProps) {
  return (
    <AnimatePresence>
      {user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md z-10 shadow-2xl relative"
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-emerald-600">{user.name.charAt(0)}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{user.name}</h3>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>

            <div className="space-y-3">
              {[
                { label: "Phone", value: user.phone },
                { label: "Role", value: user.role === "OPERATIONS_MANAGER" ? "Operations Manager" : "Worker" },
                { label: "Status", value: user.status },
                { label: "Created", value: user.createdAt },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-slate-50">
                  <span className="text-xs font-semibold text-slate-400">{item.label}</span>
                  <span className="text-sm font-semibold text-slate-800">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
