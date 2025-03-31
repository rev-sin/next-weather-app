"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 pb-20 gap-8 sm:gap-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <main className="flex flex-col items-center gap-4 w-full mt-8 sm:mt-16">
        <div className="w-full max-w-2xl shadow-lg rounded-lg overflow-hidden bg-white text-black p-6">
          <h1 className="text-3xl font-bold mb-4 text-center">About Us</h1>
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="mb-4 text-lg">
              Welcome to the Weather App! We are dedicated to providing you with
              the latest weather updates for your city. Our mission is to help
              you stay informed and prepared for any weather conditions.
            </p>
            <p className="mb-4 text-lg">
              Our team is passionate about meteorology and technology, and we
              strive to deliver accurate and timely weather information. Thank
              you for choosing our app!
            </p>
            <div className="text-center">
              <Link href="/" className="text-blue-500 hover:underline text-lg">
                Go back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
