"use client";

import { BarChart3, Download } from "lucide-react";
import { DASHBOARD_STATS } from "@/features/manager/services/mock-data";

export function ReportsContent() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
          <p className="text-sm text-slate-400 mt-0.5">View and download operational reports</p>
        </div>
        <button className="px-5 py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-200 flex items-center gap-2 cursor-pointer">
          <Download className="w-4 h-4" />
          Export All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Workers", value: DASHBOARD_STATS.totalWorkers, change: "+2", positive: true },
          { label: "Active Shipments", value: DASHBOARD_STATS.activeShipments, change: "+1", positive: true },
          { label: "Delivered This Month", value: DASHBOARD_STATS.deliveredShipments, change: "0", positive: true },
          { label: "Failed Rate", value: `${Math.round((DASHBOARD_STATS.failedMessages / 8) * 100)}%`, change: "-2%", positive: true },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <span className={`text-xs font-bold ${stat.positive ? "text-emerald-600" : "text-red-500"}`}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: "Worker Performance", desc: "Delivery success rates, active shipments, and efficiency metrics per worker", color: "bg-blue-50 text-blue-600" },
          { title: "Shipment Analytics", desc: "Volume trends, status distribution, and average delivery times", color: "bg-indigo-50 text-indigo-600" },
          { title: "Failed Message Log", desc: "Detailed breakdown of failed WhatsApp messages and retry success rates", color: "bg-red-50 text-red-600" },
          { title: "Monthly Summary", desc: "Comprehensive monthly report with all key operational metrics", color: "bg-emerald-50 text-emerald-600" },
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
              <button className="p-2 rounded-lg text-slate-300 hover:text-slate-600 hover:bg-slate-50 transition-all">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
