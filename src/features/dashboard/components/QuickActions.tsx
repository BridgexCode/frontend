"use client";

import { Plus, UserCheck, Navigation, User, BarChart3, Clock } from "lucide-react";

interface QuickActionsProps {
  onCreateShipment: () => void;
  onCreateManager: () => void;
}

type QuickAction = { label: string; icon: typeof Plus; target: string };

const actions: QuickAction[] = [
  { label: "Create Shipment", icon: Plus, target: "createShipment" },
  { label: "Drivers", icon: UserCheck, target: "drivers" },
  { label: "Vehicles", icon: Navigation, target: "vehicles" },
  { label: "Create Manager", icon: User, target: "createManager" },
  { label: "Reports", icon: BarChart3, target: "reports" },
  { label: "Timeline", icon: Clock, target: "timeline" },
];

export function QuickActions({ onCreateShipment, onCreateManager }: QuickActionsProps) {
  const navigateTo = (target: string) => {
    if (target === "createShipment") {
      onCreateShipment();
    } else if (target === "createManager") {
      onCreateManager();
    } else {
      window.location.replace(`#${target}`);
    }
  };

  return (
    <div className="lg:col-span-8 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-bold text-slate-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigateTo(action.target)}
              className="p-5 border border-slate-150 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-emerald-600 hover:shadow-lg hover:shadow-emerald-600/5 active:scale-98 transition-all group bg-white cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 group-hover:bg-emerald-600 flex items-center justify-center text-emerald-600 group-hover:text-white transition-colors">
                <action.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
