"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitted(true);
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 pb-20 gap-8 sm:gap-16 bg-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      role="region"
      aria-labelledby="feedback-heading"
    >
      <div className="w-4/5 mx-auto">
        <h2 id="feedback-heading" className="text-3xl sm:text-4xl font-bold text-center">
          We Value Your Feedback
        </h2>
        <p className="text-base sm:text-lg text-center">
          Please let us know your thoughts about our weather app.
        </p>
        {submitted ? (
          <p className="text-green-600 font-semibold" role="status">Thank you for your feedback!</p>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-2xl mt-4 flex flex-col gap-2" aria-label="Feedback form">
            <label htmlFor="feedback-input" className="sr-only">Feedback</label>
            <textarea
              id="feedback-input"
              className="w-full p-4 border border-gray-300 rounded-lg text-black focus:outline focus:outline-purple-500"
              rows={5}
              placeholder="Enter your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              aria-label="Your feedback"
              required
            />
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition focus:outline focus:outline-purple-500"
            >
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
}
