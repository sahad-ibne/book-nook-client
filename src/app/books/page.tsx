"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Book {
  _id?: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description?: string;
  copies?: number;
}

export default function AllBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/allBooks`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF9F5] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            All Books Collection
          </h1>
          <p className="text-sm text-gray-600">
            Explore and borrow literature from our community library shelf.
          </p>
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-sm text-gray-500 animate-pulse">
              Loading books from database...
            </p>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <p className="text-sm text-gray-500">
              No books found in the library yet.
            </p>
            <Link
              href="/add-book"
              className="inline-block mt-4 px-5 py-2.5 text-xs font-semibold text-white bg-[#2D5A3F] rounded-xl hover:bg-[#234631] transition"
            >
              Add the First Book
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book, index) => (
              <div
                key={book._id || index}
                className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
                    <Image
                      src={
                        book.image ||
                        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop"
                      }
                      alt={book.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-[#2D5A3F] rounded-full shadow-sm">
                      {book.category}
                    </span>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#2D5A3F] transition-colors line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      By
                      <span className="font-medium text-gray-700">
                        {book.author}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <Link
                    href={`/books/${book._id || index}`}
                    className="w-full block text-center py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-gray-900 border border-gray-900 rounded-xl hover:bg-[#2D5A3F] hover:border-[#2D5A3F] hover:text-white transition-all duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
