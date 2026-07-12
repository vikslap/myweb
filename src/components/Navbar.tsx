"use client";

import Link from "next/link";

interface NavbarProps {
  onContactClick: () => void;
}

export default function Navbar({ onContactClick }: NavbarProps) {
  return (
    <header className="w-full border-b border-slate-200/60 bg-(--color-brand-cream) transition-colors duration-300 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-(--color-brand-plum) hover:opacity-80 transition-opacity"
        >
          Souveek Pal
        </Link>

        {/* Navigation Elements */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-semibold text-(--color-brand-plum) opacity-80 hover:opacity-100 transition-opacity"
          >
            Home
          </Link>

          <Link
            href="/blog"
            className="text-sm font-semibold text-(--color-brand-plum) opacity-80 hover:opacity-100 transition-opacity"
          >
            Blog
          </Link>

          {/* Contact Interactive Text Trigger */}
          <span
            role="button"
            tabIndex={0}
            onClick={() => {
              console.log("Global Nav Link Trigger Fired!");
              onContactClick();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onContactClick();
              }
            }}
            className="text-sm font-semibold text-(--color-brand-plum) opacity-80 hover:opacity-100 transition-opacity cursor-pointer select-none"
          >
            Contact
          </span>
        </div>
      </div>
    </header>
  );
}
