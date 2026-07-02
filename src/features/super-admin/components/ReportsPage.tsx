"use client";

import { Download, Building2, Activity, Clock, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { MOCK_SYSTEM_STATS } from "../services/mock-data";

const MONTHLY_DATA = [
  { month: "Jan", shipments: 28 },
  { month: "Feb", shipments: 35 },
  { month: "Mar", shipments: 42 },
  { month: "Apr", shipments: 38 },
  { month: "May", shipments: 52 },
  { month: "Jun", shipments: 48 },
];

const PLAN_DATA = [
  { label: "Enterprise", value: 2, color: "#8b5cf6", total: 6 },
  { label: "Pro", value: 2, color: "#3b82f6", total: 6 },
  { label: "Free", value: 2, color: "#94a3b8", total: 6 },
];

const ORG_GROWTH_DATA = [
  { month: "Jan", orgs: 2 },
  { month: "Feb", orgs: 3 },
  { month: "Mar", orgs: 3 },
  { month: "Apr", orgs: 4 },
  { month: "May", orgs: 5 },
  { month: "Jun", orgs: 6 },
];

export function ReportsPage() {
  const stats = MOCK_SYSTEM_STATS;
  const maxShipments = Math.max(...MONTHLY_DATA.map((d) => d.shipments));
  const maxOrgs = Math.max(...ORG_GROWTH_DATA.map((d) => d.orgs));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Cross-organizational analytics and platform metrics
          </p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/10 flex items-center gap-2 cursor-pointer">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: "Total Organizations", value: stats.totalOrganizations, icon: Building2, color: "bg-purple-50 text-purple-600" },
          { label: "Active Organizations", value: stats.activeOrganizations, icon: Activity, color: "bg-emerald-50 text-emerald-600" },
          { label: "System Uptime", value: stats.systemUptime, icon: Clock, color: "bg-amber-50 text-amber-600" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white border border-slate-100 rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <div className={`w-9 h-9 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-100 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-slate-400" />
            <h3 className="text-sm font-bold text-slate-900">Monthly Shipments</h3>
          </div>
          <div className="relative w-full h-[180px]">
            <svg viewBox="0 0 500 160" className="w-full h-full">
              {[0, 25, 50].map((y) => (
                <line key={y} x1="40" y1={140 - y} x2="480" y2={140 - y} stroke="#f1f5f9" strokeWidth={1} />
              ))}
              <text x="10" y="145" fill="#94a3b8" fontSize="9" fontWeight="bold">0</text>
              <text x="10" y="118" fill="#94a3b8" fontSize="9" fontWeight="bold">25</text>
              <text x="10" y="93" fill="#94a3b8" fontSize="9" fontWeight="bold">50</text>
              {MONTHLY_DATA.map((d, i) => {
                const barH = (d.shipments / maxShipments) * 100;
                const x = 50 + i * 73;
                return (
                  <g key={d.month}>
                    <motion.rect
                      initial={{ height: 0, y: 140 }}
                      animate={{ height: barH, y: 140 - barH }}
                      transition={{ duration: 0.6, delay: i * 0.08 }}
                      x={x}
                      width="36"
                      rx="4"
                      fill="#10b981"
                    />
                    <text x={x + 18} y="155" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="middle">
                      {d.month}
                    </text>
                    <text x={x + 18} y={140 - barH - 6} fill="#64748b" fontSize="8" fontWeight="bold" textAnchor="middle">
                      {d.shipments}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Building2 className="w-5 h-5 text-slate-400" />
            <h3 className="text-sm font-bold text-slate-900">Plan Distribution</h3>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative flex justify-center items-center h-36 mb-4">
              <svg className="w-36 h-36 -rotate-90" viewBox="0 0 144 144">
                <circle cx="72" cy="72" r="50" fill="transparent" stroke="#f1f5f9" strokeWidth="16" />
                {(() => {
                  const circ = 2 * Math.PI * 50;
                  const entPct = 2 / 6;
                  const proPct = 2 / 6;
                  const freePct = 2 / 6;
                  const entDash = circ * entPct;
                  const proDash = circ * proPct;
                  const freeDash = circ * freePct;
                  return (
                    <>
                      <circle cx="72" cy="72" r="50" fill="transparent" stroke="#8b5cf6" strokeWidth="16" strokeDasharray={`${entDash} ${circ - entDash}`} strokeDashoffset="0" strokeLinecap="round" />
                      <circle cx="72" cy="72" r="50" fill="transparent" stroke="#3b82f6" strokeWidth="16" strokeDasharray={`${proDash} ${circ - proDash}`} strokeDashoffset={-entDash} strokeLinecap="round" />
                      <circle cx="72" cy="72" r="50" fill="transparent" stroke="#94a3b8" strokeWidth="16" strokeDasharray={`${freeDash} ${circ - freeDash}`} strokeDashoffset={-(entDash + proDash)} strokeLinecap="round" />
                    </>
                  );
                })()}
              </svg>
              <div className="absolute text-center">
                <span className="text-[10px] font-bold text-slate-400 block leading-none">Total</span>
                <span className="text-xl font-extrabold text-slate-800 block mt-1">{stats.totalOrganizations}</span>
              </div>
            </div>
            <div className="w-full space-y-2 text-xs font-semibold text-slate-500">
              {PLAN_DATA.map((item) => (
                <div key={item.label} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.label}</span>
                  </div>
                  <span className="text-slate-800">{item.value} orgs</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="w-5 h-5 text-slate-400" />
          <h3 className="text-sm font-bold text-slate-900">Organization Growth</h3>
        </div>
        <div className="relative w-full h-[180px]">
          <svg viewBox="0 0 500 160" className="w-full h-full">
            {[0, 3, 6].map((y) => (
              <line key={y} x1="40" y1={140 - y * 20} x2="480" y2={140 - y * 20} stroke="#f1f5f9" strokeWidth={1} />
            ))}
            <text x="10" y="145" fill="#94a3b8" fontSize="9" fontWeight="bold">0</text>
            <text x="10" y="83" fill="#94a3b8" fontSize="9" fontWeight="bold">3</text>
            <text x="10" y="43" fill="#94a3b8" fontSize="9" fontWeight="bold">6</text>
            {ORG_GROWTH_DATA.map((d, i) => {
              const barH = (d.orgs / maxOrgs) * 100;
              const x = 50 + i * 73;
              return (
                <g key={d.month}>
                  <motion.rect
                    initial={{ height: 0, y: 140 }}
                    animate={{ height: barH, y: 140 - barH }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    x={x}
                    width="36"
                    rx="4"
                    fill="#8b5cf6"
                  />
                  <text x={x + 18} y="155" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="middle">
                    {d.month}
                  </text>
                  <text x={x + 18} y={140 - barH - 6} fill="#64748b" fontSize="8" fontWeight="bold" textAnchor="middle">
                    {d.orgs}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
