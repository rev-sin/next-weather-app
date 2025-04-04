"use server";

import { WeatherData } from "@/types/weather";
import { weatherSchema, aqiSchema } from "./schema";
import { z } from "zod";

export async function fetchAqiData(
  lat: number,
  lon: number
): Promise<{
  data?: {
    epaAqi: number;
    mainPollutant: string;
    category: string;
    components: Record<string, number>;
  };
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
    const components = data.list[0].components;

    // Calculate EPA AQI
    const { epaAqi, mainPollutant } = calculateEpaAqi(components);
    const category = getEpaAqiCategory(epaAqi);

    return { 
      data: {
        epaAqi,
        mainPollutant,
        category,
        components
      }
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: "Invalid AQI data received" };
    }
    return {
      error: error instanceof Error ? error.message : "Failed to fetch AQI data",
    };
  }
}

// EPA AQI calculation (add these helper functions in the same file or a separate utils file)
function calculateEpaAqi(components: Record<string, number>) {
  const BREAKPOINTS = {
    pm2_5: [0, 12, 35.4, 55.4, 150.4, 250.4],
    pm10: [0, 54, 154, 254, 354, 424],
    o3: [0, 54, 70, 85, 105, 200],
    no2: [0, 53, 100, 360, 649, 1249],
    so2: [0, 35, 75, 185, 304, 604],
    co: [0, 4.4, 9.4, 12.4, 15.4, 30.4]
  };

  const aqiValues = {
    pm2_5: calculateSingleAqi(components.pm2_5, BREAKPOINTS.pm2_5),
    pm10: calculateSingleAqi(components.pm10, BREAKPOINTS.pm10),
    o3: calculateSingleAqi(components.o3, BREAKPOINTS.o3),
    no2: calculateSingleAqi(components.no2, BREAKPOINTS.no2),
    so2: calculateSingleAqi(components.so2, BREAKPOINTS.so2),
    co: calculateSingleAqi(components.co, BREAKPOINTS.co)
  };

  const mainPollutant = Object.entries(aqiValues).reduce((max, [pollutant, aqi]) => 
    aqi > max.aqi ? { pollutant, aqi } : max, 
    { pollutant: '', aqi: 0 }
  );

  return {
    epaAqi: mainPollutant.aqi,
    mainPollutant: mainPollutant.pollutant
  };
}

function calculateSingleAqi(concentration: number, breakpoints: number[]) {
  const aqiBreakpoints = [0, 50, 100, 150, 200, 300, 500];
  let i = 0;
  
  while (i < breakpoints.length - 1 && concentration > breakpoints[i + 1]) {
    i++;
  }
  
  const [clow, chigh] = breakpoints.slice(i, i + 2);
  const [ilow, ihigh] = aqiBreakpoints.slice(i, i + 2);
  
  return Math.round(((ihigh - ilow) / (chigh - clow)) * (concentration - clow) + ilow);
}

function getEpaAqiCategory(aqi: number): string {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
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
