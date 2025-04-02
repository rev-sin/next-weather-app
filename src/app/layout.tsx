import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "../components/ui/layout/header";
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
          className={`${geistSans.variable} antialiased bg-gradient-to-br from-purple-400 to-blue-600`}
        >
          <PostHogProvider>
            <Header />
            {children}
          </PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
