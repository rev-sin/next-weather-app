"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

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

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={getAiTip}
        disabled={loading}
        className="rounded-full shadow-lg animate-pulse hover:animate-none"
      >
        <Sparkles className={`mr-2 ${loading ? "animate-spin" : ""}`} />
        {loading ? "Thinking..." : "AI Air Advisor"}
      </Button>
      
      {(advice || error) && (
        <div className={`mt-2 p-4 rounded-lg shadow-lg max-w-xs ${error ? "bg-red-50 text-red-800" : "bg-blue-50 text-blue-800"}`}>
          {error || advice}
        </div>
      )}
    </div>
  );
}