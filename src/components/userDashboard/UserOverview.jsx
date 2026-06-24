"use client";

import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { BookOpen, Truck, DollarSign } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const UserOverview = () => {
  const { data: session } = authClient.useSession();
  const [stats, setStats] = useState({ booksRead: 0, pendingDeliveries: 0, totalSpent: 0 });
  const [readingChart, setReadingChart] = useState([]);
  const [deliveryChart, setDeliveryChart] = useState([]);

  useEffect(() => {
    const userId = session?.user?.id;
    if (!userId) return;

    apiFetch(`http://localhost:5000/api/dashboard/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setStats({
          booksRead: data.booksRead || 0,
          pendingDeliveries: data.pendingDeliveries || 0,
          totalSpent: data.totalSpent || 0,
        });
        setReadingChart(
          (data.readingChart || []).map((d) => ({ name: MONTHS[(d.month || 1) - 1], books: d.count }))
        );
        setDeliveryChart(data.deliveryChart || []);
      })
      .catch(console.error);
  }, [session]);

  const statCards = [
    { title: "Total Books Read", value: stats.booksRead, icon: BookOpen, bg: "bg-blue-50", color: "text-blue-600" },
    { title: "Pending Deliveries", value: stats.pendingDeliveries, icon: Truck, bg: "bg-amber-50", color: "text-amber-600" },
    { title: "Total Spent on Fees", value: `$${stats.totalSpent.toFixed(2)}`, icon: DollarSign, bg: "bg-emerald-50", color: "text-emerald-600" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Welcome Back, Reader!</h1>
        <p className="text-gray-500 text-sm">Here's your BiblioDrop delivery and reading activity summary.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-400 block">{stat.title}</span>
              <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
            </div>
            <div className={`p-4 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Books Read (Monthly)</h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={readingChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: "#f9fafb" }} />
                <Legend />
                <Bar dataKey="books" fill="#3b82f6" name="Books Read" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Delivery Status Breakdown</h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deliveryChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="status" tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" name="Deliveries" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOverview;
