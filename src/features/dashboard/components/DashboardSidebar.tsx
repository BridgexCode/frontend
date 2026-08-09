"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Network, Building2, ChevronDown, HelpCircle, X } from "lucide-react";
import { SIDEBAR_ITEMS } from "../services/mock-data";

interface DashboardSidebarProps {
  open: boolean;
  onClose: () => void;
  activeSection?: string;
}

function SidebarContent({ activeSection = "dashboard" }: { activeSection?: string }) {
  return (
    <>
      <div className="flex items-center gap-2.5 mb-8">
        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
          <Network className="w-5 h-5" />
        </div>
        <div>
          <span className="text-base font-bold text-slate-800 tracking-tight block leading-none">Logiflow</span>
          <span className="text-[9px] font-semibold text-slate-400 tracking-wide">Logistics & Shipment Management</span>
        </div>
      </div>

      <nav className="space-y-1.5">
          {SIDEBAR_ITEMS.map((item) => {
            const itemKey = item.href.replace("/dashboard", "").replace("#", "") || "dashboard";
            const isActive = itemKey === activeSection;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/15"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <item.icon className={`w-4.5 h-4.5 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </a>
            );
          })}
      </nav>

      <div className="space-y-4 pt-6 border-t border-slate-100 mt-6">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 border border-slate-100">
          <HelpCircle className="w-4.5 h-4.5 text-slate-400 shrink-0" />
          <div>
            <p className="text-[10px] font-bold text-slate-700">Need Help?</p>
            <p className="text-[9px] text-slate-400 font-semibold cursor-pointer hover:underline">Contact support</p>
          </div>
        </div>
      </div>
    </>
  );
}

export function DashboardSidebar({ open, onClose, activeSection = "dashboard" }: DashboardSidebarProps) {
  return (
    <>
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-100 p-6 shrink-0 justify-between h-screen sticky top-0">
        <SidebarContent activeSection={activeSection} />
      </aside>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="lg:hidden fixed inset-0 z-40 bg-black"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-64 bg-white p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <Network className="w-6 h-6 text-emerald-600" />
                    <span className="text-base font-bold text-slate-800">Logiflow</span>
                  </div>
                  <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <SidebarContent activeSection={activeSection} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
