"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CreditCard, Truck, ShieldCheck } from "lucide-react";

export default function PaymentPage() {
  const params = useSearchParams();
  const bookId = params.get("bookId");

  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
      
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
            <Truck className="text-indigo-600 w-8 h-8" />
          </div>

          <h1 className="text-3xl font-bold mt-4 text-gray-800">
            Delivery Payment
          </h1>

          <p className="text-gray-500 mt-2">
            Complete your payment to request book delivery
          </p>
        </div>


        {/* Payment Card */}
        <div className="bg-gray-50 rounded-2xl p-5 mb-6">
          
          <div className="flex justify-between mb-3">
            <span className="text-gray-600">
              Delivery Fee
            </span>

            <span className="font-bold text-indigo-600">
              $5.00
            </span>
          </div>


          <div className="flex items-center gap-2 text-sm text-gray-500">
            <ShieldCheck size={18} />
            Secure payment powered by Stripe
          </div>

        </div>


        {/* Payment Form */}
        <form
          action="/api/checkout_sessions"
          method="POST"
          onSubmit={() => setLoading(true)}
        >

          <input
            type="hidden"
            name="bookId"
            value={bookId || ""}
          />


          <button
            disabled={loading}
            type="submit"
            className="
            w-full 
            bg-indigo-600 
            hover:bg-indigo-700 
            disabled:bg-gray-400
            text-white 
            py-4 
            rounded-2xl 
            font-semibold
            flex
            items-center
            justify-center
            gap-3
            transition
            shadow-lg
            "
          >

            {
              loading ? (
                "Redirecting..."
              ) : (
                <>
                  <CreditCard size={20}/>
                  Pay Now
                </>
              )
            }

          </button>

        </form>


        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Your payment is safe and encrypted 🔒
        </p>


      </div>

    </div>
  );
}