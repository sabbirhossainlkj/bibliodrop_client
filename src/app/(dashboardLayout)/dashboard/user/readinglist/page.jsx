"use client";
import React, { useState } from "react";
import { BookOpen, CheckCircle, RefreshCw } from "lucide-react";

const ReadingList = () => {
  const [books] = useState([
    {
      id: 1,
      title: "Project Hail Mary",
      author: "Andy Weir",
      coverUrl:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
      status: "Delivered",
      date: "Jun 15, 2026",
      genre: "Sci-Fi",
    },
    {
      id: 2,
      title: "Quia sunt eum incidu",
      author: "John Doe",
      coverUrl:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400",
      status: "Returned", // Returned = Returned to library
      date: "Jun 9, 2026",
      genre: "Fiction",
    },
  ]);

  return (
    <div className="p-6 md:p-8 bg-[#f8fafc] min-h-screen text-[#1e293b] font-sans antialiased">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight mb-1 text-slate-900">
            My Reading List
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Gallery view of your successfully delivered and returned books.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1flex flex-col"
            >
              <div className="relative aspect-[3/4] w-full bg-slate-100 overflow-hidden">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  {book.status === "Delivered" ? (
                    <span className="flex items-center gap-1 bg-emerald-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-sm">
                      <CheckCircle size={12} strokeWidth={3} />
                      Delivered
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 bg-slate-700 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-sm">
                      <RefreshCw size={12} strokeWidth={3} />
                      Returned
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-extrabold tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md inline-block mb-2">
                    {book.genre}
                  </span>

                  <h3
                    className="font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors"
                    title={book.title}
                  >
                    {book.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-0.5 font-medium">
                    by {book.author}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <BookOpen size={14} className="text-slate-300" />
                    {book.status === "Delivered"
                      ? "Received on"
                      : "Returned on"}
                  </span>
                  <span className="text-slate-600 font-semibold">
                    {book.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReadingList;
