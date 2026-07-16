"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/features/auth/store/auth-store";
import {
  LayoutDashboard, Users, UserCheck, Package, Clock,
  AlertTriangle, BarChart3, Settings, ChevronDown,
  Menu, X, LogOut, Building2, Truck, Navigation,
} from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/manager/dashboard" },
  { label: "Users", icon: Users, href: "/manager/users" },
  { label: "Workers", icon: UserCheck, href: "/manager/workers" },
  { label: "Drivers", icon: Navigation, href: "/manager/drivers" },
  { label: "Vehicles", icon: Truck, href: "/manager/vehicles" },
  { label: "Shipments", icon: Package, href: "/manager/shipments" },
  { label: "Timeline", icon: Clock, href: "/manager/timeline" },
  { label: "Reports", icon: BarChart3, href: "/manager/reports" },
  { label: "Settings", icon: Settings, href: "/manager/settings" },
];

export function ManagerSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);

  const handleLogout = async () => {
    setMobileOpen(false);
    await logout();
    router.push("/manager/login");
  };

  const isActive = (href: string) => pathname === href;

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Naxivo</h2>
            <p className="text-[10px] text-slate-400">Manager Portal</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {sidebarItems.map((item) => (
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
          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 text-xs font-bold">
            {user?.name?.charAt(0)?.toUpperCase() || "M"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate">{user?.name || "Manager"}</p>
            <p className="text-[10px] text-slate-400 truncate">{user?.email || ""}</p>
          </div>
          <button onClick={handleLogout} className="p-1 rounded-lg hover:bg-red-50 transition-colors" title="Logout">
            <LogOut className="w-4 h-4 shrink-0 text-slate-300 hover:text-red-500 transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setMobileOpen(true)} className="p-1.5 rounded-lg hover:bg-slate-50">
            <Menu className="w-5 h-5 text-slate-600" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-slate-900">Naxivo</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleLogout} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="Logout">
            <LogOut className="w-4 h-4 text-slate-500 hover:text-red-500 transition-colors" />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
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

      {/* Mobile sidebar */}
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

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-slate-100 z-30 flex-col">
        {sidebarContent}
      </aside>
    </>
  );
}
