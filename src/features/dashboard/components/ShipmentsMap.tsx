"use client";

import { useEffect, useState } from "react";
import { Truck } from "lucide-react";
import { fetchShipmentsApi } from "@/features/dashboard/services/shipments-api";
import type { ApiShipment } from "@/features/dashboard/services/shipments-api";
import { Loader2 } from "lucide-react";

const STATUS_FLOW = ["created", "assigned", "picked_up", "in_transit", "delivered"];

const STATUS_META: Record<string, { label: string; color: string }> = {
  created:    { label: "Created",    color: "#f59e0b" },
  assigned:   { label: "Dispatched", color: "#3b82f6" },
  picked_up:  { label: "Picked Up",  color: "#8b5cf6" },
  in_transit: { label: "In Transit", color: "#10b981" },
  delivered:  { label: "Delivered",  color: "#22c55e" },
  cancelled:  { label: "Cancelled",  color: "#ef4444" },
  delayed:    { label: "Delayed",    color: "#ef4444" },
};

export function ShipmentsMap() {
  const [shipment, setShipment] = useState<ApiShipment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchShipmentsApi({ limit: 1 }).then((res) => {
      const list = Array.isArray(res) ? res : (res.data || []);
      if (mounted && list.length > 0) setShipment(list[0]);
    }).catch(() => {}).finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex items-center justify-center h-[260px]"><Loader2 className="w-6 h-6 animate-spin text-emerald-600" /></div>;
  if (!shipment) return <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex items-center justify-center h-[260px]"><p className="text-xs text-slate-400">No shipments found</p></div>;

  const currentStatus = shipment.statusLifecycle;
  const currentMeta = STATUS_META[currentStatus] || STATUS_META.created;
  const from = shipment.pickupLocation.split(",")[0].trim();
  const to = shipment.destination.split(",")[0].trim();
  const currentIdx = STATUS_FLOW.indexOf(currentStatus);
  const totalSteps = STATUS_FLOW.length - 1;

  const svgW = 800;
  const svgH = 200;
  const xStart = 80;
  const xEnd = 720;
  const yLevel = 110;
  const stepX = (xEnd - xStart) / totalSteps;
  const dotRadius = 8;
  const labelY = yLevel + 28;
  const truckY = yLevel - 26;

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Latest Shipment Route</h3>
          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
            {shipment.shipmentId} — {from} → {to}
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ backgroundColor: `${currentMeta.color}18`, color: currentMeta.color }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentMeta.color }} />
          {currentMeta.label}
        </span>
      </div>

      <div className="relative w-full h-[240px] rounded-2xl overflow-hidden border border-slate-100 bg-[#f4f7fa]">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="absolute inset-0 w-full h-full">
          {STATUS_FLOW.map((_, i) => {
            if (i === 0) return null;
            const x1 = xStart + (i - 1) * stepX;
            const x2 = xStart + i * stepX;
            const done = i <= currentIdx;
            return (
              <line key={i} x1={x1} y1={yLevel} x2={x2} y2={yLevel}
                stroke={done ? currentMeta.color : "#cbd5e1"}
                strokeWidth={done ? 5 : 3}
                strokeLinecap="round"
              />
            );
          })}

          {STATUS_FLOW.map((s, i) => {
            const x = xStart + i * stepX;
            const meta = STATUS_META[s];
            const done = i <= currentIdx;
            return (
              <g key={s}>
                <circle cx={x} cy={yLevel} r={dotRadius}
                  fill={done ? meta.color : "#e2e8f0"}
                  stroke="#ffffff"
                  strokeWidth="2.5"
                />
                <text x={x} y={labelY} fill={done ? "#1e293b" : "#94a3b8"}
                  fontSize="9" fontWeight="bold" textAnchor="middle">
                  {meta.label}
                </text>
              </g>
            );
          })}

          <text x={xStart} y={yLevel + 50} fill="#1e293b" fontSize="10" fontWeight="bold" textAnchor="middle">{from}</text>
          <text x={xEnd} y={yLevel + 50} fill="#1e293b" fontSize="10" fontWeight="bold" textAnchor="middle">{to}</text>
        </svg>

        <div
          className="absolute w-9 h-9 rounded-full flex items-center justify-center text-white shadow-md shadow-black/15"
          style={{
            backgroundColor: currentMeta.color,
            top: `calc(50% - 70px)`,
            left: `${currentIdx >= 0 ? (xStart + currentIdx * stepX) / svgW * 100 : 10}%`,
            transform: "translateX(-50%)",
            transition: "left 0.6s ease-in-out",
          }}
        >
          <Truck className="w-4.5 h-4.5" />
        </div>
      </div>
    </div>
  );
}
