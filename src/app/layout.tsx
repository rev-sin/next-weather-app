import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/ui/header";
import { ClerkProvider } from "@clerk/nextjs";
import { PostHogProvider } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
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
        <body
          className={`${geistSans.variable} ${jetBrainsMono.variable} antialiased`}
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
