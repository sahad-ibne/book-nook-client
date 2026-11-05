"use client";

import React, { useState } from "react";
import Image from "next/image";

interface StoryItem {
  title: string;
  category: string;
  description: string;
  fullContent: string;
  image: string;
}

export default function BookStories() {
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null);

  const stories: StoryItem[] = [
    {
      category: "Featured Story",
      title: "The Art of Physical Reading in the Digital Age",
      description:
        "Rediscover the joy of turning real pages, feeling the texture of paper, and enjoying a peaceful reading experience in a world full of screens.",
      fullContent:
        "In a world full of digital screens, physical books offer a unique reading experience. The feel of paper, the joy of turning pages, and the freedom from notifications make every reading moment special. Sometimes, the best way to relax is simply opening a book.",
      image:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&auto=format&fit=crop",
    },
    {
      category: "Minimalist Craft",
      title: "Modern Cover Designs",
      description:
        "Explore how creative book covers combine colors, typography, and artwork to capture attention and bring stories to life before the first page.",
      fullContent:
        "A book cover is the first impression of a story. Modern designs combine beautiful colors, creative typography, and unique illustrations to attract readers. Every cover has its own personality, making the journey of discovering a book even more exciting.",
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
    },
    {
      category: "Vibrant Editions",
      title: "Collector Series",
      description:
        "Discover the beauty of curated book collections, special editions, and timeless literary treasures that every passionate reader would love to own.",
      fullContent:
        "Every book collection tells a personal story. From timeless classics to special editions, each book holds unique value. Building a collection is more than collecting pages; it's about preserving memories, knowledge, and favorite stories.",
      image:
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop",
    },
    {
      category: "Curated Nook",
      title: "Quiet Spaces & Thoughtful Pages",
      description:
        "Find inspiration in peaceful reading corners, cozy environments, and quiet moments where you can slow down, relax, and reconnect with your favorite books.",
      fullContent:
        "A quiet corner and a good book can make any moment special. Create a comfortable reading space, take a break from daily distractions, and enjoy every page at your own pace. Sometimes, a little quiet time is all you need.",
      image:
        "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mb-12 border-b border-gray-200/80 pb-6">
          <span className="text-xs font-bold tracking-widest text-[#E08552] uppercase">
            Visual Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mt-1">
            Book Stories & Visuals
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Explore curated reading aesthetics, moments, and collection
            highlights. Click any story to view details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div
            onClick={() => setSelectedStory(stories[0])}
            className="relative group overflow-hidden rounded-2xl h-[420px] lg:h-[500px] cursor-pointer"
          >
            <Image
              src={stories[0].image}
              alt={stories[0].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white space-y-2">
              <span className="text-xs font-medium tracking-wider text-[#E08552] uppercase">
                {stories[0].category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold leading-tight group-hover:text-[#E08552] transition-colors">
                {stories[0].title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 line-clamp-2">
                {stories[0].description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div
              onClick={() => setSelectedStory(stories[1])}
              className="relative group overflow-hidden rounded-2xl h-[220px] sm:h-[238px] cursor-pointer"
            >
              <Image
                src={stories[1].image}
                alt={stories[1].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs text-[#E08552] font-semibold">
                  {stories[1].category}
                </p>
                <h4 className="text-sm font-bold group-hover:text-[#E08552] transition-colors">
                  {stories[1].title}
                </h4>
              </div>
            </div>

            <div
              onClick={() => setSelectedStory(stories[2])}
              className="relative group overflow-hidden rounded-2xl h-[220px] sm:h-[238px] cursor-pointer"
            >
              <Image
                src={stories[2].image}
                alt={stories[2].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs text-[#E08552] font-semibold">
                  {stories[2].category}
                </p>
                <h4 className="text-sm font-bold group-hover:text-[#E08552] transition-colors">
                  {stories[2].title}
                </h4>
              </div>
            </div>

            <div
              onClick={() => setSelectedStory(stories[3])}
              className="sm:col-span-2 relative group overflow-hidden rounded-2xl h-[220px] sm:h-[238px] cursor-pointer"
            >
              <Image
                src={stories[3].image}
                alt={stories[3].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 text-white flex justify-between items-end">
                <div>
                  <p className="text-xs text-[#E08552] font-semibold">
                    {stories[3].category}
                  </p>
                  <h4 className="text-base sm:text-lg font-bold group-hover:text-[#E08552] transition-colors">
                    {stories[3].title}
                  </h4>
                </div>
                <span className="text-xs font-semibold underline underline-offset-4 text-white hover:text-[#E08552] transition-colors">
                  Explore Story &rarr;
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="relative h-56 w-full">
              <Image
                src={selectedStory.image}
                alt={selectedStory.title}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 w-9 h-9 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black transition"
              >
                ✕
              </button>
            </div>
            <div className="p-6 sm:p-8 space-y-4">
              <span className="text-xs font-bold text-[#E08552] uppercase tracking-wider">
                {selectedStory.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                {selectedStory.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {selectedStory.fullContent}
              </p>
              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setSelectedStory(null)}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#2D5A3F] rounded-xl hover:bg-[#234631] transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
