"use client";
import React, { useState, useEffect } from "react";
import { Star, Edit2, Trash2, Check, X, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

const BASE = "http://localhost:5000";

const ReviewsPage = () => {
  const { data: session } = authClient.useSession();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(5);

  useEffect(() => {
    const userId = session?.user?.id;
    if (!userId) return;

    apiFetch(`${BASE}/api/dashboard/user/${userId}/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [session]);

  const handleStartEdit = (review) => {
    setEditingId(review._id);
    setEditComment(review.comment);
    setEditRating(review.rating);
  };

  const handleSaveEdit = async (reviewId) => {
    if (!editComment.trim()) return toast.error("Review cannot be empty!");
    const userId = session?.user?.id;

    try {
      const res = await apiFetch(`${BASE}/api/dashboard/user/${userId}/reviews/${reviewId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: editComment, rating: editRating }),
      });
      if (!res.ok) throw new Error();
      setReviews((prev) =>
        prev.map((r) => r._id === reviewId ? { ...r, comment: editComment, rating: editRating } : r)
      );
      setEditingId(null);
      toast.success("Review updated!");
    } catch {
      toast.error("Failed to update review");
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    const userId = session?.user?.id;

    try {
      const res = await apiFetch(`${BASE}/api/dashboard/user/${userId}/reviews/${reviewId}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      toast.success("Review deleted");
    } catch {
      toast.error("Failed to delete review");
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-500">Loading...</div>;

  return (
    <div className="p-6 md:p-8 bg-[#f8fafc] min-h-screen text-[#1e293b] font-sans antialiased">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight mb-1 text-slate-900">My Reviews</h1>
            <p className="text-slate-500 text-sm font-medium">Manage all the reviews and ratings you have left on books.</p>
          </div>
          <div className="bg-indigo-50 text-indigo-600 p-3 rounded-2xl hidden sm:block">
            <MessageSquare size={24} />
          </div>
        </div>

        {reviews.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
            <p className="text-slate-400 text-sm font-medium">You haven't left any reviews yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review._id} className="bg-white border border-slate-100 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-50 pb-4 mb-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">{review.bookTitle}</h3>
                    <div className="flex items-center gap-0.5 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          onClick={() => editingId === review._id && setEditRating(i + 1)}
                          className={`${i < (editingId === review._id ? editRating : review.rating)
                            ? "fill-amber-400 stroke-amber-400"
                            : "stroke-slate-300 fill-none"
                          } ${editingId === review._id ? "cursor-pointer hover:scale-110 transition-transform" : ""}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-start">
                    {editingId === review._id ? (
                      <>
                        <button onClick={() => handleSaveEdit(review._id)} className="flex items-center gap-1 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors">
                          <Check size={14} strokeWidth={2.5} /> Save
                        </button>
                        <button onClick={() => setEditingId(null)} className="flex items-center gap-1 bg-slate-100 text-slate-600 hover:bg-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors">
                          <X size={14} strokeWidth={2.5} /> Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleStartEdit(review)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all" title="Edit Review">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(review._id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all" title="Delete Review">
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  {editingId === review._id ? (
                    <textarea
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:border-indigo-500 focus:bg-white text-slate-700 transition-all resize-none"
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm font-medium text-slate-600 leading-relaxed italic">"{review.comment}"</p>
                  )}
                  <div className="mt-4 text-[11px] font-bold tracking-wide text-slate-400 uppercase">
                    {review.createdAt ? new Date(review.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : ""}
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
