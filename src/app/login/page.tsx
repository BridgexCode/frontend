"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoginForm, UserRole, useAuthStore } from "@/features/auth";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
    const user = useAuthStore.getState().user;
    if (user?.role === UserRole.SUPER_ADMIN) {
      useAuthStore.getState().logout();
      toast.error("Access denied. Use the Super Admin login page.");
      return;
    }
    if (user?.role === UserRole.OPERATIONS_MANAGER) {
      router.push("/manager/dashboard");
      return;
    }
    if (user?.role !== UserRole.ORGANIZATION_OWNER) {
      useAuthStore.getState().logout();
      toast.error("Access denied for this account.");
      return;
    }
    router.push("/dashboard");
  };

  return <LoginForm onLogin={handleLogin} />;
}
