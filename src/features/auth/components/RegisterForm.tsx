"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Building2, User, Mail, Phone, Lock, Globe, Clock,
  ShieldCheck, Eye, EyeOff, Network, AlertCircle,
} from "lucide-react";
import { useAuth } from "../hooks/use-auth";
import { COUNTRIES, TIMEZONES } from "../constants";

export function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();

  const [orgName, setOrgName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("IN");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("India");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountryName = e.target.value;
    setCountry(selectedCountryName);
    const matched = COUNTRIES.find((c) => c.name === selectedCountryName);
    if (matched) {
      setCountryCode(matched.code);
      const tzMap: Record<string, string> = {
        US: "America/New_York",
        GB: "Europe/London",
        CA: "America/Toronto",
        AU: "Australia/Sydney",
      };
      setTimezone(tzMap[matched.code] || "Asia/Kolkata");
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!orgName.trim()) newErrors.orgName = "Organization name is required";
    if (!adminName.trim()) newErrors.adminName = "Admin full name is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{7,15}$/.test(phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid phone number (7-15 digits)";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!agreeTerms) {
      newErrors.agreeTerms = "You must agree to the Terms of Service & Privacy Policy";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await register({ orgName, adminName, email, phone, country, timezone, password });
      router.push("/dashboard");
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : "Registration failed" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentCountry = COUNTRIES.find((c) => c.code === countryCode) || COUNTRIES[0];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-12 min-h-[750px]">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 bg-emerald-50/50 p-8 md:p-12 flex flex-col justify-between border-r border-slate-100"
        >
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
          <div className="my-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-4">
              Manage your logistics operations seamlessly <span className="text-emerald-600">in one place</span>
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8">
              Create your organization account and start managing shipments, drivers, vehicles and more.
            </p>
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

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 p-8 md:p-12 lg:p-16 flex flex-col justify-center"
        >
          <div>
            <div className="flex items-center gap-3.5 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Register Organization</h1>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Create your organization account to get started</p>
              </div>
            </div>

            {errors.form && (
              <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 border border-red-100 rounded-xl">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <p className="text-xs font-bold text-red-600">{errors.form}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-5">
                <FormField
                  label="Organization Name"
                  error={errors.orgName}
                  icon={<Building2 className={`w-5 h-5 shrink-0 ${errors.orgName ? "text-red-400" : "text-slate-400"}`} />}
                  placeholder="Enter organization name"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
                <FormField
                  label="Admin Full Name"
                  error={errors.adminName}
                  icon={<User className={`w-5 h-5 shrink-0 ${errors.adminName ? "text-red-400" : "text-slate-400"}`} />}
                  placeholder="Enter your full name"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                />
                <FormField
                  label="Email Address"
                  error={errors.email}
                  icon={<Mail className={`w-5 h-5 shrink-0 ${errors.email ? "text-red-400" : "text-slate-400"}`} />}
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`flex items-center border rounded-xl px-3.5 py-3 gap-3 transition-all ${
                      errors.phone
                        ? "border-red-500 bg-red-50/10 focus-within:ring-2 focus-within:ring-red-100"
                        : "border-slate-200 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100"
                    }`}
                  >
                    <Phone className={`w-5 h-5 shrink-0 ${errors.phone ? "text-red-400" : "text-slate-400"}`} />
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-transparent text-sm text-slate-800 focus:outline-none placeholder:text-slate-400 font-medium"
                    />
                    <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-0.5 select-none shrink-0 text-xs font-semibold text-slate-600">
                      <span>{currentCountry.flag}</span>
                      <span>{currentCountry.dialCode}</span>
                    </div>
                  </div>
                  {errors.phone && (
                    <p className="text-[10px] font-bold text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Password <span className="text-red-500">*</span>
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
                <p
                  className={`text-[10px] font-medium transition-colors ${
                    errors.password ? "text-red-500 font-bold" : "text-slate-400"
                  }`}
                >
                  Password must be at least 8 characters long
                </p>
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
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border border-slate-200 rounded-xl px-3.5 py-3 gap-3 transition-all focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100 bg-white">
                    <Globe className="w-5 h-5 shrink-0 text-slate-400" />
                    <select
                      value={country}
                      onChange={handleCountryChange}
                      className="w-full bg-transparent text-sm text-slate-800 focus:outline-none placeholder:text-slate-400 font-medium appearance-none cursor-pointer"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.name}>
                          {c.flag} &nbsp; {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Time Zone <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border border-slate-200 rounded-xl px-3.5 py-3 gap-3 transition-all focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100 bg-white">
                    <Clock className="w-5 h-5 shrink-0 text-slate-400" />
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full bg-transparent text-sm text-slate-800 focus:outline-none placeholder:text-slate-400 font-medium appearance-none cursor-pointer"
                    >
                      {TIMEZONES.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <label className="flex items-start gap-3 select-none cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                  />
                  <span className="text-xs font-medium text-slate-500 leading-normal">
                    I agree to the{" "}
                    <span className="text-emerald-600 hover:underline cursor-pointer">Terms of Service</span> and{" "}
                    <span className="text-emerald-600 hover:underline cursor-pointer">Privacy Policy</span>
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p className="text-[10px] font-bold text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.agreeTerms}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 text-white rounded-xl py-3.5 px-6 font-bold text-sm hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/10 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
              >
                <Building2 className="w-4.5 h-4.5 group-hover:scale-115 transition-transform" />
                <span>{isSubmitting ? "Creating Organization..." : "Create Organization"}</span>
              </button>

              <div className="text-center pt-2">
                <p className="text-xs font-semibold text-slate-400">
                  Already have an account?{" "}
                  <Link href="/login" className="text-emerald-600 hover:underline cursor-pointer">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

interface FormFieldProps {
  label: string;
  error?: string;
  icon: React.ReactNode;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormField({ label, error, icon, type = "text", placeholder, value, onChange }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-slate-700 block">
        {label} <span className="text-red-500">*</span>
      </label>
      <div
        className={`flex items-center border rounded-xl px-3.5 py-3 gap-3 transition-all ${
          error
            ? "border-red-500 bg-red-50/10 focus-within:ring-2 focus-within:ring-red-100"
            : "border-slate-200 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100"
        }`}
      >
        {icon}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent text-sm text-slate-800 focus:outline-none placeholder:text-slate-400 font-medium"
        />
      </div>
      {error && (
        <p className="text-[10px] font-bold text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
