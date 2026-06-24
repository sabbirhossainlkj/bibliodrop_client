"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Wide Book Collection",
    description:
      "Explore thousands of books from different categories and genres anytime.",
    icon: "📚",
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "Fast Delivery",
    description:
      "Get your favorite books delivered quickly with safe and reliable service.",
    icon: "🚚",
    color: "from-purple-500 to-pink-400",
  },
  {
    title: "Trusted Librarians",
    description: "Connect with verified librarians and trusted book providers.",
    icon: "👨‍🏫",
    color: "from-green-500 to-emerald-400",
  },
  {
    title: "Smart Search",
    description:
      "Find your desired books easily with powerful filtering options.",
    icon: "🔍",
    color: "from-orange-500 to-yellow-400",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900">
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Why Choose <span className="text-cyan-400">BookHub?</span>
          </h2>

          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            We make book discovery, delivery, and sharing easier with a powerful
            digital library experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.15,
                duration: 0.5,
              }}
              viewport={{
                once: true,
              }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="group relative p-8 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl hover:shadow-cyan-500/20 transition"
            >
              <div
                className={`w-20 h-20 mx-auto flex items-center justify-center rounded-2xl text-4xl bg-gradient-to-r ${item.color} shadow-lg group-hover:rotate-6 transition`}
              >
                {item.icon}
              </div>

              <h3
                className="mt-6 text-xl font-bold text-white text-center"
              >
                {item.title}
              </h3>

              <p
                className="mt-3 text-gray-300 text-center leading-relaxed"
              >
                {item.description}
              </p>

              <div
                className="absolute inset-x-10 bottom-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
