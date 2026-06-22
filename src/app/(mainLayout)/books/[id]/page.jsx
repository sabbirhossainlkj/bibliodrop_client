import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const bookDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/api/books/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="text-center py-10 text-red-500">
        Book not found or failed to load.
      </div>
    );
  }

  const book = await res.json();

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const currentUser = session?.user;

  const isCheckedOut = book.status === "Checked Out";

  const isOwner =
    currentUser &&
    (currentUser.email === book.librarianEmail ||
      currentUser.id === book.librarianId);

  const isButtonDisabled = isCheckedOut || isOwner;

  let buttonText = "Request Delivery";
  if (isCheckedOut) buttonText = "Checked Out";
  if (isOwner) buttonText = "Your Own Book";

  const formattedDate = new Date(book.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 min-h-screen bg-gray-50/50">
      {/* Back Button */}
      <Link
        href="/books"
        className="inline-flex items-center text-gray-500 hover:text-gray-700 font-medium mb-8 transition-colors"
      >
        <span className="mr-2">←</span> Back
      </Link>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left Side: Image Section */}
        <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-gray-900 shadow-lg">
          <img
            src={
              book.image ||
              "https://images.unsplash.com/photo-1521587760476-6c12a4b040da"
            }
            alt={book.title}
            className="w-full h-full object-cover"
          />
          {/* Status Badge - dynamic styling based on availability */}
          <span
            className={`absolute top-6 right-6 text-xs font-semibold px-4 py-2 rounded-full border shadow-sm ${
              isCheckedOut
                ? "bg-red-100 text-red-800 border-red-200"
                : "bg-emerald-100 text-emerald-800 border-emerald-200"
            }`}
          >
            {book.status || "Available"}
          </span>
        </div>

        {/* Right Side: Details Section */}
        <div className="flex flex-col h-full justify-center space-y-6">
          {/* Category */}
          <div>
            <span className="bg-purple-50 text-purple-600 text-xs font-semibold px-3 py-1.5 rounded-md tracking-wide">
              {book.category}
            </span>
          </div>

          {/* Title & Author */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight font-serif">
              {book.title}
            </h1>
            <p className="text-gray-600 font-medium text-lg">
              by <span className="text-gray-900">{book.author}</span>
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-500 leading-relaxed text-base max-w-md">
            {book.description}
          </p>

          {/* Metadata (Fee, Owner, Date) */}
          <div className="space-y-4 pt-4 border-t border-gray-100 text-sm">
            <div className="flex items-center text-gray-700">
              <span className="text-amber-600 font-bold text-lg mr-2">$</span>
              <span className="font-semibold text-gray-900">Delivery Fee:</span>
              <span className="ml-1 text-amber-700 font-bold">
                ${book.deliveryFee?.toFixed(2) || "0.00"}
              </span>
            </div>

            <div className="flex items-center text-gray-600">
              <span className="mr-2 text-base">👤</span>
              <span className="font-medium">Listed by:</span>
              <span className="ml-1 text-gray-900 font-semibold">
                {book.librarianName || "Emily Chen"}
              </span>
            </div>

            <div className="flex items-center text-gray-600">
              <span className="mr-2 text-base">📅</span>
              <span className="font-medium">Added:</span>
              <span className="ml-1 text-gray-900 font-semibold">
                {formattedDate}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            {isButtonDisabled ? (
              <button
                disabled
                className="flex-1 bg-gray-300 text-gray-500 font-medium py-3.5 px-6 rounded-xl cursor-not-allowed"
              >
                {isCheckedOut ? "Checked Out" : "Your Own Book"}
              </button>
            ) : (
              <Link
                href={currentUser ? `/payment?bookId=${book._id}` : "/signin"}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-center font-medium py-3.5 px-6 rounded-xl"
              >
                Request Delivery
              </Link>
            )}

            <button className="flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 text-gray-700 font-medium py-3.5 px-6 rounded-xl bg-white">
              <span className="text-gray-400">♡</span> Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default bookDetailsPage;
