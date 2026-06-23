"use client";
import React, { useState } from "react";

export default function ManageDeliveries() {
  // ডেমো ডেটা স্টেট
  const [deliveries, setDeliveries] = useState([
    {
      id: 1,
      clientName: "Dominique Shepard",
      clientEmail: "duhecuhix@mailinator.com",
      bookTitle: "Quia sunt eum incidu",
      date: "Jun 15, 2026",
      status: "Delivered",
    },
    {
      id: 2,
      clientName: "Ahsan Habib",
      clientEmail: "ahsan@example.com",
      bookTitle: "Learn React in 30 Days",
      date: "Jun 22, 2026",
      status: "Pending",
    },
  ]);

  const [statusFilter, setStatusFilter] = useState("All");

  const handleStatusChange = (id, newStatus) => {
    setDeliveries((prevDeliveries) =>
      prevDeliveries.map((delivery) =>
        delivery.id === id ? { ...delivery, status: newStatus } : delivery,
      ),
    );
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this delivery record?")) {
      setDeliveries((prevDeliveries) =>
        prevDeliveries.filter((item) => item.id !== id),
      );
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Dispatched":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredDeliveries = deliveries.filter((delivery) => {
    return statusFilter === "All" || delivery.status === statusFilter;
  });

  return (
    <div className="p-6 max-w-5xl mx-auto bg-slate-50 min-h-screen rounded-xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Manage Deliveries
          </h1>
          <p className="text-slate-500 mt-1">
            Update delivery status for your book requests.
          </p>
        </div>
        <div className="mt-4 md:mt-0 bg-blue-50 border border-blue-100 px-4 py-2 rounded-lg text-blue-700 text-sm font-medium">
          Total Deliveries: {deliveries.length}
        </div>
      </div>

      <div className="flex bg-white p-4 rounded-xl shadow-sm border border-slate-100 justify-end">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-4 py-2 outline-none cursor-pointer w-full sm:w-auto"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Dispatched">Dispatched</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      <div className="overflow-x-auto border border-slate-100 bg-white rounded-xl shadow-sm">
        <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
          <thead className="bg-slate-50 text-slate-400 font-semibold uppercase tracking-wider text-xs">
            <tr>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Book</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
              <th className="px-6 py-4 text-right">Remove</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
            {filteredDeliveries.length > 0 ? (
              filteredDeliveries.map((delivery) => (
                <tr
                  key={delivery.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-slate-800">
                      {delivery.clientName}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {delivery.clientEmail}
                    </div>
                  </td>

                  <td className="px-6 py-4 max-w-xs break-words">
                    <span className="font-medium text-slate-800">
                      {delivery.bookTitle}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                    {delivery.date}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(delivery.status)}`}
                    >
                      {delivery.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {delivery.status === "Delivered" ? (
                      <div className="flex items-center gap-1.5 text-green-600 font-medium text-xs">
                        <span className="bg-green-500 text-white rounded p-0.5 text-[10px]">
                          ✓
                        </span>
                        Complete
                      </div>
                    ) : (
                      <select
                        value={delivery.status}
                        onChange={(e) =>
                          handleStatusChange(delivery.id, e.target.value)
                        }
                        className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 cursor-pointer outline-none"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => handleDelete(delivery.id)}
                      className="text-red-500 hover:text-red-700 text-xs font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-8 text-slate-400 italic"
                >
                  No delivery records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
