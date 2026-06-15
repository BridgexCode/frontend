"use client";

import { motion } from "framer-motion";
import type { ComponentType, SVGProps } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  color: string;
  bgColor: string;
}

export function StatsCard({ title, value, icon: Icon, color, bgColor }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
        </div>
        <div className={`w-11 h-11 rounded-xl ${bgColor} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
      </div>
    </motion.div>
  );
}
