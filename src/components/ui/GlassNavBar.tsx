"use client";
import { useState } from "react";

export default function GlassNavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="w-full sticky top-0 z-40 bg-white/20 backdrop-blur-lg shadow-lg border-b border-white/30 flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-4">
        <a href="/" className="font-bold text-xl text-blue-900 drop-shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-2xl">NextWeather</a>
        <div className="hidden md:flex items-center gap-2">
          <a href="/weather" className="px-4 py-2 rounded-2xl bg-white/30 text-blue-900 shadow-lg hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400">Weather</a>
          <a href="/air" className="px-4 py-2 rounded-2xl bg-white/30 text-blue-900 shadow-lg hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400">Air</a>
          <a href="/about" className="px-4 py-2 rounded-2xl bg-white/30 text-blue-900 shadow-lg hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400">About</a>
          <a href="/team" className="px-4 py-2 rounded-2xl bg-white/30 text-blue-900 shadow-lg hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400">Team</a>
          <a href="/feedback" className="px-4 py-2 rounded-2xl bg-white/30 text-blue-900 shadow-lg hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400">Feedback</a>
          <a href="/broadcast" className="px-4 py-2 rounded-2xl bg-blue-500 text-white shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Broadcast</a>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* User/account controls placeholder, add auth buttons here if needed */}
      </div>
      {/* Mobile menu button */}
      <div className="md:hidden flex items-center">
        <button className="text-blue-900 bg-white/30 backdrop-blur-lg rounded-2xl px-3 py-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="2" rx="1"/><rect x="3" y="12" width="18" height="2" rx="1"/><rect x="3" y="18" width="18" height="2" rx="1"/></svg>
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/80 backdrop-blur-lg p-4 shadow-2xl rounded-b-2xl border-t border-white/30 flex flex-col gap-2 md:hidden z-50">
          <a href="/weather" className="px-4 py-2 rounded-2xl bg-white/30 text-blue-900 shadow-lg hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400">Weather</a>
          <a href="/air" className="px-4 py-2 rounded-2xl bg-white/30 text-blue-900 shadow-lg hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400">Air</a>
          <a href="/about" className="px-4 py-2 rounded-2xl bg-white/30 text-blue-900 shadow-lg hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400">About</a>
          <a href="/team" className="px-4 py-2 rounded-2xl bg-white/30 text-blue-900 shadow-lg hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400">Team</a>
          <a href="/feedback" className="px-4 py-2 rounded-2xl bg-white/30 text-blue-900 shadow-lg hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400">Feedback</a>
          <a href="/broadcast" className="px-4 py-2 rounded-2xl bg-blue-500 text-white shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Broadcast</a>
        </div>
      )}
    </nav>
  );
}
