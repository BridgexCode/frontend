import { AuthGuard } from "@/features/auth/components/AuthGuard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard loginPath="/login" allowedRoles={["ORG_ADMIN", "ORGANIZATION_OWNER"]}>{children}</AuthGuard>;
}
