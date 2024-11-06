import "@radix-ui/themes/styles.css";
import './globals.css'
import './theme-config.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from './components/ui/NavBar'
import { Theme, ThemePanel } from "@radix-ui/themes";
import Footer from "./components/ui/Footer";
import { Toaster } from "@/components/ui/toaster"
import {
  ClerkProvider,
} from '@clerk/nextjs' 


const inter = Inter({
  subsets: ['latin'],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'A simple issue tracker app built with Next.js and Prisma',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} `}>
      <body className={`${inter.className}`}>
      <ClerkProvider dynamic>
        <Theme accentColor="violet">
          <NavBar />
          <main className="px-auto">
            {children}
            {/* <ThemePanel /> */}
          </main>
          <Toaster />
          <Footer />
        </Theme>
        </ClerkProvider>
      </body>
    </html>
  )
}
