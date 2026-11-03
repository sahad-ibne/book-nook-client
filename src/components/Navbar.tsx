"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/books" },
    { name: "Add Book", href: "/add-book" },
    { name: "My Books", href: "/my-books" },
    { name: "My Borrows", href: "/my-borrows" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

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

        {/* Auth Actions / User Profile Dropdown */}
        <div className="flex items-center gap-4">
          {isPending ? (
            <div className="text-xs text-gray-400">Loading...</div>
          ) : session?.user ? (
            <div className="relative" ref={dropdownRef}>
              {/* User Avatar Button */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 focus:outline-none"
              >
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#2D5A3F]/30 bg-gray-100">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-bold text-[#2D5A3F] bg-[#2D5A3F]/10">
                      {session.user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </div>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 px-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-gray-100 mb-1">
                    <p className="text-xs font-bold text-gray-900 truncate">
                      {session.user.name}
                    </p>
                    <p className="text-[10px] text-gray-500 truncate">
                      {session.user.email}
                    </p>
                  </div>

                  <Link
                    href="/my-profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-[#FBF9F5] rounded-xl transition"
                  >
                    My Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition mt-1"
                  >
                    Logout
                  </button>
                </div>
              )}
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
