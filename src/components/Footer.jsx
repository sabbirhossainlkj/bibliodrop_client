import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-slate-100 border-t border-indigo-900/40">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            BookStore
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
            Discover your favorite books and enjoy reading anytime, anywhere.
            Your portal to countless worlds.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-5">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li>
              <Link
                href="/about"
                className="hover:text-indigo-400 transition-colors duration-200 block w-max"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-indigo-400 transition-colors duration-200 block w-max"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-indigo-400 transition-colors duration-200 block w-max"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-5">
            Follow Us
          </h3>
          <div className="flex gap-3">
            <Link
              href="#"
              aria-label="Facebook"
              className="p-2.5 rounded-full bg-slate-800/60 border border-slate-700/50 hover:border-blue-500/50 hover:bg-blue-600/10 text-slate-300 hover:text-blue-400 transition-all duration-300"
            >
              <FaFacebookF className="text-lg" />
            </Link>

            <Link
              href="#"
              aria-label="Instagram"
              className="p-2.5 rounded-full bg-slate-800/60 border border-slate-700/50 hover:border-pink-500/50 hover:bg-pink-600/10 text-slate-300 hover:text-pink-400 transition-all duration-300"
            >
              <FaInstagram className="text-lg" />
            </Link>

            <Link
              href="#"
              aria-label="X (Twitter)"
              className="p-2.5 rounded-full bg-slate-800/60 border border-slate-700/50 hover:border-slate-400/50 hover:bg-slate-100/10 text-slate-300 hover:text-white transition-all duration-300"
            >
              <FaXTwitter className="text-lg" />
            </Link>

            <Link
              href="#"
              aria-label="LinkedIn"
              className="p-2.5 rounded-full bg-slate-800/60 border border-slate-700/50 hover:border-cyan-500/50 hover:bg-cyan-600/10 text-slate-300 hover:text-cyan-400 transition-all duration-300"
            >
              <FaLinkedinIn className="text-lg" />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-5">
            Newsletter
          </h3>
          <p className="text-sm text-slate-400 mb-4">
            Subscribe for latest updates.
          </p>

          <div className="flex bg-slate-950/60 border border-slate-800 rounded-lg p-1 focus-within:border-indigo-500/50 transition-colors duration-300">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-slate-500 outline-none"
            />
            <button className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium text-sm px-4 py-2 rounded-md hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 shadow-md shadow-indigo-950/50 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-900/60 bg-slate-950/40 text-center py-6 text-xs text-slate-500 tracking-wide">
        &copy; {new Date().getFullYear()} BookStore. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;


