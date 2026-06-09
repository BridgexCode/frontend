"use client";

import { useRouter } from "next/navigation";
import { LoginForm, useAuth } from "@/features/auth";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
    router.push("/dashboard");
  };

  return <LoginForm onLogin={handleLogin} />;
}
