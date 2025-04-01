"use server";

import { newsSchema } from "@/app/(routes)/weather/_actions/schema";
import { z } from "zod";

export async function getClimateNews(): Promise<{
  data?: any;
  error?: string;
}> {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=weather,climate,pollution,disaster,global+warming,forecast,heatwave&apiKey=${process.env.NEWS_API_KEY}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }

    const rawData = await res.json();

    const data = newsSchema.parse(rawData);
    return { data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: "Invalid news data received" };
    }
    return {
      error:
        error instanceof Error ? error.message : "Failed to fetch news data",
    };
  }
}
