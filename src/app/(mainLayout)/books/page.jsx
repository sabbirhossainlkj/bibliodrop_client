"use client";

import React, { useState, useEffect, useCallback } from "react";
import BooksCard from "@/components/BooksCard";

const LIMIT = 9;

export default function BookPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [minFee, setMinFee] = useState("");
  const [maxFee, setMaxFee] = useState("");
  const [available, setAvailable] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, genre, sortBy, order, minFee, maxFee, available]);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("status", "Published");
      params.append("page", page);
      params.append("limit", LIMIT);
      if (debouncedSearch) params.append("search", debouncedSearch);
      if (genre) params.append("category", genre);
      if (sortBy) params.append("sortBy", sortBy);
      if (order) params.append("order", order);
      if (minFee !== "") params.append("minFee", minFee);
      if (maxFee !== "") params.append("maxFee", maxFee);
      if (available !== "") params.append("available", available);

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/books?${params}`);
      if (!res.ok) throw new Error("Failed to fetch books");

      const result = await res.json();
      setBooks(result.data || []);
      setTotalItems(result.totalItems ?? 0);
      setTotalPages(result.totalPages ?? 1);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load book list.");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, genre, sortBy, order, page, minFee, maxFee, available]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  if (error) {
    return (
      <div className="flex h-60 flex-col items-center justify-center rounded-2xl bg-red-50 p-6 text-center m-6">
        <p className="font-semibold text-red-600">{error}</p>
        <button onClick={fetchBooks} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl capitalize">Browse All Books</h1>
          <p className="mt-2 text-sm text-gray-500">Find your next favorite read from our collection</p>
        </div>
        <span className="inline-flex self-start sm:self-auto items-center rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
          Total: {totalItems} Books
        </span>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 bg-gray-50 p-4 rounded-xl border">
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

        <input
          type="number"
          placeholder="Min Delivery Fee ($)"
          value={minFee}
          min="0"
          onChange={(e) => setMinFee(e.target.value)}
          className="rounded-lg border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border bg-white text-gray-900"
        />
        <input
          type="number"
          placeholder="Max Delivery Fee ($)"
          value={maxFee}
          min="0"
          onChange={(e) => setMaxFee(e.target.value)}
          className="rounded-lg border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border bg-white text-gray-900"
        />

        <select
          value={available}
          onChange={(e) => setAvailable(e.target.value)}
          className="rounded-lg border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border bg-white text-gray-900"
        >
          <option value="">All Availability</option>
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>

        <button
          onClick={() => {
            setSearch("");
            setDebouncedSearch("");
            setGenre("");
            setSortBy("");
            setOrder("asc");
            setMinFee("");
            setMaxFee("");
            setAvailable("");
          }}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 transition"
        >
          Clear Filters
        </button>
      </div>

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
          {books.map((book, index) => {
            const bookId = typeof book._id === "object" ? book._id?.$oid : book._id;
            return <BooksCard key={bookId || `${book.title}-${index}`} book={book} />;
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border text-sm font-medium disabled:opacity-40 hover:bg-gray-100 transition"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                p === page
                  ? "bg-blue-600 text-white border-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg border text-sm font-medium disabled:opacity-40 hover:bg-gray-100 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
