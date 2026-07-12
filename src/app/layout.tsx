import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Souveek Pal | Learning Experience Designer",
  description:
    "Instructional Design, E-learning Development, Explainer Videos, and Scenario-based Animation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Explicitly adding the background color class to the body element here */}
      <body className="min-h-full flex flex-col bg-(--color-brand-cream) text-(--color-brand-plum)">
        {/* Global Navigation Bar */}
        <Navbar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">{children}</div>

        {/* Minimal Footer */}
        <footer className="w-full bg-(--color-brand-cream) border-t border-slate-200/60 py-6 mt-auto">
          <div className="max-w-6xl mx-auto px-6 text-center text-sm font-medium text-slate-500">
            © {new Date().getFullYear()} Souveek Pal | All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
