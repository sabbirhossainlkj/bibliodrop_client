"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditBook() {
  const { id } = useParams();
  const router = useRouter();

  const [book, setBook] = useState({});

  // Old data load
  useEffect(() => {
    fetch(`http://localhost:5000/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updateBook = {
      title: e.target.title.value,

      category: e.target.category.value,

      deliveryFee: e.target.deliveryFee.value,

      image: e.target.image.value,

      description: e.target.description.value,
    };

    const res = await fetch(`http://localhost:5000/api/books/${id}`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(updateBook),
    });

    const data = await res.json();

    if (data.modifiedCount > 0) {
      alert("Book Updated Successfully");

      router.push("/dashboard/manage-books");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-5">Edit Book</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          name="title"
          defaultValue={book.title}
          className="border p-3 w-full rounded"
          placeholder="Book Title"
        />

        <input
          name="category"
          defaultValue={book.category}
          className="border p-3 w-full rounded"
          placeholder="Category"
        />

        <input
          name="deliveryFee"
          defaultValue={book.deliveryFee}
          className="border p-3 w-full rounded"
          placeholder="Delivery Fee"
        />

        <input
          name="image"
          defaultValue={book.image}
          className="border p-3 w-full rounded"
          placeholder="Image URL"
        />

        <textarea
          name="description"
          defaultValue={book.description}
          className="border p-3 w-full rounded"
          placeholder="Description"
        />

        <button className="bg-blue-600 text-white px-5 py-3 rounded">
          Update Book
        </button>
      </form>
    </div>
  );
}
