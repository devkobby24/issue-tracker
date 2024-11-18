import "./globals.css";
import "./theme-config.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import NavBar from "./components/ui/NavBar";
import Footer from "./components/ui/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react"

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TraceFlow",
  description: "A simple issue tracker app built with Next.js and Prisma",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${outfit.className}`}>
        <ClerkProvider dynamic>
          <NavBar />
          <main className="px-auto pt-20">{children}</main>
          <Analytics/>
          <Toaster />
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
