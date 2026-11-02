"use client";

import React from "react";
import { Search, BookOpen, RotateCcw } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      id: "01",
      icon: <Search className="w-6 h-6 text-[#2D5A3F]" />,
      title: "Discover & Choose",
      description:
        "Browse our expansive catalog to find your next favorite story, research material, or classic novel.",
    },
    {
      id: "02",
      icon: <BookOpen className="w-6 h-6 text-[#2D5A3F]" />,
      title: "Borrow Instantly",
      description:
        "Request and borrow any available book with a single click, completely hassle-free.",
    },
    {
      id: "03",
      icon: <RotateCcw className="w-6 h-6 text-[#2D5A3F]" />,
      title: "Read & Return",
      description:
        "Enjoy reading for up to 7 days, then return or extend your borrow duration easily.",
    },
  ];

  return (
    <section className="py-20 bg-[#FBF9F5]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#E08552] uppercase">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            How Borrowing Works
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Getting your hands on great literature has never been easier. Three
            steps to start reading.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step) => (
            <div
              key={step.id}
              className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#2D5A3F]/10 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-3xl font-bold text-gray-200">
                    {step.id}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
