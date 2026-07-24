"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import api from "@/shared/lib/axios";

type VerifyEmailContentProps = {
  email: string;
};

export function VerifyEmailContent({ email }: VerifyEmailContentProps) {
  const [isResending, setIsResending] = useState(false);

  const handleResend = async () => {
    setIsResending(true);
    try {
      await api.post("/api/auth/resend-verification-email", { email });
      toast.success("Verification email sent");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to resend verification email",
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <section className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center">
        <div className="mx-auto mb-5 w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
          <Mail className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Verify your email
        </h1>

        <p className="mt-4 text-sm text-slate-500">
          We&apos;ve sent a verification link to
        </p>

        <p className="mt-1 text-sm font-bold text-slate-800 break-all">
          {email}
        </p>

        <p className="mt-4 text-sm text-slate-500">
          Please check your inbox.
        </p>

        <a
          href="https://mail.google.com"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/10 active:scale-[0.99]"
        >
          Open Gmail
        </a>

        <div className="mt-6">
          <p className="text-xs text-slate-400">Didn&apos;t receive it?</p>
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="mt-2 text-sm font-bold text-emerald-600 transition-colors hover:text-emerald-700 hover:underline disabled:pointer-events-none disabled:opacity-50"
          >
            {isResending ? "Sending..." : "Resend Email"}
          </button>
        </div>

        <Link
          href="/login"
          className="mt-6 inline-block text-xs font-semibold text-slate-400 transition-colors hover:text-slate-600"
        >
          Back to login
        </Link>
      </section>
    </main>
  );
}
