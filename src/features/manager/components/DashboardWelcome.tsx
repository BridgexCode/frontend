"use client";

import { motion } from "framer-motion";
import { useAuthStore } from "@/features/auth/store/auth-store";

export function DashboardWelcome({ activeShipments = 0 }: { activeShipments?: number }) {
  const user = useAuthStore((s) => s.user);
  const name = user?.name || "User";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-6 md:p-8 text-white"
    >
      <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {name}</h1>
      <p className="text-emerald-100 text-sm mt-1 max-w-md">
        Here&apos;s your operations overview for today. You have {activeShipments} active shipment{activeShipments !== 1 ? "s" : ""}.
      </p>
    </motion.div>
  );
}
