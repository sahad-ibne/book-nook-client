"use client";

import React from "react";
import Image from "next/image";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function MyProfileContent() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const handleLogout = () => {
    signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] flex justify-center items-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 animate-pulse">
          Loading Profile...
        </p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] flex flex-col justify-center items-center space-y-4 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
        <p className="text-sm text-gray-500">
          Please login to view your profile.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#2D5A3F] rounded-xl hover:bg-[#234631] transition"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FBF9F5] px-4 py-16">
      <Toaster position="top-center" />
      <div className="mx-auto max-w-3xl rounded-3xl border border-gray-200/80 bg-white p-8 sm:p-12 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-gray-100 pb-8 text-center sm:text-left">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#2D5A3F]/20 bg-gray-100 shadow-inner">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "User"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-[#2D5A3F] bg-[#2D5A3F]/10">
                {session.user.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#E08552] uppercase tracking-wider">
              Community Member
            </span>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              {session.user.name}
            </h1>
            <p className="text-sm text-gray-500">{session.user.email}</p>
          </div>
        </div>
        <div className="gap-6">
          <div className="p-6 rounded-2xl bg-[#FBF9F5] border border-gray-200/60 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Account Status
            </span>
            <p className="text-sm font-semibold text-[#2D5A3F] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
              Active & Verified
            </p>
          </div>
        </div>
        <div className="flex gap-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => router.push("/my-books")}
            className="flex-1 py-3 text-xs font-semibold uppercase tracking-wider text-[#2D5A3F] bg-[#2D5A3F]/10 rounded-xl hover:bg-[#2D5A3F]/20 transition"
          >
            Manage My Books
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-red-600 rounded-xl hover:bg-red-700 transition shadow-sm"
          >
            Sign Out
          </button>
        </div>
      </div>
    </main>
  );
}
