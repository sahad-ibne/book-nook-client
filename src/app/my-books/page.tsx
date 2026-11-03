"use client";

import React, { useEffect, useState } from "react";
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
  userEmail: string;
}
const categoriesList = [
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
];

export default function MyBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const loggedInUserEmail = "sahad@gmail.com";

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [bookToDelete, setBookToDelete] = useState<string | null>(null);

  const [editModalOpen, setEditModalOpen] = useState(false);

  const [currentBook, setCurrentBook] = useState<Book | null>(null);

  const [updating, setUpdating] = useState(false);

  const [editImageType, setEditImageType] = useState<"url" | "file">("url");

  const [editImageUrl, setEditImageUrl] = useState("");

  const [editSelectedFileName, setEditSelectedFileName] = useState("");

  const fetchMyBooks = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/my-books?email=${loggedInUserEmail}`,
      );
      if (!response.ok) throw new Error("Failed to fetch my books");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to load your books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBooks();
  }, []);
  const openEditModal = (book: Book) => {
    setCurrentBook(book);
    setEditImageUrl(book.image || "");
    setEditImageType("url");
    setEditSelectedFileName("");
    setEditModalOpen(true);
  };

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditSelectedFileName(file.name);
      const fakeUrl = URL.createObjectURL(file);
      setEditImageUrl(fakeUrl);
    }
  };

  const confirmDelete = (id: string) => {
    setBookToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteBook = async () => {
    if (!bookToDelete) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/books/${bookToDelete}`,
        { method: "DELETE" },
      );

      if (!res.ok) throw new Error("Failed to delete");

      setBooks(books.filter((b) => b._id !== bookToDelete));
      toast.success("Book deleted successfully!", {
        style: { background: "#2D5A3F", color: "#fff", fontSize: "14px" },
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete book.");
    } finally {
      setDeleteModalOpen(false);
      setBookToDelete(null);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentBook) return;
    setUpdating(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());

    const updatedData = {
      ...formObject,
      image: editImageUrl || formObject.image || currentBook.image,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/books/${currentBook._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        },
      );

      if (!res.ok) throw new Error("Failed to update");

      toast.success("Book updated successfully!", {
        style: { background: "#2D5A3F", color: "#fff", fontSize: "14px" },
      });

      setEditModalOpen(false);
      fetchMyBooks();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update book.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] py-16 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            My Added Books
          </h1>
          <p className="text-sm text-gray-600">
            Manage, edit, or remove the books you have added to the library
            shelf.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-sm text-gray-500 animate-pulse">
              Loading your books...
            </p>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <p className="text-sm text-gray-500">
              You have not added any books yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 w-full bg-gray-100">
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute top-4 right-4 px-3 py-1 bg-white/90 text-xs font-semibold text-[#2D5A3F] rounded-full shadow-sm">
                      {book.category}
                    </span>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      By{" "}
                      <span className="font-medium text-gray-700">
                        {book.author}
                      </span>
                    </p>
                    <p className="text-xs text-gray-400 line-clamp-2">
                      {book.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => openEditModal(book)}
                    className="py-2 px-3 text-xs font-semibold text-[#2D5A3F] border border-[#2D5A3F] rounded-xl hover:bg-[#2D5A3F] hover:text-white transition text-center"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(book._id)}
                    className="py-2 px-3 text-xs font-semibold text-red-600 border border-red-200 rounded-xl hover:bg-red-600 hover:text-white transition text-center"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-lg space-y-4 text-center">
            <h3 className="text-lg font-bold text-gray-900">
              Confirm Deletion
            </h3>
            <p className="text-sm text-gray-600">
              Are you sure you want to remove this book from the library
              database? This action cannot be undone.
            </p>
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="flex-1 py-2.5 text-xs font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteBook}
                className="flex-1 py-2.5 text-xs font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {editModalOpen && currentBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 overflow-y-auto py-10">
          <div className="bg-white rounded-3xl p-8 max-w-xl w-full shadow-xl space-y-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h3 className="text-xl font-bold text-gray-900">Edit Book</h3>
              <button
                onClick={() => setEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Book Title
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={currentBook.title}
                  required
                  className="w-full px-4 py-2.5 bg-[#FBF9F5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D5A3F]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    name="author"
                    defaultValue={currentBook.author}
                    required
                    className="w-full px-4 py-2.5 bg-[#FBF9F5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D5A3F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    defaultValue={currentBook.category}
                    className="w-full px-4 py-2.5 bg-[#FBF9F5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D5A3F]"
                  >
                    {categoriesList.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Total Copies
                </label>
                <input
                  type="number"
                  name="copies"
                  defaultValue={currentBook.copies || 1}
                  min={1}
                  required
                  className="w-full px-4 py-2.5 bg-[#FBF9F5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D5A3F]"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-700 uppercase">
                    Book Image
                  </label>
                  <div className="flex gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setEditImageType("url")}
                      className={`px-2.5 py-1 rounded-md font-medium transition ${
                        editImageType === "url"
                          ? "bg-[#2D5A3F] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      Image URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditImageType("file")}
                      className={`px-2.5 py-1 rounded-md font-medium transition ${
                        editImageType === "file"
                          ? "bg-[#2D5A3F] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      Upload from Laptop
                    </button>
                  </div>
                </div>

                {editImageType === "url" ? (
                  <input
                    type="url"
                    name="image"
                    value={editImageUrl}
                    onChange={(e) => setEditImageUrl(e.target.value)}
                    required
                    placeholder="https://i.ibb.co.com/... or image link"
                    className="w-full px-4 py-2.5 bg-[#FBF9F5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D5A3F]"
                  />
                ) : (
                  <div className="relative flex items-center w-full px-4 py-2 bg-[#FBF9F5] border border-gray-200 rounded-xl text-sm">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleEditFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                    />
                    <div className="flex items-center justify-between w-full text-gray-600">
                      <span className="truncate">
                        {editSelectedFileName
                          ? editSelectedFileName
                          : "Choose File No file chosen"}
                      </span>
                      <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-xs font-medium">
                        Browse
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Short Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={currentBook.description}
                  required
                  className="w-full px-4 py-2.5 bg-[#FBF9F5] border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:border-[#2D5A3F]"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="w-1/2 py-3 text-xs font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="w-1/2 py-3 text-xs font-semibold text-white bg-[#2D5A3F] rounded-xl hover:bg-[#234631] transition"
                >
                  {updating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
