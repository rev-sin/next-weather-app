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
        const errorData = await response.text(); // Get error details
        console.error("Email API Error:", errorData);
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 p-4 z-10 bg-gradient-to-r from-blue-600 to-purple-500">
      <div className="flex md:flex-row justify-between items-center relative">
        <h1 className="mb-4 md:mb-0">
          <Link
            href="/"
            className="text-white font-bold text-xl"
            onClick={handleLinkClick}
          >
            next weather
          </Link>
        </h1>
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <b>menu</b>
        </button>
        <nav
          className={`flex-col md:flex-row gap-4 transition-transform duration-300 ${
            menuOpen
              ? "flex absolute top-full left-0 right-0 bg-white p-4 shadow-lg transform translate-y-0"
              : "hidden transform -translate-y-full"
          } md:flex md:relative md:translate-y-0 ml-auto`}
        >
          <div className="flex flex-col md:flex-row gap-4 bg-white rounded-full  p-4">
            <Link
              href="/weather"
              className="text-blue-500"
              onClick={handleLinkClick}
            >
              weather
            </Link>
            <Link
              href="/about"
              className="text-blue-500"
              onClick={handleLinkClick}
            >
              about
            </Link>
            <button onClick={handleSendEmail} className="text-blue-500">
              broadcast
            </button>
            <Link
              href="/team"
              className="text-blue-500"
              onClick={handleLinkClick}
            >
              team
            </Link>
            <Link
              href="/feedback"
              className="text-blue-500"
              onClick={handleLinkClick}
            >
              feedback
            </Link>
            <div className="flex gap-4">
              <SignedOut>
                <SignInButton />
                <SignUpButton />
              </SignedOut>
              <SignedIn>
                <button onClick={handleSendEmail} className="text-blue-500">
                  send email
                </button>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
