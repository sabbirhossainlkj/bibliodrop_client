"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Static Data definitions outside the component to prevent re-creation on renders
const EARNINGS_DATA = [
  { month: "Jan", earnings: 5000 },
  { month: "Feb", earnings: 7000 },
  { month: "Mar", earnings: 9000 },
  { month: "Apr", earnings: 12000 },
  { month: "May", earnings: 15000 },
  { month: "Jun", earnings: 18000 },
];

const MOST_REQUESTED_BOOKS = [
  { id: 1, title: "Atomic Habits", requests: 45 },
  { id: 2, title: "Deep Work", requests: 30 },
  { id: 3, title: "Clean Code", requests: 25 },
];

const STATS_ITEMS = [
  { id: "total-books", label: "Total Books Listed", value: "125" },
  { id: "total-earnings", label: "Total Earnings", value: "৳45,000" },
  { id: "pending-requests", label: "Active Pending Requests", value: "12" },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8 p-4 md:p-6 bg-gray-50/50 min-h-screen rounded-2xl">
      {/* Stats Cards Section */}
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="Quick Statistics">
        {STATS_ITEMS.map((stat) => (
          <div 
            key={stat.id} 
            className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md"
          >
            <h3 className="text-gray-500 text-sm font-medium tracking-wide">
              {stat.label}
            </h3>
            <p className="mt-2 text-3xl font-bold text-gray-900 tracking-tight">
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      {/* Earnings Chart Section */}
      <section className="rounded-xl bg-white p-6 shadow-sm border border-gray-100" aria-label="Earnings Overview">
        <h2 className="mb-5 text-lg font-semibold text-gray-800">
          Monthly Earnings Overview
        </h2>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={EARNINGS_DATA}
              accessibilityLayer
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis 
                dataKey="month" 
                tickLine={false} 
                axisLine={false}
                stroke="#888888"
                fontSize={12}
              />
              <YAxis 
                tickLine={false} 
                axisLine={false}
                stroke="#888888"
                fontSize={12}
                tickFormatter={(value) => `৳${value}`}
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Bar
                dataKey="earnings"
                fill="#2563eb"
                radius={[6, 6, 0, 0]}
                maxBarSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Most Requested Books Section */}
      <section className="rounded-xl bg-white p-6 shadow-sm border border-gray-100" aria-label="Top Books">
        <h2 className="mb-5 text-lg font-semibold text-gray-800">
          Most Requested Books
        </h2>
        <div className="divide-y divide-gray-100">
          {MOST_REQUESTED_BOOKS.map((book) => (
            <div
              key={book.id}
              className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0 group hover:bg-gray-50/50 px-2 -mx-2 rounded-lg transition-colors"
            >
              <h3 className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                {book.title}
              </h3>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 ring-1 ring-inset ring-blue-600/10">
                {book.requests} Requests
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}