"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Building2, Activity, TrendingUp, Clock, Users, Package, Mail } from "lucide-react";
import { fetchDashboardStatsApi, DashboardStats } from "../services/admin-dashboard-api";
import { getStoredEmail } from "@/shared/lib/axios";

export function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    setAdminEmail(getStoredEmail() || "admin@naxivo.com");
    fetchDashboardStatsApi()
      .then(setStats)
      .catch((err) => {
        const msg = err.response?.data?.error || err.message || "Failed to load dashboard stats";
        toast.error(msg);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div><h1 className="text-2xl font-bold text-slate-900">Super Admin Dashboard</h1></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 animate-pulse">
              <div className="h-4 bg-slate-100 rounded w-1/2 mb-3" />
              <div className="h-8 bg-slate-100 rounded w-1/3 mb-2" />
              <div className="h-3 bg-slate-100 rounded w-1/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return <div className="text-center py-10 text-slate-400">Failed to load dashboard stats.</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Super Admin Dashboard</h1>
        <p className="text-sm text-slate-400 mt-0.5">
          System-wide overview of the Logiflow platform
        </p>
        <p className="text-sm text-slate-600 mt-2 flex items-center gap-1.5"><Mail className="w-4 h-4 text-emerald-500" />{adminEmail || "admin@naxivo.com"}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Building2 className="w-5 h-5" />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          label="Total Organizations"
          value={stats.totalOrganizations}
          sub={`${stats.activeOrganizations} active`}
        />
        <StatCard
          icon={<Users className="w-5 h-5" />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          label="Total Users"
          value={stats.totalUsers}
          sub="Across all organizations"
        />
        <StatCard
          icon={<Package className="w-5 h-5" />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          label="Total Shipments"
          value={stats.totalShipments}
          sub="All time"
        />
        <StatCard
          icon={<Activity className="w-5 h-5" />}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          label="Active Organizations"
          value={stats.activeOrganizations}
          sub="Currently active"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-100 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-slate-400" />
            <h3 className="text-sm font-bold text-slate-900">Platform Growth</h3>
          </div>
          <div className="space-y-4">
            <GrowthBar label="Organizations" value={stats.totalOrganizations} max={Math.max(stats.totalOrganizations, 10)} color="bg-emerald-500" />
            <GrowthBar label="Active Rate" value={stats.totalOrganizations > 0 ? Math.round((stats.activeOrganizations / stats.totalOrganizations) * 100) : 0} max={100} color="bg-amber-500" suffix="%" />
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-slate-400" />
            <h3 className="text-sm font-bold text-slate-900">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            {stats.recentActivity.length === 0 ? (
              <p className="text-sm text-slate-400">No recent activity</p>
            ) : (
              stats.recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${item.type === "error" ? "bg-red-500" : "bg-blue-500"}`} />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800">{item.event}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.description} — {item.time}</p>
                  </div>
                </div>
              ))
            )}
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
