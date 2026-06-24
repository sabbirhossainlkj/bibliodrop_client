"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { useEffect } from "react";

export default function DashboardError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0F172A]">
      <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-10 max-w-md w-full mx-4 text-center shadow-xl">
        <div className="w-14 h-14 bg-red-500/10 text-red-400 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-red-500/20">
          <AlertTriangle size={28} />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
        <p className="text-slate-400 text-sm mb-6">
          {error?.message || "An unexpected error occurred in the dashboard."}
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 bg-[#6366F1] hover:bg-[#4f46e5] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          <RefreshCw size={15} />
          Try again
        </button>
      </div>
    </div>
  );
}
