"use client";

import { useState, useEffect } from "react";
import { Save, Shield, Mail, Bell, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { fetchSettingsApi, updateSettingsApi, SystemSettings } from "../services/admin-settings-api";

const SECTIONS = [
  { id: "general", label: "General", icon: Globe },
  { id: "security", label: "Security", icon: Shield },
  { id: "smtp", label: "SMTP", icon: Mail },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export function SystemSettingsPage() {
  const [activeSection, setActiveSection] = useState("general");
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettingsApi()
      .then(setSettings)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (field: keyof SystemSettings, value: any) => {
    if (!settings) return;
    setSettings({ ...settings, [field]: value });
  };

  const handleSave = async () => {
    if (!settings) return;
    try {
      const updated = await updateSettingsApi(settings);
      setSettings(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {}
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div><h1 className="text-2xl font-bold text-slate-900">System Settings</h1></div>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-8 animate-pulse">
          <div className="h-6 bg-slate-100 rounded w-1/3 mb-6" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 bg-slate-100 rounded mb-4" />
          ))}
        </div>
      </div>
    );
  }

  if (!settings) {
    return <div className="text-center py-10 text-slate-400">Failed to load settings.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage global platform configuration</p>
        </div>
        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
        >
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-56 flex-shrink-0">
          <div className="bg-white border border-slate-100 rounded-2xl p-2 space-y-1">
            {SECTIONS.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    activeSection === section.id
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 bg-white border border-slate-100 rounded-2xl p-6 md:p-8"
        >
          {activeSection === "general" && (
            <div className="space-y-5 max-w-lg">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Platform Name</label>
                <input type="text" value={settings.platformName} onChange={(e) => handleChange("platformName", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Support Email</label>
                <input type="email" value={settings.supportEmail} onChange={(e) => handleChange("supportEmail", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Max Organizations</label>
                <input type="number" value={settings.maxOrganizations} onChange={(e) => handleChange("maxOrganizations", parseInt(e.target.value) || 0)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Default Language</label>
                <select value={settings.defaultLanguage} onChange={(e) => handleChange("defaultLanguage", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 bg-white font-medium cursor-pointer">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <div className="space-y-5 max-w-lg">
              <ToggleField label="Two-Factor Authentication" desc="Require 2FA for all admin accounts" value={settings.twoFactorAuth} onChange={(v) => handleChange("twoFactorAuth", v)} />
              <ToggleField label="Password Expiry" desc="Force password change every 90 days" value={settings.passwordExpiry} onChange={(v) => handleChange("passwordExpiry", v)} />
              <div className="flex items-center justify-between py-3 border-b border-slate-50">
                <div>
                  <p className="text-sm font-semibold text-slate-700">Session Timeout</p>
                  <p className="text-xs text-slate-400">Auto-logout after inactivity (minutes)</p>
                </div>
                <input type="number" value={settings.sessionTimeout} onChange={(e) => handleChange("sessionTimeout", parseInt(e.target.value) || 0)} className="w-24 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-600 font-medium text-center" />
              </div>
            </div>
          )}

          {activeSection === "smtp" && (
            <div className="space-y-5 max-w-lg">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">SMTP Host</label>
                <input type="text" value={settings.smtpHost} onChange={(e) => handleChange("smtpHost", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Port</label>
                  <input type="number" value={settings.smtpPort} onChange={(e) => handleChange("smtpPort", parseInt(e.target.value) || 0)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Encryption</label>
                  <select value={settings.smtpEncryption} onChange={(e) => handleChange("smtpEncryption", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 bg-white font-medium cursor-pointer">
                    <option>TLS</option>
                    <option>SSL</option>
                    <option>None</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Username</label>
                <input type="text" value={settings.smtpUsername} onChange={(e) => handleChange("smtpUsername", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                <input type="password" value={settings.smtpPassword} placeholder="Leave blank to keep current" onChange={(e) => handleChange("smtpPassword", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium" />
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="space-y-5 max-w-lg">
              <ToggleField label="Email Alerts" desc="System alerts via email" value={settings.emailAlerts} onChange={(v) => handleChange("emailAlerts", v)} />
              <ToggleField label="New Organization Signup" desc="Notify when a new org registers" value={settings.newOrgSignup} onChange={(v) => handleChange("newOrgSignup", v)} />
              <ToggleField label="Error Reports" desc="Receive system error notifications" value={settings.errorReports} onChange={(v) => handleChange("errorReports", v)} />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function ToggleField({ label, desc, value, onChange }: { label: string; desc: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-50">
      <div>
        <p className="text-sm font-semibold text-slate-700">{label}</p>
        <p className="text-xs text-slate-400">{desc}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="sr-only peer" />
        <div className="w-10 h-5.5 bg-slate-200 rounded-full peer peer-checked:bg-emerald-600 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:after:translate-x-[18px]" />
      </label>
    </div>
  );
}
