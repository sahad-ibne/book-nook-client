"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Article {
  id: number;
  image: string;
  title: string;
  description: string;
  fullContent: string;
  date: string;
}

export default function NewsArticles() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showMoreNewsModal, setShowMoreNewsModal] = useState(false);

  const articles: Article[] = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop",
      title: "How To Become A Beginner Book Writer",
      description:
        "Simple routines and daily habits that transform passive readers into published authors.",
      fullContent:
        "Writing your first book can feel daunting, but it all starts with consistent micro-habits. Set aside 15 minutes every morning to write without self-editing. Read widely in your chosen genre, observe human nature, and build characters rooted in authenticity.",
      date: "November 4, 2026",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=800&auto=format&fit=crop",
      title: "7 Books To Fight Laziness & Boredom",
      description:
        "Engaging fiction and inspiring non-fiction picks to reset your mind and boost focus.",
      fullContent:
        "When mental fatigue sets in, the right book can act as an instant cognitive catalyst. From fast-paced historical thrillers to actionable philosophy like Marcus Aurelius's 'Meditations', these curated recommendations will spark your curiosity and revitalize your drive.",
      date: "November 1, 2026",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&auto=format&fit=crop",
      title: "Jenny Oprah's Latest Book Club Pick",
      description:
        "An in-depth review of this season's most talk-about literary masterpiece.",
      fullContent:
        "Oprah's latest selection explores generational healing, intricate family dynamics, and the quiet resilience of human connection. Set against a coastal backdrop, the lyrical prose and unforgettable characters make it an essential autumn read.",
      date: "October 28, 2026",
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
            <button
              onClick={() => setShowMoreNewsModal(true)}
              className="inline-block px-5 py-2 text-xs font-semibold tracking-wider uppercase border border-gray-900 text-gray-900 hover:bg-[#2D5A3F] hover:border-[#2D5A3F] hover:text-white transition-all duration-300 shadow-sm cursor-pointer"
            >
              More News
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
            >
              <div>
                <div
                  onClick={() => setSelectedArticle(article)}
                  className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100 cursor-pointer"
                >
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h3
                    onClick={() => setSelectedArticle(article)}
                    className="text-lg font-bold text-gray-900 leading-snug hover:text-[#2D5A3F] transition-colors cursor-pointer"
                  >
                    {article.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-3">
                    {article.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="inline-flex items-center text-xs font-bold tracking-wider text-gray-800 uppercase hover:text-[#2D5A3F] transition-colors cursor-pointer"
                >
                  Read More <span className="ml-1 text-sm">&rarr;</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="relative h-56 w-full">
              <Image
                src={selectedArticle.image}
                alt={selectedArticle.title}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 w-9 h-9 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black transition"
              >
                ✕
              </button>
            </div>
            <div className="p-6 sm:p-8 space-y-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Published on {selectedArticle.date}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                {selectedArticle.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {selectedArticle.fullContent}
              </p>
              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#2D5A3F] rounded-xl hover:bg-[#234631] transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showMoreNewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h3 className="text-xl font-bold text-gray-900">
                Latest Literary Updates & Announcements
              </h3>
              <button
                onClick={() => setShowMoreNewsModal(false)}
                className="w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <div className="p-4 bg-[#FBF9F5] rounded-xl border border-gray-200/60 space-y-1">
                <span className="text-[10px] font-bold text-[#E08552] uppercase">
                  Announcement
                </span>
                <h4 className="text-sm font-bold text-gray-900">
                  BookNook Annual Community Reading Challenge 2026
                </h4>
                <p className="text-xs text-gray-600">
                  Join over 5,000 active members in exploring diverse genres and
                  sharing reviews this season.
                </p>
              </div>
              <div className="p-4 bg-[#FBF9F5] rounded-xl border border-gray-200/60 space-y-1">
                <span className="text-[10px] font-bold text-[#E08552] uppercase">
                  Literary Tip
                </span>
                <h4 className="text-sm font-bold text-gray-900">
                  How to Annotate Books Without Damaging Pages
                </h4>
                <p className="text-xs text-gray-600">
                  Discover transparent sticky notes and archival safe pencils
                  designed specifically for book lovers.
                </p>
              </div>
              <div className="p-4 bg-[#FBF9F5] rounded-xl border border-gray-200/60 space-y-1">
                <span className="text-[10px] font-bold text-[#E08552] uppercase">
                  Author Spotlight
                </span>
                <h4 className="text-sm font-bold text-gray-900">
                  Exclusive Q&A with Contemporary Fiction Writers
                </h4>
                <p className="text-xs text-gray-600">
                  Read exclusive interviews discussing world-building, character
                  arcs, and overcoming writer's block.
                </p>
              </div>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowMoreNewsModal(false)}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#2D5A3F] rounded-xl hover:bg-[#234631] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
