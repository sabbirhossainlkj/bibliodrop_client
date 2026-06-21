import Link from "next/link";
import React from "react";

const BooksCard = ({ book }) => {
  // Database-er status check kore color decide korar jonno
  const isPublished = book?.status?.toLowerCase() === "published";

  return (
    <div className="max-w-[240px] mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden font-sans">
      {/* Image Section */}
      <div className="relative h-40 w-full bg-gray-100">
        <img
          src={
            book?.image ||
            "https://images.unsplash.com/photo-1543002588-bfa74002ed7e"
          }
          alt={book?.title}
          className="w-full h-full object-cover"
        />
        {/* Category Tag */}
        {book?.category && (
          <span className="absolute top-3 left-3 bg-[#4F46E5] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            {book.category}
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col gap-1">
        {/* Title */}
        <h3 className="text-gray-800 text-lg font-bold font-serif line-clamp-1">
          {book?.title || "Untitled"}
        </h3>

        {/* Author */}
        <p className="text-gray-400 text-xs font-medium">
          by {book?.author || "Unknown Author"}
        </p>

        {/* Footer: Price & Status */}
        <div className="flex items-center justify-between mt-4">
          {/* Delivery Fee */}
          <span className="text-[#B45309] text-lg font-bold">
            ${book?.deliveryFee ? book.deliveryFee : "0"}
          </span>

          {/* Status Tag */}
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              book?.status === "Published"
                ? "bg-[#E6F4EA] text-[#137333]"
                : "bg-[#FEF3C7] text-[#D97706]"
            }`}
          >
            {book?.status || "Pending"}
          </span>
        </div>
        <Link
          href={`/books/${book._id}`}
          className="mt-4 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 block text-center"
        >
          Book Details
        </Link>
      </div>
    </div>
  );
};

export default BooksCard;
