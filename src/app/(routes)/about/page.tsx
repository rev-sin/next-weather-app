"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-transparent" role="region" aria-labelledby="about-heading">
      <div className="w-4/5 mx-auto">
        <h1 id="about-heading" className="text-4xl font-extrabold text-blue-900 text-center mb-2 drop-shadow-lg">About NextWeather</h1>
        <p className="text-lg text-blue-900 text-center font-medium mb-2">NextWeather is a modern, accessible, and mobile-first weather platform designed to keep you informed and prepared for any conditions.</p>
        <div className="flex flex-col gap-2 text-blue-800 text-base max-w-2xl w-full">
          <p>Our mission is to deliver accurate, timely, and beautiful weather updates for every city, with a focus on accessibility and user experience.</p>
          <p>Powered by a passionate team of meteorology and technology enthusiasts, we believe everyone deserves weather data that’s easy to understand and delightful to use.</p>
        </div>
        <div className="flex justify-center mt-4">
          <Link href="/" className="px-6 py-2 rounded-2xl bg-blue-500 text-white font-semibold shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200" aria-label="Go back to Home">
            Go back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
