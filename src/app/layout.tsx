import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// Fix the path to look inside src/components directly:
import MainLayoutWrapper from "@/components/MainLayoutWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Stays securely on the Server side for SEO crawlers out of the box
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
      <body className="min-h-full flex flex-col bg-(--color-brand-cream) text-(--color-brand-plum)">
        {/* Pass elements down into our client-side context bridge */}
        <MainLayoutWrapper>{children}</MainLayoutWrapper>
      </body>
    </html>
  );
}
