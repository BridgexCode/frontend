"use client";

import { BarChart3, Download, TrendingUp, Truck, AlertTriangle, CheckCircle } from "lucide-react";
import { DASHBOARD_REPORT_STATS } from "@/features/dashboard/services/mock-data";

export function ReportsPage() {
  const stats = DASHBOARD_REPORT_STATS;

  return (
    <div className="space-y-6 py-6 md:py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
          <p className="text-sm text-slate-400 mt-0.5">View and download operational analytics</p>
        </div>
        <button className="px-5 py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-200 flex items-center gap-2 cursor-pointer">
          <Download className="w-4 h-4" />
          Export All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Shipments", value: stats.totalShipments, icon: Truck, color: "bg-blue-50 text-blue-600", change: "+12", positive: true },
          { label: "Active Shipments", value: stats.activeShipments, icon: TrendingUp, color: "bg-emerald-50 text-emerald-600", change: "+3", positive: true },
          { label: "Delivered This Month", value: stats.deliveredThisMonth, icon: CheckCircle, color: "bg-green-50 text-green-600", change: "+8%", positive: true },
          { label: "Delayed", value: stats.delayedCount, icon: AlertTriangle, color: "bg-red-50 text-red-600", change: "-2", positive: true },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <div className={`w-9 h-9 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <span className={`text-xs font-bold ${stat.positive ? "text-emerald-600" : "text-red-500"}`}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Drivers", value: stats.totalDrivers, subtitle: `${stats.activeDrivers} active`, color: "bg-indigo-50" },
          { label: "Total Vehicles", value: stats.totalVehicles, subtitle: `${stats.availableVehicles} available`, color: "bg-purple-50" },
          { label: "On-Time Rate", value: stats.onTimeRate, subtitle: "Last 30 days", color: "bg-emerald-50" },
          { label: "Failed Rate", value: stats.failedRate, subtitle: "Of total shipments", color: "bg-amber-50" },
        ].map((stat, i) => (
          <div key={i} className={`${stat.color} border border-slate-100 rounded-2xl p-5`}>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{stat.subtitle}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: "Shipment Performance", desc: "Delivery success rates, average transit times, and route efficiency metrics", color: "bg-blue-50 text-blue-600" },
          { title: "Fleet Utilization", desc: "Vehicle usage rates, driver assignment efficiency, and maintenance schedules", color: "bg-indigo-50 text-indigo-600" },
          { title: "Driver Analytics", desc: "Individual driver performance, on-time delivery rates, and customer feedback", color: "bg-emerald-50 text-emerald-600" },
          { title: "Monthly Summary", desc: "Comprehensive monthly report with all key operational metrics and trends", color: "bg-purple-50 text-purple-600" },
        ].map((report, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-all cursor-pointer group">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl ${report.color} flex items-center justify-center`}>
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{report.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs">{report.desc}</p>
                </div>
              </div>
              <button className="p-2 rounded-lg text-slate-300 hover:text-slate-600 hover:bg-slate-50 transition-all cursor-pointer">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
