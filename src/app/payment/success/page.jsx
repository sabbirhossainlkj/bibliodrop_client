import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SuccessPage({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) redirect("/");

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(session_id);
  } catch {
    redirect("/");
  }

  if (session.status === "open") redirect("/");

  if (session.status === "complete") {
    const { bookId, userId, userEmail, deliveryFee } = session.metadata || {};

    // Create the delivery record now that payment is confirmed
    if (bookId && userId) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/deliveries`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-internal-secret": process.env.INTERNAL_SECRET,
          },
          body: JSON.stringify({ userId, userEmail, bookId, deliveryFee: Number(deliveryFee) }),
        });
      } catch (err) {
        console.error("Failed to create delivery:", err);
      }
    }

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
          <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
            <svg className="w-9 h-9 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-500 text-sm mb-6">
            Your delivery request has been placed. The librarian will dispatch your book shortly.
          </p>

          <div className="bg-gray-50 rounded-xl p-4 text-left mb-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Confirmation sent to</p>
            <p className="text-sm font-semibold text-gray-700">{session.customer_details?.email}</p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/dashboard/user/delivery"
              className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition text-sm"
            >
              View Delivery Status
            </Link>
            <Link
              href="/books"
              className="block w-full border border-gray-200 hover:border-gray-300 text-gray-700 font-medium py-3 rounded-xl transition text-sm"
            >
              Browse More Books
            </Link>
          </div>
        </div>
      </div>
    );
  }

  redirect("/");
}
