import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});
export const dynamic = 'force-dynamic'; // Add to route.ts

export async function POST(req: Request) {
  const { aqi, prompt } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "system",
        content: "You're an air quality expert. Give concise 1-2 sentence health advice based on AQI."
      }, {
        role: "user",
        content: `Current AQI: ${aqi}. ${prompt || "Give one health tip"}`
      }],
      max_tokens: 100
    });

    return NextResponse.json({
      advice: completion.choices[0]?.message?.content || "No response"
    });
  } catch (error) {
    return NextResponse.json(
      { error: "AI service unavailable" },
      { status: 500 }
    );
  }
}