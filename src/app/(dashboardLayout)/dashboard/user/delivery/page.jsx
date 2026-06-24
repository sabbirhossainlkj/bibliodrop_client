"use client";
import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

const DeliveryHistory = () => {
  const { data: session } = authClient.useSession();
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = session?.user?.id;
    if (!userId) return;

    apiFetch(`http://localhost:5000/api/dashboard/user/${userId}/deliveries`)
      .then((res) => res.json())
      .then((data) => setDeliveries(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [session]);

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered": return "bg-emerald-50 text-emerald-600 border border-emerald-100";
      case "pending": return "bg-amber-50 text-amber-600 border border-amber-100";
      case "dispatched": return "bg-blue-50 text-blue-600 border border-blue-100";
      default: return "bg-gray-50 text-gray-600";
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-500">Loading...</div>;

  return (
    <div className="p-6 md:p-8 bg-[#fafafa] min-h-screen text-[#1e254c] font-sans antialiased">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight mb-1 text-[#1e254c]">Delivery History</h1>
          <p className="text-gray-500 text-sm font-medium">Track all your book delivery requests.</p>
        </div>

        <div className="w-full overflow-x-auto bg-white border border-gray-100 rounded-2xl shadow-sm">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-[#f5f3ff]/50 text-gray-400 text-xs font-bold uppercase tracking-wider border-b border-gray-100/60">
                <th className="py-4 px-6">Book Title</th>
                <th className="py-4 px-6">Delivery Fee</th>
                <th className="py-4 px-6">Request Date</th>
                <th className="py-4 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm font-medium text-slate-700">
              {deliveries.length > 0 ? deliveries.map((d, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-5 px-6 font-semibold text-slate-800">{d.bookTitle}</td>
                  <td className="py-5 px-6 text-slate-600">${Number(d.deliveryFee || 0).toFixed(2)}</td>
                  <td className="py-5 px-6 text-slate-600 whitespace-nowrap">
                    {d.requestDate ? new Date(d.requestDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "N/A"}
                  </td>
                  <td className="py-5 px-6">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full inline-block ${getStatusStyles(d.status)}`}>
                      {d.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="4" className="py-10 text-center text-gray-400">No delivery records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeliveryHistory;
