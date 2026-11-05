"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { serverBaseUrl } from "@/lib/server";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

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

export default function AddBookPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  async function convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  async function uploadImageToImgBB(file: File) {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey) throw new Error("No API key");
    const data = new FormData();
    data.append("image", file);
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: data,
      },
    );
    const result = await response.json();
    if (!response.ok || !result.data?.url)
      throw new Error("Image upload failed");
    return String(result.data.url);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session?.user) {
      toast.error("Please login first.");
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      const form = new FormData(event.currentTarget);
      let uploadedImage = imageUrl.trim();

      if (selectedFile) {
        try {
          uploadedImage = await uploadImageToImgBB(selectedFile);
        } catch {
          uploadedImage = await convertFileToBase64(selectedFile);
        }
      }

      if (!uploadedImage) {
        uploadedImage =
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop";
      }

      const copiesValue = Number(form.get("copies")) || 1;

      const token = await getTokenFromClient();

      const response = await fetch(`${serverBaseUrl}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.get("title"),
          author: form.get("author"),
          category: form.get("category"),
          description: form.get("description"),
          image: uploadedImage,
          copies: copiesValue,
          userName: session.user.name,
          userEmail: session.user.email,
          addedDate: new Date().toISOString(),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to add book");

      toast.success("Book added successfully!", {
        style: { background: "#2D5A3F", color: "#fff", fontSize: "14px" },
      });
      setTimeout(() => router.push("/books"), 700);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to add book",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FBF9F5] px-4 py-16">
      <Toaster position="top-center" />
      <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200/80 bg-white p-8 sm:p-12 shadow-sm">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900 tracking-tight">
          Add a Book
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Book Title">
              <input
                required
                name="title"
                className="w-full px-4 py-3 bg-[#FBF9F5] border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#2D5A3F]"
                placeholder="Atomic Habits"
              />
            </Field>
            <Field label="Author Name">
              <input
                required
                name="author"
                className="w-full px-4 py-3 bg-[#FBF9F5] border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#2D5A3F]"
                placeholder="James Clear"
              />
            </Field>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Category">
              <select
                required
                name="category"
                className="w-full px-4 py-3 bg-[#FBF9F5] border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#2D5A3F]"
                defaultValue="Fiction"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Total Copies">
              <input
                type="number"
                required
                name="copies"
                min={0}
                defaultValue={1}
                className="w-full px-4 py-3 bg-[#FBF9F5] border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#2D5A3F]"
                placeholder="1"
              />
            </Field>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Book Image URL">
              <input
                type="url"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                className="w-full px-4 py-3 bg-[#FBF9F5] border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#2D5A3F]"
                placeholder="https://..."
              />
            </Field>
            <Field label="Or Upload An Image File">
              <input
                type="file"
                accept="image/*"
                onChange={(event) =>
                  setSelectedFile(event.target.files?.[0] || null)
                }
                className="w-full text-xs text-gray-500 file:mr-3 file:rounded-xl file:border-0 file:bg-[#2D5A3F] file:px-4 file:py-3 file:text-white file:font-semibold file:cursor-pointer hover:file:bg-[#234631] bg-[#FBF9F5] border border-gray-200 rounded-xl p-1.5"
              />
            </Field>
          </div>

          <Field label="Short Description">
            <textarea
              required
              name="description"
              rows={4}
              className="w-full px-4 py-3 bg-[#FBF9F5] border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#2D5A3F] resize-none"
              placeholder="Write a brief summary..."
            />
          </Field>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="User Name (read-only)">
              <input
                readOnly
                value={session?.user?.name || ""}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-600 select-none cursor-not-allowed"
              />
            </Field>
            <Field label="User Email (read-only)">
              <input
                readOnly
                value={session?.user?.email || ""}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-600 select-none cursor-not-allowed"
              />
            </Field>
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-[#2D5A3F] py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-md hover:bg-[#234631] transition disabled:opacity-50"
          >
            {loading ? "Adding Book..." : "Add Book"}
          </button>
        </form>
      </div>
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
