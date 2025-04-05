import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY || "",
});

export async function POST(req: Request) {
  if (!process.env.OPENAI_KEY) {
    return NextResponse.json(
      { error: "OpenAI API key not configured" },
      { status: 500 }
    );
  }

  let query: string;
  let city, aqi, category, pollutant, temp, humidity;

  try {
    const body = await req.json();
    query = body.query;
    city = body.city;
    aqi = body.aqi;
    category = body.category;
    pollutant = body.pollutant;
    temp = body.temp;
    humidity = body.humidity;

    if (!query || typeof query !== "string") {
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

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a friendly weather assistant. Respond in natural human language with:
- Emojis when suitable
- Clear paragraph breaks
- Bullet points for tips
- Avoid jargon unless asked

Here is location context:
City: ${city || "Unknown"}
Temperature: ${temp ? `${temp}°C` : "Unknown"}
Humidity: ${humidity ? `${humidity}%` : "Unknown"}
Air Quality Index (AQI): ${aqi || "Unknown"}
Category: ${category || "Unknown"}
Pollutant: ${pollutant || "Unknown"}

Use this info if relevant to the user's query.`,
        },
        {
          role: "user",
          content: `Answer this weather question naturally: ${query}
Include:
1. Direct answer first
2. Supporting details
3. Practical recommendations
4. Safety tips if applicable`,
        },
      ],
      temperature: 0.8,
      max_tokens: 500,
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      throw new Error("Empty response from AI");
    }

    return NextResponse.json({ response });
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    const errorMessage =
      error.response?.data?.error?.message ||
      error.message ||
      "Failed to process your request";

    return NextResponse.json({ error: errorMessage }, { status: error.status || 500 });
  }
}
