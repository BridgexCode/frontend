"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Globe, 
  Clock, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Truck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Menu,
  Bell,
  Calendar,
  ChevronDown,
  LayoutDashboard,
  MapPin,
  TrendingUp,
  TrendingDown,
  Navigation,
  Check,
  AlertTriangle,
  UserCheck,
  Plus,
  BarChart3,
  Search,
  HelpCircle,
  PlusCircle,
  X
} from "lucide-react";

// Sidebar Links Configuration
const SIDEBAR_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", active: true },
  { label: "Shipments", icon: Truck, href: "#shipments" },
  { label: "Drivers", icon: UserCheck, href: "#drivers" },
  { label: "Vehicles", icon: Navigation, href: "#vehicles" },
  { label: "Managers", icon: User, href: "#managers" },
  { label: "Timeline", icon: Clock, href: "#timeline" },
  { label: "Reports", icon: BarChart3, href: "#reports" },
  { label: "Alerts", icon: AlertTriangle, href: "#alerts" },
  { label: "Settings", icon: ShieldCheck, href: "#settings" },
];

// Initial mock data matching reference image
const INITIAL_SHIPMENTS = [
  { id: "#1001", route: "Kochi → Calicut", driver: "Rahul P", status: "DELIVERED" },
  { id: "#1002", route: "Kochi → Thrissur", driver: "Vishnu R", status: "IN TRANSIT" },
  { id: "#1003", route: "Kochi → Malappuram", driver: "Sajith K", status: "IN TRANSIT" },
  { id: "#1004", route: "Kochi → Kannur", driver: "Ajeesh M", status: "DELAYED" },
  { id: "#1005", route: "Kochi → Alappuzha", driver: "Nithin S", status: "DELIVERED" },
];

const INITIAL_ACTIVITIES = [
  { id: 1, type: "delivered", title: "Shipment #1001 delivered", desc: "Kochi → Calicut", time: "10:30 AM", icon: Check, color: "bg-green-500 text-white" },
  { id: 2, type: "transit", title: "Shipment #1003 in transit", desc: "Kochi → Malappuram", time: "09:15 AM", icon: Truck, color: "bg-indigo-500 text-white" },
  { id: 3, type: "assigned", title: "Driver Rahul P assigned to Shipment #1002", desc: "Kochi → Thrissur", time: "Yesterday", icon: User, color: "bg-amber-500 text-white" },
  { id: 4, type: "vehicle", title: "Vehicle KL-07-AB-1234 added", desc: "Org Admin registration", time: "Yesterday", icon: Navigation, color: "bg-purple-500 text-white" },
  { id: 5, type: "delayed", title: "Shipment #1004 delayed", desc: "Reason: Traffic", time: "14 Oct, 08:45 PM", icon: AlertTriangle, color: "bg-red-500 text-white" },
];

// Charts Mock Data depending on timeframe dropdown select
const CHART_DATA = {
  "This Week": {
    delivered: [80, 110, 95, 140, 135, 160, 190],
    inTransit: [40, 60, 50, 75, 70, 85, 115],
    delayed: [20, 25, 22, 35, 30, 28, 45],
    labels: ["10 Oct", "11 Oct", "12 Oct", "13 Oct", "14 Oct", "15 Oct", "16 Oct"]
  },
  "Last Week": {
    delivered: [65, 85, 120, 105, 115, 140, 155],
    inTransit: [30, 45, 55, 40, 60, 75, 80],
    delayed: [10, 15, 30, 18, 25, 20, 24],
    labels: ["03 Oct", "04 Oct", "05 Oct", "06 Oct", "07 Oct", "08 Oct", "09 Oct"]
  }
};

