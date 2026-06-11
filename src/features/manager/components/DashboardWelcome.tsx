"use client";

import { motion } from "framer-motion";

export function DashboardWelcome() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-6 md:p-8 text-white"
    >
      <h1 className="text-2xl md:text-3xl font-bold">Welcome back, Divya</h1>
      <p className="text-emerald-100 text-sm mt-1 max-w-md">
        Here&apos;s your operations overview for today. You have 4 active shipments and 2 pending approvals.
      </p>
    </motion.div>
  );
}
