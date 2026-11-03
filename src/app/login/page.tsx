"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await signIn.email(
      {
        email,
        password,
        callbackURL: callbackUrl,
      },
      {
        onSuccess: () => {
          toast.success("Logged in successfully!", {
            style: { background: "#2D5A3F", color: "#fff", fontSize: "14px" },
          });
          router.push(callbackUrl);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Invalid email or password.");
          setLoading(false);
        },
      },
    );
  };

  const handleGoogleLogin = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: callbackUrl,
    });
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-gray-200/80 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-xs text-gray-500">
            Sign in to your BookNook account
          </p>
        </div>

        {/* Google Social Login */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full py-3 px-4 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition flex items-center justify-center gap-3 shadow-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.19v3.15C3.17 21.36 7.23 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.19C.43 8.12 0 9.87 0 11.7c0 1.83.43 3.58 1.19 5.12l4.09-2.55z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.17 2.64 1.19 6.58l4.09 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center justify-center space-x-4">
          <span className="h-px bg-gray-200 flex-1"></span>
          <span className="text-xs text-gray-400 uppercase tracking-widest">
            Or with email
          </span>
          <span className="h-px bg-gray-200 flex-1"></span>
        </div>

        {/* Email Login Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sahad@gmail.com"
              className="w-full px-4 py-3 bg-[#FBF9F5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D5A3F]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-gray-700 uppercase">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-[#2D5A3F] font-medium hover:underline"
              >
                Forget Password?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-[#FBF9F5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2D5A3F]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2D5A3F] rounded-xl hover:bg-[#234631] transition shadow-md disabled:opacity-50 mt-2"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#2D5A3F] hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
