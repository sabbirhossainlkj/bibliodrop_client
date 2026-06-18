"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";
import { FaBookOpen } from "react-icons/fa";
import { FiMoon } from "react-icons/fi"; 

const Navbar = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Books", href: "/allcourse" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className="bg-[#D3D3E8] px-6 py-3 border-b border-indigo-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <div className="flex items-center gap-2">
          <div className="bg-[#6366F1] text-white p-2.5 rounded-xl flex items-center justify-center shadow-sm">
            <FaBookOpen size={18} />
          </div>
          <p className="font-extrabold text-xl tracking-tight text-[#1E1E2F]">
            Biblio<span className="text-[#D97706]">Drop</span>
          </p>
        </div>

        <nav className="hidden md:flex items-center gap-1 bg-[#C7C7E2]/40 p-1.5 rounded-2xl">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 block ${
                  isActive
                    ? "bg-white text-[#4F46E5] shadow-sm font-bold"
                    : "text-[#6B7280] hover:text-[#1E1E2F]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            isIconOnly
            className="bg-white text-[#1E1E2F] rounded-xl shadow-sm min-w-10 w-10 h-10"
            variant="flat"
          >
            <FiMoon size={18} />
          </Button>

          <Link href="/signin">
            <Button 
              variant="bordered" 
              className="border-[#4F46E5]/20 text-[#4F46E5] font-semibold rounded-xl bg-white/40 hover:bg-white transition-all px-5"
            >
              Login
            </Button>
          </Link>

          <Link href="/signup">
            <Button 
              className="bg-[#6366F1] text-white font-semibold rounded-xl shadow-md hover:bg-[#4F46E5] transition-all px-6"
            >
              Register
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Navbar;