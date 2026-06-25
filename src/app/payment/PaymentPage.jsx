"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CreditCard, Truck, ShieldCheck } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function PaymentPage() {
  const params = useSearchParams();
  const router = useRouter();
  const bookId = params.get("bookId");
  const { data: session } = authClient.useSession();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!bookId) return;
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/books/${bookId}`)
      .then((r) => r.json())
      .then(setBook)
      .catch(console.error);
  }, [bookId]);

  const handlePayment = async () => {
    if (!session?.user || !book) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId: book._id,
          userId: session.user.id,
          userEmail: session.user.email,
          deliveryFee: book.deliveryFee,
        }),
      });
      const data = await res.json();
      if (data.url) router.push(data.url);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
            <Truck className="text-indigo-600 w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold mt-4 text-gray-800">Delivery Payment</h1>
          <p className="text-gray-500 mt-2">Complete your payment to request book delivery</p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-5 mb-6 space-y-2">
          {book && (
            <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
              <span>Book</span>
              <span className="text-gray-900 font-semibold">{book.title}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Fee</span>
            <span className="font-bold text-indigo-600">
              ${book ? Number(book.deliveryFee).toFixed(2) : "..."}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 pt-1">
            <ShieldCheck size={18} />
            Secure payment powered by Stripe
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading || !book || !session}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition shadow-lg"
        >
          {loading ? "Redirecting..." : <><CreditCard size={20} /> Pay Now</>}
        </button>

        <p className="text-center text-xs text-gray-400 mt-6">Your payment is safe and encrypted 🔒</p>
      </div>
    </div>
  );
}
