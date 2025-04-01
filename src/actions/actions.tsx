"use server";

import { WeatherData } from "@/types/weather";
import { weatherSchema, aqiSchema } from "./schema";
import { z } from "zod";

export async function fetchAqiData(
  lat: number,
  lon: number
): Promise<{
  data?: number;
  error?: string;
}> {
  try {
    if (!lat || !lon) {
      return { error: "Latitude and longitude are required" };
    }

    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHERMAP_API_KEY}`
    );

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const rawData = await res.json();

    const data = aqiSchema.parse(rawData);

    const aqi = data.list[0].main.aqi;
    return { data: aqi };
  } catch (error) {
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
