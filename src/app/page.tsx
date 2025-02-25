"use client";

import { motion } from "framer-motion";
import Header from "@/components/ui/header";
import Link from "next/link";

export default function HomePage() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 pb-20 gap-8 sm:gap-16 bg-gradient-to-r from-green-300 to-blue-300 text-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <main className="flex flex-col items-center gap-4 w-full mt-8 sm:mt-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-center">
          Welcome to the Weather App
        </h2>
        <p className="text-base sm:text-lg text-center">
          Get the latest weather updates for your city. Click on the Weather
          link above to get started.
        </p>
        <Link
          href="/weather"
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
        >
          Check Weather
        </Link>
        <section className="mt-8 w-full max-w-2xl text-center">
          <h3 className="text-2xl sm:text-3xl font-semibold">Features</h3>
          <ul className="list-disc list-inside mt-4 text-left">
            <li>Real-time weather updates</li>
            <li>7-day weather forecast</li>
            <li>Weather alerts and warnings</li>
            <li>Detailed weather information including temperature, humidity, wind speed, and more</li>
          </ul>
        </section>
        <section className="mt-8 w-full max-w-2xl text-center">
          <h3 className="text-2xl sm:text-3xl font-semibold">How It Works</h3>
          <p className="mt-4">
            Our weather app uses data from reliable sources to provide you with the most accurate and up-to-date weather information. Simply enter your city or allow location access to get started.
          </p>
        </section>
      </main>
    </motion.div>
  );
}
