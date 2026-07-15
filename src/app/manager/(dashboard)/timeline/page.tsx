"use client";

import { useState, useMemo, useEffect } from "react";
import { TimelineFilter } from "@/features/manager/components/TimelineFilter";
import { TimelineList } from "@/features/manager/components/TimelineList";
import { fetchTimelineApi } from "@/features/manager/services/timeline-api";

interface UIEvent {
  id: string;
  type: "status" | "assignment" | "delivery" | "creation" | "failed";
  title: string;
  description: string;
  shipmentId: string;
  timestamp: string;
  user: string;
}

export default function TimelinePage() {
  const [events, setEvents] = useState<UIEvent[]>([]);
  const [shipmentFilter, setShipmentFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchTimelineApi().then((data) => {
      if (!mounted) return;
      setEvents(data.map((e: any) => ({
        id: e.id,
        type: e.type === "failed" ? "failed" : e.type as UIEvent["type"],
        title: e.title,
        description: e.description,
        shipmentId: e.shipmentId,
        timestamp: e.timestamp,
        user: e.user,
      })));
    }).catch(() => {}).finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    if (shipmentFilter === "ALL") return events;
    return events.filter((e) => e.shipmentId === shipmentFilter);
  }, [events, shipmentFilter]);

  const shipmentIds = useMemo(() => {
    const ids = new Set(events.map((e) => e.shipmentId));
    return ["ALL", ...Array.from(ids)];
  }, [events]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Timeline</h1>
        <p className="text-sm text-slate-400 mt-0.5">Activity and event history for all shipments</p>
      </div>
      <TimelineFilter shipmentFilter={shipmentFilter} onShipmentFilterChange={setShipmentFilter} shipmentIds={shipmentIds} />
      <TimelineList events={filtered} loading={loading} />
    </div>
  );
}
