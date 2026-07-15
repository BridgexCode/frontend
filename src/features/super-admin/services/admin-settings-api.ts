import api from "@/shared/lib/axios";

export interface SystemSettings {
  platformName: string;
  supportEmail: string;
  maxOrganizations: number;
  defaultLanguage: string;
  twoFactorAuth: boolean;
  passwordExpiry: boolean;
  sessionTimeout: number;
  smtpHost: string;
  smtpPort: number;
  smtpEncryption: string;
  smtpUsername: string;
  smtpPassword: string;
  emailAlerts: boolean;
  newOrgSignup: boolean;
  errorReports: boolean;
}

export async function fetchSettingsApi(): Promise<SystemSettings> {
  const res = await api.get("/api/superAdmin/settings");
  return res.data.data;
}

export async function updateSettingsApi(
  settings: Partial<SystemSettings>,
): Promise<SystemSettings> {
  const res = await api.put("/api/superAdmin/settings", settings);
  return res.data.data;
}
