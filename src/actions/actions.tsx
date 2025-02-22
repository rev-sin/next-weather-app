"use server";

import { WeatherData } from "@/types/weather";
import { z } from "zod";

const weatherSchema = z.object({
  cod: z.string(),
  message: z.number(),
  cnt: z.number(),
  list: z.array(
    z.object({
      dt: z.number(),
      main: z.object({
        temp: z.number(),
        feels_like: z.number(),
        temp_min: z.number(),
        temp_max: z.number(),
        pressure: z.number(),
        sea_level: z.number(),
        grnd_level: z.number(),
        humidity: z.number(),
        temp_kf: z.number(),
      }),
      weather: z.array(
        z.object({
          id: z.number(),
          main: z.string(),
          description: z.string(),
          icon: z.string(),
        })
      ),
      clouds: z.object({
        all: z.number(),
      }),
      wind: z.object({
        speed: z.number(),
        deg: z.number(),
        gust: z.number(),
      }),
      visibility: z.number(),
      pop: z.number(),
      rain: z
        .object({
          "1h": z.number(),
        })
        .optional(),
      sys: z.object({
        pod: z.string(),
      }),
      dt_txt: z.string(),
    })
  ),
  city: z.object({
    id: z.number(),
    name: z.string(),
    coord: z.object({
      lat: z.number(),
      lon: z.number(),
    }),
    country: z.string(),
    population: z.number(),
    timezone: z.number(),
    sunrise: z.number(),
    sunset: z.number(),
  }),
});

export async function getWeatherData(city: string): Promise<{
  data?: WeatherData;
  error?: string;
}> {
  try {
    if (!city.trim()) {
      return { error: "City name is required" };
    }

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.OPENWEATHERMAP_API_KEY}`
    );

    if (!res.ok) {
      throw new Error("City not found");
    }

    const rawData = await res.json();

    const data = weatherSchema.parse(rawData);
    return { data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: "Invalid weather data recived" };
    }
    return {
      error:
        error instanceof Error ? error.message : "Failed to fetch weather data",
    };
  }
}
