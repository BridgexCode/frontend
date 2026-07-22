"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { setStoredToken } from "@/shared/lib/axios";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { UserRole } from "@/features/auth/types";
import { getSocialSession } from "@/features/auth/services/google-auth";

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={<GoogleCallbackLoading />}>
      <GoogleCallbackContent />
    </Suspense>
  );
}

function GoogleCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const finishGoogleAuth = async () => {
      try {
        const source = searchParams.get("source");
        const result = await getSocialSession();

        setStoredToken(result.token);
        useAuthStore.setState({
          user: result.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });

        if (source === "manager" && result.user.role !== UserRole.OPERATIONS_MANAGER) {
          useAuthStore.getState().logout();
          toast.error("Access denied. Operations Manager role required.");
          router.replace("/manager/login");
          return;
        }

        if (result.user.role === UserRole.OPERATIONS_MANAGER) {
          router.replace("/manager/dashboard");
          return;
        }

        if (result.user.role !== UserRole.ORGANIZATION_OWNER) {
          useAuthStore.getState().logout();
          toast.error("Access denied for this account.");
          router.replace("/login");
          return;
        }

        router.replace("/dashboard");
      } catch (err) {
        const message = err instanceof Error ? err.message : "Google authentication failed";
        toast.error(message);
        router.replace(searchParams.get("source") === "manager" ? "/manager/login" : "/login");
      }
    };

    finishGoogleAuth();
  }, [router, searchParams]);

  return (
    <GoogleCallbackLoading />
  );
}

function GoogleCallbackLoading() {
  return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm">
          <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-emerald-600" />
          <h1 className="text-lg font-extrabold text-slate-900">Signing you in</h1>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Finishing Google authentication...
          </p>
          <Link href="/login" className="mt-6 inline-block text-xs font-bold text-emerald-600 hover:underline">
            Back to login
          </Link>
        </div>
      </div>
  );
}
