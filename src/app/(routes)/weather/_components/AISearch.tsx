'use client';

import { useState } from 'react';

export const AISearch = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const predefinedQuestions = [
    "What's the weather forecast for tomorrow?",
    "Will it rain this weekend?",
    "How's the air quality today?",
    "What should I wear for the current weather?"
  ];

  const handleSearch = async () => {
    if (!query) return;
    
    setIsLoading(true);
    try {
      const res = await fetch('/api/weather-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      const data = await res.json();
      setResponse(data.response || "No response received");
    } catch (error) {
      setResponse('Error fetching AI response');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 text-white">
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
          {isLoading ? '...' : '→'}
        </button>
      </div>

      {response && (
        <div className="p-4 bg-white bg-opacity-10 rounded-lg animate-fade-in">
          <p>{response}</p>
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

