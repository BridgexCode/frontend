import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">403</h1>
        <h2 className="text-lg font-semibold text-slate-700 mb-2">Access Denied</h2>
        <p className="text-sm text-slate-400 mb-6">You do not have permission to access this page.</p>
        <Link href="/login" className="inline-block bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all">
          Go to Login
        </Link>
      </div>
    </div>
  );
}
