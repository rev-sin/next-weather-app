import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "../components/ui/header";
import { ClerkProvider } from "@clerk/nextjs";
import { PostHogProvider } from "./providers";
import WeatherNotification from "@/components/ui/weatherNotification";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Weather",
  description: "Created by github.com/rev-sin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} antialiased bg-gradient-to-br from-blue-400 to-blue-600`}>
          <PostHogProvider>
            <Header />
            <WeatherNotification />
            {children}
          </PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
