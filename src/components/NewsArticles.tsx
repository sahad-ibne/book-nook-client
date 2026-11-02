"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function NewsArticles() {
  const articles = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop",
      title: "How To Become A Beginner Book Writer",
      description:
        "Simple routines and daily habits that transform passive readers into published authors.",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=800&auto=format&fit=crop",
      title: "7 Books To Fight Laziness & Boredom",
      description:
        "Engaging fiction and inspiring non-fiction picks to reset your mind and boost focus.",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&auto=format&fit=crop",
      title: "Jenny Oprah's Latest Book Club Pick",
      description:
        "An in-depth review of this season's most talk-about literary masterpiece.",
    },
  ];

  return (
    <section className="py-20 bg-[#FBF9F5]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-gray-200/80 pb-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              News & Article
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Updates, literary tips, and recommended reading guides.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              href="/news"
              className="inline-block px-5 py-2 text-xs font-semibold tracking-wider uppercase border border-gray-900 text-gray-900 hover:bg-[#2D5A3F] hover:border-[#2D5A3F] hover:text-white transition-all duration-300 shadow-sm"
            >
              More News
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
            >
              <div>
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-gray-900 leading-snug hover:text-[#2D5A3F] transition-colors cursor-pointer">
                    {article.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-3">
                    {article.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href="#"
                  className="inline-flex items-center text-xs font-bold tracking-wider text-gray-800 uppercase hover:text-[#2D5A3F] transition-colors"
                >
                  Read More <span className="ml-1 text-sm">&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
