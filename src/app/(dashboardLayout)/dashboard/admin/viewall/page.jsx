"use client";

import React, { useState } from "react";
import {
  Search,
  DollarSign,
  Calendar,
  Hash,
  Mail,
  UserCheck,
} from "lucide-react";

const ViewAllTransactions = () => {
  const [transactions, setTransactions] = useState([
    {
      _id: "TXN98347102",
      userEmail: "rahim.khan@gmail.com",
      librarianEmail: "james.rodriguez@library.com",
      amount: 30.0,
      date: "2026-06-20",
    },
    {
      _id: "TXN98347103",
      userEmail: "sultana.bibi@yahoo.com",
      librarianEmail: "sarah.mitchell@library.com",
      amount: 58.0,
      date: "2026-06-21",
    },
    {
      _id: "TXN98347104",
      userEmail: "tanvir.ahmed@gmail.com",
      librarianEmail: "james.rodriguez@library.com",
      amount: 4.5,
      date: "2026-06-22",
    },
    {
      _id: "TXN98347105",
      userEmail: "arif.hasan@outlook.com",
      librarianEmail: "sarah.mitchell@library.com",
      amount: 12.0,
      date: "2026-06-23",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactions.filter(
    (txn) =>
      txn._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.librarianEmail.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalRevenue = filteredTransactions.reduce(
    (acc, curr) => acc + curr.amount,
    0,
  );

  return (
    <div className="p-6 md:p-8 bg-[#fafafa] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1e1e2d]">
              All Transactions
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Monitor and review all platform-wide financial transactions. (
              {filteredTransactions.length} total)
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by ID, User, or Librarian email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white pl-9 pr-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-indigo-500 text-sm shadow-sm transition-all"
            />
          </div>
        </div>

        <div className="mb-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 w-fit">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <DollarSign size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
              Total Volume (Filtered)
            </p>
            <p className="text-xl font-bold text-gray-800">
              ${totalRevenue.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#fcfcff] border-b border-gray-100">
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider pl-6">
                    <span className="flex items-center gap-1">
                      <Hash size={12} /> Transaction ID
                    </span>
                  </th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Mail size={12} /> User Email
                    </span>
                  </th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <UserCheck size={12} /> Librarian Email
                    </span>
                  </th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <DollarSign size={12} /> Amount
                    </span>
                  </th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider pr-6">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> Date
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((txn) => (
                    <tr
                      key={txn._id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="p-4 text-sm font-mono font-medium text-indigo-600 pl-6">
                        {txn._id}
                      </td>

                      <td className="p-4 text-sm text-gray-700 font-medium">
                        {txn.userEmail}
                      </td>

                      <td className="p-4 text-sm text-gray-500">
                        {txn.librarianEmail}
                      </td>

                      <td className="p-4 text-sm font-semibold text-emerald-600">
                        ${txn.amount.toFixed(2)}
                      </td>

                      <td className="p-4 text-sm text-gray-500 pr-6">
                        {new Date(txn.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="p-8 text-center text-gray-400 text-sm"
                    >
                      No transactions found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllTransactions;
