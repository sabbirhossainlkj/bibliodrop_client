"use client";
import React, { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

const ReadingList = () => {
  const { data: session } = authClient.useSession();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = session?.user?.id;
    if (!userId) return;

    apiFetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/user/${userId}/reading-list`)
      .then((res) => res.json())
      .then((data) => setBooks(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [session]);

  if (loading) return <div className="p-10 text-center text-gray-500">Loading...</div>;

  return (
    <div className="p-6 md:p-8 bg-[#f8fafc] min-h-screen text-[#1e293b] font-sans antialiased">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight mb-1 text-slate-900">My Reading List</h1>
          <p className="text-slate-500 text-sm font-medium">Gallery view of your successfully delivered and returned books.</p>
        </div>

        {books.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
            <p className="text-slate-400 text-sm font-medium">No books in your reading list yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <div key={book._id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1 flex flex-col">
                <div className="relative aspect-[3/4] w-full bg-slate-100 overflow-hidden">
                  {book.image ? (
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-indigo-50">
                      <BookOpen className="w-12 h-12 text-indigo-300" />
                    </div>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors" title={book.title}>
                      {book.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium">by {book.author}</p>
                  </div>
                  {book.category && (
                    <span className="mt-3 text-[10px] uppercase font-extrabold tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md inline-block">
                      {book.category}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadingList;
