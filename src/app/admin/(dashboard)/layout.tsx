import { SuperAdminSidebar } from "@/features/super-admin/components/SuperAdminSidebar";
import { AdminAuthGuard } from "@/features/super-admin/components/AdminAuthGuard";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-slate-50">
        <SuperAdminSidebar />
        <div className="lg:ml-64 min-h-screen">
          <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
