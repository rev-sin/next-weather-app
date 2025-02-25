"use client"

import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
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
                <h2 className="text-4xl font-bold">About Us</h2>
                <p className="text-lg text-center">
                    Welcome to the Weather App! We are dedicated to providing you with the latest weather updates for your city. Our mission is to help you stay informed and prepared for any weather conditions.
                </p>
                <p className="text-lg text-center">
                    Our team is passionate about meteorology and technology, and we strive to deliver accurate and timely weather information. Thank you for choosing our app!
                </p>
            </main>
        </motion.div>
    );
}