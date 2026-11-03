"use client";

import React from "react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-[#FBF9F5] flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md w-full space-y-6">
        <div className="w-20 h-20 bg-[#2D5A3F]/10 text-[#2D5A3F] rounded-3xl mx-auto flex items-center justify-center text-3xl font-bold">
          404
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-gray-500">
            Oops! The page you are looking for does not exist or has been moved.
          </p>
        </div>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-block w-full py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-white bg-[#2D5A3F] rounded-xl hover:bg-[#234631] transition shadow-md"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
