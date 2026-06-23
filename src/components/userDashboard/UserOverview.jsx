"use client";

import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  LineChart, 
  Line 
} from 'recharts';
import { BookOpen, Truck, DollarSign } from 'lucide-react';

const statsData = [
  { id: 1, title: 'Total Books Read', value: '42', icon: BookOpen, bgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
  { id: 2, title: 'Pending Deliveries', value: '3', icon: Truck, bgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
  { id: 3, title: 'Total Spent on Fees', value: '$1,25', icon: DollarSign, bgColor: 'bg-emerald-50', iconColor: 'text-emerald-600' },
];

const monthlyData = [
  { name: 'Jan', books: 4, spent: 120 },
  { name: 'Feb', books: 3, spent: 90 },
  { name: 'Mar', books: 6, spent: 250 },
  { name: 'Apr', books: 5, spent: 180 },
  { name: 'May', books: 8, spent: 340 },
  { name: 'Jun', books: 7, spent: 270 },
];

const UserOverview = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
      {/* 1. Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Welcome Back, Reader!</h1>
        <p className="text-gray-500 text-sm">Here's your BiblioDrop delivery and reading activity summary.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsData.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div key={stat.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-400 block">{stat.title}</span>
                <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
              </div>
              <div className={`p-4 rounded-lg ${stat.bgColor}`}>
                <IconComponent className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Books Read (Monthly)</h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f9fafb' }} />
                <Legend />
                <Bar dataKey="books" fill="#3b82f6" name="Books Read" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Delivery & Rental Fees (৳)</h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="spent" stroke="#10b981" strokeWidth={3} name="Amount Spent (৳)" dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserOverview;