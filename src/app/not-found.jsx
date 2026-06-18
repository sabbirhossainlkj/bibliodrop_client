import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white px-6">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-cyan-400">404</h1>

        <h2 className="mt-4 text-3xl font-bold">Page Not Found</h2>

        <p className="mt-3 text-gray-400 max-w-md mx-auto">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-block mt-8 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 transition rounded-xl font-semibold shadow-lg"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}