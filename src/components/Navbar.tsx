"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/books" },
    { name: "Add Book", href: "/add-book" },
    { name: "My Books", href: "/my-books" },
    { name: "My Borrows", href: "/my-borrows" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2"
        >
          <span className="w-9 h-9 bg-[#2D5A3F] text-white rounded-xl flex items-center justify-center text-base shadow-sm">
            📚
          </span>
          BookNook
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs font-semibold tracking-wider transition-colors ${
                  isActive
                    ? "text-[#2D5A3F]"
                    : "text-gray-600 hover:text-[#2D5A3F]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Auth Actions / User Profile */}
        <div className="flex items-center gap-4">
          {isPending ? (
            <div className="text-xs text-gray-400">Loading...</div>
          ) : session?.user ? (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-gray-900">
                  {session.user.name}
                </p>
                <p className="text-[10px] text-gray-500">
                  {session.user.email}
                </p>
              </div>
              <button
                onClick={() =>
                  signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        router.push("/login");
                      },
                    },
                  })
                }
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 transition shadow-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-xs font-semibold text-gray-700 hover:text-[#2D5A3F] transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2.5 text-xs font-semibold text-white bg-[#2D5A3F] rounded-xl hover:bg-[#234631] transition shadow-sm"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
