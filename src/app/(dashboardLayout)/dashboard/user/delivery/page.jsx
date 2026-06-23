"use client";
import React, { useState } from "react";

const DeliveryHistory = () => {
  const [deliveries] = useState([
    {
      id: 1,
      bookTitle: "Quia sunt eum incidu",
      deliveryFee: 58.0,
      requestDate: "Jun 15, 2026",
      status: "Delivered",
      transactionId: "TXN-1781495571444",
    },
    {
      id: 2,
      bookTitle: "Project Hail Mary",
      deliveryFee: 5.0,
      requestDate: "Jun 9, 2026",
      status: "Pending",
      transactionId: "TXN-1781023546720",
    },
  ]);

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-emerald-50 text-emerald-600 border border-emerald-100";
      case "pending":
        return "bg-amber-50 text-amber-600 border border-amber-100";
      case "dispatched":
        return "bg-blue-50 text-blue-600 border border-blue-100";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };


  return (
    <div className="p-6 md:p-8 bg-[#fafafa] min-h-screen text-[#1e254c] font-sans antialiased">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight mb-1 text-[#1e254c]">
            Delivery History
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            Track all your book delivery requests.
          </p>
        </div>

        <div className="w-full overflow-x-auto bg-white border border-gray-100 rounded-2xl shadow-sm">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#f5f3ff]/50 text-gray-400 text-xs font-bold uppercase tracking-wider border-b border-gray-100/60">
                <th className="py-4 px-6">Book Title</th>
                <th className="py-4 px-6">Delivery Fee</th>
                <th className="py-4 px-6">Request Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Transaction ID</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50 text-sm font-medium text-slate-700">
              {deliveries.map((delivery) => (
                <tr
                  key={delivery.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-5 px-6 max-w-[200px] font-semibold text-slate-800 break-words">
                    {delivery.bookTitle}
                  </td>

                  <td className="py-5 px-6 text-slate-600">
                    ${delivery.deliveryFee.toFixed(2)}
                  </td>

                  <td className="py-5 px-6 text-slate-600 whitespace-nowrap">
                    {delivery.requestDate}
                  </td>

                  <td className="py-5 px-6 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full inline-block ${getStatusStyles(delivery.status)}`}
                    >
                      {delivery.status}
                    </span>
                  </td>

                  <td className="py-5 px-6 text-xs text-gray-400 font-mono tracking-tight whitespace-nowrap">
                    {delivery.transactionId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeliveryHistory;
