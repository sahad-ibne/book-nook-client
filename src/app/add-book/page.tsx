"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function AddBookPage() {
  const router = useRouter();

  const loggedInUser = {
    name: "Sahad Ibne",
    email: "sahad@gmail.com",
  };

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "Fiction",
    copies: 1,
    image: "",
    description: "",
  });

  const [imageType, setImageType] = useState<"url" | "file">("url");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Laptop theke file select korar handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      // Local preview URL ba mock URL toiri korchi
      const fakeUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: fakeUrl }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newBookData = {
      ...formData,
      userName: loggedInUser.name,
      userEmail: loggedInUser.email,
      addedDate: new Date().toISOString(),
    };

    try {
      console.log("Submitting Book Data:", newBookData);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Book added successfully to the library!", {
        style: {
          background: "#2D5A3F",
          color: "#fff",
          fontSize: "14px",
        },
      });

      setFormData({
        title: "",
        author: "",
        category: "Fiction",
        copies: 1,
        image: "",
        description: "",
      });
      setSelectedFileName("");

      setTimeout(() => {
        router.push("/books");
      }, 1500);
    } catch (error) {
      toast.error("Failed to add book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] py-16 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Add a Book
          </h1>
          <p className="text-sm text-gray-600">
            Put a book from your shelf into the library.
          </p>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-200/60">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Book Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Atomic Habits"
                  className="w-full px-4 py-3 bg-[#FBF9F5] border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#2D5A3F] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Author Name
                </label>
                <input
                  type="text"
                  name="author"
                  required
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="e.g. James Clear"
                  className="w-full px-4 py-3 bg-[#FBF9F5] border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#2D5A3F] transition"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#FBF9F5] border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#2D5A3F] transition"
                >
                  <option value="Fiction">Fiction</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                  <option value="Kids">Kids</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Total Copies
                </label>
                <input
                  type="number"
                  name="copies"
                  min={1}
                  required
                  value={formData.copies}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#FBF9F5] border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#2D5A3F] transition"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Book Image
                </label>
                <div className="flex gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setImageType("url")}
                    className={`px-2.5 py-1 rounded-md font-medium transition ${
                      imageType === "url"
                        ? "bg-[#2D5A3F] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Image URL
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageType("file")}
                    className={`px-2.5 py-1 rounded-md font-medium transition ${
                      imageType === "file"
                        ? "bg-[#2D5A3F] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Upload from Laptop
                  </button>
                </div>
              </div>

              {imageType === "url" ? (
                <input
                  type="url"
                  name="image"
                  required
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://i.ibb.co.com/... or image link"
                  className="w-full px-4 py-3 bg-[#FBF9F5] border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#2D5A3F] transition"
                />
              ) : (
                <div className="relative flex items-center w-full px-4 py-2.5 bg-[#FBF9F5] border border-gray-200 rounded-xl text-sm">
                  <input
                    type="file"
                    accept="image/*"
                    required={!formData.image}
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="flex items-center justify-between w-full text-gray-600">
                    <span className="truncate">
                      {selectedFileName
                        ? selectedFileName
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
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Short Description
              </label>
              <textarea
                name="description"
                rows={4}
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a brief summary about the book..."
                className="w-full px-4 py-3 bg-[#FBF9F5] border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#2D5A3F] transition resize-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-gray-100">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  User Name (Logged in)
                </label>
                <input
                  type="text"
                  readOnly
                  value={loggedInUser.name}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-600 cursor-not-allowed select-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  User Email (Logged in)
                </label>
                <input
                  type="email"
                  readOnly
                  value={loggedInUser.email}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-600 cursor-not-allowed select-none"
                />
              </div>
            </div>
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 text-sm font-semibold text-white bg-[#2D5A3F] rounded-xl hover:bg-[#234631] transition-all duration-300 shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? "Adding Book..." : "Add Book"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
