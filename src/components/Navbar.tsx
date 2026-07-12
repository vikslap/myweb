"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-(--color-brand-cream) border-b border-(--color-border) sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-(--color-brand-plum) tracking-tight"
            >
              Souveek Pal
            </Link>
          </div>

          {/* Desktop Right Navigation Panel */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-sm font-medium text-(--color-body-text) hover:text-(--color-brand-plum) transition-colors"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-(--color-body-text) hover:text-(--color-brand-plum) transition-colors"
            >
              Blog
            </Link>
            <Link
              href="#contact"
              className="text-sm font-semibold px-4 py-2 rounded-md bg-(--color-brand-plum) text-(--color-brand-cream) hover:bg-opacity-90 transition-all"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Actions Interface Trigger Panel */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-slate-500 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Responsive Sidebar Drawer Dropdown */}
      {isOpen && (
        <div className="md:hidden border-b border-(--color-border) bg-(--color-brand-cream) px-4 pt-2 pb-4 space-y-1">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-(--color-body-text) hover:bg-(--color-card-bg)"
          >
            Home
          </Link>
          <Link
            href="/blog"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-(--color-body-text) hover:bg-(--color-card-bg)"
          >
            Blog
          </Link>
          <Link
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="block text-center mt-4 px-3 py-2 rounded-md text-base font-medium bg-(--color-brand-plum) text-(--color-brand-cream)"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
