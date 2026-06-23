"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Fiction",
    icon: "📚",
    bgClass:
      "from-rose-50 to-orange-50 dark:from-rose-950/30 dark:to-orange-950/20",
    hoverBorder: "hover:border-rose-400 dark:hover:border-rose-500",
    iconBg: "bg-rose-100 dark:bg-rose-900/50 text-rose-600",
  },
  {
    name: "Sci-Fi",
    icon: "🚀",
    bgClass:
      "from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/20",
    hoverBorder: "hover:border-indigo-400 dark:hover:border-indigo-500",
    iconBg: "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600",
  },
  {
    name: "Academic",
    icon: "🎓",
    bgClass: "from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/20",
    hoverBorder: "hover:border-sky-400 dark:hover:border-sky-500",
    iconBg: "bg-sky-100 dark:bg-sky-900/50 text-sky-600",
  },
  {
    name: "Mystery",
    icon: "🔍",
    bgClass:
      "from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/20",
    hoverBorder: "hover:border-amber-400 dark:hover:border-amber-500",
    iconBg: "bg-amber-100 dark:bg-amber-900/50 text-amber-600",
  },
  {
    name: "History",
    icon: "🏛️",
    bgClass:
      "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20",
    hoverBorder: "hover:border-emerald-400 dark:hover:border-emerald-500",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600",
  },
  {
    name: "Biography",
    icon: "👤",
    bgClass:
      "from-fuchsia-50 to-pink-50 dark:from-fuchsia-950/30 dark:to-pink-950/20",
    hoverBorder: "hover:border-fuchsia-400 dark:hover:border-fuchsia-500",
    iconBg: "bg-fuchsia-100 dark:bg-fuchsia-900/50 text-fuchsia-600",
  },
];

export default function PopularCategories() {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
          Popular{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
            Categories
          </span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm md:text-base max-w-md mx-auto">
          Find your next favorite book by exploring our handpicked top genres.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.4,
              delay: index * 0.05,
              ease: "easeOut",
            }}
            whileHover={{
              y: -10,
              scale: 1.02,
            }}
            whileTap={{ scale: 0.98 }}
            className="h-full"
          >
            <Link
              href={`/browse?category=${encodeURIComponent(category.name.toLowerCase())}`}
              className={`group flex flex-col items-center justify-center h-full bg-gradient-to-br ${category.bgClass} border border-gray-200/80 dark:border-gray-800 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl ${category.hoverBorder} transition-all duration-300`}
            >
              <div
                className={`p-4 rounded-xl ${category.iconBg} shadow-inner mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
              >
                <span className="text-4xl block select-none">
                  {category.icon}
                </span>
              </div>

              <h3 className="font-bold text-gray-800 dark:text-gray-200 text-base md:text-lg tracking-wide group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                {category.name}
              </h3>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
