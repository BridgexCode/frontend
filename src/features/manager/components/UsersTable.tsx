"use client";

import { motion } from "framer-motion";
import { Eye, Edit2, ToggleLeft, ToggleRight } from "lucide-react";
import { STATUS_BADGE_MAP, type ManagerUser } from "@/features/manager/services/mock-data";
import { TableSkeleton } from "./TableSkeleton";
import { EmptyState } from "./EmptyState";

interface UsersTableProps {
  users: ManagerUser[];
  loading: boolean;
  onView: (user: ManagerUser) => void;
}

export function UsersTable({ users, loading, onView }: UsersTableProps) {
  if (loading) return <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden"><TableSkeleton rows={6} columns={7} /></div>;
  if (users.length === 0) return <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden"><EmptyState title="No users found" message="Try adjusting your search or filters to find what you're looking for." action={{ label: "Create User", onClick: () => {} }} /></div>;

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">User Name</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Role</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Created</th>
              <th className="text-left px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <span className="font-semibold text-slate-800">{user.name}</span>
                </td>
                <td className="px-4 py-3 text-slate-500">{user.email}</td>
                <td className="px-4 py-3 text-slate-500">{user.phone}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${STATUS_BADGE_MAP[user.role]}`}>
                    {user.role === "OPERATIONS_MANAGER" ? "Manager" : user.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${STATUS_BADGE_MAP[user.status]}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500 text-xs">{user.createdAt}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button onClick={() => onView(user)} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer" title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-all cursor-pointer" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className={`p-1.5 rounded-lg transition-all cursor-pointer ${user.status === "ACTIVE" ? "text-slate-400 hover:text-red-600 hover:bg-red-50" : "text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"}`} title={user.status === "ACTIVE" ? "Deactivate" : "Activate"}>
                      {user.status === "ACTIVE" ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
