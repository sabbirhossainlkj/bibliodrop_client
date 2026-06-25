"use client";
import { authClient } from "@/lib/auth-client";
import { apiFetch, ensureToken } from "@/lib/api";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const STATUS_FLOW = ["Pending", "Dispatched", "Delivered"];

export default function ManageDeliveries() {
  const { data: session, isPending } = authClient.useSession();
  const [deliveries, setDeliveries] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    ensureToken(session);
    if (isPending || !session?.user?.email) return;
    apiFetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/deliveries?librarianEmail=${encodeURIComponent(session.user.email)}`)
      .then((res) => res.json())
      .then((data) => setDeliveries(Array.isArray(data) ? data : []))
      .catch(() => toast.error("Failed to load deliveries"));
  }, [session, isPending]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await apiFetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/deliveries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setDeliveries((prev) => prev.map((d) => d._id === id ? { ...d, status: newStatus } : d));
      toast.success(`Status updated to ${newStatus}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Dispatched": return "bg-blue-100 text-blue-800";
      case "Delivered": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filtered = deliveries.filter((d) => statusFilter === "All" || d.status === statusFilter);

  return (
    <div className="p-6 max-w-5xl mx-auto bg-slate-50 min-h-screen rounded-xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manage Deliveries</h1>
          <p className="text-slate-500 mt-1">Update delivery status for your book requests.</p>
        </div>
        <div className="mt-4 md:mt-0 bg-blue-50 border border-blue-100 px-4 py-2 rounded-lg text-blue-700 text-sm font-medium">
          Total: {deliveries.length}
        </div>
      </div>

      <div className="flex bg-white p-4 rounded-xl shadow-sm border border-slate-100 justify-end">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-4 py-2 outline-none"
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
              <th className="px-6 py-4">Update</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
            {filtered.length > 0 ? filtered.map((delivery) => (
              <tr key={delivery._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-800">{delivery.clientName}</div>
                  <div className="text-xs text-slate-400">{delivery.clientEmail}</div>
                </td>
                <td className="px-6 py-4 font-medium text-slate-800">{delivery.bookTitle}</td>
                <td className="px-6 py-4 text-slate-500">
                  {delivery.requestDate ? new Date(delivery.requestDate).toLocaleDateString() : "N/A"}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusStyle(delivery.status)}`}>
                    {delivery.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {delivery.status === "Delivered" ? (
                    <span className="text-green-600 font-medium text-xs">✓ Complete</span>
                  ) : (
                    <select
                      value={delivery.status}
                      onChange={(e) => handleStatusChange(delivery._id, e.target.value)}
                      className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg p-1.5 outline-none cursor-pointer"
                    >
                      {STATUS_FLOW.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  )}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="text-center py-8 text-slate-400 italic">No delivery records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
