"use client";

import { useState } from "react";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const handleSendEmail = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to send this email?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "your subject here",
          message: "Hello, this is a test email.",
          to: "goyalpawan765@gmail.com",
          from: "alerts-noreply@nextweather.tech",
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Email API Error:", errorData);
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-white/20 backdrop-blur-lg shadow-xl border-b border-white/30">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/" className="font-bold text-2xl text-blue-900 drop-shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-2xl" aria-label="Home">
          NextWeather
        </Link>
        <button
          className="md:hidden text-blue-900 bg-white/30 backdrop-blur-lg rounded-2xl px-3 py-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Open menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="2" rx="1"/><rect x="3" y="12" width="18" height="2" rx="1"/><rect x="3" y="18" width="18" height="2" rx="1"/></svg>
        </button>
        <nav
          className={`flex-col md:flex-row gap-4 transition-all duration-300 ${
            menuOpen
              ? "flex absolute top-full left-0 right-0 bg-white/80 backdrop-blur-lg p-4 shadow-2xl rounded-b-2xl border-t border-white/30"
              : "hidden"
          } md:flex md:relative md:bg-transparent md:shadow-none md:rounded-none md:border-none ml-auto`}
          aria-label="Main navigation"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Link href="/weather" className="px-4 py-2 rounded-2xl bg-white/30 text-blue-900 shadow-lg hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={handleLinkClick} aria-label="Weather">Weather</Link>
            <Link href="/air" className="px-4 py-2 rounded-2xl bg-white/30 text-blue-900 shadow-lg hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={handleLinkClick} aria-label="Air Quality">Air</Link>
            <Link href="/about" className="px-4 py-2 rounded-2xl bg-white/30 text-blue-900 shadow-lg hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={handleLinkClick} aria-label="About">About</Link>
            <Link href="/team" className="px-4 py-2 rounded-2xl bg-white/30 text-blue-900 shadow-lg hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={handleLinkClick} aria-label="Team">Team</Link>
            <Link href="/feedback" className="px-4 py-2 rounded-2xl bg-white/30 text-blue-900 shadow-lg hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={handleLinkClick} aria-label="Feedback">Feedback</Link>
            <button onClick={handleSendEmail} className="px-4 py-2 rounded-2xl bg-blue-500 text-white shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" aria-label="Broadcast">Broadcast</button>
            <div className="flex gap-2 items-center">
              <SignedOut>
                <SignInButton />
                <SignUpButton />
              </SignedOut>
              <SignedIn>
                <button onClick={handleSendEmail} className="px-4 py-2 rounded-2xl bg-blue-500 text-white shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" aria-label="Send Email">Send Email</button>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
