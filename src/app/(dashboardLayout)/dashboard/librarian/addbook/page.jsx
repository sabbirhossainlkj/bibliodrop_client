"use client";
import { authClient } from "@/lib/auth-client";
import { imageUpload } from "@/lib/ImageUpload";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddBookForm() {
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);

    const toastId = toast.loading("Submitting book details...");

    try {
      const file = formData.get("image");

      if (!file || file.size === 0) {
        throw new Error("Please select a book cover image.");
      }

      const uploadedImage = await imageUpload(file);
      if (!uploadedImage?.url) {
        throw new Error("Image upload failed. Please try again.");
      }

      const bookData = {
        title: formData.get("title"),
        author: formData.get("author"),
        description: formData.get("description"),
        deliveryFee: Number(formData.get("deliveryFee")),
        category: formData.get("category"),
        image: uploadedImage.url,

        librarianId: session?.user?.id,
        librarianEmail: session?.user?.email,
        librarianName: session?.user?.name,

        status: "Pending Approval",
        createdAt: new Date().toISOString(),
      };

      const res = await apiFetch("http://localhost:5000/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      const result = await res.json();

      if (res.ok && (result.insertedId || result.insertId)) {
        
        toast.success("Book submitted successfully for approval!", {
          id: toastId,
        });

        form.reset();

        setTimeout(() => {
          router.push("/dashboard/librarian");
        }, 1500);

      } else {
        throw new Error(result?.message || "Failed to add book to the database");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error(error.message || "Something went wrong!", { id: toastId });
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
              type="file"
              name="image"
              accept="image/*"
              required
              className="w-full border rounded-lg p-2.5 text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all disabled:bg-zinc-400 disabled:cursor-not-allowed shadow-md shadow-blue-600/10"
          >
            {loading ? "Submitting..." : "Submit for approval"}
          </button>
        </form>
      </div>
    </div>
  );
}