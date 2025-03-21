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

const aqiSchema = z.object({
  coord: z.object({
    lon: z.number(),
    lat: z.number(),
  }),
  list: z.array(
    z.object({
      main: z.object({
        aqi: z.number(), // AQI value (1-5)
      }),
      components: z.object({
        co: z.number(),
        no: z.number(),
        no2: z.number(),
        o3: z.number(),
        so2: z.number(),
        pm2_5: z.number(),
        pm10: z.number(),
        nh3: z.number(),
      }),
      dt: z.number(), // Timestamp
    })
  ),
});

export async function fetchAqiData(
  lat: number,
  lon: number
): Promise<{
  data?: number; // AQI value (1-5)
  error?: string;
}> {
  try {
    // Validate input
    if (!lat || !lon) {
      return { error: "Latitude and longitude are required" };
    }

    // Fetch AQI data from OpenWeatherMap Air Pollution API
    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHERMAP_API_KEY}`
    );

    // Handle API errors
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    // Parse the response
    const rawData = await res.json();

    // Validate the response using Zod schema
    const data = aqiSchema.parse(rawData);

    // Extract the AQI value
    const aqi = data.list[0].main.aqi;
    return { data: aqi };
  } catch (error) {
    // Handle errors
    if (error instanceof z.ZodError) {
      return { error: "Invalid AQI data received" };
    }
    return {
      error:
        error instanceof Error ? error.message : "Failed to fetch AQI data",
    };
  }
}

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

export async function getWeatherDataByCoords(
  lat: number,
  lon: number
): Promise<{
  data?: WeatherData;
  error?: string;
}> {
  try {
    if (!lat || !lon) {
      return { error: "Latitude and longitude are required" };
    }

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHERMAP_API_KEY}`
    );

    if (!res.ok) {
      throw new Error("Location not found");
    }

    const rawData = await res.json();

    const data = weatherSchema.parse(rawData);
    return { data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: "Invalid weather data received" };
    }
    return {
      error:
        error instanceof Error ? error.message : "Failed to fetch weather data",
    };
  }
}
