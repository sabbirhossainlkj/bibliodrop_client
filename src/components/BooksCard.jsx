"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

const BooksCard = ({ book }) => {
  const status = book?.status?.toLowerCase();

  const statusStyle =
    status === "published"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
      className="
        group
        w-full
        max-w-[260px]
        mx-auto
        overflow-hidden
        rounded-3xl
        border
        border-gray-100
        bg-white
        shadow-md
        hover:shadow-xl
        transition-all
        duration-300
      "
    >
      {/* Image Section */}
      <div className="relative h-44 overflow-hidden bg-gray-100">
        <motion.img
          src={
            book?.image ||
            "https://images.unsplash.com/photo-1543002588-bfa74002ed7e"
          }
          alt={book?.title || "Book image"}
          loading="lazy"
          whileHover={{
            scale: 1.1,
          }}
          transition={{
            duration: 0.4,
          }}
          className="
            h-full
            w-full
            object-cover
          "
        />

        {/* Overlay */}
        <div
          className="
          absolute 
          inset-0
          bg-gradient-to-t
          from-black/40
          via-transparent
          opacity-0
          group-hover:opacity-100
          transition
        "
        />

        {/* Category */}
        {book?.category && (
          <span
            className="
              absolute
              top-3
              left-3
              rounded-full
              bg-indigo-600
              px-3
              py-1
              text-xs
              font-semibold
              text-white
              shadow
            "
          >
            {book.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3
          className="
            line-clamp-1
            text-xl
            font-bold
            text-gray-800
            font-serif
          "
        >
          {book?.title || "Untitled"}
        </h3>

        <p
          className="
            text-sm
            text-gray-400
            font-medium
          "
        >
          By {book?.author || "Unknown Author"}
        </p>

        {/* Price + Status */}
        <div
          className="
          flex
          items-center
          justify-between
          pt-3
        "
        >
          <div>
            <p className="text-xs text-gray-400">Delivery Fee</p>

            <h4
              className="
                text-xl
                font-bold
                text-orange-600
              "
            >
              ${book?.deliveryFee || 0}
            </h4>
          </div>

          <span
            className={`
              rounded-full
              px-3
              py-1
              text-xs
              font-semibold
              ${statusStyle}
            `}
          >
            {book?.status || "Pending"}
          </span>
        </div>

        {/* Button */}
        <Link
          href={`/books/${book?._id}`}
          className="
            mt-4
            block
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            py-3
            text-center
            text-sm
            font-semibold
            text-white
            shadow-md
            transition
            hover:from-indigo-600
            hover:to-blue-600
          "
        >
          View Details →
        </Link>
      </div>
    </motion.div>
  );
};

export default BooksCard;
