"use client";

import { PackageOpen } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({
  title = "No data available",
  message = "There are no items to display at the moment.",
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center mb-4">
        <PackageOpen className="w-10 h-10 text-slate-300" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-400 text-center max-w-xs mb-4">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-5 py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-200"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
