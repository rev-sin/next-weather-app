"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  fetchAqiData,
  getWeatherDataByCoords,
} from "@/app/(routes)/weather/_actions/WeatherData";
import { WeatherData } from "@/types/weather";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import TChart from "@/app/(routes)/weather/_components/TChart";
import HChart from "@/app/(routes)/weather/_components/HChart";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { AqiCard } from "./_components/AqiCard";
import ExportButton from "@/app/(routes)/weather/_components/ExportButton";
import { AiAssistantFab } from "./_components/AiAssistantFab";
import { TransparentPopup } from "./_components/TransparentPopup";
import { AISearch } from "./_components/AISearch";

const WeatherMap = dynamic(
  () => import("@/app/(routes)/weather/_actions/WeatherMap"),
  { ssr: false }
);

export default function Weather() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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
  const [aqi, setAqi] = useState<{
    value: number;
    pollutant: string;
    category: string;
  } | null>(null);
  const [mapData, setMapData] = useState<{
    lat: number;
    lon: number;
    temp: number;
  } | null>(null);

  const handleGetWeather = async () => {
    setLoading(true);
    setError("");

    try {
      const geoRes = await fetch(`/api/geo?city=${city}`);
      const geoData = await geoRes.json();

      if (!geoRes.ok || !geoData.lat || !geoData.lon) {
        setError("Could not fetch location for the city.");
        setWeather(null);
        setTemperatureData([]);
        setHumidityData([]);
        setAqi(null);
        setMapData(null);
        setLoading(false);
        return;
      }

      const weatherResult = await getWeatherDataByCoords(
        geoData.lat,
        geoData.lon
      );

      if (weatherResult.error) {
        setError("Failed to fetch weather data. Please try again.");
        setWeather(null);
        setTemperatureData([]);
        setHumidityData([]);
        setAqi(null);
        setMapData(null);
        setLoading(false);
        return;
      }

      setWeather(weatherResult.data || null);

      const tempData =
        weatherResult.data?.list.map((item: any) => ({
          time: item.dt_txt,
          temp: item.main.temp,
        })) || [];
      const humData =
        weatherResult.data?.list.map((item: any) => ({
          time: item.dt_txt,
          humidity: item.main.humidity,
        })) || [];
      setTemperatureData(tempData);
      setHumidityData(humData);

      setMapData({
        lat: geoData.lat,
        lon: geoData.lon,
        temp: weatherResult.data?.list?.[0]?.main?.temp || 0,
      });

      const aqiResult = await fetchAqiData(
        weatherResult.data?.city.coord.lat ?? 0,
        weatherResult.data?.city.coord.lon ?? 0
      );

      if (aqiResult.error) {
        setError(aqiResult.error);
        setAqi(null);
      } else if (aqiResult.data) {
        setAqi({
          value: aqiResult.data.epaAqi,
          pollutant: aqiResult.data.mainPollutant,
          category: aqiResult.data.category,
        });
      }
    } catch (error) {
      setLoading(false);
      setError("An error occurred while fetching weather data.");
      setAqi(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 pb-20 gap-8 sm:gap-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col w-full max-w-6xl gap-8 items-center mt-8">
        <div className="flex flex-col w-full gap-8 lg:flex-row mt-8">
          <div className="flex flex-col w-full mt-8 gap-8">
            <Card className="w-full shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl sm:text-3xl font-semibold">
                  Weather Search
                </CardTitle>
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
              <>
                <Card className="w-full shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl sm:text-3xl font-semibold">
                      Weather Details
                    </CardTitle>
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

                {aqi && <AqiCard aqi={aqi} />}
              </>
            )}
          </div>

          {weather && (
            <div className="flex flex-col w-full lg:w-3/4 gap-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl sm:text-3xl font-semibold">
                    Weather Charts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div
                    className="flex flex-col gap-4 w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="p-4 shadow-md rounded-md bg-white text-black">
                      <div className="w-full">
                        <TChart data={temperatureData} />
                        <div className="flex gap-2 mt-4">
                          <ExportButton
                            data={temperatureData}
                            filename={`${weather.city.name}_temperature.csv`}
                          />
                        </div>
                      </div>

                      <div className="w-full mt-8">
                        <HChart
                          data={humidityData}
                          dataKey="humidity"
                          strokeColor="#8884d8"
                        />
                      </div>

                      <div className="flex gap-2 mt-4">
                        <ExportButton
                          data={humidityData}
                          filename={`${weather.city.name}_humidity.csv`}
                        />
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl sm:text-3xl font-semibold">
                    Weather Map
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {mapData && (
                    <WeatherMap
                      center={{ lat: mapData.lat, lon: mapData.lon }}
                      temperature={mapData.temp}
                    />
                  )}
                </CardContent>
              </Card>

              {aqi && <AiAssistantFab aqi={aqi.value} />}
            </div>
          )}
        </div>
      </div>

      <TransparentPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <div className="space-y-6">
          <h2 className="text-white text-2xl font-bold text-center">
            Air Quality AI Assistant
          </h2>
          <p className="text-white text-opacity-80 text-center">
            Ask about health impacts, safety measures, or pollution details
          </p>
          <AISearch
            query=""
            city={weather?.city?.name}
            aqi={aqi?.value}
            category={aqi?.category}
            pollutant={aqi?.pollutant}
            temp={weather?.list?.[0]?.main?.temp}
            humidity={weather?.list?.[0]?.main?.humidity}
          />
        </div>
      </TransparentPopup>
    </motion.div>
  );
}