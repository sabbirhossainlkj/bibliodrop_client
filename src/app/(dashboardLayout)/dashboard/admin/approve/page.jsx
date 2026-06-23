"use client";
import React, { useState } from "react";
import {
  Check,
  Trash2,
  BookOpen,
  AlertCircle,
  Calendar,
  User,
  DollarSign
} from "lucide-react";

const ApprovePage = () => {
  const [pendingBooks, setPendingBooks] = useState([
    {
      id: 1,
      title: "Voluptatibus dolor q",
      author: "Fuga Quaerat commod",
      category: "History",
      fee: 30.00,
      librarian: "James Rodriguez",
      requestedDate: "Jun 15, 2026",
    },
    {
      id: 2,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      category: "Thriller",
      fee: 15.00,
      librarian: "Sultana Razia",
      requestedDate: "Jun 22, 2026",
    },
    {
      id: 3,
      title: "Atomic Habits",
      author: "James Clear",
      category: "Self-Help",
      fee: 0.00,
      librarian: "Tanvir Hasan",
      requestedDate: "Jun 20, 2026",
    },
  ]);

  const handleApprove = (id, title) => {
    alert(`"${title}" has been successfully Approved & Published!`);
    setPendingBooks(pendingBooks.filter((book) => book.id !== id));
  };

  const handleDelete = (id, title) => {
    if (
      window.confirm(
        `Are you sure you want to permanently delete "${title}" from the queue?`,
      )
    ) {
      setPendingBooks(pendingBooks.filter((book) => book.id !== id));
    }
  };

  return (
    <div className="p-6 md:p-8 bg-[#f8fafc] min-h-screen text-[#1e293b] font-sans antialiased">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight mb-1 text-slate-900">
              Book Approval Queue
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Review and manage books currently marked as Pending Approval.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200/60 px-4 py-2 rounded-2xl text-amber-700 text-xs font-bold self-start sm:self-center shadow-sm">
            <AlertCircle size={16} />
            {pendingBooks.length} Books Awaiting Review
          </div>
        </div>

        {pendingBooks.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-3xl p-16 text-center shadow-sm max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100">
              <Check size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              Queue is All Clear!
            </h3>
            <p className="text-slate-400 text-sm font-medium">
              No books are currently pending approval. Good job!
            </p>
          </div>
        ) : (
          /* Table Container */
          <div className="w-full overflow-x-auto bg-white border border-slate-100 rounded-2xl shadow-sm">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-[#f8fafc] text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                  <th className="py-5 px-6">Title</th>
                  <th className="py-5 px-6">Author</th>
                  <th className="py-5 px-6">Category</th>
                  <th className="py-5 px-6">Fee</th>
                  <th className="py-5 px-6">Librarian</th>
                  <th className="py-5 px-6">Date</th>
                  <th className="py-5 px-6 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                {pendingBooks.map((book) => (
                  <tr
                    key={book.id}
                    className="hover:bg-slate-50/40 transition-colors group"
                  >
                    {/* Book Title */}
                    <td className="py-5 px-6 font-bold text-slate-800">
                      {book.title}
                    </td>

                    {/* Author */}
                    <td className="py-5 px-6 text-slate-500 font-normal">
                      {book.author}
                    </td>

                    {/* Category */}
                    <td className="py-5 px-6">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-50 text-purple-600 border border-purple-100/50">
                        {book.category}
                      </span>
                    </td>

                    {/* Fee */}
                    <td className="py-5 px-6 text-slate-800 font-bold">
                      ${book.fee.toFixed(2)}
                    </td>

                    {/* Librarian */}
                    <td className="py-5 px-6 text-slate-600 font-normal">
                      {book.librarian}
                    </td>

                    {/* Date */}
                    <td className="py-5 px-6 text-slate-500 font-normal">
                      {book.requestedDate}
                    </td>

                    {/* Actions */}
                    <td className="py-5 px-6 text-center">
                      <div className="flex items-center justify-center gap-3">
                        {/* Approve Button */}
                        <button
                          onClick={() => handleApprove(book.id, book.title)}
                          className="inline-flex items-center gap-1 bg-[#6366f1] text-white hover:bg-[#4f46e5] px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all"
                        >
                          <Check size={14} strokeWidth={3} />
                          Approve
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(book.id, book.title)}
                          className="inline-flex items-center gap-1 px-3 py-2 text-rose-600 bg-rose-50 border border-rose-100 hover:bg-rose-100 hover:text-rose-700 rounded-xl text-xs font-bold transition-all"
                          title="Delete Request"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovePage;