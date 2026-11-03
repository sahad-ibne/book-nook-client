"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FBF9F5]" />}>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
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
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full py-3 px-4 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition flex items-center justify-center gap-3 shadow-sm"
        >
          <FcGoogle className="w-5 h-5" />
          Continue with Google
        </button>

        <div className="flex items-center justify-center space-x-4">
          <span className="h-px bg-gray-200 flex-1"></span>
          <span className="text-xs text-gray-400 uppercase tracking-widest">
            Or with email
          </span>
          <span className="h-px bg-gray-200 flex-1"></span>
        </div>
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
