"use client";

import { useState, useCallback } from "react";
import {
  INITIAL_SHIPMENTS,
  INITIAL_ACTIVITIES,
  CHART_DATA,
  type ShipmentRow,
  type ActivityItem,
  type TimeRange,
} from "../services/mock-data";
import {
  Check,
  Truck,
  AlertTriangle as AlertTriangleIcon,
} from "lucide-react";

interface NewShipmentForm {
  origin: string;
  destination: string;
  driver: string;
  status: "DELIVERED" | "IN TRANSIT" | "DELAYED";
}

const SCALE_FACTOR = 30;

export function useDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timeRange, setTimeRange] = useState<TimeRange>("This Week");
  const [notifications, setNotifications] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateManagerModalOpen, setIsCreateManagerModalOpen] = useState(false);
  const [shipments, setShipments] = useState<ShipmentRow[]>(INITIAL_SHIPMENTS);
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);
  const [form, setForm] = useState<NewShipmentForm>({
    origin: "",
    destination: "",
    driver: "",
    status: "IN TRANSIT",
  });

  const totalShipmentsCount = shipments.length * SCALE_FACTOR;
  const deliveredCount = shipments.filter((s) => s.status === "DELIVERED").length * 24;
  const transitCount = shipments.filter((s) => s.status === "IN TRANSIT").length * 10;
  const delayedCount = shipments.filter((s) => s.status === "DELAYED").length * 10;

  const filteredShipments = shipments.filter(
    (item) =>
      item.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeChart = CHART_DATA[timeRange];

  const handleCreateShipmentSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!form.origin || !form.destination || !form.driver) return;

      const newId = `#100${shipments.length + 1}`;
      const newShipment: ShipmentRow = {
        id: newId,
        route: `${form.origin} → ${form.destination}`,
        driver: form.driver,
        status: form.status,
      };

      const now = new Date();
      const timeString = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const statusIcon =
        form.status === "DELIVERED"
          ? Check
          : form.status === "DELAYED"
            ? AlertTriangleIcon
            : Truck;

      const statusColor =
        form.status === "DELIVERED"
          ? "bg-green-500 text-white"
          : form.status === "DELAYED"
            ? "bg-red-500 text-white"
            : "bg-emerald-500 text-white";

      const newActivity: ActivityItem = {
        id: activities.length + 1,
        type: form.status === "DELIVERED" ? "delivered" : form.status === "DELAYED" ? "delayed" : "transit",
        title: `Shipment ${newId} ${form.status === "DELIVERED" ? "delivered" : form.status === "DELAYED" ? "delayed" : "in transit"}`,
        desc: `${form.origin} → ${form.destination}`,
        time: timeString,
        icon: statusIcon,
        color: statusColor,
      };

      setShipments([newShipment, ...shipments]);
      setActivities([newActivity, ...activities]);
      setIsCreateModalOpen(false);
      setForm({ origin: "", destination: "", driver: "", status: "IN TRANSIT" });
    },
    [form, shipments, activities]
  );

  return {
    sidebarOpen,
    setSidebarOpen,
    timeRange,
    setTimeRange,
    notifications,
    setNotifications,
    searchQuery,
    setSearchQuery,
    isCreateModalOpen,
    setIsCreateModalOpen,
    isCreateManagerModalOpen,
    setIsCreateManagerModalOpen,
    form,
    setForm,
    shipments,
    activities,
    totalShipmentsCount,
    deliveredCount,
    transitCount,
    delayedCount,
    filteredShipments,
    activeChart,
    handleCreateShipmentSubmit,
  };
}
