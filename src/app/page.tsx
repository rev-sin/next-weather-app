"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getWeatherData } from "@/actions/actions";
import { WeatherData } from "@/types/weather";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { CloudRain, Thermometer } from "lucide-react";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [temperatureData, setTemperatureData] = useState<
    { time: string; temp: number }[]
  >([]);
  const [humidityData, setHumidityData] = useState<
    { time: string; humidity: number }[]
  >([]);

  const handleGetWeather = async () => {
    setLoading(true);
    setError("");
    const result = await getWeatherData(city);
    setLoading(false);
    if (result.error) {
      setError("Failed to fetch weather data. Please try again.");
      setWeather(null);
      setTemperatureData([]);
      setHumidityData([]);
    } else {
      setWeather(result.data || null);
      const tempData =
        result.data?.list.map((item: any) => ({
          time: item.dt_txt,
          temp: item.main.temp,
        })) || [];
      const humData =
        result.data?.list.map((item: any) => ({
          time: item.dt_txt,
          humidity: item.main.humidity,
        })) || [];
      setTemperatureData(tempData);
      setHumidityData(humData);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-gradient-to-r from-purple-300 to-blue-300 text-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="fixed top-0 left-0 right-0 p-4 shadow-md z-10 bg-white">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Weather App</h1>
          <div className="flex flex-row gap-4 w-full max-w-md">
            <Input
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Button onClick={handleGetWeather} disabled={loading}>
              {loading ? "Loading..." : "Get Weather"}
            </Button>
          </div>
        </div>
      </header>
      <main className="flex flex-col items-center gap-4 w-full">
        <div className="flex flex-col items-center gap-4 w-full mt-16">
          {error && <p className="text-red-500">{error}</p>}
          {weather && (
            <motion.div
              className="flex flex-col gap-4 w-full max-w-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-4 shadow-md rounded-md bg-white">
                <h2 className="text-2xl font-bold">{weather.city.name}</h2>
                <p className="text-lg flex items-center gap-2">
                  <Thermometer /> Temperature: {weather.list[0].main.temp}°C
                </p>
                <p className="text-lg flex items-center gap-2">
                  <CloudRain /> Weather:{" "}
                  {weather.list[0].weather[0].description}
                </p>
              </div>
              <div className="p-4 shadow-md rounded-md bg-white">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={temperatureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="time"
                      tickFormatter={(time) =>
                        new Date(time).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                        })
                      }
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="temp"
                      stroke="url(#tempGradient)"
                    />
                    <defs>
                      <linearGradient
                        id="tempGradient"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                      >
                        <stop offset="0%" stopColor="#8884d8" />
                        <stop offset="100%" stopColor="#82ca9d" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="p-4 shadow-md rounded-md bg-white">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={humidityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="time"
                      tickFormatter={(time) =>
                        new Date(time).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                        })
                      }
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="humidity"
                      stroke="url(#humidityGradient)"
                    />
                    <defs>
                      <linearGradient
                        id="humidityGradient"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                      >
                        <stop offset="0%" stopColor="#8884d8" />
                        <stop offset="100%" stopColor="#82ca9d" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </motion.div>
  );
}
