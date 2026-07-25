"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Mail, Network } from "lucide-react";
import { toast } from "sonner";
import { requestPasswordReset } from "@/features/auth/services/auth-api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const validateEmail = () => {
    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail) {
      setError("Email address is required");
      return false;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateEmail()) return;

    setIsSubmitting(true);
    try {
      await requestPasswordReset(
        email.trim(),
        `${window.location.origin}/reset-password`,
      );
      setIsSent(true);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Failed to send reset email",
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

        {isSent ? (
          <div className="text-center py-4">
            <div className="mx-auto mb-5 w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Check your email
            </h1>
            <p className="mt-4 text-sm leading-6 text-slate-500">
              If an account exists for <span className="font-bold text-slate-700 break-all">{email.trim()}</span>, a password reset link has been sent.
            </p>
            <Link
              href="/login"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-emerald-700 active:scale-[0.99]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="mb-4 w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Mail className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Forgot password?
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter your email address and we will send you a secure link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div
                  className={`flex items-center border rounded-xl px-3.5 py-3 gap-3 transition-all ${
                    error
                      ? "border-red-500 bg-red-50/10 focus-within:ring-2 focus-within:ring-red-100"
                      : "border-slate-200 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100"
                  }`}
                >
                  <Mail className={`w-5 h-5 shrink-0 ${error ? "text-red-400" : "text-slate-400"}`} />
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (error) setError("");
                    }}
                    className="w-full bg-transparent text-sm text-slate-800 focus:outline-none placeholder:text-slate-400 font-medium"
                  />
                </div>
                {error && <p className="text-xs font-semibold text-red-500">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 text-white rounded-xl py-3.5 px-6 font-bold text-sm hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/10 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSubmitting ? "Sending..." : "Send reset link"}
              </button>

              <Link
                href="/login"
                className="inline-flex w-full items-center justify-center gap-2 text-xs font-semibold text-slate-400 transition-colors hover:text-slate-600"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to login
              </Link>
            </form>
          </>
        )}
      </motion.section>
    </main>
  );
}
