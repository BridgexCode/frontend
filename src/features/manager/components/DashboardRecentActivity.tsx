"use client";

const activities = [
  { title: "Shipment NAX-2026-007 Created", time: "2 hours ago", type: "creation" as const },
  { title: "Worker Ravi Kumar assigned to NAX-2026-007", time: "1 hour ago", type: "assignment" as const },
  { title: "Shipment NAX-2026-005 marked as Failed", time: "3 hours ago", type: "failed" as const },
  { title: "New worker Ananya Reddy joined", time: "1 day ago", type: "worker" as const },
];

const typeColors: Record<string, string> = {
  creation: "bg-blue-500",
  assignment: "bg-emerald-500",
  failed: "bg-red-500",
  worker: "bg-amber-500",
};

export function DashboardRecentActivity() {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6">
      <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity, i) => (
          <div key={i} className="flex items-start gap-3 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
            <div className={`w-2 h-2 rounded-full mt-1.5 ${typeColors[activity.type] || "bg-slate-500"}`} />
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-800">{activity.title}</p>
              <p className="text-xs text-slate-400 mt-0.5">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
