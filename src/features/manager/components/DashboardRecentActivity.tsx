"use client";

interface Activity {
  title: string;
  time: string;
  type: string;
}

interface DashboardRecentActivityProps {
  activities: Activity[];
}

const typeColors: Record<string, string> = {
  creation: "bg-blue-500",
  assignment: "bg-emerald-500",
  delivery: "bg-emerald-500",
  failed: "bg-red-500",
  status: "bg-indigo-500",
  worker: "bg-amber-500",
};

export function DashboardRecentActivity({ activities }: DashboardRecentActivityProps) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6">
      <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.length === 0 && (
          <p className="text-sm text-slate-400">No recent activity</p>
        )}
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
