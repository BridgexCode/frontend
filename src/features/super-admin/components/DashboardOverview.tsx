"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, Activity, TrendingUp, Clock } from "lucide-react";
import { MOCK_SYSTEM_STATS } from "../services/mock-data";
import { fetchDashboardStatsApi } from "../services/super-admin-api";

export function DashboardOverview() {
  const [backendStats, setBackendStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchDashboardStatsApi()
      .then((data) => {
        if (mounted) {
          setBackendStats(data);
          setError(null);
        }
      })
      .catch(() => {
        if (mounted) {
          setError("Failed to load dashboard metrics");
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <div className="h-8 w-64 bg-slate-200 animate-pulse rounded-xl mb-2" />
          <div className="h-4 w-48 bg-slate-200 animate-pulse rounded-xl" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-32 bg-slate-200 animate-pulse rounded-2xl animate-pulse" />
          <div className="h-32 bg-slate-200 animate-pulse rounded-2xl animate-pulse" />
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="h-48 bg-slate-200 animate-pulse rounded-2xl animate-pulse" />
          <div className="h-48 bg-slate-200 animate-pulse rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center bg-red-50 border border-red-100 rounded-2xl max-w-md mx-auto my-12">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  const stats = {
    ...MOCK_SYSTEM_STATS,
    totalOrganizations: backendStats?.totalOrganizations ?? 0,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Super Admin Dashboard</h1>
        <p className="text-sm text-slate-400 mt-0.5">
          System-wide overview of the Naxivo platform
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          icon={<Building2 className="w-5 h-5" />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          label="Total Organizations"
          value={stats.totalOrganizations}
          sub={`${stats.activeOrganizations} active`}
        />
        <StatCard
          icon={<Activity className="w-5 h-5" />}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          label="System Uptime"
          value={stats.systemUptime}
          sub="Last 30 days"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-100 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-slate-400" />
            <h3 className="text-sm font-bold text-slate-900">Platform Growth</h3>
          </div>
          <div className="space-y-4">
            <GrowthBar label="Organizations" value={stats.totalOrganizations} max={10} color="bg-emerald-500" />
            <GrowthBar label="Active Rate" value={Math.round((stats.activeOrganizations / stats.totalOrganizations) * 100)} max={100} color="bg-amber-500" suffix="%" />
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-slate-400" />
            <h3 className="text-sm font-bold text-slate-900">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            {[
              { event: "QuickDeliver registered", time: "2 hours ago", type: "info" },
              { event: "TransIndia Logistics suspended", time: "5 hours ago", type: "error" },
              { event: "CityExpress upgraded to PRO", time: "1 day ago", type: "info" },
              { event: "System backup completed", time: "1 day ago", type: "info" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${item.type === "error" ? "bg-red-500" : "bg-blue-500"}`} />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800">{item.event}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, iconBg, iconColor, label, value, sub }: { icon: React.ReactNode; iconBg: string; iconColor: string; label: string; value: string | number; sub: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
        <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center ${iconColor}`}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-xs text-slate-400 mt-1">{sub}</p>
    </motion.div>
  );
}

function GrowthBar({ label, value, max, color, suffix = "" }: { label: string; value: number; max: number; color: string; suffix?: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div>
      <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
        <span>{label}</span>
        <span>{value}{suffix}</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-2 rounded-full ${color}`}
        />
      </div>
    </div>
  );
}
