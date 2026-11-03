"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { serverBaseUrl } from "@/lib/server";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

export default function AddBookPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  async function uploadImage(file: File) {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey)
      throw new Error(
        "Image upload is not configured. Please add NEXT_PUBLIC_IMGBB_API_KEY.",
      );
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
      if (selectedFile) uploadedImage = await uploadImage(selectedFile);
      if (!uploadedImage) throw new Error("Please provide a book image.");

      const response = await fetch(`${serverBaseUrl}/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.get("title"),
          author: form.get("author"),
          category: form.get("category"),
          description: form.get("description"),
          image: uploadedImage,
          copies: 1,
          userName: session.user.name,
          userEmail: session.user.email,
          addedDate: new Date().toISOString(),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to add book");

      toast.success("Book added successfully!");
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
      <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
          Add a Book
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Book Title">
              <input
                required
                name="title"
                className="input"
                placeholder="Atomic Habits"
              />
            </Field>
            <Field label="Author Name">
              <input
                required
                name="author"
                className="input"
                placeholder="James Clear"
              />
            </Field>
          </div>
          <Field label="Category">
            <select
              required
              name="category"
              className="input"
              defaultValue="Fiction"
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </Field>
          <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
            <Field label="Book Image URL">
              <input
                type="url"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                className="input"
                placeholder="https://..."
              />
            </Field>
            <Field label="Or upload an image">
              <input
                type="file"
                accept="image/*"
                onChange={(event) =>
                  setSelectedFile(event.target.files?.[0] || null)
                }
                className="block w-full text-xs file:mr-3 file:rounded-lg file:border-0 file:bg-[#2D5A3F] file:px-3 file:py-3 file:text-white"
              />
            </Field>
          </div>
          <Field label="Short Description">
            <textarea
              required
              name="description"
              rows={4}
              className="input resize-none"
              placeholder="Write a brief summary..."
            />
          </Field>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="User Name (read-only)">
              <input
                readOnly
                value={session?.user?.name || ""}
                className="input bg-gray-100"
              />
            </Field>
            <Field label="User Email (read-only)">
              <input
                readOnly
                value={session?.user?.email || ""}
                className="input bg-gray-100"
              />
            </Field>
          </div>
          <button
            disabled={loading}
            className="w-full rounded-xl bg-[#2D5A3F] py-3.5 text-sm font-semibold text-white disabled:opacity-50"
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
