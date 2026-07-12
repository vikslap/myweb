"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";

interface MainLayoutWrapperProps {
  children: React.ReactNode;
}

export default function MainLayoutWrapper({
  children,
}: MainLayoutWrapperProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      {/* 1. Wire state trigger direct to the Navbar callback */}
      <Navbar onContactClick={() => setIsContactOpen(true)} />

      {/* 2. Page children core injection */}
      <div className="flex-1 flex flex-col">{children}</div>

      {/* 3. Global Contact Modal Popup Component */}
      <ContactSection
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* 4. Minimal Footer */}
      <footer className="w-full bg-(--color-brand-cream) border-t border-slate-200/60 py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm font-medium text-slate-500">
          © {new Date().getFullYear()} Souveek Pal | All rights reserved.
        </div>
      </footer>
    </>
  );
}
