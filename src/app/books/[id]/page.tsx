"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { serverBaseUrl } from "@/lib/server";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Review {
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface Quote {
  userName: string;
  userEmail: string;
  quoteText: string;
  createdAt: string;
}

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  copies: number;
  userName: string;
  userEmail: string;
  reviews?: Review[];
  quotes?: Quote[];
}

export default function BookDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FBF9F5]">
          <LoadingSpinner label="Loading book details..." />
        </div>
      }
    >
      <BookDetailsContent />
    </Suspense>
  );
}

function BookDetailsContent() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { data: session } = useSession();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [borrowModalOpen, setBorrowModalOpen] = useState(false);
  const [borrowing, setBorrowing] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`${serverBaseUrl}/books/${id}`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load book details.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookDetails();
  }, [id]);

  const handleConfirmBorrow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book || !session?.user) return;

    setBorrowing(true);
    const borrowData = {
      bookId: book._id,
      bookTitle: book.title,
      bookImage: book.image,
      userName: session.user.name,
      userEmail: session.user.email,
      borrowDate: new Date().toISOString(),
      returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };

    try {
      const response = await fetch(`${serverBaseUrl}/borrows`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(borrowData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to borrow book");
      }

      toast.success("Book borrowed successfully!", {
        style: { background: "#2D5A3F", color: "#fff", fontSize: "14px" },
      });

      setBook((current) =>
        current
          ? { ...current, copies: Math.max(0, current.copies - 1) }
          : current,
      );
      setBorrowModalOpen(false);
      setTimeout(() => router.push("/my-borrows"), 1200);
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Failed to borrow book.",
      );
    } finally {
      setBorrowing(false);
    }
  };

  // Submit Review Handler
  async function handleReviewSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!session?.user || !book) return;
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch(`${serverBaseUrl}/books/${book._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "review",
          rating: formData.get("rating"),
          comment: formData.get("comment"),
          userName: session.user.name,
          userEmail: session.user.email,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add review");

      toast.success("Review added successfully!");
      form.reset();
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  }

  // Submit Quote Handler
  async function handleQuoteSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!session?.user || !book) return;
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch(`${serverBaseUrl}/books/${book._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "quote",
          quoteText: formData.get("quoteText"),
          userName: session.user.name,
          userEmail: session.user.email,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add quote");

      toast.success("Quote added successfully!");
      form.reset();
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  }

  if (loading)
    return (
      <div className="min-h-screen bg-[#FBF9F5] flex justify-center items-center">
        Loading...
      </div>
    );
  if (!book)
    return (
      <div className="min-h-screen bg-[#FBF9F5] flex justify-center items-center">
        Book not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FBF9F5] py-16 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[400px] w-full rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src={book.image}
              alt={book.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-[#E08552] uppercase tracking-wider">
                {book.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mt-1">
                {book.title}
              </h1>
              <p className="text-sm text-gray-500 mt-1">By {book.author}</p>
            </div>

            {/* Added By Information */}
            <div className="inline-block px-3 py-1 bg-[#FBF9F5] border border-gray-200 rounded-lg text-xs text-gray-600">
              Added by:{" "}
              <span className="font-semibold text-gray-900">
                {book.userName || "Admin / Unknown"}
              </span>{" "}
              ({book.userEmail || "N/A"})
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              {book.description}
            </p>
            <p className="text-sm font-semibold text-gray-700">
              Total Copies: {book.copies}
            </p>
            <button
              onClick={() => setBorrowModalOpen(true)}
              disabled={book.copies <= 0}
              className="w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2D5A3F] rounded-xl hover:bg-[#234631] transition shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
            >
              {book.copies <= 0 ? "Not Available" : "Borrow This Book"}
            </button>
          </div>
        </div>

        {/* ================= REVIEWS & QUOTES SECTION ================= */}
        <div className="mt-16 border-t border-gray-200 pt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Reader Reviews & Memorable Quotes
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* --- LEFT: Ratings & Reviews --- */}
            <div className="bg-[#FBF9F5] p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-gray-900">
                Ratings & Reviews
              </h3>

              {/* Add Review Form */}
              {session?.user ? (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                      Rating (1 to 5 Stars)
                    </label>
                    <select
                      name="rating"
                      defaultValue="5"
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#2D5A3F]"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ (5 - Masterpiece)</option>
                      <option value="4">⭐⭐⭐⭐ (4 - Very Good)</option>
                      <option value="3">⭐⭐⭐ (3 - Average)</option>
                      <option value="2">⭐⭐ (2 - Not Great)</option>
                      <option value="1">⭐ (1 - Poor)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                      Your Review / Comment
                    </label>
                    <textarea
                      required
                      name="comment"
                      rows={3}
                      placeholder="What did you think about this book?"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#2D5A3F] resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#2D5A3F] rounded-xl hover:bg-[#234631] transition shadow-sm"
                  >
                    Submit Review
                  </button>
                </form>
              ) : (
                <p className="text-xs text-gray-500 italic">
                  Please login to write a review.
                </p>
              )}

              {/* Reviews List */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                {book.reviews && book.reviews.length > 0 ? (
                  book.reviews.map((rev, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white border border-gray-200/60 space-y-2 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#2D5A3F]/20 text-[#2D5A3F] flex items-center justify-center text-xs font-bold">
                            {rev.userName?.charAt(0) || "U"}
                          </div>
                          <span className="text-xs font-bold text-gray-900">
                            {rev.userName}
                          </span>
                        </div>
                        <span className="text-amber-500 text-xs">
                          {"⭐".repeat(Number(rev.rating) || 5)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-700">{rev.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 italic">
                    No reviews yet. Be the first to review!
                  </p>
                )}
              </div>
            </div>

            {/* --- RIGHT: Memorable Quotes --- */}
            <div className="bg-[#FBF9F5] p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-gray-900">
                Memorable Quotes
              </h3>

              {/* Add Quote Form */}
              {session?.user ? (
                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                      Add a Favorite Quote from Book
                    </label>
                    <textarea
                      required
                      name="quoteText"
                      rows={3}
                      placeholder="“Write a memorable line or quote...”"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#2D5A3F] resize-none italic"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#2D5A3F] rounded-xl hover:bg-[#234631] transition shadow-sm"
                  >
                    Add Quote
                  </button>
                </form>
              ) : (
                <p className="text-xs text-gray-500 italic">
                  Please login to share a quote.
                </p>
              )}

              {/* Quotes List */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                {book.quotes && book.quotes.length > 0 ? (
                  book.quotes.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white border-l-4 border-[#2D5A3F] space-y-2 shadow-sm"
                    >
                      <p className="text-xs font-serif italic text-gray-800">
                        &ldquo;{q.quoteText}&rdquo;
                      </p>
                      <div className="flex items-center justify-end gap-2 text-[10px] text-gray-500 font-semibold">
                        <span>— Added by {q.userName}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 italic">
                    No quotes added yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONFIRM BORROW MODAL */}
      {borrowModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl space-y-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h3 className="text-lg font-bold text-gray-900">
                Confirm Borrow
              </h3>
              <button
                onClick={() => setBorrowModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmBorrow} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                  User Name
                </label>
                <input
                  type="text"
                  readOnly
                  value={session?.user?.name || ""}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                  User Email
                </label>
                <input
                  type="email"
                  readOnly
                  value={session?.user?.email || ""}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-600"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setBorrowModalOpen(false)}
                  className="w-1/2 py-3 text-xs font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={borrowing}
                  className="w-1/2 py-3 text-xs font-semibold text-white bg-[#2D5A3F] rounded-xl hover:bg-[#234631]"
                >
                  {borrowing ? "Confirming..." : "Confirm Borrow"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
