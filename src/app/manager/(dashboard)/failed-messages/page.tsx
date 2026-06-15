"use client";

import { FailedMessagesList } from "@/features/manager/components/FailedMessagesList";

export default function FailedMessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Failed Messages</h1>
        <p className="text-sm text-slate-400 mt-0.5">Messages that failed to deliver and need attention</p>
      </div>
      <FailedMessagesList />
    </div>
  );
}
