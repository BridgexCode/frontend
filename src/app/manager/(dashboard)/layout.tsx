import { ManagerSidebar } from "@/features/manager/components/ManagerSidebar";
import { AuthGuard } from "@/features/auth/components/AuthGuard";

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard loginPath="/manager/login" allowedRoles={["OPERATIONS_MANAGER"]}>
      <div className="min-h-screen bg-slate-50">
        <ManagerSidebar />
        <div className="lg:ml-64 pt-14 lg:pt-0 min-h-screen">
          <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
