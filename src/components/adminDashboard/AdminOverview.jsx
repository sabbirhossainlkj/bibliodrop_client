"use client";
import React, { useState, useEffect } from "react";
import { Users, Book, Truck, DollarSign, TrendingUp } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { apiFetch, ensureToken } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

const AdminOverview = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBooks: 0,
    totalDeliveries: 0,
    totalRevenue: 0,
  });
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    ensureToken(session);
  }, [session]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await apiFetch("http://localhost:5000/api/admin/stats");
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data = await res.json();
        setStats({
          totalUsers: data.totalUsers || 0,
          totalBooks: data.totalBooks || 0,
          totalDeliveries: data.totalDeliveries || 0,
          totalRevenue: data.totalRevenue || 0,
        });
        setCategoryData(data.categoryData || []);
      } catch (err) {
        console.error("Failed to fetch admin stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const COLORS = ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b", "#ec4899"];

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      colorClass: "bg-indigo-50 text-indigo-600 border-indigo-100/50",
      trend: "+12% this month",
    },
    {
      title: "Total Books",
      value: stats.totalBooks.toLocaleString(),
      icon: Book,
      colorClass: "bg-cyan-50 text-cyan-600 border-cyan-100/50",
      trend: "+45 new arrivals",
    },
    {
      title: "Total Deliveries",
      value: stats.totalDeliveries.toLocaleString(),
      icon: Truck,
      colorClass: "bg-amber-50 text-amber-600 border-amber-100/50",
      trend: "98% success rate",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      colorClass: "bg-emerald-50 text-emerald-600 border-emerald-100/50",
      trend: "+18.4% growth",
    },
  ];

  if (loading) {
    return (
      <div className="p-6 md:p-8 bg-[#f8fafc] min-h-screen text-[#1e293b] font-sans antialiased">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-48 mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-64"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm animate-pulse">
                <div className="h-4 bg-slate-200 rounded w-24 mb-4"></div>
                <div className="h-8 bg-slate-200 rounded w-32"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 bg-[#f8fafc] min-h-screen text-[#1e293b] font-sans antialiased">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-1">
              Admin Overview
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Real-time platform metrics and book category distributions.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm text-xs font-bold text-slate-600">
            <TrendingUp size={16} className="text-emerald-500" />
            Live System Analytics
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {card.title}
                  </span>
                  <div
                    className={`p-3 rounded-xl border ${card.colorClass.split(" ")[0]} ${card.colorClass.split(" ")[1]}`}
                  >
                    <Icon size={20} strokeWidth={2.2} />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                    {card.value}
                  </h3>
                  <p className="text-[11px] font-bold text-emerald-600 bg-emerald-50/60 px-2 py-0.5 rounded-md inline-block">
                    {card.trend}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm lg:col-span-1 flex flex-col min-h-[400px]">
            <div className="mb-2">
              <h2 className="text-lg font-bold text-slate-800">
                Books by Category
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                Distribution across genres
              </p>
            </div>

            <div className="w-full flex-1 min-h-[280px] relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="45%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#fff",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      fontSize: "12px",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#64748b",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm lg:col-span-2 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-1">
                Operational Insights
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                System activities overview template
              </p>
            </div>
            <div className="flex-1 border-2 border-dashed border-slate-100 rounded-2xl my-4 flex items-center justify-center bg-slate-50/50">
              <p className="text-xs text-slate-400 font-medium max-w-xs text-center">
                Tip: You can expand this section by adding a LineChart or
                AreaChart for tracking daily revenue or order fulfillment
                trends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
