"use client";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DeliveryButton({ bookId, librarianEmail, serverDisabled, serverLabel }) {
  const { data: session, isPending } = authClient.useSession();
  const [disabled, setDisabled] = useState(serverDisabled);
  const [label, setLabel] = useState(serverLabel || "Request Delivery");

  useEffect(() => {
    if (isPending || !session?.user) return;

    const user = session.user;

    // Librarian who listed the book
    if (user.email === librarianEmail) {
      setDisabled(true);
      setLabel("Your Own Book");
      return;
    }

    // Check for active delivery
    const params = new URLSearchParams({ bookId });
    if (user.id) params.set("userId", user.id);
    if (user.email) params.set("userEmail", user.email);

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/deliveries/check?${params}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.exists) {
          setDisabled(true);
          setLabel("Already Ordered");
        }
      })
      .catch(() => {});
  }, [session, isPending, bookId, librarianEmail]);

  if (disabled) {
    return (
      <button
        disabled
        className="flex-1 bg-gray-300 text-gray-500 font-medium py-3.5 px-6 rounded-xl cursor-not-allowed"
      >
        {label}
      </button>
    );
  }

  return (
    <Link
      href={session?.user ? `/payment?bookId=${bookId}` : "/signin"}
      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-center font-medium py-3.5 px-6 rounded-xl"
    >
      Request Delivery
    </Link>
  );
}
