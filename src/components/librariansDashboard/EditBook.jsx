"use client";

import { useState, useEffect } from "react"; // useEffect যোগ করা হয়েছে
import { useRouter } from "next/navigation";

export default function EditBookForm({ book }) {
  const router = useRouter();

  // ফর্মের স্টেট
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
  });

  // ট্রিক এবং ফিক্স: যখনই প্রপ্স থেকে নতুন 'book' ডাটা আসবে, স্টেট আপডেট হয়ে যাবে
  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        category: book.category || "",
        description: book.description || "",
      });
    }
  }, [book]);

  // ইনপুট চেঞ্জ হ্যান্ডলার
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // সাবমিট হ্যান্ডলার
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:5000/api/books/${book?._id || book?.id}`, // ব্যাকআপ আইডি হ্যান্ডলিং
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update book");
      }

      alert("Book Updated Successfully");

      // Next.js রাউটার রিফ্রেশ এবং রিডাইরেক্ট
      router.refresh();
      router.push(`/books/${book?._id || book?.id}`);
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to update book");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <h1 className="text-xl font-bold mb-6 text-gray-800">
        Edit Book Details
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-gray-600 block mb-1">
            Book Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Book Title"
            className="w-full border border-gray-200 p-3 rounded-lg text-black focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-600 block mb-1">
            Author
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author"
            className="w-full border border-gray-200 p-3 rounded-lg text-black focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-600 block mb-1">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full border border-gray-200 p-3 rounded-lg text-black focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-600 block mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows={4}
            className="w-full border border-gray-200 p-3 rounded-lg text-black focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-sm"
        >
          Update Book
        </button>
      </form>
    </div>
  );
}
