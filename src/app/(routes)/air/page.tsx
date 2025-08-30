'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

type PollutionData = {
  components: {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
  };
};

export default function AirPollutionPage() {
  const [city, setCity] = useState('');
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [data, setData] = useState<PollutionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCoords = async (cityName: string) => {
    try {
      const res = await fetch(`/api/geo?city=${cityName}`);
      const json = await res.json();
      if (!json.lat || !json.lon) throw new Error('Location not found');
      setCoords({ lat: json.lat, lon: json.lon });
    } catch (err: any) {
      console.error(err);
      setError('City not found or failed to fetch location.');
      setCoords(null);
    }
  };

  const fetchAirData = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/air?lat=${lat}&lon=${lon}`);
      const json = await res.json();
      const pollution = json.list?.[0];
      if (pollution) {
        setData(pollution);
        setError('');
      } else {
        setError('No pollution data found.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch air pollution data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (coords) {
      fetchAirData(coords.lat, coords.lon);
    }
  }, [coords]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setData(null);
    setError('');
    await fetchCoords(city);
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-transparent px-4 sm:px-8 lg:px-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      role="region"
      aria-labelledby="air-heading"
    >
  <div className="w-4/5 mx-auto flex flex-col items-center">
        <h1 id="air-heading" className="text-3xl font-bold mb-4 text-center">Air Quality</h1>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 w-full max-w-lg" aria-label="Search city for air pollution data">
          <label htmlFor="city-input" className="sr-only">City</label>
          <input
            id="city-input"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="flex-1 p-2 border rounded focus:outline focus:outline-blue-500"
            aria-label="City name"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline focus:outline-blue-500"
          >
            Search
          </button>
        </form>

        <div className="flex flex-col w-full gap-8 items-center mt-4">
          {loading && <p className="text-center text-blue-600" role="status">Loading...</p>}
          {error && <p className="text-center text-red-600" role="alert">{error}</p>}
          {!loading && !error && data && (
            <div className="w-full break-words whitespace-pre-line overflow-wrap">
              <ul className="space-y-1">
                {Object.entries(data.components).map(([key, value]) => (
                  <li key={key} className="flex justify-between break-words whitespace-pre-line overflow-wrap">
                    <span className="font-semibold break-words whitespace-pre-line overflow-wrap">{key.toUpperCase()}:</span>
                    <span className="break-words whitespace-pre-line overflow-wrap">{value} µg/m³</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
