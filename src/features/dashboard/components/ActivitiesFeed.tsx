"use client";

import type { ActivityItem } from "../services/mock-data";

interface ActivitiesFeedProps {
  activities: ActivityItem[];
}

export function ActivitiesFeed({ activities }: ActivitiesFeedProps) {
  return (
    <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Recent Activities</h3>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
              Real-time status updates feed
            </p>
          </div>
          <a href="#activities" className="text-xs font-bold text-emerald-600 hover:underline">
            View All
          </a>
        </div>

        <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
          {activities.map((act) => (
            <div key={act.id} className="flex gap-3.5 items-start">
              <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${act.color}`}>
                <act.icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-800 leading-tight">{act.title}</p>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{act.desc}</p>
              </div>
              <span className="text-[9px] font-semibold text-slate-400 shrink-0">{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
