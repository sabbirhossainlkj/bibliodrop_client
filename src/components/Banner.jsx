"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";
import { FiArrowRight, FiCompass, FiStar, FiTruck } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    badge: "Fast & Reliable Delivery",
    badgeIcon: <FiTruck className="text-emerald-400" size={14} />,
    title: (
      <>
        Books At Your <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
          Doorstep Faster
        </span>
      </>
    ),
    description:
      "Order your favorite books with confidence. Our fast delivery system connects you with trusted book owners near you.",
    glowColor: "from-emerald-500/20",
    primaryCTA: "Start Reading",
    href: "/browse",
  },
  {
    badge: "Personalized Discovery",
    badgeIcon: <FiCompass className="text-indigo-400" size={14} />,
    title: (
      <>
        Read What Sets <br />
        Your Soul <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">On Fire</span>
      </>
    ),
    description:
      "Skip the endless scrolling. Our smart recommendation engine curates hidden gems tailored perfectly to your reading taste.",
    glowColor: "from-cyan-500/20",
    primaryCTA: "Find Your Match",
    href: "/discover",
  },
  {
    badge: "Unlimited Knowledge Hub",
    badgeIcon: <FiStar className="text-amber-400" size={14} />,
    title: (
      <>
        Every Book Has <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
          A New Adventure
        </span>
      </>
    ),
    description:
      "From novels to educational resources, unlock endless knowledge and build your personal library collection.",
    glowColor: "from-amber-500/20",
    primaryCTA: "View Collection",
    href: "/browse",
  },
];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeIn" } },
};

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[85vh] flex items-center px-6 sm:px-12 md:px-24 bg-[#0F0C31] overflow-hidden">
      
      <div className={`absolute bottom-[-20%] left-[-10%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr ${slides[activeSlide].glowColor} to-transparent blur-[140px] transition-all duration-1000`} />
      <div className="absolute top-[-30%] right-[-10%] w-[650px] h-[650px] rounded-full bg-[#4F46E5]/10 blur-[160px]" />

      <div className="absolute right-10 md:right-24 top-1/4 w-72 h-72 border border-white/[0.03] rounded-full p-8 hidden lg:block pointer-events-none">
        <div className="w-full h-full border border-dashed border-white/[0.05] rounded-full flex items-center justify-center animate-spin speed-slow" style={{ animationDuration: '40s' }}>
          <div className="w-4 h-4 bg-[#FBBF24]/20 rounded-full" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full text-left relative z-10 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } } 
            }}
          >
            <motion.div 
              variants={fadeUpVariants}
              className="inline-flex items-center gap-2 bg-white/[0.04] backdrop-blur-xl text-white/90 text-xs font-medium px-4 py-2 rounded-full mb-8 border border-white/[0.08] shadow-lg"
            >
              {slides[activeSlide].badgeIcon}
              <span className="tracking-wide">{slides[activeSlide].badge}</span>
            </motion.div>

            <motion.h1 
              variants={fadeUpVariants}
              className="text-4xl sm:text-6xl md:text-[5.2rem] font-black text-white tracking-tight leading-[1.1] mb-6 font-sans"
            >
              {slides[activeSlide].title}
            </motion.h1>

            <motion.p 
              variants={fadeUpVariants}
              className="text-sm sm:text-base md:text-lg text-white/60 max-w-xl mb-12 leading-relaxed font-normal min-h-[54px]"
            >
              {slides[activeSlide].description}
            </motion.p>

            <motion.div 
              variants={fadeUpVariants}
              className="flex flex-wrap gap-4"
            >
              <Link href={slides[activeSlide].href}>
                <Button
                  endContent={<FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                  className="group bg-gradient-to-r from-[#6366F1] to-[#4F46E5] hover:opacity-90 text-white font-bold px-7 py-6 rounded-2xl shadow-lg shadow-indigo-500/20 transition-all duration-200"
                >
                  {slides[activeSlide].primaryCTA}
                </Button>
              </Link>

              <Link href="/how-it-works">
                <Button
                  variant="bordered"
                  className="border-white/[0.15] hover:border-white/30 text-white bg-white/[0.02] hover:bg-white/[0.06] font-semibold px-7 py-6 rounded-2xl transition-all duration-200"
                >
                  Watch Video
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-10 left-6 sm:left-12 md:left-24 flex items-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`transition-all duration-500 rounded-full ${
              activeSlide === index
                ? "w-10 h-1.5 bg-gradient-to-r from-indigo-400 to-cyan-400"
                : "w-2 h-1.5 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;