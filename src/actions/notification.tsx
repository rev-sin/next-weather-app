"use server";

import { z } from "zod";

const newsSchema = z.object({
  status: z.string(),
  totalResults: z.number(),
  articles: z.array(
    z.object({
      source: z.object({
        id: z.string().nullable(),
        name: z.string(),
      }),
      author: z.string().nullable(),
      title: z.string(),
      description: z.string().nullable(),
      url: z.string(),
      urlToImage: z.string().nullable(),
      publishedAt: z.string(),
      content: z.string().nullable(),
    })
  ),
});

export async function getClimateNews(): Promise<{
  data?: any;
  error?: string;
}> {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=weather+climate&apiKey=${process.env.NEWS_API_KEY}`
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
