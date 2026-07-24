"use client";

import { create } from "zustand";
import { Check, Clock, AlertTriangle, Package, UserCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { DashboardStats } from "@/features/dashboard/services/dashboard-api";
import { fetchDashboardStatsApi } from "@/features/dashboard/services/dashboard-api";
import type { ApiTimelineEvent } from "@/features/dashboard/services/shipments-api";
import { fetchTimelineApi } from "@/features/dashboard/services/shipments-api";
import type { ApiShipment } from "@/features/dashboard/services/shipments-api";
import { fetchShipmentsApi } from "@/features/dashboard/services/shipments-api";
import {
  CHART_DATA,
  type TimeRange,
  type ChartData,
} from "@/features/dashboard/services/mock-data";

export interface ActivityItem {
  id: number;
  type: string;
  title: string;
  desc: string;
  time: string;
  icon: LucideIcon;
  color: string;
}

const EVENT_ICONS: Record<string, LucideIcon> = {
  creation: Package,
  assignment: UserCheck,
  status: Clock,
  delivery: Check,
  failed: AlertTriangle,
};

const EVENT_COLORS: Record<string, string> = {
  creation: "bg-blue-500 text-white",
  assignment: "bg-amber-500 text-white",
  status: "bg-emerald-500 text-white",
  delivery: "bg-green-500 text-white",
  failed: "bg-red-500 text-white",
};

function mapTimelineToActivity(
  event: ApiTimelineEvent,
  index: number,
): ActivityItem {
  return {
    id: index + 1,
    type: event.type,
    title: event.title,
    desc: event.description,
    time: event.timestamp,
    icon: EVENT_ICONS[event.type] || Clock,
    color: EVENT_COLORS[event.type] || "bg-slate-500 text-white",
  };
}

interface DashboardState {
  sidebarOpen: boolean;
  timeRange: TimeRange;
  searchQuery: string;
  notifications: number;
  isCreateModalOpen: boolean;
  stats: DashboardStats | null;
  statsLoading: boolean;
  recentShipments: ApiShipment[];
  shipmentsLoading: boolean;
  activities: ActivityItem[];
  timelineLoading: boolean;

  setSidebarOpen: (open: boolean) => void;
  setTimeRange: (range: TimeRange) => void;
  setSearchQuery: (query: string) => void;
  setNotifications: (count: number) => void;
  setIsCreateModalOpen: (open: boolean) => void;

  fetchStats: () => Promise<void>;
  fetchRecentShipments: () => Promise<void>;
  fetchTimeline: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  sidebarOpen: false,
  timeRange: "This Week",
  searchQuery: "",
  notifications: 8,
  isCreateModalOpen: false,
  stats: null,
  statsLoading: false,
  recentShipments: [],
  shipmentsLoading: false,
  activities: [],
  timelineLoading: false,

  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setTimeRange: (range) => set({ timeRange: range }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setNotifications: (count) => set({ notifications: count }),
  setIsCreateModalOpen: (open) => set({ isCreateModalOpen: open }),

  fetchStats: async () => {
    set({ statsLoading: true });
    try {
      const stats = await fetchDashboardStatsApi();
      set({ stats, statsLoading: false });
    } catch (err) {
      console.error("fetchStats error:", err);
      set({ statsLoading: false });
    }
  },

  fetchRecentShipments: async () => {
    set({ shipmentsLoading: true });
    try {
      const result = await fetchShipmentsApi({ page: 1, limit: 10 });
      const list = Array.isArray(result) ? result : (result.data || []);
      set({ recentShipments: list, shipmentsLoading: false });
    } catch (err) {
      console.error("fetchRecentShipments error:", err);
      set({ shipmentsLoading: false });
    }
  },

  fetchTimeline: async () => {
    set({ timelineLoading: true });
    try {
      const events = await fetchTimelineApi();
      const activities = events.map(mapTimelineToActivity);
      set({ activities, timelineLoading: false });
    } catch (err) {
      console.error("fetchTimeline error:", err);
      set({ timelineLoading: false });
    }
  },
}));

export function getActiveChartData(timeRange: TimeRange): ChartData {
  return CHART_DATA[timeRange] || CHART_DATA["This Week"];
}
