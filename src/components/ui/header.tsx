"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import WeatherNotification from "./weatherNotification";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 p-4 z-10 bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="flex md:flex-row justify-between items-center relative">
        <h1 className="mb-4 md:mb-0">
          <Link href="/" className="text-white font-bold text-xl" onClick={handleLinkClick}>
            Next Weather
          </Link>
        </h1>
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
        <nav
          className={`flex-col md:flex-row gap-4 transition-transform duration-300 ${
            menuOpen
              ? "flex absolute top-full left-0 right-0 bg-white p-4 shadow-lg transform translate-y-0"
              : "hidden transform -translate-y-full"
          } md:flex md:relative md:translate-y-0`}
        >
          <div className="flex flex-col md:flex-row gap-4 bg-white rounded-l-lg rounded-r-lg p-4">
            <Link href="/weather" className="text-blue-500" onClick={handleLinkClick}>
              Weather
            </Link>
            <Link href="/about" className="text-blue-500" onClick={handleLinkClick}>
              About
            </Link>
            <Link href="/team" className="text-blue-500" onClick={handleLinkClick}>
              Team
            </Link>
            <Link href="/feedback" className="text-blue-500" onClick={handleLinkClick}>
              Feedback
            </Link>
            <div className="text-blue-500 flex gap-4">
              <SignedOut>
                <SignInButton />
                <SignUpButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </nav>
        {pathname !== "/weather" && (
          <div className="absolute top-4 right-4">
            <WeatherNotification />
          </div>
        )}
      </div>
    </header>
  );
}
