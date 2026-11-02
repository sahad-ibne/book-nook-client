"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function BannerSlider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const slides = [
    {
      id: 1,
      tag: "BOOKNOOK LIBRARY",
      title: "Borrow, read, return. Repeat.",
      description:
        "Seven days for every book. Return it with one click when you are done.",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1920&auto=format&fit=crop",
    },
    {
      id: 2,
      tag: "CURATED COLLECTION",
      title: "Share the books on your shelf",
      description:
        "Add the books you have finished. Let other readers enjoy them too.",
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1920&auto=format&fit=crop",
    },
    {
      id: 3,
      tag: "ENDLESS DISCOVERY",
      title: "Explore worlds between pages",
      description:
        "Discover fiction, science, history, and kids' stories all in one place.",
      image:
        "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1920&auto=format&fit=crop",
    },
    {
      id: 4,
      tag: "KNOWLEDGE HUB",
      title: "Read more, learn every single day",
      description:
        "Expand your mind with our curated collection of books ready for borrowing.",
      image:
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1920&auto=format&fit=crop",
    },
    {
      id: 5,
      tag: "READERS CHOICE",
      title: "Discover timeless classics & modern hits",
      description:
        "Find your next favorite read from our expanding library collection.",
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1920&auto=format&fit=crop",
    },
    {
      id: 6,
      tag: "LIBRARY COMMUNITY",
      title: "Connect through stories and knowledge",
      description:
        "Borrow books, share reviews, and be part of an active reading community.",
      image:
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1920&auto=format&fit=crop",
    },
  ];

  if (!mounted) {
    return (
      <div className="w-full h-[520px] sm:h-[600px] bg-[#121614] flex items-center justify-center text-white">
        <div className="animate-pulse text-[#2D5A3F] font-semibold text-lg">
          Loading BookNook...
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[520px] sm:h-[600px] overflow-hidden bg-[#121614]">
      <Swiper
        modules={[Autoplay, Pagination]}
        speed={800}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-full mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className="relative w-full h-full bg-[#121614]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
            </div>
            <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-center px-6 sm:px-12 lg:px-16 text-white z-10">
              <div className="max-w-xl space-y-4">
                <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#8CB89B] uppercase">
                  {slide.tag}
                </span>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-[#FBF9F5]">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  {slide.description}
                </p>
                <div className="pt-3">
                  <Link
                    href="/books"
                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-[#2D5A3F] rounded-xl hover:bg-[#234631] transition-all duration-300 shadow-md hover:shadow-xl"
                  >
                    Browse Books
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
