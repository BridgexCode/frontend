"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Network, Menu, X, LogOut } from "lucide-react";
import { SIDEBAR_ITEMS } from "../constants";
import { logoutApi, getMeApi } from "../services/admin-auth-api";

export function SuperAdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    getMeApi().then(setUser).catch(() => {});
  }, []);

  const isActive = (href: string) => pathname === href;

  const handleLogout = async () => {
    await logoutApi();
    router.push("/admin/login");
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center">
            <Network className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Logiflow</h2>
            <p className="text-[10px] text-slate-400">Super Admin</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {SIDEBAR_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              isActive(item.href)
                ? "bg-emerald-600 text-white shadow-sm shadow-emerald-200"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            }`}
          >
            <item.icon className="w-4.5 h-4.5 shrink-0" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-100">
        <div className="flex items-center gap-3 px-3 py-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 text-xs font-bold">
            SA
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate">{user?.name || "System Admin"}</p>
            <p className="text-[10px] text-slate-400 truncate">{user?.email || "admin@naxivo.com"}</p>
          </div>
          <LogOut onClick={() => setShowLogoutModal(true)} className="w-4 h-4 shrink-0 text-slate-300 hover:text-red-500 transition-colors cursor-pointer" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setMobileOpen(true)} className="p-1.5 rounded-lg hover:bg-slate-50">
            <Menu className="w-5 h-5 text-slate-600" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Network className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-slate-900">Logiflow</span>
          </div>
        </div>
        <div className="w-7 h-7 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 text-[10px] font-bold">
          SA
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="lg:hidden fixed inset-0 z-50 bg-black"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="lg:hidden fixed top-0 left-0 bottom-0 z-50 w-72 bg-white shadow-2xl"
          >
            <div className="absolute top-3 right-3">
              <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-50">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            {sidebarContent}
          </motion.div>
        )}
      </AnimatePresence>

      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-slate-100 z-30 flex-col">
        {sidebarContent}
      </aside>
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }} onClick={() => setShowLogoutModal(false)} className="absolute inset-0 bg-black" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 15 }} className="bg-white rounded-3xl p-6 w-full max-w-sm z-10 shadow-2xl relative">
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-3">
                  <LogOut className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Confirm Logout</h3>
                <p className="text-sm text-slate-400 mt-1">Are you sure you want to log out?</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowLogoutModal(false)} className="flex-1 border border-slate-200 hover:bg-slate-50 font-bold text-sm py-3 rounded-xl transition-all cursor-pointer">
                  Cancel
                </button>
                <button onClick={handleLogout} className="flex-1 bg-red-500 text-white hover:bg-red-600 font-bold text-sm py-3 rounded-xl transition-all shadow-md shadow-red-200 cursor-pointer">
                  Logout
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
