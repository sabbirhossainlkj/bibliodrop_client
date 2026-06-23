"use client";
import React, { useState } from "react";
import { Star, Edit2, Trash2, Check, X, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
const ReviewsPage = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      bookTitle: "Project Hail Mary",
      author: "Andy Weir",
      rating: 5,
      comment:
        "Absolutely brilliant! The scientific details combined with the gripping narrative made it impossible to put down. Highly recommended for sci-fi fans.",
      date: "Jun 20, 2026",
    },
    {
      id: 2,
      bookTitle: "Quia sunt eum incidu",
      author: "John Doe",
      rating: 3,
      comment:
        "The pacing was a bit slow in the middle, but the ending character development was quite satisfying and saved the book for me.",
      date: "Jun 12, 2026",
    },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(5);

  const handleStartEdit = (review) => {
    setEditingId(review.id);
    setEditComment(review.comment);
    setEditRating(review.rating);
  };

  const handleSaveEdit = (id) => {
    if (!editComment.trim()) {
      toast.error("Review comment cannot be empty!");
      return;
    }

    setReviews(
      reviews.map((review) =>
        review.id === id
          ? {
            ...review,
            comment: editComment,
            rating: editRating,
            date: "Edited Just Now",
          }
          : review,
      ),
    );
    setEditingId(null);
    toast.success("Review updated successfully!");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setReviews(reviews.filter((review) => review.id !== id));
      toast.success("Review deleted successfully");
    }
  };

  return (
    <div className="p-6 md:p-8 bg-[#f8fafc] min-h-screen text-[#1e293b] font-sans antialiased">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight mb-1 text-slate-900">
              My Reviews
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Manage all the reviews and ratings you have left on books.
            </p>
          </div>
          <div className="bg-indigo-50 text-indigo-600 p-3 rounded-2xl hidden sm:block">
            <MessageSquare size={24} />
          </div>
        </div>

        {reviews.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
            <p className="text-slate-400 text-sm font-medium">
              You haven't left any reviews yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white border border-slate-100 rounded-2xl p-5 md:p-6 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-50 pb-4 mb-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">
                      {review.bookTitle}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      by {review.author}
                    </p>

                    <div className="flex items-center gap-0.5 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          onClick={() =>
                            editingId === review.id && setEditRating(i + 1)
                          }
                          className={`${i <
                              (editingId === review.id
                                ? editRating
                                : review.rating)
                              ? "fill-amber-400 stroke-amber-400"
                              : "stroke-slate-300 fill-none"
                            } ${editingId === review.id ? "cursor-pointer hover:scale-110 transition-transform" : ""}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-start">
                    {editingId === review.id ? (
                      <>
                        <button
                          onClick={() => handleSaveEdit(review.id)}
                          className="flex items-center gap-1 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors"
                        >
                          <Check size={14} strokeWidth={2.5} /> Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="flex items-center gap-1 bg-slate-100 text-slate-600 hover:bg-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors"
                        >
                          <X size={14} strokeWidth={2.5} /> Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleStartEdit(review)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                          title="Edit Review"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(review.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                          title="Delete Review"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  {editingId === review.id ? (
                    <textarea
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:border-indigo-500 focus:bg-white text-slate-700 transition-all resize-none"
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm font-medium text-slate-600 leading-relaxed italic">
                      "{review.comment}"
                    </p>
                  )}

                  <div className="mt-4 text-[11px] font-bold tracking-wide text-slate-400 uppercase">
                    {review.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;