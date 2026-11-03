"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Borrow {
  _id: string;
  bookTitle: string;
  bookImage: string;
  borrowDate: string;
  returnDate: string;
  userEmail: string;
}

export default function MyBorrowsPage() {
  const { data: session } = useSession();
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState<string | null>(null);

  async function fetchBorrows() {
    if (!session?.user?.email) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/borrows?email=${session.user.email}`,
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to load borrowed books");
      setBorrows(data);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load borrowed books",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (session?.user?.email) {
      fetchBorrows();
    }
  }, [session]);

  async function returnBook(id: string) {
    setReturningId(id);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/borrows/${id}`,
        {
          method: "DELETE",
        },
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to return book");

      setBorrows((current) => current.filter((borrow) => borrow._id !== id));
      toast.success("Book returned successfully!", {
        style: { background: "#2D5A3F", color: "#fff", fontSize: "14px" },
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to return book",
      );
    } finally {
      setReturningId(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#FBF9F5] px-4 py-16">
      <Toaster position="top-center" />
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-10 text-center text-4xl font-bold text-gray-900">
          My Borrows
        </h1>
        {loading ? (
          <LoadingSpinner label="Loading borrowed books..." />
        ) : borrows.length === 0 ? (
          <p className="rounded-2xl border border-gray-200 bg-white py-20 text-center text-sm text-gray-500">
            You have no borrowed books.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-200 text-xs uppercase text-gray-500 bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4">Book</th>
                  <th className="px-6 py-4">Borrow Date</th>
                  <th className="px-6 py-4">Return Date</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {borrows.map((borrow) => (
                  <tr
                    key={borrow._id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-16 w-12 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={borrow.bookImage}
                            alt={borrow.bookTitle}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="font-semibold text-gray-900">
                          {borrow.bookTitle}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(borrow.borrowDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(borrow.returnDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => returnBook(borrow._id)}
                        disabled={returningId === borrow._id}
                        className="rounded-xl border border-[#2D5A3F] px-4 py-2 text-xs font-semibold text-[#2D5A3F] hover:bg-[#2D5A3F] hover:text-white disabled:opacity-50 transition"
                      >
                        {returningId === borrow._id
                          ? "Returning..."
                          : "Return Book"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
