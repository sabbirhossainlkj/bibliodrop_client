import React from "react";
import BooksCard from "@/components/BooksCard";
import FilterControls from "@/components/FilterControls";

export default async function BookPage({ searchParams }) {
  const params = await searchParams;
  const searchQuery = params?.search?.toLowerCase() || "";
  const filterRole = params?.role || "all";
  const sortBy = params?.sort || "title-asc"; 

  let books = [];
  let error = null;

  try {
    
    const res = await fetch("http://localhost:5000/api/books", {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch books data");
    }

    books = await res.json();
  } catch (err) {
    console.error("Error loading books:", err);
    error = "Failed to load the book list. Please try again";
  }

  if (error) {
    return (
      <div className="flex h-60 flex-col items-center justify-center rounded-2xl bg-red-50 p-6 text-center">
        <p className="font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  
  let filteredBooks = Array.isArray(books) ? [...books] : [];

  if (searchQuery) {
    filteredBooks = filteredBooks.filter(
      (book) =>
        book.title?.toLowerCase().includes(searchQuery) ||
        book.author?.toLowerCase().includes(searchQuery) ||
        book.genre?.toLowerCase().includes(searchQuery)
    );
  }

 
  if (filterRole !== "all") {
    filteredBooks = filteredBooks.filter((book) => {
      return book.allowedRoles ? book.allowedRoles.includes(filterRole) : true;
    });
  }

  filteredBooks.sort((a, b) => {
    if (sortBy === "title-asc") {
      return (a.title || "").localeCompare(b.title || "");
    }
    if (sortBy === "title-desc") {
      return (b.title || "").localeCompare(a.title || "");
    }
    if (sortBy === "newest") {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }
    return 0;
  });

  return (
    <div className="w-11/12 mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl capitalize">
            Browse All Books
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Find your next favorite read from our collection
          </p>
        </div>
        <span className="inline-flex self-start sm:self-auto items-center rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
          Total: {filteredBooks.length} Books Found
        </span>
      </div>

      <FilterControls />

      {filteredBooks.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed">
          <p className="text-gray-500 font-medium">
            No books found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBooks.map((book) => {
            const bookId =
              typeof book._id === "object" ? book._id?.$oid : book._id;

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