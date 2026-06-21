"use client"; 

import React, { useState, useEffect } from "react";
import BooksCard from "@/components/BooksCard";

export default function BookPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState({ totalBooks: 0 });

  // Input states
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(""); // Debounced state for API
  const [genre, setGenre] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");

  // 1. Debounce Logic: Input type korar 500ms por setDebouncedSearch trigger hobe
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // 2. Fetch Books API function
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (debouncedSearch) queryParams.append("search", debouncedSearch);
      if (genre) queryParams.append("genre", genre);
      if (sortBy) queryParams.append("sortBy", sortBy);
      if (order) queryParams.append("order", order);

      const res = await fetch(`http://localhost:5000/api/books?${queryParams.toString()}`);

      if (!res.ok) {
        throw new Error("Failed to fetch books data");
      }

      const result = await res.json();
      
      setBooks(result.data || []); 
      setMeta(result.meta || { totalBooks: 0 });
      setError(null);
    } catch (err) {
      console.error("Error loading books:", err);
      setError("বইয়ের তালিকা লোড করা সম্ভব হয়নি।");
    } finally {
      setLoading(false);
    }
  };

  // 3. Trigger API whenever filters change (Using debouncedSearch instead of search)
  useEffect(() => {
    fetchBooks();
  }, [debouncedSearch, genre, sortBy, order]);

  if (error) {
    return (
      <div className="flex h-60 flex-col items-center justify-center rounded-2xl bg-red-50 p-6 text-center m-6">
        <p className="font-semibold text-red-600">{error}</p>
        <button onClick={fetchBooks} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm">Retry</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl capitalize">Browse All Books</h1>
          <p className="mt-2 text-sm text-gray-500">Find your next favorite read from our collection</p>
        </div>
        <span className="inline-flex self-start sm:self-auto items-center rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
          Total: {meta.totalBooks} Books
        </span>
      </div>

      {/* FILTER & CONTROLS SECTION */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-4 bg-gray-50 p-4 rounded-xl border">
        <input
          type="text"
          placeholder="Search by Title or Author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border bg-white text-gray-900"
        />

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="rounded-lg border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border bg-white text-gray-900"
        >
          <option value="">All Genres</option>
          <option value="Fiction">Fiction</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Mystery">Mystery</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border bg-white text-gray-900"
        >
          <option value="">Sort By</option>
          <option value="title">Title</option>
          <option value="publishYear">Publish Year</option>
        </select>

        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="rounded-lg border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border bg-white text-gray-900"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* RENDER BOOKS SECTION */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500 font-medium animate-pulse">Loading books...</p>
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed">
          <p className="text-gray-500 font-medium">No books available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((book) => {
            const bookId = typeof book._id === "object" ? book._id?.$oid : book._id;
            return (
              <div key={bookId || Math.random().toString()}>
                <BooksCard book={book} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}