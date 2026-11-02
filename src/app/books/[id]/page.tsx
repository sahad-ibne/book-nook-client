"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

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
  addedDate: string;
}

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [borrowing, setBorrowing] = useState(false);
  const loggedInUser = {
    name: "Sahad Ibne",
    email: "sahad@gmail.com",
  };

  useEffect(() => {
    if (!id) return;

    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/books/${id}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
        toast.error("Failed to load book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleBorrowBook = async () => {
    if (!book) return;
    setBorrowing(true);

    const borrowData = {
      bookId: book._id,
      bookTitle: book.title,
      bookImage: book.image,
      borrowerName: loggedInUser.name,
      borrowerEmail: loggedInUser.email,
      borrowDate: new Date().toISOString(),
      returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/borrow-books`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(borrowData),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to borrow book");
      }

      toast.success("Book borrowed successfully!", {
        style: {
          background: "#2D5A3F",
          color: "#fff",
          fontSize: "14px",
        },
      });

      setTimeout(() => {
        router.push("/my-borrows");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error("Failed to borrow book. Try again.");
    } finally {
      setBorrowing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] flex justify-center items-center">
        <p className="text-sm text-gray-500 animate-pulse">
          Loading book details...
        </p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Book Not Found
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          The book you are looking for does not exist or has been removed.
        </p>
        <button
          onClick={() => router.push("/books")}
          className="px-6 py-2.5 text-xs font-semibold text-white bg-[#2D5A3F] rounded-xl hover:bg-[#234631] transition"
        >
          Back to All Books
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F5] py-16 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden p-8 sm:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="relative h-[400px] sm:h-[480px] w-full bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <Image
              src={
                book.image ||
                "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop"
              }
              alt={book.title}
              fill
              className="object-cover"
            />
            <span className="absolute top-4 left-4 px-3.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-[#2D5A3F] rounded-full shadow-sm">
              {book.category}
            </span>
          </div>
          <div className="space-y-6 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold tracking-widest text-[#E08552] uppercase">
                  Author: {book.author}
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mt-1">
                  {book.title}
                </h1>
              </div>

              <div className="border-t border-b border-gray-100 py-4 space-y-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Description
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {book.description || "No description provided for this book."}
                </p>
              </div>
              <div className="space-y-2 text-xs text-gray-500 bg-[#FBF9F5] p-4 rounded-xl border border-gray-100">
                <p>
                  <strong className="text-gray-700">Total Copies:</strong>{" "}
                  {book.copies || 1}
                </p>
                <p>
                  <strong className="text-gray-700">Added By:</strong>{" "}
                  {book.userName || "Unknown"} ({book.userEmail || "N/A"})
                </p>
                <p>
                  <strong className="text-gray-700">Added Date:</strong>{" "}
                  {book.addedDate
                    ? new Date(book.addedDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
            <div className="pt-4">
              <button
                onClick={handleBorrowBook}
                disabled={borrowing}
                className="w-full py-3.5 px-6 text-sm font-semibold text-white bg-[#2D5A3F] rounded-xl hover:bg-[#234631] transition-all duration-300 shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {borrowing ? "Processing Borrow..." : "Borrow This Book"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
