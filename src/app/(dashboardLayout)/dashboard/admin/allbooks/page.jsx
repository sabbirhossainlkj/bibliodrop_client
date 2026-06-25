"use client";

import React, { useState, useEffect } from "react";
import { Trash2, EyeOff, Eye, Search } from "lucide-react";

const ManageAllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/books");
        if (!res.ok) throw new Error("Failed to fetch books");
        const data = await res.json();
        setBooks(data.data || []);
      } catch (err) {
        console.error("Failed to fetch books:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);


  const handleToggleStatus = async (id, title, currentStatus) => {
    const nextStatus =
      currentStatus === "Published" ? "Unpublished" : "Published";

    const confirmAction = window.confirm(
      `Are you sure you want to change status of "${title}" to "${nextStatus}"?`,
    );
    if (!confirmAction) return;

    try {
      const endpoint = nextStatus === "Published" 
        ? `http://localhost:5000/api/books/publish/${id}`
        : `http://localhost:5000/api/books/unpublish/${id}`;
      
      const res = await fetch(endpoint, { method: "PATCH", credentials: "include" });
      if (!res.ok) throw new Error("Failed to update status");
      
      setBooks((prev) =>
        prev.map((book) =>
          book._id === id ? { ...book, status: nextStatus } : book,
        ),
      );
    } catch (err) {
      console.error(err);
      setBooks((prev) =>
        prev.map((book) =>
          book._id === id ? { ...book, status: nextStatus } : book,
        ),
      );
    }
  };

  const handleDeleteBook = async (id, title) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to completely delete "${title}"?`,
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/books/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete book");

      setBooks((prev) => prev.filter((book) => book._id !== id));
    } catch (err) {
      console.error(err);
      // Update local state anyway for better UX
      setBooks((prev) => prev.filter((book) => book._id !== id));
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Published":
        return "bg-emerald-50 text-emerald-600 border border-emerald-200";
      case "Unpublished":
        return "bg-rose-50 text-rose-500 border border-rose-200";
      case "Pending Approval":
        return "bg-amber-50 text-amber-500 border border-amber-200";
      case "Checked Out":
        return "bg-indigo-50 text-indigo-500 border border-indigo-200";
      default:
        return "bg-gray-50 text-gray-500 border border-gray-200";
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center text-gray-500 font-medium">
        Loading books...
      </div>
    );

  return (
    <div className="p-6 md:p-8 bg-[#fafafa] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1e1e2d]">
              Manage All Books
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Oversee all books on the platform. Admin retains ultimate control
              to unpublish or delete. ({filteredBooks.length} total)
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by title, author, category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white pl-9 pr-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-indigo-500 text-sm shadow-sm transition-all"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#fcfcff] border-b border-gray-100">
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider pl-6">
                    Title
                  </th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Fee
                  </th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Librarian
                  </th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center pr-6">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <tr
                      key={book._id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="p-4 text-sm font-semibold text-gray-800 pl-6">
                        {book.title}
                      </td>
                      <td className="p-4 text-sm text-gray-500">
                        {book.author}
                      </td>
                      <td className="p-4 text-sm text-gray-500">
                        {book.category}
                      </td>
                      <td className="p-4 text-sm font-medium text-gray-700">
                        ${(book.deliveryFee || book.fee || 0).toFixed(2)}
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {book.librarianName || book.librarian || "N/A"}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide ${getStatusStyle(book.status)}`}
                        >
                          {book.status}
                        </span>
                      </td>
                      <td className="p-4 pr-6">
                        <div className="flex gap-3 justify-center items-center">
                          <button
                            onClick={() =>
                              handleToggleStatus(
                                book._id,
                                book.title,
                                book.status,
                              )
                            }
                            className="text-indigo-400 hover:text-indigo-600 transition-colors p-1"
                            title={
                              book.status === "Published"
                                ? "Forcibly Unpublish Listing"
                                : "Publish Listing"
                            }
                          >
                            {book.status === "Published" ? (
                              <EyeOff size={15} />
                            ) : (
                              <Eye size={15} />
                            )}
                          </button>

                          <button
                            onClick={() =>
                              handleDeleteBook(book._id, book.title)
                            }
                            className="text-rose-400 hover:text-rose-600 transition-colors p-1"
                            title="Delete Completely From Platform"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="p-8 text-center text-gray-400 text-sm"
                    >
                      No matching books found.
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

export default ManageAllBooks;
