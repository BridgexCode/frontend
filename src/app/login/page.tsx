"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Lock, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Network,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  LogIn
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await login(email, password);
      setIsSuccess(true);
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : "Login failed" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-12 min-h-[700px]">
        
        {/* Left Side Panel - Brand Intro */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 bg-emerald-50/50 p-8 md:p-12 flex flex-col justify-between border-r border-slate-100"
        >
          {/* Header Branding */}
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
                <Network className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold text-slate-800 tracking-tight block leading-none">Naxivo</span>
                <span className="text-[10px] font-semibold text-slate-400 tracking-wide">Logistics & Shipment Management</span>
              </div>
            </div>
          </div>

          {/* Graphic & Info text block */}
          <div className="my-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-4">
              Manage your logistics operations seamlessly <span className="text-emerald-600">in one place</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Sign in to access your operations dashboard, track fleets, and manage shipments.
            </p>

            {/* Illustration Graphic */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-emerald-100/30 flex items-center justify-center p-2">
              <Image
                src="/loginImage.webp"
                alt="Logistics warehouse & truck illustration"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-contain p-4 mix-blend-multiply"
              />
            </div>
          </div>

          {/* Security Badge */}
          <div className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Your data is safe with us</p>
              <p className="text-[10px] text-slate-400 font-medium">We use industry standard security to protect your info.</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side Panel - Login Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 p-8 md:p-12 lg:p-16 flex flex-col justify-center"
        >
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="login-form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Form Title */}
                <div className="flex items-center gap-3.5 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner">
                    <LogIn className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h1>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">Enter your credentials to access your account</p>
                  </div>
                </div>

                {/* Form Error */}
                {errors.form && (
                  <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 border border-red-100 rounded-xl">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <p className="text-xs font-bold text-red-600">{errors.form}</p>
                  </div>
                )}

                {/* Form Start */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className={`flex items-center border rounded-xl px-3.5 py-3 gap-3 transition-all ${
                      errors.email ? "border-red-500 bg-red-50/10 focus-within:ring-2 focus-within:ring-red-100" : "border-slate-200 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100"
                    }`}>
                      <Mail className={`w-5 h-5 shrink-0 ${errors.email ? "text-red-400" : "text-slate-400"}`} />
                      <input
                        type="email"
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent text-sm text-slate-800 focus:outline-none placeholder:text-slate-400 font-medium"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-[10px] font-bold text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-700 block">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <span className="text-xs font-semibold text-emerald-600 hover:underline cursor-pointer">
                        Forgot password?
                      </span>
                    </div>
                    <div className={`flex items-center border rounded-xl px-3.5 py-3 gap-3 transition-all ${
                      errors.password ? "border-red-500 bg-red-50/10 focus-within:ring-2 focus-within:ring-red-100" : "border-slate-200 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100"
                    }`}>
                      <Lock className={`w-5 h-5 shrink-0 ${errors.password ? "text-red-400" : "text-slate-400"}`} />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                    {errors.password && (
                      <p className="text-[10px] font-bold text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.password}</span>
                      </p>
                    )}
                  </div>

                  {/* Remember Me Checkbox */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-3 select-none cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                      />
                      <span className="text-xs font-semibold text-slate-500">
                        Remember me on this device
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-600 text-white rounded-xl py-3.5 px-6 font-bold text-sm hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/10 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <LogIn className="w-4.5 h-4.5 group-hover:translate-x-0.5 transition-transform" />
                    <span>{isSubmitting ? "Signing In..." : "Sign In"}</span>
                  </button>

                  {/* Register Redirect */}
                  <div className="text-center pt-2">
                    <p className="text-xs font-semibold text-slate-400">
                      Don&apos;t have an account? <Link href="/register" className="text-emerald-600 hover:underline cursor-pointer">Register</Link>
                    </p>
                  </div>

                </form>
              </motion.div>
            ) : (
              // Success Screen
              <motion.div
                key="success-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 px-4 flex flex-col items-center justify-center"
              >
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-6 shadow-inner">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Login Successful!</h2>
                <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed mb-8">
                  Welcome back to your operations center. Directing you to the system portal...
                </p>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-emerald-700 active:scale-95 transition-all"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
