"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const earningsData = [
  { month: "Jan", earnings: 5000 },
  { month: "Feb", earnings: 7000 },
  { month: "Mar", earnings: 9000 },
  { month: "Apr", earnings: 12000 },
  { month: "May", earnings: 15000 },
  { month: "Jun", earnings: 18000 },
];

const mostRequestedBooks = [
  {
    id: 1,
    title: "Atomic Habits",
    requests: 45,
  },
  {
    id: 2,
    title: "Deep Work",
    requests: 30,
  },
  {
    id: 3,
    title: "Clean Code",
    requests: 25,
  },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-gray-500 text-sm font-medium">
            Total Books Listed
          </h3>
          <p className="mt-2 text-3xl font-bold">125</p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-gray-500 text-sm font-medium">
            Total Earnings
          </h3>
          <p className="mt-2 text-3xl font-bold">৳45,000</p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-gray-500 text-sm font-medium">
            Active Pending Requests
          </h3>
          <p className="mt-2 text-3xl font-bold">12</p>
        </div>
      </div>

      {/* Earnings Chart */}
      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-5 text-xl font-bold">
          Monthly Earnings Overview
        </h2>

        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="earnings"
                fill="#2563eb"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Most Requested Books */}
      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-5 text-xl font-bold">
          Most Requested Books
        </h2>

        <div className="space-y-4">
          {mostRequestedBooks.map((book) => (
            <div
              key={book.id}
              className="flex items-center justify-between border-b pb-3"
            >
              <h3 className="font-medium">{book.title}</h3>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-600">
                {book.requests} Requests
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}