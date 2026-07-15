"use client";

import { useState, useEffect } from "react";
import { Download, Building2, Activity, Clock, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import {
  fetchMonthlyShipmentsApi,
  fetchPlanDistributionApi,
  fetchOrganizationGrowthApi,
  MonthlyShipment,
  PlanDistribution,
  OrganizationGrowth,
} from "../services/admin-reports-api";
import { fetchDashboardStatsApi, DashboardStats } from "../services/admin-dashboard-api";

export function ReportsPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [monthlyData, setMonthlyData] = useState<MonthlyShipment[]>([]);
  const [planData, setPlanData] = useState<PlanDistribution[]>([]);
  const [growthData, setGrowthData] = useState<OrganizationGrowth[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchDashboardStatsApi(),
      fetchMonthlyShipmentsApi(),
      fetchPlanDistributionApi(),
      fetchOrganizationGrowthApi(),
    ])
      .then(([s, m, p, g]) => {
        setStats(s);
        setMonthlyData(m);
        setPlanData(p);
        setGrowthData(g);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div><h1 className="text-2xl font-bold text-slate-900">Reports</h1></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 animate-pulse">
              <div className="h-4 bg-slate-100 rounded w-1/2 mb-3" />
              <div className="h-8 bg-slate-100 rounded w-1/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const maxShipments = monthlyData.length > 0 ? Math.max(...monthlyData.map((d) => d.shipments)) : 1;
  const maxOrgs = growthData.length > 0 ? Math.max(...growthData.map((d) => d.orgs)) : 1;

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
          { label: "Total Organizations", value: stats?.totalOrganizations || 0, icon: Building2, color: "bg-purple-50 text-purple-600" },
          { label: "Active Organizations", value: stats?.activeOrganizations || 0, icon: Activity, color: "bg-emerald-50 text-emerald-600" },
          { label: "Total Shipments", value: stats?.totalShipments || 0, icon: Clock, color: "bg-amber-50 text-amber-600" },
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
              {[0, Math.round(maxShipments / 2), maxShipments].map((y, idx) => (
                <line key={idx} x1="40" y1={140 - idx * 70} x2="480" y2={140 - idx * 70} stroke="#f1f5f9" strokeWidth={1} />
              ))}
              <text x="10" y="145" fill="#94a3b8" fontSize="9" fontWeight="bold">0</text>
              <text x="10" y={75} fill="#94a3b8" fontSize="9" fontWeight="bold">{Math.round(maxShipments / 2)}</text>
              <text x="10" y={45} fill="#94a3b8" fontSize="9" fontWeight="bold">{maxShipments}</text>
              {monthlyData.map((d, i) => {
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
                      {d.month.split(" ")[0]}
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
                  let offset = 0;
                  return planData.map((item) => {
                    const pct = item.value / item.total;
                    const dash = circ * pct;
                    const seg = (
                      <circle
                        key={item.label}
                        cx="72" cy="72" r="50"
                        fill="transparent"
                        stroke={item.color}
                        strokeWidth="16"
                        strokeDasharray={`${dash} ${circ - dash}`}
                        strokeDashoffset={-offset}
                        strokeLinecap="round"
                      />
                    );
                    offset += dash;
                    return seg;
                  });
                })()}
              </svg>
              <div className="absolute text-center">
                <span className="text-[10px] font-bold text-slate-400 block leading-none">Total</span>
                <span className="text-xl font-extrabold text-slate-800 block mt-1">{stats?.totalOrganizations || 0}</span>
              </div>
            </div>
            <div className="w-full space-y-2 text-xs font-semibold text-slate-500">
              {planData.map((item) => (
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
            {[0, Math.round(maxOrgs / 2), maxOrgs].map((y, idx) => (
              <line key={idx} x1="40" y1={140 - idx * 70} x2="480" y2={140 - idx * 70} stroke="#f1f5f9" strokeWidth={1} />
            ))}
            <text x="10" y="145" fill="#94a3b8" fontSize="9" fontWeight="bold">0</text>
            <text x="10" y={75} fill="#94a3b8" fontSize="9" fontWeight="bold">{Math.round(maxOrgs / 2)}</text>
            <text x="10" y={45} fill="#94a3b8" fontSize="9" fontWeight="bold">{maxOrgs}</text>
            {growthData.map((d, i) => {
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
