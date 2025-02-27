"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getWeatherData } from "@/actions/actions";
import { WeatherData } from "@/types/weather";
import { motion } from "framer-motion";
import TChart from "@/components/ui/TChart";
import HChart from "@/components/ui/HChart";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function Weather() {
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
  const [chartType, setChartType] = useState<"temperature" | "humidity">(
    "temperature"
  );

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
      className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 pb-20 gap-8 sm:gap-16 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col w-full max-w-6xl gap-8 items-center mt-8">
        <div className="flex flex-col w-full gap-8 lg:flex-row mt-8">
          <div className="flex flex-col w-full lg:w-1/2 gap-8">
            <Card className="w-full shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl sm:text-3xl font-semibold">Weather Search</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  className="flex flex-col gap-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleGetWeather();
                  }}
                >
                  <Input
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                  >
                    {loading ? "Loading..." : "Get Weather"}
                  </Button>
                  {error && <p className="text-red-500 text-center">{error}</p>}
                </form>
              </CardContent>
            </Card>
            {weather && (
              <Card className="w-full shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl sm:text-3xl font-semibold">Weather Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div
                    className="flex flex-col gap-4 w-full mt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="p-4 shadow-md rounded-md bg-white text-black">
                      <h2 className="text-2xl font-bold">
                        {weather.city.name}
                      </h2>
                      <p className="text-lg flex items-center gap-2">
                        Temperature: {weather.list[0].main.temp}°C
                      </p>
                      <p className="text-lg flex items-center gap-2">
                        Weather: {weather.list[0].weather[0].description}
                      </p>
                      <p className="text-lg">
                        Humidity: {weather.list[0].main.humidity}%
                      </p>
                      <p className="text-lg">
                        Wind Speed: {weather.list[0].wind.speed} m/s
                      </p>
                      <p className="text-lg">
                        Pressure: {weather.list[0].main.pressure} hPa
                      </p>
                      <p className="text-lg">
                        Visibility: {weather.list[0].visibility} meters
                      </p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            )}
          </div>
          {weather && (
            <div className="flex flex-col w-full lg:w-3/4 gap-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl sm:text-3xl font-semibold">Weather Charts</CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div
                    className="flex flex-col gap-4 w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="p-4 shadow-md rounded-md bg-white text-black">
                      <div className="flex justify-center gap-4 mb-4 overflow-x-auto whitespace-nowrap">
                        <Button
                          onClick={() => setChartType("temperature")}
                          className={
                            chartType === "temperature"
                              ? "bg-blue-500 text-white"
                              : ""
                          }
                        >
                          Temperature
                        </Button>
                        <Button
                          onClick={() => setChartType("humidity")}
                          className={
                            chartType === "humidity"
                              ? "bg-blue-500 text-white"
                              : ""
                          }
                        >
                          Humidity
                        </Button>
                      </div>
                      <div className="w-full">
                        {chartType === "temperature" ? (
                          <TChart
                            data={temperatureData}
                            dataKey="temp"
                            strokeColor="#8884d8"
                          />
                        ) : (
                          <HChart
                            data={humidityData}
                            dataKey="humidity"
                            strokeColor="#8884d8"
                          />
                        )}
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
