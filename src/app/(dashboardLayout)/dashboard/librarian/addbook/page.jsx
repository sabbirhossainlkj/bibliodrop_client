"use client";

import { useState } from "react";

export default function AddBookForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    const form = e.target;
    const formData = new FormData(form);

    try {
      // ১. ব্যাকএন্ড API এর মাধ্যমে ইমেজ আপলোড (সিকিউর প্রসেস)
      //   const uploadResponse = await fetch("/api/upload", {
      //     method: "POST",
      //     body: formData, // ইমেজ ফাইলটি সরাসরি পাঠানো হচ্ছে
      //   });

      //   if (!uploadResponse.ok) throw new Error("Image upload failed");
      //   const { imageUrl } = await uploadResponse.json();

      // ২. বইয়ের সম্পূর্ণ ডেটা অবজেক্ট তৈরি
      const bookData = {
        title: formData.get("title"),
        author: formData.get("author"),
        description: formData.get("description"),
        deliveryFee: Number(formData.get("deliveryFee")),
        category: formData.get("category"),
        image: formData.get("image"),
        status: "Pending Approval",
        createdAt: new Date().toISOString(),
      };
      console.log(bookData);

      // ৩. ডাটাবেজে সেভ করার জন্য API Call
      //   const response = await fetch("/api/books", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(bookData),
      //   });

      //   if (!response.ok) throw new Error("Failed to save book data");

      setMessage({
        type: "success",
        text: "Book submitted successfully for approval!",
      });
      form.reset();
    } catch (error) {
      console.error("Submission Error:", error);
      setMessage({
        type: "error",
        text: error.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 border border-zinc-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-zinc-800">
          Add New Book
        </h2>

        {/* সাকসেস বা এরর মেসেজ অ্যালার্ট */}
        {message.text && (
          <div
            className={`p-4 mb-5 rounded-lg text-sm font-medium ${
              message.type === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium text-zinc-700">
              Book Title
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="Enter book title"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-zinc-800"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-zinc-700">
              Author Name
            </label>
            <input
              type="text"
              name="author"
              required
              placeholder="Enter author name"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-zinc-800"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-zinc-700">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              required
              placeholder="Write book description..."
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-zinc-800"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium text-zinc-700">
                Delivery Fee ($)
              </label>
              <input
                type="number"
                name="deliveryFee"
                required
                min="0"
                placeholder="Enter fee"
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-zinc-800"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-zinc-700">
                Category
              </label>
              <select
                name="category"
                required
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-zinc-800 bg-white"
              >
                <option value="">Select Category</option>
                {[
                  "Fiction",
                  "Academic",
                  "Sci-Fi",
                  "History",
                  "Biography",
                  "Self Development",
                ].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-zinc-700">
              Book Cover Image
            </label>
            <input
              name="image"
              required
              className="w-full border rounded-lg p-2.5 text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all disabled:bg-zinc-400 disabled:cursor-not-allowed shadow-md shadow-blue-600/10"
          >
            {loading ? "Submitting..." : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
}
