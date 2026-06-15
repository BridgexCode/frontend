"use client";

import { useState } from "react";
import { Save, Bell, Shield, User, Building2 } from "lucide-react";

export function SettingsContent() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-400 mt-0.5">Manage your account and system preferences</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <User className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900">Profile Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Full Name</label>
              <input type="text" defaultValue="Divya Menon" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Email</label>
              <input type="email" defaultValue="divya@naxivo.com" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Phone</label>
              <input type="tel" defaultValue="+91 9876543210" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Building2 className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900">Organization</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Organization Name</label>
              <input type="text" defaultValue="SpeedX Logistics" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Timezone</label>
              <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 bg-white font-medium cursor-pointer">
                <option>Asia/Kolkata (IST)</option>
                <option>Asia/Dubai (GST)</option>
                <option>America/New_York (EST)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Bell className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900">Notifications</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: "Shipment status updates", defaultChecked: true },
              { label: "Failed message alerts", defaultChecked: true },
              { label: "Worker assignment notifications", defaultChecked: true },
              { label: "Weekly report summary", defaultChecked: false },
            ].map((item) => (
              <label key={item.label} className="flex items-center justify-between py-2 cursor-pointer">
                <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                <div className="relative">
                  <input type="checkbox" defaultChecked={item.defaultChecked} className="sr-only peer" />
                  <div className="w-9 h-5 bg-slate-200 rounded-full peer-checked:bg-emerald-600 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-sm after:transition-all peer-checked:after:translate-x-4" />
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900">Security</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Current Password</label>
              <input type="password" placeholder="Enter current password" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">New Password</label>
                <input type="password" placeholder="Min 8 characters" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Confirm Password</label>
                <input type="password" placeholder="Confirm new password" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button onClick={handleSave} className="px-6 py-3 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-200 flex items-center gap-2 cursor-pointer">
            <Save className="w-4 h-4" />
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
