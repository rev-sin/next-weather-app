"use client"

import { motion } from "framer-motion";
import Link from "next/link";


export default function NotFoundPage() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-gradient-to-r from-red-300 to-yellow-300 text-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <main className="flex flex-col items-center gap-4 w-full mt-16">
        <h2 className="text-4xl font-bold">Page Not Found</h2>
        <p className="text-lg text-center">
          Sorry, the page you are looking for does not exist. Please check the
          URL or go back to the homepage.
        </p>
        <Link href="/">
          <a className="text-blue-500 underline">Go to Homepage</a>
        </Link>
      </main>
    </motion.div>
  );
}
