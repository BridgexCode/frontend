"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Network,
} from "lucide-react";
import { toast } from "sonner";
import { resetPassword } from "@/features/auth/services/auth-api";

export function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const resetError = searchParams.get("error") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const tokenError = useMemo(() => {
    if (resetError) return "This reset link is invalid or expired.";
    if (!token) return "Password reset token is missing.";
    return "";
  }, [resetError, token]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!password) {
      newErrors.password = "New password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (tokenError || !validateForm()) return;

    setIsSubmitting(true);
    try {
      await resetPassword(token, password);
      setIsSuccess(true);
      toast.success("Password reset successful");
      setTimeout(() => router.push("/login"), 1200);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Failed to reset password",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8"
      >
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-bold text-slate-800 tracking-tight block leading-none">
              Naxivo
            </span>
            <span className="text-[10px] font-semibold text-slate-400 tracking-wide">
              Account Recovery
            </span>
          </div>
        </div>

        {isSuccess ? (
          <div className="text-center py-4">
            <div className="mx-auto mb-5 w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Password updated
            </h1>
            <p className="mt-4 text-sm leading-6 text-slate-500">
              Your password has been reset. Redirecting you back to login...
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="mb-4 w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Lock className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Create new password
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Choose a strong password to secure your Naxivo account.
              </p>
            </div>

            {tokenError ? (
              <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                <p className="text-sm font-semibold text-red-600">{tokenError}</p>
                <Link
                  href="/forgot-password"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:underline"
                >
                  Request a new link
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    New Password <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`flex items-center border rounded-xl px-3.5 py-3 gap-3 transition-all ${
                      errors.password
                        ? "border-red-500 bg-red-50/10 focus-within:ring-2 focus-within:ring-red-100"
                        : "border-slate-200 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100"
                    }`}
                  >
                    <Lock className={`w-5 h-5 shrink-0 ${errors.password ? "text-red-400" : "text-slate-400"}`} />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimum 8 characters"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                        if (errors.password) setErrors((current) => ({ ...current, password: "" }));
                      }}
                      className="w-full bg-transparent text-sm text-slate-800 focus:outline-none placeholder:text-slate-400 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs font-semibold text-red-500">{errors.password}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`flex items-center border rounded-xl px-3.5 py-3 gap-3 transition-all ${
                      errors.confirmPassword
                        ? "border-red-500 bg-red-50/10 focus-within:ring-2 focus-within:ring-red-100"
                        : "border-slate-200 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100"
                    }`}
                  >
                    <Lock className={`w-5 h-5 shrink-0 ${errors.confirmPassword ? "text-red-400" : "text-slate-400"}`} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(event) => {
                        setConfirmPassword(event.target.value);
                        if (errors.confirmPassword) setErrors((current) => ({ ...current, confirmPassword: "" }));
                      }}
                      className="w-full bg-transparent text-sm text-slate-800 focus:outline-none placeholder:text-slate-400 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-xs font-semibold text-red-500">{errors.confirmPassword}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 text-white rounded-xl py-3.5 px-6 font-bold text-sm hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/10 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSubmitting ? "Updating..." : "Reset password"}
                </button>
              </form>
            )}

            <Link
              href="/login"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 text-xs font-semibold text-slate-400 transition-colors hover:text-slate-600"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to login
            </Link>
          </>
        )}
      </motion.section>
    </main>
  );
}
