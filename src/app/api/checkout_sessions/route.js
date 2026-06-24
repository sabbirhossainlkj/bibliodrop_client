import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "../../../lib/stripe";

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const { bookId, userId, userEmail, deliveryFee } = await req.json();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: Math.round(Number(deliveryFee) * 100),
            product_data: { name: "Book Delivery Fee" },
          },
        },
      ],
      metadata: { bookId, userId, userEmail, deliveryFee: String(deliveryFee) },
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment?bookId=${bookId}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 });
  }
}
