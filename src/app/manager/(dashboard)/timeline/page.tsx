"use client";

import { useState, useMemo } from "react";
import { MOCK_TIMELINE, type TimelineEvent } from "@/features/manager/services/mock-data";
import { TimelineFilter } from "@/features/manager/components/TimelineFilter";
import { TimelineList } from "@/features/manager/components/TimelineList";

export default function TimelinePage() {
  const [events] = useState<TimelineEvent[]>(MOCK_TIMELINE);
  const [shipmentFilter, setShipmentFilter] = useState("ALL");

  const filtered = useMemo(() => {
    if (shipmentFilter === "ALL") return events;
    return events.filter((e) => e.shipmentId === shipmentFilter);
  }, [events, shipmentFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Timeline</h1>
        <p className="text-sm text-slate-400 mt-0.5">Activity and event history for all shipments</p>
      </div>
      <TimelineFilter shipmentFilter={shipmentFilter} onShipmentFilterChange={setShipmentFilter} />
      <TimelineList events={filtered} />
    </div>
  );
}
