"use client";
import { useState, useEffect } from "react";

export const AISearch = ({ query: initialQuery = "" }) => {
  const [query, setQuery] = useState(initialQuery);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const predefinedQuestions = [
    "What's the weather looking like tomorrow?",
    "Will I need an umbrella this weekend?",
    "How's the air quality right now?",
    "What should I wear today?",
  ];

  const formatResponse = (text: string) => {
    return text
      .replace(/\n/g, '<br/>')
      .replace(/- (.*?)(<br>|$)/g, '• $1<br/>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  };

  const handleSearch = async () => {
    if (!query) return;
    setIsLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/weather-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: `Answer naturally: ${query}` }),
      });
      const data = await res.json();
      setResponse(formatResponse(data.response || "Hmm, I couldn't find weather info for that."));
    } catch (error) {
      setResponse("Sorry, I'm having trouble connecting. Try again later!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) handleSearch();
  }, [initialQuery]);

  return (
    <div className="space-y-6 text-white">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about weather..."
          className="w-full p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-40 p-1 rounded-md"
        >
          {isLoading ? "..." : "→"}
        </button>
      </div>

      {isLoading && (
        <div className="p-4 flex items-center space-x-2">
          <div className="animate-pulse h-2 w-2 bg-white rounded-full"></div>
          <span>Getting your weather info...</span>
        </div>
      )}

      {response && (
        <div className="p-4 bg-white bg-opacity-10 rounded-lg">
          <div 
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: response }} 
          />
        </div>
      )}

      <div className="mt-4">
        <h3 className="font-medium mb-2">Common Questions:</h3>
        <div className="grid grid-cols-1 gap-2">
          {predefinedQuestions.map((question, i) => (
            <button
              key={i}
              onClick={() => {
                setQuery(question);
                handleSearch();
              }}
              className="text-left p-2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};