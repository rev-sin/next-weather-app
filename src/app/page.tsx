"use client"

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-gradient-to-r from-green-300 to-blue-300 text-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="fixed top-0 left-0 right-0 p-4 shadow-md z-10 bg-white">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Weather App</h1>
          <nav className="flex gap-4">
            <Link href="/weather" className="text-blue-500 hover:underline">
              Weather
            </Link>
            <Link href="/about" className="text-blue-500 hover:underline">
              About
            </Link>
            <Link href="/contact" className="text-blue-500 hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex flex-col items-center gap-4 w-full mt-16">
        <h2 className="text-4xl font-bold">Welcome to the Weather App</h2>
        <p className="text-lg text-center">
          Get the latest weather updates for your city. Click on the Weather
          link above to get started.
        </p>
      </main>
    </motion.div>
  );
}
