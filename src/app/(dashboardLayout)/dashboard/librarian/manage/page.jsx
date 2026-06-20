"use client";

import { useEffect, useState } from "react";

export default function BooksPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error(error));
  }, []);

const handleDelete = async (id) => {
  const proceed = window.confirm(
    "Are you sure you want to delete this book?"
  );

  if (!proceed) return;

  try {
    const res = await fetch(`http://localhost:5000/api/books/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.deletedCount > 0) {
      alert("Book deleted successfully");

      setBooks((prevBooks) =>
        prevBooks.filter((book) => book._id !== id)
      );
    } else {
      alert("Book not found or already deleted");
    }
  } catch (error) {
    console.error(error);
    alert("Failed to delete book");
  }
};

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Manage All Books
      </h1>

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
              <tr
                key={book._id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="py-4 px-6 font-medium text-gray-900 max-w-xs break-words">
                  {book.title}
                </td>

                <td className="py-4 px-6 text-gray-500">{book.category}</td>

                <td className="py-4 px-6 font-semibold text-gray-900">
                  $
                  {book.deliveryFee !== undefined
                    ? Number(book.deliveryFee).toFixed(2)
                    : "0.00"}
                </td>

                <td className="py-4 px-6">
                  {book.status === "Published" ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                      Pending Approval
                    </span>
                  )}
                </td>

                <td className="py-4 px-6 text-right space-x-3 whitespace-nowrap">
                  <button
                    onClick={() => {
                      console.log("Unpublish book id:", book._id);
                    }}
                    className="text-indigo-500 hover:text-indigo-700 transition-colors"
                    title="Unpublish"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 inline"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  </button>

                  {/* Fixed Delete Button */}
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Delete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 inline"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
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