"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { apiFetch, ensureToken } from "@/lib/api";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

export default function DashboardOverview() {
  const { data: session } = authClient.useSession();
  const [stats, setStats] = useState({ totalBooks: 0, totalEarnings: 0, pendingRequests: 0 });
  const [mostRequested, setMostRequested] = useState([]);

  useEffect(() => {
    ensureToken(session);
    if (!session?.user?.email) return;
    apiFetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/librarian/${session.user.email}/stats`)
      .then((res) => res.json())
      .then((data) => {
        setStats({
          totalBooks: data.totalBooks || 0,
          totalEarnings: data.totalEarnings || 0,
          pendingRequests: data.pendingRequests || 0,
        });
        setMostRequested(data.mostRequested || []);
      })
      .catch(console.error);
  }, [session]);

  const STATS_ITEMS = [
    { label: "Total Books Listed", value: stats.totalBooks },
    { label: "Total Earnings", value: `$${stats.totalEarnings.toFixed(2)}` },
    { label: "Active Pending Requests", value: stats.pendingRequests },
  ];

  return (
    <div className="space-y-8 p-4 md:p-6 bg-gray-50/50 min-h-screen rounded-2xl">
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {STATS_ITEMS.map((stat) => (
          <div key={stat.label} className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <h3 className="text-gray-500 text-sm font-medium tracking-wide">{stat.label}</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900 tracking-tight">{stat.value}</p>
          </div>
        ))}
      </section>

      {mostRequested.length > 0 && (
        <section className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
          <h2 className="mb-5 text-lg font-semibold text-gray-800">Most Requested Books</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mostRequested} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="title" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip contentStyle={{ background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                <Bar dataKey="requests" fill="#2563eb" radius={[6, 6, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}
    </div>
  );
}
