"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp, signIn } from "@/lib/auth-client";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (pass: string) => {
    const hasUppercase = /[A-Z]/.test(pass);
    const hasLowercase = /[a-z]/.test(pass);
    const isValidLength = pass.length >= 6;

    if (!isValidLength) {
      return "Password must be at least 6 characters long.";
    }
    if (!hasUppercase) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!hasLowercase) {
      return "Password must contain at least one lowercase letter.";
    }
    return "";
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const errorMsg = validatePassword(password);
    if (errorMsg) {
      setPasswordError(errorMsg);
      toast.error(errorMsg);
      return;
    }
    setPasswordError("");
    setLoading(true);

    try {
      await signUp.email(
        {
          email,
          password,
          name,
          image,
          callbackURL: "/login",
        },
        {
          onSuccess: () => {
            toast.success("Registration successful! Please login.", {
              style: { background: "#2D5A3F", color: "#fff", fontSize: "14px" },
            });
            router.push("/login");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Registration failed. Try again.");
            setLoading(false);
          },
        },
      );
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
      setLoading(false);
    }
  };
  const handleGoogleLogin = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-gray-200/80 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Create an Account
          </h1>
          <p className="text-xs text-gray-500">
            Register yourself to explore BookNook library
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
            Or register with email
          </span>
          <span className="h-px bg-gray-200 flex-1"></span>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Sahad Ibne"
              className="w-full px-4 py-3 bg-[#FBF9F5] border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#2D5A3F]"
            />
          </div>
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
              className="w-full px-4 py-3 bg-[#FBF9F5] border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#2D5A3F]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Photo URL
            </label>
            <input
              type="url"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://i.ibb.co.com/... or image link"
              className="w-full px-4 py-3 bg-[#FBF9F5] border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#2D5A3F]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              placeholder="••••••••"
              className={`w-full px-4 py-3 bg-[#FBF9F5] border rounded-xl text-sm text-gray-900 focus:outline-none transition ${
                passwordError
                  ? "border-red-500"
                  : "border-gray-200 focus:border-[#2D5A3F]"
              }`}
            />
            {passwordError && (
              <p className="text-xs text-red-500 mt-1.5 font-medium">
                {passwordError}
              </p>
            )}
            <p className="text-[11px] text-gray-400 mt-1">
              Must be at least 6 characters with 1 uppercase & 1 lowercase
              letter.
            </p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2D5A3F] rounded-xl hover:bg-[#234631] transition shadow-md disabled:opacity-50 mt-2"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>
        <p className="text-center text-xs text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#2D5A3F] hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
