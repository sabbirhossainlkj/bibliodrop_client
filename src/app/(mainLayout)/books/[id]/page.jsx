import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import DeliveryButton from "@/components/DeliveryButton";

const bookDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/books/${id}`, {
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
    currentUser && currentUser.email === book.librarianEmail;

  let alreadyOrdered = false;
  if (currentUser && !isOwner) {
    try {
      const params = new URLSearchParams({ bookId: book._id });
      if (currentUser.id) params.set("userId", currentUser.id);
      if (currentUser.email) params.set("userEmail", currentUser.email);
      const deliveryRes = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/deliveries/check?${params}`,
        { cache: "no-store" }
      );
      const deliveryData = await deliveryRes.json();
      alreadyOrdered = deliveryData.exists === true;
    } catch { /* ignore */ }
  }

  const isButtonDisabled = isCheckedOut || isOwner || alreadyOrdered;

  const formattedDate = new Date(book.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });


  const handleDelete = async () => {
    "use server";
    try {
      const deleteRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/books/${id}`, {
        method: "DELETE",
        headers: { "x-internal-secret": process.env.INTERNAL_SECRET },
      });
      if (deleteRes.ok) {
        revalidatePath("/books");
      }
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
    redirect("/books");
  };

  const handleUnpublish = async () => {
    "use server";
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/books/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: false }),
      });
      revalidatePath(`/books/${id}`);
    } catch (error) {
      console.error("Failed to unpublish book:", error);
    }
  };

  const handleAddToWishlist = async () => {
    "use server";
    if (!currentUser) redirect("/signin");

    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/wishlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser.id, bookId: book._id }),
      });
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
    }
  };

  const handleAddReview = async (formData) => {
    "use server";
    if (!currentUser) redirect("/signin");

    const rating = formData.get("rating");
    const comment = formData.get("comment");

    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/books/${id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.id,
          userName: currentUser.name || currentUser.email.split("@")[0],
          rating: Number(rating),
          comment,
        }),
      });
      revalidatePath(`/books/${id}`);
    } catch (error) {
      console.error("Failed to add review:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 min-h-screen bg-gray-50/50">
      <Link
        href="/books"
        className="inline-flex items-center text-gray-500 hover:text-gray-700 font-medium mb-8 transition-colors"
      >
        <span className="mr-2">←</span> Back
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-gray-900 shadow-lg">
          <img
            src={
              book.image ||
              "https://images.unsplash.com/photo-1521587760476-6c12a4b040da"
            }
            alt={book.title}
            className="w-full h-full object-cover"
          />
          <span
            className={`absolute top-6 right-6 text-xs font-semibold px-4 py-2 rounded-full border shadow-sm ${isCheckedOut
                ? "bg-red-100 text-red-800 border-red-200"
                : "bg-emerald-100 text-emerald-800 border-emerald-200"
              }`}
          >
            {book.status || "Available"}
          </span>
        </div>

        <div className="flex flex-col h-full justify-center space-y-6">
          <div>
            <span className="bg-purple-50 text-purple-600 text-xs font-semibold px-3 py-1.5 rounded-md tracking-wide">
              {book.category}
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight font-serif">
              {book.title}
            </h1>
            <p className="text-gray-600 font-medium text-lg">
              by <span className="text-gray-900">{book.author}</span>
            </p>
          </div>

          <p className="text-gray-500 leading-relaxed text-base max-w-md">
            {book.description}
          </p>

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

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            {isButtonDisabled ? (
              <button
                disabled
                className="flex-1 bg-gray-300 text-gray-500 font-medium py-3.5 px-6 rounded-xl cursor-not-allowed"
              >
                {isCheckedOut ? "Checked Out" : isOwner ? "Your Own Book" : "Already Ordered"}
              </button>
            ) : (
              <Link
                href={currentUser ? `/payment?bookId=${book._id}` : "/signin"}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-center font-medium py-3.5 px-6 rounded-xl"
              >
                Request Delivery
              </Link>
            )}

            <form action={handleAddToWishlist} className="flex-1 sm:flex-none">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 text-gray-700 font-medium py-3.5 px-6 rounded-xl bg-white"
              >
                <span className="text-gray-400">♡</span> Add to Wishlist
              </button>
            </form>
          </div>

          {isOwner && (
            <div className="mt-4 pt-6 border-t border-dashed border-gray-200">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Librarian Controls
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/dashboard/books/edit/${book._id}`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center font-medium py-3 px-6 rounded-xl transition-colors"
                >
                  Edit
                </Link>

                <form action={handleDelete} className="flex-1">
                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-xl transition-colors"
                  >
                    Delete
                  </button>
                </form>

                <form action={handleUnpublish} className="flex-1">
                  <button
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-xl transition-colors"
                  >
                    Unpublish
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-16 pt-10 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">
          Reader Reviews ({book.reviews?.length || 0})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-1 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Leave a Review
            </h3>
            {currentUser ? (
              <form action={handleAddReview} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating
                  </label>
                  <select
                    name="rating"
                    required
                    className="w-full rounded-xl border border-gray-200 p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                    <option value="4">⭐⭐⭐⭐ (4/5)</option>
                    <option value="3">⭐⭐⭐ (3/5)</option>
                    <option value="2">⭐⭐ (2/5)</option>
                    <option value="1">⭐ (1/5)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Comment
                  </label>
                  <textarea
                    name="comment"
                    rows="4"
                    required
                    placeholder="Share your thoughts about this book..."
                    className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-xl text-sm transition-colors"
                >
                  Submit Review
                </button>
              </form>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500 mb-3">
                  Please sign in to drop a review.
                </p>
                <Link
                  href="/signin"
                  className="inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Sign In →
                </Link>
              </div>
            )}
          </div>

          <div className="md:col-span-2 space-y-4">
            {book.reviews && book.reviews.length > 0 ? (
              book.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {review.userName}
                      </h4>
                      <div className="text-amber-500 text-xs mt-0.5">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 text-gray-400 text-sm">
                💭 No reviews yet. Be the first to share your experience!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default bookDetailsPage;
