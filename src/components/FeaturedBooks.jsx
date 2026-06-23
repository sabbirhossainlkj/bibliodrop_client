"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import BooksCard from "./BooksCard";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const blobVariants = {
  animate1: {
    x: [0, 40, -20, 0],
    y: [0, -50, 30, 0],
    scale: [1, 1.1, 0.9, 1],
    transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
  },
  animate2: {
    x: [0, -30, 40, 0],
    y: [0, 40, -40, 0],
    scale: [1, 0.9, 1.1, 1],
    transition: { duration: 12, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function FeaturedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/featured", {
          signal: controller.signal,
        });
        const data = await res.json();
        setBooks(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="h-10 w-48 bg-gray-200 animate-pulse mx-auto rounded-full mb-4"></div>
        <div className="h-12 w-96 bg-gray-200 animate-pulse mx-auto rounded-xl mb-14"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-96 w-full rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200/50 p-6 space-y-4 animate-pulse"
            >
              <div className="h-48 w-full bg-gray-200 rounded-xl"></div>
              <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
              <div className="h-10 w-full bg-gray-200 rounded-xl mt-4"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden py-24 bg-slate-50/50">
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-70"></div>

      <motion.div
        variants={blobVariants}
        animate="animate1"
        className="absolute top-12 left-10 w-96 h-96 bg-indigo-300/20 blur-3xl rounded-full mix-blend-multiply filter pointer-events-none"
      />
      <motion.div
        variants={blobVariants}
        animate="animate2"
        className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-300/20 blur-3xl rounded-full mix-blend-multiply filter pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-indigo-500/20 text-indigo-600 font-semibold text-xs uppercase tracking-wider mb-4 shadow-sm">
            ✨ Featured Collection
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900">
            Discover Popular Books
          </h2>

          <div className="mt-4 w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>

          <p className="mt-5 text-slate-500 max-w-xl mx-auto text-base md:text-lg font-medium leading-relaxed">
            Explore our hand-picked collection of trending and highly
            recommended books.
          </p>
        </motion.div>

        {books.length === 0 ? (
          <div className="text-center py-12 text-gray-400 font-medium">
            No featured books available at the moment.
          </div>
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
            >
              {books.map((book) => (
                <motion.div
                  key={book._id}
                  variants={itemVariants}
                  whileHover={{
                    y: -12,
                    scale: 1.02,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  className="group relative h-full rounded-2xl"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-md transition duration-500"></div>

                  <div className="relative h-full flex flex-col backdrop-blur-xl bg-white/80 border border-slate-200/60 rounded-2xl p-1 shadow-sm hover:shadow-2xl hover:border-transparent transition-all duration-300">
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <BooksCard book={book} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-16 text-center"
            >
              <Link href="/books">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 text-white font-semibold text-sm shadow-xl shadow-slate-900/10 hover:shadow-xl hover:shadow-indigo-500/20 bg-gradient-to-r hover:from-indigo-600 hover:to-blue-600 transition-all duration-300"
                >
                  View All Books
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={2} 
                    stroke="currentColor" 
                    className="w-4 h-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </motion.button>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}