"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function BookStories() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Left aligned header matching News section style */}
        <div className="mb-12 border-b border-gray-200/80 pb-6">
          <span className="text-xs font-bold tracking-widest text-[#E08552] uppercase">
            Visual Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mt-1">
            Book Stories & Visuals
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Explore curated reading aesthetics, moments, and collection
            highlights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="relative group overflow-hidden rounded-2xl h-[420px] lg:h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&auto=format&fit=crop"
              alt="Book Story Signature"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white space-y-2">
              <span className="text-xs font-medium tracking-wider text-[#E08552] uppercase">
                Featured Story
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold leading-tight">
                The Art of Physical Reading in the Digital Age
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 line-clamp-2">
                Discover why tactile paper pages still hold a timeless
                psychological benefit over screen reading.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="relative group overflow-hidden rounded-2xl h-[220px] sm:h-[238px]">
              <Image
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop"
                alt="Minimal Covers"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs text-[#E08552] font-semibold">
                  Minimalist Craft
                </p>
                <h4 className="text-sm font-bold">Modern Cover Designs</h4>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-2xl h-[220px] sm:h-[238px]">
              <Image
                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop"
                alt="Colorful Classics"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs text-[#E08552] font-semibold">
                  Vibrant Editions
                </p>
                <h4 className="text-sm font-bold">Collector Series</h4>
              </div>
            </div>

            <div className="sm:col-span-2 relative group overflow-hidden rounded-2xl h-[220px] sm:h-[238px]">
              <Image
                src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200&auto=format&fit=crop"
                alt="Library Aesthetics"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 text-white flex justify-between items-end">
                <div>
                  <p className="text-xs text-[#E08552] font-semibold">
                    Curated Nook
                  </p>
                  <h4 className="text-base sm:text-lg font-bold">
                    Quiet Spaces & Thoughtful Pages
                  </h4>
                </div>
                <Link
                  href="/books"
                  className="text-xs font-semibold underline underline-offset-4 text-white hover:text-[#E08552] transition-colors"
                >
                  Explore Collection &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
