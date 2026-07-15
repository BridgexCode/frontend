"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { UserPlus, Package, UserCheck, Clock } from "lucide-react";

const quickActions = [
  { label: "Create Worker", icon: UserPlus, color: "bg-blue-500", href: "/manager/workers" },
  { label: "Create Shipment", icon: Package, color: "bg-indigo-500", href: "/manager/shipments" },
  { label: "Assign Shipment", icon: UserCheck, color: "bg-emerald-500", href: "/manager/shipments" },
  { label: "View Timeline", icon: Clock, color: "bg-amber-500", href: "/manager/timeline" },
];

export function DashboardQuickActions() {
  const router = useRouter();

  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map((action) => (
          <motion.button
            key={action.label}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push(action.href)}
            className="p-5 bg-white border border-slate-100 rounded-2xl flex flex-col items-center gap-3 hover:shadow-md hover:border-slate-200 transition-all cursor-pointer group"
          >
            <div className={`w-11 h-11 rounded-xl ${action.color} flex items-center justify-center`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-bold text-slate-700">{action.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
