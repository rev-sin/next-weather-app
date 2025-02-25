"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 pb-20 gap-8 sm:gap-16 bg-gradient-to-r from-green-300 to-blue-300 text-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <main className="flex flex-col items-center gap-4 w-full mt-8 sm:mt-16">
        <h2 className="text-2xl sm:text-4xl font-bold">About Us</h2>
        <p className="text-base sm:text-lg text-center px-4 sm:px-0">
          Welcome to the Weather App! We are dedicated to providing you with the
          latest weather updates for your city. Our mission is to help you stay
          informed and prepared for any weather conditions.
        </p>
        <p className="text-base sm:text-lg text-center px-4 sm:px-0">
          Our team is passionate about meteorology and technology, and we strive
          to deliver accurate and timely weather information. Thank you for
          choosing our app!
        </p>
      </main>
    </motion.div>
  );
}
