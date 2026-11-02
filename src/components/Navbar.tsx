"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const user = {
    name: "Sahad Ibne",
    email: "sahad@gmail.com",
    image: "https://i.ibb.co.com/7XqW93v/avatar.png",
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-[#2D5A3F] flex items-center justify-center text-white shadow-sm">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold tracking-tight text-gray-900">
                BookNook
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6 font-medium text-sm text-gray-600">
            <Link href="/" className="hover:text-[#2D5A3F] transition-colors">
              Home
            </Link>
            <Link
              href="/books"
              className="hover:text-[#2D5A3F] transition-colors"
            >
              All Books
            </Link>
            <Link
              href="/add-book"
              className="hover:text-[#2D5A3F] transition-colors"
            >
              Add Book
            </Link>
            <Link
              href="/my-books"
              className="hover:text-[#2D5A3F] transition-colors"
            >
              My Books
            </Link>
            <Link
              href="/my-borrows"
              className="hover:text-[#2D5A3F] transition-colors"
            >
              My Borrows
            </Link>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#2D5A3F] transition"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-5 py-2 text-sm font-medium text-white bg-[#2D5A3F] rounded-xl hover:bg-[#234631] transition shadow-sm"
            >
              Register
            </Link>
            <Link
              href="/profile"
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#2D5A3F] ml-1"
            >
              <Image
                src={user.image}
                alt={user.name}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-3 text-sm">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 font-medium text-gray-800"
          >
            Home
          </Link>
          <Link
            href="/books"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 font-medium text-gray-800"
          >
            All Books
          </Link>
          <Link
            href="/add-book"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 font-medium text-gray-800"
          >
            Add Book
          </Link>
          <Link
            href="/my-books"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 font-medium text-gray-800"
          >
            My Books
          </Link>
          <Link
            href="/my-borrows"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 font-medium text-gray-800"
          >
            My Borrows
          </Link>

          <div className="pt-3 border-t border-gray-200 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-center py-2.5 font-medium text-gray-800 bg-gray-100 rounded-xl"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-center py-2.5 font-medium text-white bg-[#2D5A3F] rounded-xl"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
