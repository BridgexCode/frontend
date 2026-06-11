"use client";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ rows = 5, columns = 6 }: TableSkeletonProps) {
  return (
    <div className="animate-pulse">
      {/* Header */}
      <div className="flex gap-4 mb-3 px-4">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="h-4 bg-slate-200 rounded flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4 py-3 px-4 border-t border-slate-100">
          {Array.from({ length: columns }).map((_, c) => (
            <div key={c} className={`h-4 bg-slate-100 rounded flex-1 ${c === 0 ? "w-1/4" : ""}`} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="animate-pulse bg-white border border-slate-100 rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-3 w-24 bg-slate-200 rounded" />
          <div className="h-6 w-16 bg-slate-200 rounded" />
        </div>
        <div className="w-11 h-11 rounded-xl bg-slate-100" />
      </div>
    </div>
  );
}
