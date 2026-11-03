"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "@/lib/auth-client";

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
}

export default function BookDetailsPage() {
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
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/books/${id}`,
        );
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
      returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days later
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/borrows`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(borrowData),
        },
      );

      if (!response.ok) throw new Error("Failed to borrow book");

      toast.success("Book borrowed successfully!", {
        style: { background: "#2D5A3F", color: "#fff", fontSize: "14px" },
      });

      setBorrowModalOpen(false);
      setTimeout(() => router.push("/my-borrows"), 1200);
    } catch (error) {
      console.error(error);
      toast.error("Failed to borrow book.");
    } finally {
      setBorrowing(false);
    }
  };

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
            <p className="text-sm text-gray-600 leading-relaxed">
              {book.description}
            </p>
            <button
              onClick={() => setBorrowModalOpen(true)}
              className="w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2D5A3F] rounded-xl hover:bg-[#234631] transition shadow-md"
            >
              Borrow This Book
            </button>
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
