"use client";
import React, { useState, useEffect } from "react";
import { Check, Trash2, AlertCircle } from "lucide-react";
import { apiFetch, ensureToken } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

const ApprovePage = () => {
  const [pendingBooks, setPendingBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    ensureToken(session);
  }, [session]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/books?status=Pending Approval`)
      .then((res) => res.json())
      .then((data) => setPendingBooks(data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleApprove = async (id, title) => {
    try {
      const res = await apiFetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/books/publish/${id}`, { method: "PATCH" });
      if (!res.ok) throw new Error();
      setPendingBooks((prev) => prev.filter((b) => b._id !== id));
      alert(`"${title}" has been approved & published!`);
    } catch {
      alert("Failed to approve book");
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}" from the queue?`)) return;
    try {
      const res = await apiFetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/books/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setPendingBooks((prev) => prev.filter((b) => b._id !== id));
    } catch {
      alert("Failed to delete book");
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-500">Loading...</div>;

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
                  <tr key={book._id} className="hover:bg-slate-50/40 transition-colors group">
                    <td className="py-5 px-6 font-bold text-slate-800">{book.title}</td>
                    <td className="py-5 px-6 text-slate-500 font-normal">{book.author}</td>
                    <td className="py-5 px-6">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-50 text-purple-600 border border-purple-100/50">
                        {book.category}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-slate-800 font-bold">
                      ${Number(book.deliveryFee || 0).toFixed(2)}
                    </td>
                    <td className="py-5 px-6 text-slate-600 font-normal">{book.librarianName || "N/A"}</td>
                    <td className="py-5 px-6 text-slate-500 font-normal">
                      {book.createdAt ? new Date(book.createdAt).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="py-5 px-6 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleApprove(book._id, book.title)}
                          className="inline-flex items-center gap-1 bg-[#6366f1] text-white hover:bg-[#4f46e5] px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all"
                        >
                          <Check size={14} strokeWidth={3} />
                          Approve
                        </button>
                        <button
                          onClick={() => handleDelete(book._id, book.title)}
                          className="inline-flex items-center gap-1 px-3 py-2 text-rose-600 bg-rose-50 border border-rose-100 hover:bg-rose-100 hover:text-rose-700 rounded-xl text-xs font-bold transition-all"
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