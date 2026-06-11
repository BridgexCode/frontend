"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, Calendar, ChevronDown, Bell, LogOut, User } from "lucide-react";
import { useAuth } from "@/features/auth";

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
  const { user, logout } = useAuth();
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setProfileOpen(false);
    await logout();
    router.push("/login");
  };

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
            Welcome back, {user?.name || "User"}!
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

        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 pl-2 border-l border-slate-200 cursor-pointer"
          >
            <div className="relative w-9 h-9 rounded-full overflow-hidden bg-emerald-100 border border-slate-200 flex items-center justify-center text-emerald-700 font-bold text-sm">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-slate-800 leading-none">{user?.name || "User"}</p>
              <p className="text-[9px] font-semibold text-slate-400 mt-0.5 capitalize">{user?.role?.replace("_", " ")?.toLowerCase() || "User"}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </div>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-2">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-sm font-bold text-slate-800">{user?.name}</p>
                <p className="text-xs text-slate-400">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
