"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, Button } from "@heroui/react";
import { FaBookOpen } from "react-icons/fa";
import { FiMoon, FiMenu, FiX } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { useSession } from "@/lib/auth-client";

const Navbar = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  console.log(session, isPending);
  const user = session?.user;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Books", href: "/books" },
    // { name: "Dashboard", href: "/dashboard/user" },
  ];

  const dashboardLinks = {
    user: "/dashboard/user",
    librarian: "/dashboard/librarian",
    admin: "/dashboard/admin",
  };

  if (user?.email) {
    navLinks.push({
      name: "Dashboard",
      href: dashboardLinks[user?.role] || "users",
    });
  }

  useEffect(() => {
    setMounted(true);
  }, []);
  const handleSingOut = async () => {
    await authClient.signOut();
  };

  return (
    <div className="bg-[#D3D3E8]/80 backdrop-blur-md px-6 py-3 border-b border-indigo-100/40 shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-[#6366F1] text-white p-2.5 rounded-xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105 duration-200">
            <FaBookOpen size={18} />
          </div>
          <p className="font-extrabold text-xl tracking-tight text-[#1E1E2F]">
            Biblio
            <span className="text-[#6366F1] group-hover:text-[#D97706] transition-colors duration-200">
              Drop
            </span>
          </p>
        </Link>

        <nav className="hidden md:flex items-center gap-1 bg-[#C7C7E2]/40 p-1.5 rounded-2xl border border-white/20">
          {navLinks.map((link) => {
            const isActive = mounted && pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 relative ${
                  isActive
                    ? "bg-white text-[#4F46E5] shadow-md scale-[1.02]"
                    : "text-[#555A64] hover:text-[#1E1E2F] hover:bg-white/20"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button
            isIconOnly
            className="bg-white/80 hover:bg-white text-[#1E1E2F] rounded-xl shadow-sm min-w-10 w-10 h-10 transition-all duration-200 hover:rotate-12"
            variant="flat"
            aria-label="Toggle Theme"
          >
            <FiMoon size={18} />
          </Button>
          {!user && (
            <div className="flex gap-2">
              <Link href="/signin">
                <Button
                  variant="bordered"
                  className="border-[#4F46E5]/30 text-[#4F46E5] font-semibold rounded-xl bg-white/50 hover:bg-white transition-all px-5 shadow-sm"
                >
                  Login
                </Button>
              </Link>

              <Link href="/signup">
                <Button className="bg-[#6366F1] text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 hover:bg-[#4F46E5] transition-all hover:translate-y-[-1px] px-6">
                  Register
                </Button>
              </Link>
            </div>
          )}
          {user && (
            <div className="flex items-center gap-3">
              <Avatar size="sm">
                <Avatar.Image
                  referrerPolicy="no-referrer"
                  alt="sabbir hossain"
                  src={user?.image}
                />
                <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>
              </Avatar>
              <span className="text-gray-500 font-bold">Hi {user.name}!</span>
              <Button onClick={handleSingOut} size="sm" variant="danger">
                SignOut
              </Button>
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center gap-2">
          <Button
            isIconOnly
            className="bg-white text-[#1E1E2F] rounded-xl shadow-sm min-w-10 w-10 h-10"
            variant="flat"
            aria-label="Toggle Theme"
          >
            <FiMoon size={18} />
          </Button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-[#1E1E2F] hover:bg-[#C7C7E2]/40 rounded-xl transition-all"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-3 p-4 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-indigo-50 flex flex-col gap-3 animate-in fade-in slide-in-from-top-5 duration-200">
          {navLinks.map((link) => {
            const isActive = mounted && pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? "bg-[#6366F1]/10 text-[#4F46E5] font-bold"
                    : "text-[#6B7280] hover:bg-gray-50 hover:text-[#1E1E2F]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <hr className="border-gray-100 my-1" />
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/signin"
              onClick={() => setIsOpen(false)}
              className="w-full"
            >
              <Button
                variant="bordered"
                className="w-full border-gray-200 text-[#4F46E5] rounded-xl font-medium"
              >
                Login
              </Button>
            </Link>
            <Link
              href="/signup"
              onClick={() => setIsOpen(false)}
              className="w-full"
            >
              <Button className="w-full bg-[#6366F1] text-white rounded-xl font-medium shadow-md">
                Register
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
