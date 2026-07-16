"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { BarChart3, Download, TrendingUp, Truck, AlertTriangle, CheckCircle, Users, Navigation, Clock, ArrowUpRight, ArrowDownRight, Loader2 } from "lucide-react";
import { fetchDashboardStatsApi } from "@/features/manager/services/dashboard-api";
import type { DashboardStats } from "@/features/manager/services/dashboard-api";

const WEEKLY_DATA = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  shipments: [45, 62, 58, 80, 75, 90, 110],
  deliveries: [38, 50, 48, 65, 62, 78, 95],
  delayed: [7, 12, 10, 15, 13, 12, 15],
};

const MONTHLY_DATA = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  shipments: [320, 410, 380, 450],
  deliveries: [280, 350, 330, 400],
  delayed: [40, 60, 50, 50],
};

export function ReportsContent() {
  const reportRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [chartView, setChartView] = useState<"weekly" | "monthly">("weekly");
  const [exporting, setExporting] = useState(false);

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const jspdfModule = await import("jspdf");
      const jsPDF = jspdfModule.default || jspdfModule.jsPDF;
      const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
      const pageW = pdf.internal.pageSize.getWidth();
      const margin = 15;
      const yStart = 25;
      let y = yStart;

      const title = (text: string, size = 16) => {
        pdf.setFontSize(size);
        pdf.setFont("helvetica", "bold");
        pdf.text(text, pageW / 2, y, { align: "center" });
        y += size / 2 + 4;
      };
      const subtitle = (text: string) => {
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(100);
        pdf.text(text, pageW / 2, y, { align: "center" });
        y += 5;
        pdf.setTextColor(0);
      };
      const section = (text: string) => {
        y += 3;
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(30);
        pdf.text(text, margin, y);
        y += 2;
        pdf.setDrawColor(200);
        pdf.line(margin, y, pageW - margin, y);
        y += 5;
        pdf.setTextColor(0);
      };
      const row = (label: string, value: string | number, x1 = margin, x2 = pageW / 2) => {
        pdf.setFontSize(9);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(80);
        pdf.text(String(label), x1, y);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(20);
        pdf.text(String(value), x2, y);
        y += 5;
      };

      title("Operational Report", 18);
      subtitle(`Generated on ${new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}`);

      pdf.setDrawColor(220);
      pdf.setLineWidth(0.5);
      pdf.line(margin, y + 1, pageW - margin, y + 1);
      y += 6;

      section("Key Metrics");
      row("Total Shipments", s.totalShipments);
      row("In Transit", s.inTransitShipments);
      row("Delivered", s.deliveredShipments);
      row("Delayed", s.delayedShipments);

      if (y > 250) { pdf.addPage(); y = yStart; }
      section("Fleet Summary");
      row("Total Drivers", s.totalDrivers, margin, margin + 40);
      row("Active Drivers", s.activeDrivers, margin, margin + 40);
      y += 2;
      row("Total Vehicles", s.totalVehicles, margin, margin + 40);
      row("Active Vehicles", s.activeVehicles, margin, margin + 40);

      if (y > 250) { pdf.addPage(); y = yStart; }
      section("Performance");
      const onTime = 100 - (s.totalShipments ? Math.round((s.delayedShipments / s.totalShipments) * 100) : 0);
      const fleetUtil = s.totalVehicles ? Math.round((s.activeVehicles / s.totalVehicles) * 100) : 0;
      const driverAct = s.totalDrivers ? Math.round((s.activeDrivers / s.totalDrivers) * 100) : 0;
      const successRt = s.totalShipments ? Math.round((s.deliveredShipments / s.totalShipments) * 100) : 0;
      row("On-Time Delivery", `${onTime}%`);
      row("Fleet Utilization", `${fleetUtil}%`);
      row("Driver Activity", `${driverAct}%`);
      row("Shipment Success", `${successRt}%`);

      if (y > 250) { pdf.addPage(); y = yStart; }
      section("Weekly Trend Data");
      WEEKLY_DATA.labels.forEach((lbl, i) => {
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(60);
        pdf.text(lbl, margin, y);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(20);
        pdf.text(`${WEEKLY_DATA.shipments[i]}`, margin + 30, y);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(60);
        pdf.text("shipments", margin + 44, y, { maxWidth: 30 });
        y += 4;
      });

      y = Math.max(y + 8, 270);
      pdf.setDrawColor(200);
      pdf.line(margin, y, pageW - margin, y);
      y += 4;
      pdf.setFontSize(7);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(150);
      pdf.text("Report generated automatically by the system.", margin, y);

      pdf.save(`report-${new Date().toISOString().split("T")[0]}.pdf`);
    } catch (err) {
      console.error("PDF export failed", err);
    } finally {
      setExporting(false);
    }
  };

  useEffect(() => {
    fetchDashboardStatsApi().then(setStats).catch(() => {});
  }, []);

  const s = stats || {
    totalShipments: 0, deliveredShipments: 0,
    inTransitShipments: 0, delayedShipments: 0,
    totalDrivers: 0, activeDrivers: 0, totalVehicles: 0, activeVehicles: 0,
  };

  const chartData = chartView === "weekly" ? WEEKLY_DATA : MONTHLY_DATA;
  const maxVal = Math.max(...chartData.shipments, ...chartData.deliveries);
  const chartHeight = 200;
  const chartWidth = 600;
  const padLeft = 40;
  const padRight = 20;
  const stepX = (chartWidth - padLeft - padRight) / (chartData.labels.length - 1);

  const toY = (v: number) => chartHeight - (v / maxVal) * chartHeight * 0.85 - 10;

  const shipmentPath = chartData.shipments.map((v, i) =>
    `${i === 0 ? "M" : "L"} ${padLeft + i * stepX} ${toY(v)}`
  ).join(" ");

  const deliveryPath = chartData.deliveries.map((v, i) =>
    `${i === 0 ? "M" : "L"} ${padLeft + i * stepX} ${toY(v)}`
  ).join(" ");

  const delayedPath = chartData.delayed.map((v, i) =>
    `${i === 0 ? "M" : "L"} ${padLeft + i * stepX} ${toY(v)}`
  ).join(" ");

  const total = s.totalShipments || 1;
  const deliveredPct = Math.round((s.deliveredShipments / total) * 100);
  const inTransitPct = Math.round((s.inTransitShipments / total) * 100);
  const delayedPct = Math.round((s.delayedShipments / total) * 100);

  const metrics = [
    { label: "On-Time Delivery", value: `${100 - (s.totalShipments ? Math.round((s.delayedShipments / s.totalShipments) * 100) : 0)}%`, pct: 100 - (s.totalShipments ? Math.round((s.delayedShipments / s.totalShipments) * 100) : 0), color: "bg-emerald-500" },
    { label: "Fleet Utilization", value: `${s.totalVehicles ? Math.round((s.activeVehicles / s.totalVehicles) * 100) : 0}%`, pct: s.totalVehicles ? Math.round((s.activeVehicles / s.totalVehicles) * 100) : 0, color: "bg-blue-500" },
    { label: "Driver Activity", value: `${s.totalDrivers ? Math.round((s.activeDrivers / s.totalDrivers) * 100) : 0}%`, pct: s.totalDrivers ? Math.round((s.activeDrivers / s.totalDrivers) * 100) : 0, color: "bg-purple-500" },
    { label: "Shipment Success", value: `${deliveredPct}%`, pct: deliveredPct, color: "bg-emerald-500" },
  ];

  return (
    <div ref={reportRef} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports & Analytics</h1>
          <p className="text-sm text-slate-400 mt-0.5">Comprehensive operational insights with real-time data</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 rounded-xl p-0.5">
            <button onClick={() => setChartView("weekly")} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${chartView === "weekly" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>Weekly</button>
            <button onClick={() => setChartView("monthly")} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${chartView === "monthly" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>Monthly</button>
          </div>
          <button onClick={handleExportPDF} disabled={exporting} className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-all flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50">
            {exporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
            {exporting ? "Exporting..." : "Export PDF"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Shipment Trends</h3>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Total shipments, deliveries, and delays over time</p>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Shipments</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Delivered</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Delayed</span>
            </div>
          </div>
          <div className="relative w-full h-[200px]">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 20}`} className="w-full h-full">
              {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
                const y = toY(maxVal * (1 - pct));
                return (
                  <g key={pct}>
                    <line x1={padLeft} y1={y} x2={chartWidth - padRight} y2={y} stroke={pct === 0 ? "#e2e8f0" : "#f1f5f9"} strokeWidth={1} />
                    <text x={padLeft - 5} y={y + 3} fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="end">{Math.round(maxVal * (1 - pct))}</text>
                  </g>
                );
              })}
              {chartData.labels.map((lbl, i) => (
                <text key={i} x={padLeft + i * stepX} y={chartHeight + 10} fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">{lbl}</text>
              ))}
              <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: "easeInOut" }} d={shipmentPath} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
              <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }} d={deliveryPath} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
              <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }} d={delayedPath} fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
              {chartData.shipments.map((v, i) => (
                <motion.circle key={`s-${i}`} initial={{ r: 0 }} animate={{ r: 3.5 }} transition={{ delay: 1.2 + i * 0.05 }} cx={padLeft + i * stepX} cy={toY(v)} fill="#3b82f6" stroke="#fff" strokeWidth="1.5" />
              ))}
              {chartData.deliveries.map((v, i) => (
                <motion.circle key={`d-${i}`} initial={{ r: 0 }} animate={{ r: 3.5 }} transition={{ delay: 1.4 + i * 0.05 }} cx={padLeft + i * stepX} cy={toY(v)} fill="#10b981" stroke="#fff" strokeWidth="1.5" />
              ))}
              {chartData.delayed.map((v, i) => (
                <motion.circle key={`dd-${i}`} initial={{ r: 0 }} animate={{ r: 3.5 }} transition={{ delay: 1.6 + i * 0.05 }} cx={padLeft + i * stepX} cy={toY(v)} fill="#ef4444" stroke="#fff" strokeWidth="1.5" />
              ))}
            </svg>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-1">Status Distribution</h3>
          <p className="text-[10px] text-slate-400 font-semibold mb-6">Current shipment breakdown</p>
          <div className="relative flex justify-center items-center h-[160px]">
            <svg className="w-[160px] h-[160px] -rotate-90">
              <circle cx="80" cy="80" r="55" fill="transparent" stroke="#f1f5f9" strokeWidth="18" />
              <motion.circle cx="80" cy="80" r="55" fill="transparent" stroke="#10b981" strokeWidth="18" strokeDasharray={`${deliveredPct * 3.456} ${(100 - deliveredPct) * 3.456}`} strokeDashoffset="0" strokeLinecap="round" initial={{ strokeDasharray: "0 345.6" }} animate={{ strokeDasharray: `${deliveredPct * 3.456} ${(100 - deliveredPct) * 3.456}` }} transition={{ duration: 1, delay: 0.5 }} />
              <motion.circle cx="80" cy="80" r="55" fill="transparent" stroke="#f59e0b" strokeWidth="18" strokeDasharray={`${inTransitPct * 3.456} ${(100 - inTransitPct) * 3.456}`} strokeDashoffset={`-${deliveredPct * 3.456}`} strokeLinecap="round" initial={{ strokeDasharray: "0 345.6" }} animate={{ strokeDasharray: `${inTransitPct * 3.456} ${(100 - inTransitPct) * 3.456}` }} transition={{ duration: 1, delay: 0.8 }} />
              <motion.circle cx="80" cy="80" r="55" fill="transparent" stroke="#ef4444" strokeWidth="18" strokeDasharray={`${delayedPct * 3.456} ${(100 - delayedPct) * 3.456}`} strokeDashoffset={`-${(deliveredPct + inTransitPct) * 3.456}`} strokeLinecap="round" initial={{ strokeDasharray: "0 345.6" }} animate={{ strokeDasharray: `${delayedPct * 3.456} ${(100 - delayedPct) * 3.456}` }} transition={{ duration: 1, delay: 1.1 }} />
            </svg>
            <div className="absolute text-center">
              <span className="text-[9px] font-bold text-slate-400 block leading-none">Total</span>
              <span className="text-2xl font-extrabold text-slate-800 block mt-0.5">{s.totalShipments}</span>
            </div>
          </div>
          <div className="space-y-2.5 mt-4 text-xs font-semibold">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Delivered</span>
              <span className="text-slate-800">{s.deliveredShipments} ({deliveredPct}%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> In Transit</span>
              <span className="text-slate-800">{s.inTransitShipments} ({inTransitPct}%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /> Delayed</span>
              <span className="text-slate-800">{s.delayedShipments} ({delayedPct}%)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Shipments", value: s.totalShipments, icon: Truck, color: "bg-blue-50 text-blue-600", change: `+${Math.round(s.totalShipments * 0.12)}`, up: true },
          { label: "Active Shipments", value: s.inTransitShipments, icon: TrendingUp, color: "bg-emerald-50 text-emerald-600", change: `+${Math.round(s.inTransitShipments * 0.08)}`, up: true },
          { label: "Delivered", value: s.deliveredShipments, icon: CheckCircle, color: "bg-green-50 text-green-600", change: `+${Math.round(s.deliveredShipments * 0.15)}`, up: true },
          { label: "Delayed", value: s.delayedShipments, icon: AlertTriangle, color: "bg-red-50 text-red-600", change: s.delayedShipments > 0 ? `${Math.round(s.delayedShipments * 0.05)}` : "0", up: false },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white border border-slate-100 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <div className={`w-9 h-9 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 150, delay: i * 0.15 + 0.3 }} className="text-2xl font-bold text-slate-900">{stat.value}</motion.p>
              <span className={`flex items-center gap-0.5 text-[10px] font-bold ${stat.up ? "text-emerald-600" : "text-red-500"}`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Performance Metrics</h3>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Key operational KPIs</p>
            </div>
          </div>
          <div className="space-y-5">
            {metrics.map((m, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-semibold text-slate-600">{m.label}</span>
                  <span className="text-xs font-bold text-slate-900">{m.value}</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${m.pct}%` }} transition={{ duration: 1, delay: i * 0.2, ease: "easeOut" }} className={`h-full rounded-full ${m.color}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Fleet Overview</h3>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Drivers & vehicles summary</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50/50 rounded-2xl p-5 text-center">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-3">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 150, delay: 0.3 }} className="text-3xl font-extrabold text-slate-900">{s.totalDrivers}</motion.p>
              <p className="text-[10px] font-bold text-slate-400 mt-1">Total Drivers</p>
              <p className="text-xs font-semibold text-emerald-600 mt-1">{s.activeDrivers} active</p>
            </div>
            <div className="bg-purple-50/50 rounded-2xl p-5 text-center">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-3">
                <Navigation className="w-5 h-5 text-purple-600" />
              </div>
              <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 150, delay: 0.5 }} className="text-3xl font-extrabold text-slate-900">{s.totalVehicles}</motion.p>
              <p className="text-[10px] font-bold text-slate-400 mt-1">Total Vehicles</p>
              <p className="text-xs font-semibold text-emerald-600 mt-1">{s.activeVehicles} active</p>
            </div>
          </div>
          <div className="mt-4 bg-slate-50 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> Avg Transit Time</span>
              <span className="text-sm font-bold text-slate-900">2.4 hrs</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-2"><Truck className="w-3.5 h-3.5" /> Shipments / Driver</span>
              <span className="text-sm font-bold text-slate-900">{s.totalDrivers ? Math.round(s.totalShipments / s.totalDrivers) : 0}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Monthly Performance Report", desc: "Download comprehensive monthly analytics with all key metrics and trends", icon: BarChart3, color: "bg-blue-50 text-blue-600" },
          { title: "Driver Efficiency Report", desc: "Individual driver scores, on-time rates, and route performance data", icon: Users, color: "bg-emerald-50 text-emerald-600" },
          { title: "Fleet Utilization Report", desc: "Vehicle usage rates, maintenance schedules, and cost analysis", icon: Navigation, color: "bg-purple-50 text-purple-600" },
          { title: "Delivery Success Report", desc: "Success rates, failure analysis, and customer satisfaction metrics", icon: CheckCircle, color: "bg-amber-50 text-amber-600" },
        ].map((report, i) => (
          <motion.div key={i} whileHover={{ y: -2 }} className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-all cursor-pointer group">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl ${report.color} flex items-center justify-center shrink-0`}>
                <report.icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors truncate">{report.title}</h3>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{report.desc}</p>
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <button className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 hover:gap-1.5 transition-all">
                Download <Download className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
