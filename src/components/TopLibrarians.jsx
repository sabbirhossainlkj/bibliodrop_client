"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const topLibrarians = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80",
    deliveries: 120,
    rank: "🥇",
  },
  {
    id: 2,
    name: "Michael Brown",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    deliveries: 105,
    rank: "🥈",
  },
  {
    id: 3,
    name: "Emily Davis",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&auto=format&fit=crop&q=80",
    deliveries: 98,
    rank: "🥉",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function TopLibrarians() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />

      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm">
            ⭐ Top Contributors
          </span>

          <h2 className="mt-5 text-4xl font-extrabold text-gray-900">
            Top Librarians / Providers
          </h2>

          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Meet our most trusted librarians who successfully completed the
            highest number of book deliveries.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {topLibrarians.map((librarian) => (
            <motion.div
              key={librarian.id}
              variants={cardVariants}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/30 bg-white/70 backdrop-blur-lg shadow-xl"
            >
              <div className="h-28 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

              <div className="absolute top-4 right-4 text-3xl">
                {librarian.rank}
              </div>

              <div className="relative -mt-14 flex justify-center">
                <div className="rounded-full border-4 border-white shadow-lg overflow-hidden w-[110px] h-[110px]">
                  <Image
                    src={librarian.avatar}
                    alt={librarian.name}
                    width={110}
                    height={110}
                    className="rounded-full object-cover w-full h-full"
                    unoptimized
                  />
                </div>
              </div>

              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-gray-900">
                  {librarian.name}
                </h3>

                <p className="text-gray-500 mt-2">Active Book Provider</p>

                <div className="mt-6">
                  <p className="text-sm uppercase tracking-wider text-gray-400">
                    Completed Deliveries
                  </p>

                  <motion.p
                    whileHover={{ scale: 1.1 }}
                    className="text-4xl font-extrabold text-blue-600 mt-2"
                  >
                    {librarian.deliveries}
                  </motion.p>
                </div>

                <div className="mt-6 flex justify-center">
                  <div className="w-16 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
