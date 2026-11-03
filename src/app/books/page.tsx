"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { serverBaseUrl } from "@/lib/server";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description?: string;
}

export default function BooksPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#FBF9F5] px-4 py-16"><LoadingSpinner label="Loading books..." /></main>}>
      <BooksContent />
    </Suspense>
  );
}

function BooksContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category")?.trim() || "";
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      try {
        const endpoint = category
          ? `${serverBaseUrl}/books/category/${encodeURIComponent(category)}`
          : `${serverBaseUrl}/allBooks`;
        const response = await fetch(endpoint, {
          cache: "no-store",
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to load books");
        setBooks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, [category]);

  return (
    <main className="min-h-screen bg-[#FBF9F5] px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold tracking-widest text-[#E08552] uppercase">
            {category || "All Books"}
          </span>
          <h1 className="mt-1 text-4xl font-bold text-gray-900">
            {category ? `${category} Books` : "Explore All Books"}
          </h1>
        </div>

        {loading ? (
          <LoadingSpinner label="Loading books..." />
        ) : books.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center">
            <p className="text-sm text-gray-500">
              {category ? `No books found in ${category}.` : "No books added yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <article
                key={book._id}
                className="flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm"
              >
                <div className="relative h-64 w-full bg-gray-100">
                  <Image
                    src={book.image || "/file.svg"}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#2D5A3F]">
                    {book.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="line-clamp-1 text-lg font-bold text-gray-900">
                    {book.title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">By {book.author}</p>
                  {book.description && (
                    <p className="mt-3 line-clamp-3 text-sm text-gray-600">
                      {book.description}
                    </p>
                  )}
                  <Link
                    href={`/books/${book._id}`}
                    className="mt-auto pt-6 text-center rounded-xl border border-gray-900 py-2.5 text-xs font-semibold uppercase tracking-wider text-gray-900 hover:border-[#2D5A3F] hover:bg-[#2D5A3F] hover:text-white"
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
