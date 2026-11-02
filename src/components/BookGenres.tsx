"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
const genres = [
  {
    name: "Science Fiction",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Romance",
    image:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "History",
    image:
      "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Self-Help",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Fantasy",
    image:
      "https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Adventure",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Dystopian",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Biography",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Finance",
    image:
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Motivation",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Communication",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Entrepreneurship",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Programming",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Psychology",
    image:
      "https://images.unsplash.com/photo-1507842229443-77783618cdc3?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Philosophical Fiction",
    image:
      "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=400&auto=format&fit=crop",
  },
];

export default function BookGenres() {
  return (
    <section className="py-20 bg-[#FBF9F5] border-t border-gray-200/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <div className="mb-12 space-y-2">
          <span className="text-xs font-bold tracking-widest text-[#E08552] uppercase">
            Explore Categories
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Book Genres
          </h2>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Browse through our wide range of book genres tailored to your
            reading taste.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {genres.map((genre, index) => (
            <Link
              key={index}
              href={`/books?category=${encodeURIComponent(genre.name)}`}
              className="group flex flex-col items-center space-y-3 p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300"
            >
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-sm border-2 border-transparent group-hover:border-[#2D5A3F] transition-all duration-300">
                <Image
                  src={genre.image}
                  alt={genre.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-[#2D5A3F] transition-colors">
                {genre.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
