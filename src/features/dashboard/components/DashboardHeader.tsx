"use client";

import Image from "next/image";
import { Menu, Calendar, ChevronDown, Bell } from "lucide-react";

interface DashboardHeaderProps {
  onMenuClick: () => void;
  notifications: number;
  onNotificationsClick: () => void;
}

export function DashboardHeader({
  onMenuClick,
  notifications,
  onNotificationsClick,
}: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-100 px-6 md:px-10 h-20 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-lg md:text-xl font-extrabold text-slate-900 flex items-center gap-1.5">
            Welcome back, Alex!
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Here&apos;s what&apos;s happening with your logistics operations.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 cursor-pointer bg-white hover:bg-slate-50 transition-colors">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>10 Oct 2024 - 16 Oct 2024</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>

        <div
          onClick={onNotificationsClick}
          className="relative p-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer text-slate-600"
        >
          <Bell className="w-4.5 h-4.5" />
          {notifications > 0 && (
            <span className="absolute top-1 right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
              {notifications}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200 cursor-pointer">
          <div className="relative w-9 h-9 rounded-full overflow-hidden bg-emerald-50 border border-slate-200">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1ZDIks2gqEkuL7T4-5foncVRG0lqVj4_A5gN8tJcRW0-UQtb-eQCMApMvk20vhZAckRDC8Cw6ts7Xy6sOdwvQLIM-ijN9-iyLLOMRsxeVwZdTWhIbFSLEgyyOEqv5-POsVgbTtmitmNka7dKHTEfxKFxuvzryCZQjbspglzhl9IeY89KstquHXsYdAzXTrWR1Xz5yyphFvSu71nR8MLDXaMCfsjW-MskUC5yGT3gOa6IyQxeT13WSlERlT2a8RJpZLT_y8qS7jFve"
              alt="Alex Johnson Profile"
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-800 leading-none">Alex Johnson</p>
            <p className="text-[9px] font-semibold text-slate-400 mt-0.5">Org Admin</p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}
