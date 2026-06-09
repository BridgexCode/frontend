"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { ChartData, TimeRange } from "../services/mock-data";

interface ShipmentsOverviewChartProps {
  data: ChartData;
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
}

export function ShipmentsOverviewChart({
  data,
  timeRange,
  onTimeRangeChange,
}: ShipmentsOverviewChartProps) {
  return (
    <div className="lg:col-span-8 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Shipments Overview</h3>
          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
            Historical overview of shipments progress
          </p>
        </div>
        <div className="relative flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 cursor-pointer bg-white hover:bg-slate-50 transition-colors">
          <span>{timeRange}</span>
          <select
            value={timeRange}
            onChange={(e) => onTimeRangeChange(e.target.value as TimeRange)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          >
            <option value="This Week">This Week</option>
            <option value="Last Week">Last Week</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      <div className="flex items-center gap-6 mb-6 text-[10px] font-bold text-slate-400">
        <Legend color="bg-green-500" label="Delivered" />
        <Legend color="bg-emerald-500" label="In Transit" />
        <Legend color="bg-red-500" label="Delayed" />
      </div>

      <div className="relative w-full h-[220px] pr-2">
        <svg viewBox="0 0 600 200" className="w-full h-full overflow-visible">
          {[20, 60, 100, 140, 180].map((y) => (
            <line key={y} x1="40" y1={y} x2="580" y2={y} stroke={y === 180 ? "#e2e8f0" : "#f1f5f9"} strokeWidth={y === 180 ? 1.5 : 1} />
          ))}
          <text x="15" y="25" fill="#94a3b8" fontSize="9" fontWeight="bold">200</text>
          <text x="15" y="65" fill="#94a3b8" fontSize="9" fontWeight="bold">150</text>
          <text x="15" y="105" fill="#94a3b8" fontSize="9" fontWeight="bold">100</text>
          <text x="15" y="145" fill="#94a3b8" fontSize="9" fontWeight="bold">50</text>
          <text x="15" y="185" fill="#94a3b8" fontSize="9" fontWeight="bold">0</text>
          {data.labels.map((lbl, i) => (
            <text key={i} x={40 + i * 77} y="198" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="middle">
              {lbl}
            </text>
          ))}

          <ChartLine
            data={data.delivered}
            color="#22c55e"
            timeRange={timeRange}
            prefix="del"
          />
          <ChartLine
            data={data.inTransit}
            color="#10b981"
            timeRange={timeRange}
            prefix="tr"
          />
          <ChartLine
            data={data.delayed}
            color="#ef4444"
            timeRange={timeRange}
            prefix="del-red"
          />

          {data.delivered.map((val, i) => (
            <circle key={`d-${i}`} cx={40 + i * 77} cy={180 - val * 0.8} r="4" fill="#22c55e" stroke="#ffffff" strokeWidth="1.5" />
          ))}
          {data.inTransit.map((val, i) => (
            <circle key={`t-${i}`} cx={40 + i * 77} cy={180 - val * 0.8} r="4" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
          ))}
          {data.delayed.map((val, i) => (
            <circle key={`dl-${i}`} cx={40 + i * 77} cy={180 - val * 0.8} r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
          ))}
        </svg>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
      <span>{label}</span>
    </div>
  );
}

function ChartLine({
  data,
  color,
  timeRange,
  prefix,
}: {
  data: number[];
  color: string;
  timeRange: string;
  prefix: string;
}) {
  const points = data.map((val, i) => ({
    x: 40 + i * 77,
    y: 180 - val * 0.8,
  }));

  if (points.length < 2) return null;

  const mid = Math.floor(points.length / 2);
  const d = `M ${points[0].x} ${points[0].y} C ${points[mid].x} ${points[0].y} ${points[mid].x} ${points[points.length - 1].y} ${points[points.length - 1].x} ${points[points.length - 1].y}`;

  return (
    <motion.path
      key={`${prefix}-${timeRange}`}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1 }}
      d={d}
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
    />
  );
}
