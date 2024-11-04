import "@radix-ui/themes/styles.css";
import './globals.css'
import './theme-config.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from './NavBar'
import { Theme, ThemePanel } from "@radix-ui/themes";
import Footer from "./components/ui/Footer";
import { Toaster } from "@/components/ui/toaster"
import { GoogleOAuthProvider } from '@react-oauth/google'; 


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
      <body className={`${inter.className} min-h-[100vh]`}>
        <GoogleOAuthProvider clientId={process.env.NEXT_GOOGLE_AUTH_CLIENT_ID!}>
        <Theme accentColor="violet">
          <NavBar />
          <main className="px-auto">
            {children}
            {/* <ThemePanel /> */}
          </main>
          <Toaster />
          <Footer />
        </Theme>
        </GoogleOAuthProvider>
      </body>
    </html>
  )
}
