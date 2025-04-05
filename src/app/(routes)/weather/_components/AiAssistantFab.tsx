"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, X } from "lucide-react";

export function AiAssistantFab({ aqi }: { aqi: number }) {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getAiTip = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aqi })
      });
      
      if (!res.ok) throw new Error("Request failed");
      
      const data = await res.json();
      setAdvice(data.advice);
    } catch (err) {
      setError("Failed to get advice");
    } finally {
      setLoading(false);
    }
  };

  const clearMessage = () => {
    setAdvice("");
    setError("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-100">
      <Button
        onClick={getAiTip}
        disabled={loading}
        className="rounded-full shadow-lg animate-pulse hover:animate-none"
      >
        <Sparkles className={`mr-2 ${loading ? "animate-spin" : ""}`} />
        {loading ? "Thinking..." : "AI Air Advisor"}
      </Button>
      
      {(advice || error) && (
        <div className={`relative mt-2 p-4 rounded-lg shadow-lg max-w-xs ${error ? "bg-red-50 text-red-800" : "bg-blue-50 text-blue-800"}`}>
          <button
            onClick={clearMessage}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          {error || advice}
        </div>
      )}
      
    </div>
  );
}