"use client";

import { authClient } from "@/lib/auth-client";
import { apiFetch, ensureToken } from "@/lib/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function BooksPage() {
  const { data: session } = authClient.useSession();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    ensureToken(session);
    if (!session?.user?.email) return;
    apiFetch(`http://localhost:5000/api/books?librarianEmail=${session.user.email}&limit=1000`)
      .then((res) => res.json())
      .then((data) => setBooks(data.data || []))
      .catch(() => toast.error("Failed to load books!"));
  }, [session]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    const toastId = toast.loading("Deleting book...");
    try {
      const res = await apiFetch(`http://localhost:5000/api/books/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.deletedCount > 0) {
        toast.success("Book deleted successfully", { id: toastId });
        setBooks((prev) => prev.filter((book) => book._id !== id));
      } else {
        toast.error("Book not found or already deleted", { id: toastId });
      }
    } catch {
      toast.error("Failed to delete book", { id: toastId });
    }
  };

  const handleTogglePublish = async (id, currentStatus) => {
    if (currentStatus === "Pending Approval") return;
    const newStatus = currentStatus === "Published" ? "Unpublished" : "Published";
    const endpoint = newStatus === "Published"
      ? `http://localhost:5000/api/books/publish/${id}`
      : `http://localhost:5000/api/books/unpublish/${id}`;
    try {
      await apiFetch(endpoint, { method: "PATCH" });
      setBooks((prev) => prev.map((b) => b._id === id ? { ...b, status: newStatus } : b));
      toast.success(`Book ${newStatus.toLowerCase()}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Inventory</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-100">
              <th className="py-4 px-6">Title</th>
              <th className="py-4 px-6">Category</th>
              <th className="py-4 px-6">Fee</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {books.map((book) => (
              <tr key={book._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 font-medium text-gray-900 max-w-xs break-words">{book.title}</td>
                <td className="py-4 px-6 text-gray-500">{book.category}</td>
                <td className="py-4 px-6 font-semibold">${Number(book.deliveryFee || 0).toFixed(2)}</td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                    book.status === "Published"
                      ? "bg-green-50 text-green-700 border-green-100"
                      : book.status === "Unpublished"
                      ? "bg-red-50 text-red-700 border-red-100"
                      : "bg-amber-50 text-amber-700 border-amber-100"
                  }`}>
                    {book.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right space-x-3 whitespace-nowrap">
                  <Link
                    href={`/books/${book._id}`}
                    className="text-emerald-600 hover:text-emerald-800 text-xs font-medium transition-colors"
                  >
                    Edit
                  </Link>
                  {book.status !== "Pending Approval" && (
                    <button
                      onClick={() => handleTogglePublish(book._id, book.status)}
                      className="text-indigo-600 hover:text-indigo-800 text-xs font-medium transition-colors"
                    >
                      {book.status === "Published" ? "Unpublish" : "Publish"}
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
