"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoginForm, useAuthStore } from "@/features/auth";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
    const user = useAuthStore.getState().user;
    if (user?.role === "SUPER_ADMIN") {
      useAuthStore.getState().logout();
      toast.error("Access denied. Use the Super Admin login page.");
      return;
    }
    router.push("/dashboard");
  };

  return <LoginForm onLogin={handleLogin} />;
}