export default function DashboardPage() {
  // Mobile drawer state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Timeframe filters
  const [timeRange, setTimeRange] = useState<"This Week" | "Last Week">("This Week");

  // Notifications State
  const [notifications, setNotifications] = useState(8);

  // Search Filter
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New Shipment Form State
  const [newOrigin, setNewOrigin] = useState("");
  const [newDestination, setNewDestination] = useState("");
  const [newDriver, setNewDriver] = useState("");
  const [newStatus, setNewStatus] = useState<"DELIVERED" | "IN TRANSIT" | "DELAYED">("IN TRANSIT");

  // Dynamic Live State
  const [shipments, setShipments] = useState(INITIAL_SHIPMENTS);
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);

  // Handle Add Shipment Form Submit
  const handleCreateShipmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrigin || !newDestination || !newDriver) return;

    const newId = `#100${shipments.length + 1}`;
    const newShipment = {
      id: newId,
      route: `${newOrigin} → ${newDestination}`,
      driver: newDriver,
      status: newStatus
    };

    // Update States
    setShipments([newShipment, ...shipments]);

    // Create corresponding Activity Feed Log
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newActivity = {
      id: activities.length + 1,
      type: newStatus === "DELIVERED" ? "delivered" : newStatus === "DELAYED" ? "delayed" : "transit",
      title: `Shipment ${newId} ${newStatus === "DELIVERED" ? "delivered" : newStatus === "DELAYED" ? "delayed" : "in transit"}`,
      desc: `${newOrigin} → ${newDestination}`,
      time: timeString,
      icon: newStatus === "DELIVERED" ? Check : newStatus === "DELAYED" ? AlertTriangle : Truck,
      color: newStatus === "DELIVERED" ? "bg-green-500 text-white" : newStatus === "DELAYED" ? "bg-red-500 text-white" : "bg-indigo-500 text-white"
    };

    setActivities([newActivity, ...activities]);
    setIsCreateModalOpen(false);

    // Clear Fields
    setNewOrigin("");
    setNewDestination("");
    setNewDriver("");
  };

  // Dynamic Metrics counts based on state
  const totalShipmentsCount = shipments.length * 30; // scaled up to match design mock values
  const deliveredCount = shipments.filter(s => s.status === "DELIVERED").length * 24;
  const transitCount = shipments.filter(s => s.status === "IN TRANSIT").length * 10;
  const delayedCount = shipments.filter(s => s.status === "DELAYED").length * 10;

  // Filtered shipments list (searches route/driver/id)
  const filteredShipments = shipments.filter(item => 
    item.route.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeChart = CHART_DATA[timeRange];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      
      {/* 1. Left Sidebar - Desktop (Sticky) */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-100 p-6 shrink-0 justify-between h-screen sticky top-0">
        <div>
          {/* Logo Branding */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold text-slate-800 tracking-tight block leading-none">LogiTrack</span>
              <span className="text-[9px] font-semibold text-slate-400 tracking-wide">Logistics & Shipment Management</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {SIDEBAR_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  item.active 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/15" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <item.icon className={`w-4.5 h-4.5 ${item.active ? "text-white" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom Workspace Selector & Help */}
        <div className="space-y-4 pt-6 border-t border-slate-100">
          
          {/* Active Org Selector */}
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100/70 transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-800 leading-none">SpeedX Logistics</p>
                <p className="text-[9px] font-medium text-slate-400 mt-0.5">Org Admin</p>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* Support Ticket Helper */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 border border-slate-100">
            <HelpCircle className="w-4.5 h-4.5 text-slate-400 shrink-0" />
            <div>
              <p className="text-[10px] font-bold text-slate-700">Need Help?</p>
              <p className="text-[9px] text-slate-400 font-semibold cursor-pointer hover:underline">Contact support</p>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. Mobile Sidebar Slide-in Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black"
            />
            {/* Mobile Drawer panel */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-64 bg-white p-6 flex flex-col justify-between"
            >
              <div>
                {/* Logo */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <Truck className="w-6 h-6 text-indigo-600" />
                    <span className="text-base font-bold text-slate-800">LogiTrack</span>
                  </div>
                  <button 
                    onClick={() => setSidebarOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="space-y-1.5">
                  {SIDEBAR_ITEMS.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                        item.active 
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/15" 
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <item.icon className="w-4.5 h-4.5" />
                      <span>{item.label}</span>
                    </a>
                  ))}
                </nav>
              </div>

              {/* Bottom workspace / helper */}
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2.5 p-3 bg-slate-50 rounded-xl">
                  <Building2 className="w-5 h-5 text-indigo-600" />
                  <div>
                    <p className="text-xs font-bold text-slate-800">SpeedX Logistics</p>
                    <p className="text-[10px] text-slate-400">Org Admin</p>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 3. Main Dashboard Workspace Layout */}
      <div className="flex-1 flex flex-col overflow-x-hidden">
        
        {/* Top Navbar Header */}
        <header className="bg-white border-b border-slate-100 px-6 md:px-10 h-20 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            {/* Hamburger button for mobile */}
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Welcome title */}
            <div>
              <h1 className="text-lg md:text-xl font-extrabold text-slate-900 flex items-center gap-1.5">
                Welcome back, Arjun! 👋
              </h1>
              <p className="text-xs text-slate-400 font-medium">Here&apos;s what&apos;s happening with your logistics operations.</p>
            </div>
          </div>

          {/* Action widgets & profiles */}
          <div className="flex items-center gap-4">
            
            {/* Date range picker selector */}
            <div className="hidden md:flex items-center gap-2 px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 cursor-pointer bg-white hover:bg-slate-50 transition-colors">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>10 Oct 2024 - 16 Oct 2024</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            {/* Notification bell */}
            <div 
              onClick={() => setNotifications(0)}
              className="relative p-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer text-slate-600"
            >
              <Bell className="w-4.5 h-4.5" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                  {notifications}
                </span>
              )}
            </div>

            {/* Profile Avatar Badge */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200 cursor-pointer">
              <div className="relative w-9 h-9 rounded-full overflow-hidden bg-indigo-50 border border-slate-200">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1ZDIks2gqEkuL7T4-5foncVRG0lqVj4_A5gN8tJcRW0-UQtb-eQCMApMvk20vhZAckRDC8Cw6ts7Xy6sOdwvQLIM-ijN9-iyLLOMRsxeVwZdTWhIbFSLEgyyOEqv5-POsVgbTtmitmNka7dKHTEfxKFxuvzryCZQjbspglzhl9IeY89KstquHXsYdAzXTrWR1Xz5yyphFvSu71nR8MLDXaMCfsjW-MskUC5yGT3gOa6IyQxeT13WSlERlT2a8RJpZLT_y8qS7jFve"
                  alt="Arjun Mathew Profile"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-800 leading-none">Arjun Mathew</p>
                <p className="text-[9px] font-semibold text-slate-400 mt-0.5">Org Admin</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </div>

          </div>
        </header>

        {/* Scrollable Workspace Panels */}
        <main className="flex-1 p-6 md:p-10 space-y-8 overflow-y-auto">
          
          {/* Row of Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            
            {/* Total Shipments */}
            <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Building2 className="w-4.5 h-4.5" />
                </div>
                <div className="flex items-center gap-0.5 text-green-500 text-[10px] font-bold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>16%</span>
                </div>
              </div>
              <p className="text-slate-400 text-[11px] font-bold">Total Shipments</p>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">{totalShipmentsCount}</h3>
              <p className="text-[9px] text-green-500 font-bold mt-1">↑ 16% this week</p>
            </div>

            {/* Delivered */}
            <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center text-green-500">
                  <Check className="w-4.5 h-4.5" />
                </div>
                <div className="flex items-center gap-0.5 text-green-500 text-[10px] font-bold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>24%</span>
                </div>
              </div>
              <p className="text-slate-400 text-[11px] font-bold">Delivered</p>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">{deliveredCount}</h3>
              <p className="text-[9px] text-green-500 font-bold mt-1">↑ 24% this week</p>
            </div>

            {/* In Transit */}
            <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center text-sky-500">
                  <Truck className="w-4.5 h-4.5" />
                </div>
                <div className="flex items-center gap-0.5 text-sky-500 text-[10px] font-bold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>8%</span>
                </div>
              </div>
              <p className="text-slate-400 text-[11px] font-bold">In Transit</p>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">{transitCount}</h3>
              <p className="text-[9px] text-sky-500 font-bold mt-1">↑ 8% this week</p>
            </div>

            {/* Delayed */}
            <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                  <Clock className="w-4.5 h-4.5" />
                </div>
                <div className="flex items-center gap-0.5 text-red-500 text-[10px] font-bold">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>15%</span>
                </div>
              </div>
              <p className="text-slate-400 text-[11px] font-bold">Delayed</p>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">{delayedCount}</h3>
              <p className="text-[9px] text-red-500 font-bold mt-1">↓ 15% this week</p>
            </div>

            {/* Total Drivers */}
            <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500">
                  <UserCheck className="w-4.5 h-4.5" />
                </div>
                <span className="text-[9px] font-semibold text-slate-400">Total</span>
              </div>
              <p className="text-slate-400 text-[11px] font-bold">Total Drivers</p>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">15</h3>
              <p className="text-[9px] text-green-500 font-bold mt-1">Active: 12</p>
            </div>

            {/* Total Vehicles */}
            <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center text-teal-500">
                  <Navigation className="w-4.5 h-4.5" />
                </div>
                <span className="text-[9px] font-semibold text-slate-400">Total</span>
              </div>
              <p className="text-slate-400 text-[11px] font-bold">Total Vehicles</p>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">10</h3>
              <p className="text-[9px] text-green-500 font-bold mt-1">Active: 8</p>
            </div>

          </div>

          {/* Grid Layout - Charts & Activities */}
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Left Box: Shipments Overview (Line Chart) */}
            <div className="lg:col-span-8 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Shipments Overview</h3>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Historical overview of shipments progress</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 cursor-pointer bg-white hover:bg-slate-50 transition-colors">
                  <span>{timeRange}</span>
                  <select 
                    value={timeRange} 
                    onChange={(e) => setTimeRange(e.target.value as any)}
                    className="absolute opacity-0 cursor-pointer"
                  >
                    <option value="This Week">This Week</option>
                    <option value="Last Week">Last Week</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>

              {/* Chart Legend */}
              <div className="flex items-center gap-6 mb-6 text-[10px] font-bold text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span>Delivered</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  <span>In Transit</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span>Delayed</span>
                </div>
              </div>

              {/* Dynamic SVG Line Chart */}
              <div className="relative w-full h-[220px] pr-2">
                <svg viewBox="0 0 600 200" className="w-full h-full overflow-visible">
                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="580" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="40" y1="60" x2="580" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="40" y1="100" x2="580" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="40" y1="140" x2="580" y2="140" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="40" y1="180" x2="580" y2="180" stroke="#e2e8f0" strokeWidth="1.5" />

                  {/* Y Axis Labels */}
                  <text x="15" y="25" fill="#94a3b8" fontSize="9" fontWeight="bold">200</text>
                  <text x="15" y="65" fill="#94a3b8" fontSize="9" fontWeight="bold">150</text>
                  <text x="15" y="105" fill="#94a3b8" fontSize="9" fontWeight="bold">100</text>
                  <text x="15" y="145" fill="#94a3b8" fontSize="9" fontWeight="bold">50</text>
                  <text x="15" y="185" fill="#94a3b8" fontSize="9" fontWeight="bold">0</text>

                  {/* X Axis Labels */}
                  {activeChart.labels.map((lbl, idx) => (
                    <text 
                      key={idx} 
                      x={40 + idx * 85} 
                      y="198" 
                      fill="#94a3b8" 
                      fontSize="9" 
                      fontWeight="bold" 
                      textAnchor="middle"
                    >
                      {lbl}
                    </text>
                  ))}

                  {/* Plot curves */}
                  {/* 1. Delivered (Green) */}
                  <motion.path
                    key={`del-${timeRange}`}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1 }}
                    d={`M 40 ${180 - activeChart.delivered[0] * 0.8} 
                        C 125 ${180 - activeChart.delivered[1] * 0.8} 210 ${180 - activeChart.delivered[2] * 0.8} 295 ${180 - activeChart.delivered[3] * 0.8} 
                        S 465 ${180 - activeChart.delivered[5] * 0.8} 550 ${180 - activeChart.delivered[6] * 0.8}`}
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* 2. In Transit (Indigo) */}
                  <motion.path
                    key={`tr-${timeRange}`}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1 }}
                    d={`M 40 ${180 - activeChart.inTransit[0] * 0.8} 
                        C 125 ${180 - activeChart.inTransit[1] * 0.8} 210 ${180 - activeChart.inTransit[2] * 0.8} 295 ${180 - activeChart.inTransit[3] * 0.8} 
                        S 465 ${180 - activeChart.inTransit[5] * 0.8} 550 ${180 - activeChart.inTransit[6] * 0.8}`}
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* 3. Delayed (Red) */}
                  <motion.path
                    key={`del-red-${timeRange}`}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1 }}
                    d={`M 40 ${180 - activeChart.delayed[0] * 0.8} 
                        C 125 ${180 - activeChart.delayed[1] * 0.8} 210 ${180 - activeChart.delayed[2] * 0.8} 295 ${180 - activeChart.delayed[3] * 0.8} 
                        S 465 ${180 - activeChart.delayed[5] * 0.8} 550 ${180 - activeChart.delayed[6] * 0.8}`}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Plot Dots and Hover circles */}
                  {activeChart.delivered.map((val, idx) => (
                    <circle 
                      key={`d-${idx}`} 
                      cx={40 + idx * 85} 
                      cy={180 - val * 0.8} 
                      r="4" 
                      fill="#22c55e" 
                      stroke="#ffffff" 
                      strokeWidth="1.5" 
                    />
                  ))}
                  {activeChart.inTransit.map((val, idx) => (
                    <circle 
                      key={`t-${idx}`} 
                      cx={40 + idx * 85} 
                      cy={180 - val * 0.8} 
                      r="4" 
                      fill="#6366f1" 
                      stroke="#ffffff" 
                      strokeWidth="1.5" 
                    />
                  ))}
                  {activeChart.delayed.map((val, idx) => (
                    <circle 
                      key={`dl-${idx}`} 
                      cx={40 + idx * 85} 
                      cy={180 - val * 0.8} 
                      r="4" 
                      fill="#ef4444" 
                      stroke="#ffffff" 
                      strokeWidth="1.5" 
                    />
                  ))}
                </svg>
              </div>
            </div>

            {/* Middle Box: Shipments by Status (Donut Chart) */}
            <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Shipments by Status</h3>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Current operational statuses distribution</p>
              </div>

              {/* Custom SVG Donut Chart */}
              <div className="relative flex justify-center items-center my-6 h-36">
                <svg className="w-36 h-36 transform -rotate-90">
                  {/* Background Circle */}
                  <circle cx="72" cy="72" r="50" fill="transparent" stroke="#f1f5f9" strokeWidth="15" />
                  
                  {/* Delivered Donut Segment (80%) */}
                  <circle 
                    cx="72" 
                    cy="72" 
                    r="50" 
                    fill="transparent" 
                    stroke="#22c55e" 
                    strokeWidth="15" 
                    strokeDasharray="314.15" 
                    strokeDashoffset={314.15 * (1 - 0.80)} 
                    strokeLinecap="round"
                  />

                  {/* In Transit Donut Segment (13%) */}
                  <circle 
                    cx="72" 
                    cy="72" 
                    r="50" 
                    fill="transparent" 
                    stroke="#6366f1" 
                    strokeWidth="15" 
                    strokeDasharray="314.15" 
                    strokeDashoffset={314.15 * (1 - 0.13)} 
                    className="transform rotate-[288deg] origin-[72px_72px]"
                  />

                  {/* Delayed Donut Segment (7%) */}
                  <circle 
                    cx="72" 
                    cy="72" 
                    r="50" 
                    fill="transparent" 
                    stroke="#f97316" 
                    strokeWidth="15" 
                    strokeDasharray="314.15" 
                    strokeDashoffset={314.15 * (1 - 0.07)} 
                    className="transform rotate-[335deg] origin-[72px_72px]"
                  />
                </svg>
                {/* Total Counter inside ring */}
                <div className="absolute text-center">
                  <span className="text-[10px] font-bold text-slate-400 block leading-none">Total</span>
                  <span className="text-xl font-extrabold text-slate-800 block mt-1">150</span>
                </div>
              </div>

              {/* Status breakdown legend list */}
              <div className="space-y-2 text-xs font-semibold text-slate-500">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <span>Delivered</span>
                  </div>
                  <span className="text-slate-800">120 (80%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    <span>In Transit</span>
                  </div>
                  <span className="text-slate-800">20 (13%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    <span>Delayed</span>
                  </div>
                  <span className="text-slate-800">10 (7%)</span>
                </div>
              </div>
            </div>

          </div>

          {/* Grid Layout - Shipments Table & Quick Actions & Activities */}
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Table: Recent Shipments (Left) */}
            <div className="lg:col-span-8 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Recent Shipments</h3>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Latest deliveries and status details</p>
                  </div>
                  <a href="#shipments" className="text-xs font-bold text-indigo-600 hover:underline">View All</a>
                </div>

                {/* Search query field inside table header */}
                <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2 mb-4 bg-slate-50 focus-within:bg-white focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100 transition-all max-w-sm">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search shipments, routes, or drivers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-xs text-slate-800 focus:outline-none font-medium"
                  />
                </div>

                {/* Table structure */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <th className="pb-3 pr-4">Shipment ID</th>
                        <th className="pb-3 pr-4">Route</th>
                        <th className="pb-3 pr-4">Driver</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs font-semibold text-slate-700 divide-y divide-slate-50">
                      {filteredShipments.map((shipment) => (
                        <tr key={shipment.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3.5 text-indigo-600 font-bold pr-4">{shipment.id}</td>
                          <td className="py-3.5 pr-4 text-slate-800">{shipment.route}</td>
                          <td className="py-3.5 pr-4 text-slate-500">{shipment.driver}</td>
                          <td className="py-3.5">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide ${
                              shipment.status === "DELIVERED" 
                                ? "bg-green-50 text-green-600" 
                                : shipment.status === "DELAYED"
                                ? "bg-red-50 text-red-600" 
                                : "bg-sky-50 text-sky-600"
                            }`}>
                              {shipment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {filteredShipments.length === 0 && (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-slate-400 font-medium">
                            No shipments found matching &quot;{searchQuery}&quot;
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Sidebar Feed: Recent Activities (Right) */}
            <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Recent Activities</h3>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Real-time status updates feed</p>
                  </div>
                  <a href="#activities" className="text-xs font-bold text-indigo-600 hover:underline">View All</a>
                </div>

                {/* Activities list feed */}
                <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
                  {activities.map((act) => (
                    <div key={act.id} className="flex gap-3.5 items-start">
                      <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${act.color}`}>
                        <act.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-slate-800 leading-tight">{act.title}</p>
                        <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{act.desc}</p>
                      </div>
                      <span className="text-[9px] font-semibold text-slate-400 shrink-0">{act.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Grid Layout - Drivers Donut & Quick Actions */}
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Drivers Status Chart (Left) */}
            <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Drivers Status</h3>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Active drivers status distribution</p>
                  </div>
                  <a href="#drivers" className="text-xs font-bold text-indigo-600 hover:underline">View All</a>
                </div>
              </div>

              {/* SVG Donut Circle */}
              <div className="relative flex justify-center items-center my-6 h-36">
                <svg className="w-36 h-36 transform -rotate-90">
                  <circle cx="72" cy="72" r="50" fill="transparent" stroke="#f1f5f9" strokeWidth="15" />
                  
                  {/* Active (80%) */}
                  <circle 
                    cx="72" 
                    cy="72" 
                    r="50" 
                    fill="transparent" 
                    stroke="#22c55e" 
                    strokeWidth="15" 
                    strokeDasharray="314.15" 
                    strokeDashoffset={314.15 * (1 - 0.80)} 
                    strokeLinecap="round"
                  />

                  {/* Offline (20%) */}
                  <circle 
                    cx="72" 
                    cy="72" 
                    r="50" 
                    fill="transparent" 
                    stroke="#f97316" 
                    strokeWidth="15" 
                    strokeDasharray="314.15" 
                    strokeDashoffset={314.15 * (1 - 0.20)} 
                    className="transform rotate-[288deg] origin-[72px_72px]"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-[10px] font-bold text-slate-400 block leading-none">Total Drivers</span>
                  <span className="text-xl font-extrabold text-slate-800 block mt-1">15</span>
                </div>
              </div>

              <div className="space-y-2 text-xs font-semibold text-slate-500">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <span>Active</span>
                  </div>
                  <span className="text-slate-800 font-bold">12 (80%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    <span>Offline</span>
                  </div>
                  <span className="text-slate-800 font-bold">3 (20%)</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Grid (Right) */}
            <div className="lg:col-span-8 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  
                  {/* Create Shipment */}
                  <button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="p-5 border border-slate-150 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-600/5 active:scale-98 transition-all group bg-white cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 group-hover:bg-indigo-600 flex items-center justify-center text-indigo-600 group-hover:text-white transition-colors">
                      <Plus className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">Create Shipment</span>
                  </button>

                  {/* Add Driver */}
                  <button 
                    onClick={() => alert("Add Driver portal mock.")}
                    className="p-5 border border-slate-150 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-600/5 active:scale-98 transition-all group bg-white cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 group-hover:bg-indigo-600 flex items-center justify-center text-indigo-600 group-hover:text-white transition-colors">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">Add Driver</span>
                  </button>

                  {/* Add Vehicle */}
                  <button 
                    onClick={() => alert("Add Vehicle portal mock.")}
                    className="p-5 border border-slate-150 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-600/5 active:scale-98 transition-all group bg-white cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 group-hover:bg-indigo-600 flex items-center justify-center text-indigo-600 group-hover:text-white transition-colors">
                      <Navigation className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">Add Vehicle</span>
                  </button>

                  {/* Create Manager */}
                  <button 
                    onClick={() => alert("Create Manager portal mock.")}
                    className="p-5 border border-slate-150 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-600/5 active:scale-98 transition-all group bg-white cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 group-hover:bg-indigo-600 flex items-center justify-center text-indigo-600 group-hover:text-white transition-colors">
                      <User className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">Create Manager</span>
                  </button>

                  {/* View Reports */}
                  <button 
                    onClick={() => alert("View Reports portal mock.")}
                    className="p-5 border border-slate-150 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-600/5 active:scale-98 transition-all group bg-white cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 group-hover:bg-indigo-600 flex items-center justify-center text-indigo-600 group-hover:text-white transition-colors">
                      <BarChart3 className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">View Reports</span>
                  </button>

                  {/* Timeline */}
                  <button 
                    onClick={() => alert("View Timeline Portal mock.")}
                    className="p-5 border border-slate-150 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-600/5 active:scale-98 transition-all group bg-white cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 group-hover:bg-indigo-600 flex items-center justify-center text-indigo-600 group-hover:text-white transition-colors">
                      <Clock className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">Timeline</span>
                  </button>

                </div>
              </div>
            </div>

          </div>

          {/* Bottom Row: Shipments On Map Panel */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Shipments On Map</h3>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Real-time coordinates and GPS tracking paths</p>
              </div>
              <a href="#map" className="text-xs font-bold text-indigo-600 hover:underline">View Full Map</a>
            </div>

            {/* Simulated Map Canvas */}
            <div className="relative w-full h-[220px] rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center bg-[#f4f7fa]">
              
              {/* Custom SVG Map Representation with routes */}
              <svg viewBox="0 0 800 200" className="absolute inset-0 w-full h-full">
                {/* Route Path (Kochi -> Thrissur -> Calicut) */}
                <path 
                  d="M 150 150 Q 300 130 400 90 T 650 50" 
                  fill="none" 
                  stroke="#cbd5e1" 
                  strokeWidth="6" 
                  strokeLinecap="round" 
                />
                <path 
                  d="M 150 150 Q 300 130 400 90 T 650 50" 
                  fill="none" 
                  stroke="#6366f1" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeDasharray="10 5 animate-dash"
                />

                {/* Map locations pins */}
                {/* Kochi */}
                <circle cx="150" cy="150" r="10" fill="#6366f1" opacity="0.15" />
                <circle cx="150" cy="150" r="5" fill="#6366f1" />
                <text x="150" y="175" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">Kochi</text>

                {/* Thrissur */}
                <circle cx="400" cy="90" r="10" fill="#6366f1" opacity="0.15" />
                <circle cx="400" cy="90" r="5" fill="#6366f1" />
                <text x="400" y="115" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">Thrissur</text>

                {/* Calicut */}
                <circle cx="650" cy="50" r="10" fill="#ef4444" opacity="0.15" />
                <circle cx="650" cy="50" r="5" fill="#ef4444" />
                <text x="650" y="75" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">Calicut</text>
              </svg>

              {/* Moving truck animations on the routes */}
              <div 
                className="absolute w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20"
                style={{
                  top: '110px',
                  left: '260px',
                  animation: 'float 2s ease-in-out infinite'
                }}
              >
                <Truck className="w-4 h-4" />
              </div>
              <div 
                className="absolute w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shadow-md shadow-green-500/20"
                style={{
                  top: '65px',
                  left: '480px',
                  animation: 'float 2.5s ease-in-out infinite'
                }}
              >
                <Truck className="w-4 h-4" />
              </div>

            </div>
          </div>

        </main>
      </div>

      {/* 4. Create Shipment Interactive Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute inset-0 bg-black"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-lg z-10 shadow-2xl relative"
            >
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <PlusCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Create New Shipment</h3>
                  <p className="text-xs text-slate-400">Add a new operational shipment dispatch to LogiTrack</p>
                </div>
              </div>

              <form onSubmit={handleCreateShipmentSubmit} className="space-y-4">
                
                {/* Origin */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Origin Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kochi"
                    value={newOrigin}
                    onChange={(e) => setNewOrigin(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 font-medium"
                  />
                </div>

                {/* Destination */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Destination Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Calicut"
                    value={newDestination}
                    onChange={(e) => setNewDestination(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 font-medium"
                  />
                </div>

                {/* Driver */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Driver Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Arjun Mathew"
                    value={newDriver}
                    onChange={(e) => setNewDriver(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 font-medium"
                  />
                </div>

                {/* Status */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Initial Status *</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 bg-white font-medium cursor-pointer"
                  >
                    <option value="IN TRANSIT">IN TRANSIT</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="DELAYED">DELAYED</option>
                  </select>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="flex-1 border border-slate-200 hover:bg-slate-50 font-bold text-xs py-3 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 text-white hover:bg-indigo-700 font-bold text-xs py-3 rounded-xl transition-all shadow-md shadow-indigo-600/10"
                  >
                    Create Dispatch
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Keyframe animations inside inline style */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
      `}</style>

    </div>
  );
}
