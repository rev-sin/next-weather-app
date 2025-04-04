import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '' // Fallback empty string
});

export async function POST(req: Request) {
  // 1. Validate environment variable
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OpenAI API key not configured" },
      { status: 500 }
    );
  }

  // 2. Parse and validate request
  let query: string;
  try {
    const body = await req.json();
    query = body.query;
    
    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: "Query is required and must be a string" },
        { status: 400 }
      );
    }
  } catch (e) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  // 3. API call with better error handling
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user",
        content: `Answer this weather-related question: ${query}. 
        Provide detailed information about temperature, conditions, and recommendations.
        Respond in markdown format with clear sections.`
      }],
      temperature: 0.7,
      max_tokens: 1000
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error("Empty response from AI");
    }

    return NextResponse.json({ response });

  } catch (error: any) {
    console.error("OpenAI API error:", error);
    
    // Handle different error types
    const errorMessage = error.response?.data?.error?.message || 
                        error.message || 
                        "Failed to process your request";
    
    return NextResponse.json(
      { error: errorMessage },
      { status: error.status || 500 }
    );
  }
}