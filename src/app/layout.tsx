import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "../components/ui/layout/header";
import GlassNavBarWrapper from "@/components/ui/GlassNavBarWrapper";
import { ClerkProvider } from "@clerk/nextjs";
import { PostHogProvider } from "./providers";


// app/layout.tsx
import { Toaster } from "@/components/ui/toaster";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Toaster /> {/* Must be present for toasts to work */}
      </body>
    </html>
  );
}


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "nextweather",
    template: "%s | nextweather",
    absolute: "",
  },
  description: "Created by Revanth Singothu and Team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} antialiased min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-blue-400 flex flex-col`} 
        >
          <a href="#main-content" className="sr-only focus:not-sr-only absolute top-2 left-2 z-50 bg-white/30 backdrop-blur-lg text-blue-900 px-4 py-2 rounded-2xl shadow-xl">Skip to content</a>
          <GlassNavBarWrapper />
          <main id="main-content" role="main" className="flex-1 flex flex-col items-center justify-center px-2 py-6 w-full max-w-3xl mx-auto">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
