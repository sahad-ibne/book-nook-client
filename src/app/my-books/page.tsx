"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { serverBaseUrl } from "@/lib/server";
import Image from "next/image";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  copies?: number;
}

const categories = [
  "Fiction",
  "Science Fiction",
  "Romance",
  "History",
  "Self-Help",
  "Fantasy",
  "Adventure",
  "Dystopian",
  "Biography",
  "Finance",
  "Motivation",
  "Communication",
  "Entrepreneurship",
  "Programming",
  "Psychology",
  "Philosophical Fiction",
  "Science",
  "Kids",
  "Others",
];

export default function MyBooksPage() {
  const { data: session } = useSession();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState<Book | null>(null);
  const [saving, setSaving] = useState(false);

  async function fetchBooks() {
    if (!session?.user?.email) return;
    try {
      const response = await fetch(
        `${serverBaseUrl}/my-books?email=${encodeURIComponent(session.user.email)}`,
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to load your books");
      setBooks(data);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to load your books",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchBooks() {
      if (!session?.user?.email) return;
      try {
        const response = await fetch(
          `${serverBaseUrl}/my-books?email=${encodeURIComponent(session.user.email)}`,
        );
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.message || "Failed to load your books");
        setBooks(data);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to load your books",
        );
      } finally {
        setLoading(false);
      }
    }

    if (session?.user?.email) {
      fetchBooks();
    }
  }, [session?.user?.email]);

  async function updateBook(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;
    setSaving(true);
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch(`${serverBaseUrl}/books/${editing._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.get("title"),
          author: data.get("author"),
          category: data.get("category"),
          image: data.get("image"),
          description: data.get("description"),
          copies: editing.copies || 1,
        }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to update book");
      toast.success("Book updated successfully!", {
        style: { background: "#2D5A3F", color: "#fff", fontSize: "14px" },
      });
      setEditing(null);
      await fetchBooks();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update book",
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteBook() {
    if (!deleting) return;
    setSaving(true);
    try {
      const response = await fetch(`${serverBaseUrl}/books/${deleting._id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to delete book");
      setBooks((current) =>
        current.filter((book) => book._id !== deleting._id),
      );
      toast.success("Book deleted successfully!", {
        style: { background: "#2D5A3F", color: "#fff", fontSize: "14px" },
      });
      setDeleting(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete book",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FBF9F5] px-4 py-16">
      <Toaster position="top-center" />
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-12 text-center text-4xl font-bold text-gray-900">
          My Added Books
        </h1>
        {loading ? (
          <p className="text-center text-sm text-gray-500">
            Loading your books...
          </p>
        ) : books.length === 0 ? (
          <p className="rounded-2xl border border-gray-200 bg-white py-20 text-center text-sm text-gray-500">
            You have not added any books yet.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <article
                key={book._id}
                className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 w-full bg-gray-100">
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold uppercase text-[#2D5A3F]">
                      {book.category}
                    </span>
                    <h2 className="mt-1 text-lg font-bold text-gray-900 line-clamp-1">
                      {book.title}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      By {book.author}
                    </p>
                    <p className="mt-3 line-clamp-2 text-xs text-gray-400">
                      {book.description}
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setEditing(book)}
                      className="rounded-xl border border-[#2D5A3F] py-2 text-xs font-semibold text-[#2D5A3F] hover:bg-[#2D5A3F] hover:text-white transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleting(book)}
                      className="rounded-xl border border-red-200 py-2 text-xs font-semibold text-red-600 hover:bg-red-600 hover:text-white transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <form
            onSubmit={updateBook}
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-8 shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="text-xl font-bold text-gray-900">Edit Book</h2>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="text-gray-400 hover:text-gray-600 font-semibold"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <Field label="Book Title">
                <input
                  required
                  name="title"
                  defaultValue={editing.title}
                  className="w-full px-4 py-3 bg-[#FBF9F5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D5A3F]"
                />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Author Name">
                  <input
                    required
                    name="author"
                    defaultValue={editing.author}
                    className="w-full px-4 py-3 bg-[#FBF9F5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D5A3F]"
                  />
                </Field>
                <Field label="Category">
                  <select
                    name="category"
                    defaultValue={editing.category}
                    className="w-full px-4 py-3 bg-[#FBF9F5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D5A3F]"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label="Image URL">
                <input
                  required
                  name="image"
                  type="url"
                  defaultValue={editing.image}
                  className="w-full px-4 py-3 bg-[#FBF9F5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D5A3F]"
                />
              </Field>
              <Field label="Short Description">
                <textarea
                  required
                  name="description"
                  defaultValue={editing.description}
                  rows={4}
                  className="w-full px-4 py-3 bg-[#FBF9F5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D5A3F] resize-none"
                />
              </Field>
            </div>
            <button
              disabled={saving}
              className="mt-6 w-full rounded-xl bg-[#2D5A3F] py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:bg-[#234631] transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      )}
      {deleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl space-y-4">
            <h2 className="text-lg font-bold text-gray-900">
              Confirm Deletion
            </h2>
            <p className="text-sm text-gray-600">
              Remove &quot;{deleting.title}&quot; from the library? This cannot
              be undone.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleting(null)}
                className="rounded-xl bg-gray-100 py-3 text-xs font-semibold text-gray-700 hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={deleteBook}
                disabled={saving}
                className="rounded-xl bg-red-600 py-3 text-xs font-semibold text-white hover:bg-red-700 transition disabled:opacity-50"
              >
                {saving ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2 text-xs font-semibold uppercase tracking-wider text-gray-700">
      <span>{label}</span>
      {children}
    </label>
  );
}
