"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/auth-store";
import { getStoredToken } from "@/shared/lib/axios";

export function AuthGuard({ children, loginPath = "/login" }: { children: React.ReactNode; loginPath?: string }) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(loginPath);
    }
  }, [isLoading, isAuthenticated, router, loginPath]);

  useEffect(() => {
    if (!getStoredToken()) {
      router.replace(loginPath);
    }
  }, [router, loginPath]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
