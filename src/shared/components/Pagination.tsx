"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit?: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  limit = 3,
  onPageChange,
}: PaginationProps) {
  const startItem = totalItems > 0 ? Math.min((currentPage - 1) * limit + 1, totalItems) : 0;
  const endItem = Math.min(currentPage * limit, totalItems);

  // Generate page numbers
  const pages: number[] = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
      <div className="text-xs text-slate-500 font-medium">
        {totalItems > 0 ? (
          <>
            Showing <span className="font-semibold text-slate-700">{startItem}</span> to{" "}
            <span className="font-semibold text-slate-700">{endItem}</span> of{" "}
            <span className="font-semibold text-slate-700">{totalItems}</span> results
          </>
        ) : (
          "No results"
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Previous</span>
        </button>

        <div className="flex items-center gap-1">
          {startPage > 1 && (
            <>
              <button
                onClick={() => onPageChange(1)}
                className={`w-7 h-7 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  currentPage === 1
                    ? "bg-emerald-600 text-white shadow-xs font-semibold"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                1
              </button>
              {startPage > 2 && <span className="text-slate-400 text-xs px-0.5">...</span>}
            </>
          )}

          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-7 h-7 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                currentPage === page
                  ? "bg-emerald-600 text-white shadow-xs font-semibold"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {page}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="text-slate-400 text-xs px-0.5">...</span>}
              <button
                onClick={() => onPageChange(totalPages)}
                className={`w-7 h-7 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  currentPage === totalPages
                    ? "bg-emerald-600 text-white shadow-xs font-semibold"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
