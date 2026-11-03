"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { serverBaseUrl } from "@/lib/server";

interface Book {
  _id?: string;
  title: string;
  author: string;
  category: string;
  image: string;
  addedDate?: string;
}

export default function NewArrivals() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        const response = await fetch(`${serverBaseUrl}/latest-books`);
        if (!response.ok) {
          throw new Error("Failed to fetch latest books");
        }
        const data = await response.json();
        setBooks(data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching latest books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBooks();
  }, []);

  return (
    <section className="py-20 bg-[#FBF9F5]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-gray-200/80 pb-6">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#E08552] uppercase">
              Fresh Additions
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mt-1">
              New Arrivals
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Discover the latest books added by our community shelf.
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-sm text-gray-500 animate-pulse">
              Loading new arrivals...
            </p>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <p className="text-sm text-gray-500">No books added yet.</p>
          </div>
        ) : (
          <>
            {/* Grid Layout: 3 cards per row on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map((book, index) => (
                <div
                  key={book._id || index}
                  className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Book Image */}
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

                    {/* Book Info */}
                    <div className="p-6 space-y-2">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#2D5A3F] transition-colors line-clamp-1">
                        {book.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500">
                        By{" "}
                        <span className="font-medium text-gray-700">
                          {book.author}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* View Details Button */}
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

            {/* See All Books Button */}
            <div className="mt-12 text-center">
              <Link
                href="/books"
                className="inline-block px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2D5A3F] rounded-xl hover:bg-[#234631] transition-all duration-300 shadow-md"
              >
                See All Books
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
