import React from "react";

const statusStyles = {
  published: "bg-green-50 text-green-700 border-green-200",
  unavailable: "bg-red-50 text-red-700 border-red-200",
  "checked out": "bg-red-50 text-red-700 border-red-200",
};

const BooksCard = ({ book }) => {
  const {
    title = "Untitled Book",
    author = "Unknown Author",
    category,
    deliveryFee = 0,
    image = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
    status = "Published",
  } = book || {};

  const fee = deliveryFee === 0 ? "Free" : `৳${deliveryFee}`;

  return (
    <div className="group flex w-full max-w-[240px] flex-col rounded-2xl border bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {category && (
          <span className="absolute left-2 top-2 rounded-full bg-indigo-600 px-3 py-1 text-[11px] text-white">
            {category}
          </span>
        )}
      </div>


      <div className="mt-3 flex flex-1 flex-col">

        <h3 className="truncate text-sm font-bold text-gray-800 group-hover:text-indigo-600">
          {title}
        </h3>

        <p className="truncate text-xs text-gray-400">
          by {author}
        </p>


        <div className="mt-3 flex items-center justify-between">

          <span className="text-sm font-bold text-amber-600">
            {fee}
          </span>

          <span
            className={`rounded-full border px-2 py-1 text-[11px] capitalize ${
              statusStyles[status.toLowerCase()] ||
              "bg-gray-50 text-gray-700 border-gray-200"
            }`}
          >
            {status}
          </span>

        </div>


        <button
          className="mt-4 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Book Details
        </button>

      </div>

    </div>
  );
};


export default React.memo(BooksCard);