"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import toast, { Toaster } from "react-hot-toast";
import { serverBaseUrl } from "@/lib/server";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
}

export default function AllBooksPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#FBF9F5]" />}>
      <AllBooksContent />
    </Suspense>
  );
}

function AllBooksContent() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    const url = selectedCategory
      ? `${serverBaseUrl}/books/category/${encodeURIComponent(selectedCategory)}`
      : `${serverBaseUrl}/allBooks`;
    fetch(url, { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.message || "Failed to fetch books");
        setBooks(data);
      })
      .catch((error) => toast.error(error.message || "Failed to fetch books"))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  return (
    <main className="min-h-screen bg-[#FBF9F5] px-4 py-16">
      <Toaster position="top-center" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            {selectedCategory
              ? `${selectedCategory} Books`
              : "All Books Collection"}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Explore books from our community library.
          </p>
        </div>
        {loading ? (
          <p className="text-center text-sm text-gray-500">Loading books...</p>
        ) : books.length === 0 ? (
          <p className="rounded-2xl border border-gray-200 bg-white py-20 text-center text-sm text-gray-500">
            No books found.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <article
                key={book._id}
                className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-64 w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-6">
                  <span className="mb-2 text-xs font-semibold uppercase text-[#2D5A3F]">
                    {book.category}
                  </span>
                  <h2 className="text-lg font-bold text-gray-900">
                    {book.title}
                  </h2>
                  <p className="mb-6 mt-1 text-sm text-gray-500">
                    By {book.author}
                  </p>
                  <Link
                    href={`/books/${book._id}`}
                    className="mt-auto rounded-xl border border-gray-900 px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wider transition hover:border-[#2D5A3F] hover:bg-[#2D5A3F] hover:text-white"
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
