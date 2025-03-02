"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/ui/header";

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitted(true);
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 pb-20 gap-8 sm:gap-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <main className="flex flex-col items-center gap-4 w-full mt-8 sm:mt-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-center">
          We Value Your Feedback
        </h2>
        <p className="text-base sm:text-lg text-center">
          Please let us know your thoughts about our weather app.
        </p>
        {submitted ? (
          <p className="text-green-200">Thank you for your feedback!</p>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-2xl mt-4">
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg text-black"
              rows={5}
              placeholder="Enter your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
            >
              Submit Feedback
            </button>
          </form>
        )}
      </main>
    </motion.div>
  );
}
