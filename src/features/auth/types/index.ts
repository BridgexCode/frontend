export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ORGANIZATION_OWNER = "ORGANIZATION_OWNER",
  DRIVER = "DRIVER",
  WORKER = "WORKER",
  OPERATIONS_MANAGER = "OPERATIONS_MANAGER",
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  phoneNumber?: string;
  organizationId?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface RegisterData {
  orgName: string;
  adminName: string;
  email: string;
  phone: string;
  country: string;
  timezone: string;
  password: string;
}
