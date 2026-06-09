"use client";

import {
  Building2,
  Check,
  Truck,
  Clock,
  TrendingUp,
  TrendingDown,
  UserCheck,
  Navigation,
} from "lucide-react";

interface MetricsCardsProps {
  totalShipments: number;
  delivered: number;
  inTransit: number;
  delayed: number;
}

export function MetricsCards({
  totalShipments,
  delivered,
  inTransit,
  delayed,
}: MetricsCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <MetricCard
        icon={<Building2 className="w-4.5 h-4.5" />}
        iconBg="bg-emerald-50"
        iconColor="text-emerald-600"
        label="Total Shipments"
        value={totalShipments}
        trend={{ direction: "up", value: "16%", color: "text-green-500" }}
      />
      <MetricCard
        icon={<Check className="w-4.5 h-4.5" />}
        iconBg="bg-green-50"
        iconColor="text-green-500"
        label="Delivered"
        value={delivered}
        trend={{ direction: "up", value: "24%", color: "text-green-500" }}
      />
      <MetricCard
        icon={<Truck className="w-4.5 h-4.5" />}
        iconBg="bg-sky-50"
        iconColor="text-sky-500"
        label="In Transit"
        value={inTransit}
        trend={{ direction: "up", value: "8%", color: "text-sky-500" }}
      />
      <MetricCard
        icon={<Clock className="w-4.5 h-4.5" />}
        iconBg="bg-amber-50"
        iconColor="text-amber-500"
        label="Delayed"
        value={delayed}
        trend={{ direction: "down", value: "15%", color: "text-red-500" }}
      />
      <MetricCard
        icon={<UserCheck className="w-4.5 h-4.5" />}
        iconBg="bg-purple-50"
        iconColor="text-purple-500"
        label="Total Drivers"
        value={15}
        badge="Active: 12"
      />
      <MetricCard
        icon={<Navigation className="w-4.5 h-4.5" />}
        iconBg="bg-teal-50"
        iconColor="text-teal-500"
        label="Total Vehicles"
        value={10}
        badge="Active: 8"
      />
    </div>
  );
}

interface Trend {
  direction: "up" | "down";
  value: string;
  color: string;
}

interface MetricCardProps {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string | number;
  trend?: Trend;
  badge?: string;
}

function MetricCard({ icon, iconBg, iconColor, label, value, trend, badge }: MetricCardProps) {
  return (
    <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center ${iconColor}`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-0.5 text-[10px] font-bold ${trend.color}`}>
            {trend.direction === "up" ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            <span>{trend.value}</span>
          </div>
        )}
        {badge && (
          <span className="text-[9px] font-semibold text-slate-400">{badge}</span>
        )}
      </div>
      <p className="text-slate-400 text-[11px] font-bold">{label}</p>
      <h3 className="text-xl font-extrabold text-slate-900 mt-1">{value}</h3>
      {trend && (
        <p className={`text-[9px] font-bold mt-1 ${trend.color}`}>
          {trend.direction === "up" ? "↑" : "↓"} {trend.value} this week
        </p>
      )}
    </div>
  );
}
