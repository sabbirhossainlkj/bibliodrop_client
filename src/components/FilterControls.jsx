"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";

export default function FilterControls() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSearch = searchParams.get("search") || "";
  const currentRole = searchParams.get("role") || "all";
  const currentSort = searchParams.get("sort") || "title-asc";

  const updateFilters = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className={`mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3 bg-white p-4 rounded-xl shadow-sm border transition-opacity ${isPending ? "opacity-60" : "opacity-100"}`}>
      
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Search Books
        </label>
        <input
          type="text"
          placeholder="Search by title, author, genre..."
          defaultValue={currentSearch}
          onChange={(e) => updateFilters("search", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Filter by Access/Role
        </label>
        <select
          value={currentRole}
          onChange={(e) => updateFilters("role", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="all">All Books (Guests & Public)</option>
          <option value="readers">Readers Choice</option>
          <option value="librarians">Librarian Archive</option>
          <option value="admin">Admin Restricted</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Sort By
        </label>
        <select
          value={currentSort}
          onChange={(e) => updateFilters("sort", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="title-asc">Title (A - Z)</option>
          <option value="title-desc">Title (Z - A)</option>
          <option value="newest">Newest Arrivals</option>
        </select>
      </div>
    </div>
  );
}