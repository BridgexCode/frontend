"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth";
import { SuperAdminSidebar } from "@/features/super-admin/components/SuperAdminSidebar";
import { Network } from "lucide-react";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || user?.role !== "SUPER_ADMIN") {
        router.push("/admin/login");
      }
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center animate-bounce">
          <Network className="w-6 h-6 text-white" />
        </div>
        <p className="text-sm font-semibold text-slate-500 animate-pulse">Verifying access...</p>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "SUPER_ADMIN") {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <SuperAdminSidebar />
      <div className="lg:ml-64 min-h-screen">
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
